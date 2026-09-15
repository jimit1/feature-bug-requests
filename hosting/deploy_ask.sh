#!/usr/bin/env bash
# Creates or updates the ask endpoint. Re-runnable.
set -euo pipefail

USAGE="usage: bash hosting/deploy_ask.sh <passphrase> <data_url>"
PASSPHRASE="${1:?$USAGE}"
DATA_URL="${2:?$USAGE}"
NAME=feature-bug-requests-ask
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
PKG="$TMP/pkg"
ZIP="$TMP/fn.zip"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$PKG/agents"
cp "$ROOT/run.py" "$ROOT/ask.py" "$ROOT/config.json" "$ROOT/hosting/ask_lambda.py" "$PKG/"
cp "$ROOT/agents/ask.md" "$PKG/agents/"
python3 -m pip install --quiet --target "$PKG" --platform manylinux2014_x86_64 --implementation cp --python-version 3.12 --only-binary=:all: anthropic
(cd "$PKG" && zip -qr "$ZIP" .)

if ! aws iam get-role --role-name "$NAME" >/dev/null 2>&1; then
  aws iam create-role --role-name "$NAME" --assume-role-policy-document \
    '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' >/dev/null
  aws iam attach-role-policy --role-name "$NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  sleep 10
fi
ROLE_ARN="$(aws iam get-role --role-name "$NAME" --query Role.Arn --output text)"
API_KEY="$(aws ssm get-parameter --name /compound/anthropic_api_key --with-decryption \
  --query Parameter.Value --output text)"
SETTINGS="Variables={ANTHROPIC_API_KEY=$API_KEY,ASK_PASSPHRASE=$PASSPHRASE,DATA_URL=$DATA_URL}"

if aws lambda get-function --function-name "$NAME" >/dev/null 2>&1; then
  aws lambda update-function-code --function-name "$NAME" --zip-file "fileb://$ZIP" >/dev/null
  aws lambda wait function-updated --function-name "$NAME"
  aws lambda update-function-configuration --function-name "$NAME" --runtime python3.12 \
    --handler ask_lambda.handler --timeout 60 --memory-size 512 --environment "$SETTINGS" >/dev/null
  aws lambda wait function-updated --function-name "$NAME"
else
  aws lambda create-function --function-name "$NAME" --runtime python3.12 --role "$ROLE_ARN" \
    --handler ask_lambda.handler --timeout 60 --memory-size 512 --environment "$SETTINGS" \
    --zip-file "fileb://$ZIP" >/dev/null
  aws lambda wait function-active --function-name "$NAME"
fi

if ! aws lambda get-function-url-config --function-name "$NAME" >/dev/null 2>&1; then
  aws lambda create-function-url-config --function-name "$NAME" --auth-type NONE \
    --cors '{"AllowOrigins":["*"],"AllowMethods":["*"],"AllowHeaders":["content-type"]}' >/dev/null
fi
aws lambda add-permission --function-name "$NAME" --statement-id public-url \
  --action lambda:InvokeFunctionUrl --principal '*' --function-url-auth-type NONE >/dev/null 2>&1 || true

aws lambda get-function-url-config --function-name "$NAME" --query FunctionUrl --output text
