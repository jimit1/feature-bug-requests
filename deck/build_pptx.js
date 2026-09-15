const pptxgen = require('pptxgenjs');
const fs = require('fs');
const { imageSize } = require('image-size');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';           // 10 x 5.625 in
pres.author = 'Jim Mehta';
pres.title = 'Feature / Bug Requests';
const INK='2C2C2A', MUTED='5F5E5A', FAINT='888780';

// cover
{
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  s.addText('Feature / Bug Requests', { x:0.6, y:1.6, w:8.8, h:1.0, fontFace:'Arial', fontSize:44, bold:false, color:INK, margin:0, isTextBox:true });
  s.addText('A prioritized digest for the product team', { x:0.6, y:2.65, w:8.8, h:0.5, fontFace:'Arial', fontSize:20, color:MUTED, margin:0, isTextBox:true });
  s.addText('Jim Mehta  ·  September 2026', { x:0.6, y:4.95, w:6, h:0.35, fontFace:'Arial', fontSize:11, color:FAINT, margin:0, isTextBox:true });
}

const titles = {
  2:'Product hears a fraction of what customers and prospects ask for',
  3:"Every request lands in one ranked list, with the customer's own words attached",
  4:'The whole system: two sources, three agents, one git library, one product team',
  5:'Reader agents turn conversations into records; the editor agent sorts records into themes',
  6:"Ask why a theme matters; the answer comes from the library, with the customer's words",
  7:'Built to the brief; the next steps are designed, not built',
  8:'Appendix: the decisions behind it',
};
const notes = {
  2:'Situation and complication. Dozens of calls and cases a week hold what the market wants. What reaches product today is word of mouth with no source attached.',
  3:'The answer. Calls and cases collapse into a ranked list. Any line opens to the customer quote and the exact moment it was said.',
  4:'System. One nightly job: readers write verified claims, the editor files claims into themes. themes/ is the single source; the digest UI and the ask agent both read it. Commits are the audit trail.',
  5:'Agents. Two cheap reader agents, one per source, return structured records. Two gates in code: a PII scrub before any reader sees a word, and a schema plus an exact quote check before anything is stored. The frontier editor agent reads existing themes first, then files each new claim: append or open, with one line of why. A golden set runs every night so drift fails the job. All nightly.',
  6:'Ask. The ask agent answers only from the library. It never queries Gong or Salesforce live.',
  7:'Scope. Built only what the brief asked for. A wider scrub, a wider golden set, live connectors and an approve gate are drawn on the system; a database, sign-in with memory, status per theme, weekly notes, more sources, per-account and trend views are listed for later. None of it is built.',
  8:'Appendix. The stack, the model tiers, the size of the mock data, the checks in code including that every agent answers only through a schema, the hosting, and the first week of real numbers. Every one of these was a choice; the point is that nothing here is accidental.',
};
for (let n=2; n<=8; n++) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  s.addText(String(n), { x:9.2, y:0.2, w:0.5, h:0.3, fontFace:'Arial', fontSize:10, color:FAINT, align:'right', margin:0, isTextBox:true });
  s.addText(titles[n], { x:0.6, y:0.45, w:8.8, h:0.95, fontFace:'Arial', fontSize:22, color:INK, valign:'top', margin:0, isTextBox:true });
  const file = `png/body/slide-${n}.png`;
  const dim = imageSize(fs.readFileSync(file));
  const maxW = 8.8, maxH = 3.6, top = 1.55;
  let w = maxW, h = w * dim.height / dim.width;
  if (h > maxH) { h = maxH; w = h * dim.width / dim.height; }
  s.addImage({ path:file, x:0.6, y:top, w, h });
  s.addNotes(notes[n]);
}
pres.writeFile({ fileName: 'Feature-Bug-Requests.pptx' }).then(f => console.log('wrote', f));
