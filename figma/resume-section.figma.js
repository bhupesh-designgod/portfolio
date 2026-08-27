/* Builds the Experience / Education section into Figma.
 *
 * File:   Portfolio-2026  (key x1rkZ1jDtnmfH55qFd0hBw)
 * Target: node 47:9 — "Slide 16:9 - 6", the empty 1920x1080 slide
 *
 * BLOCKED: the authenticated Figma account has a "View" seat, which is
 * read-only. Figma rejects createFrame with "Can't call createFrame in
 * read-only mode". Re-run this once the account has edit rights.
 *
 * Values mirror src/styles/global.css (.resume*) and src/data/*.json.
 * This file is not part of the Astro build — Astro only compiles src/ and public/.
 */

const createdNodeIds = [];

// ---- fonts ----
await figma.loadFontAsync({ family: 'Nunito', style: 'Regular' });
await figma.loadFontAsync({ family: 'Nunito', style: 'Bold' });
await figma.loadFontAsync({ family: 'Nunito', style: 'SemiBold' });

// ---- helpers ----
const hex = (h) => {
  const s = h.replace('#', '');
  return {
    r: parseInt(s.slice(0, 2), 16) / 255,
    g: parseInt(s.slice(2, 4), 16) / 255,
    b: parseInt(s.slice(4, 6), 16) / 255,
  };
};
const solid = (h) => [{ type: 'SOLID', color: hex(h) }];

// Same WCAG luminance check the ResumeList component uses
const monogramInk = (bg) => {
  const c = hex(bg);
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  const L = 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  return L > 0.45 ? '#111318' : '#ffffff';
};

const mkText = (chars, o) => {
  const t = figma.createText();
  t.fontName = { family: 'Nunito', style: o.style || 'Regular' };
  t.characters = chars;
  t.fontSize = o.size;
  t.fills = solid(o.color);
  if (o.ls !== undefined) t.letterSpacing = { unit: 'PIXELS', value: o.ls };
  if (o.lh !== undefined) t.lineHeight = { unit: 'PIXELS', value: o.lh };
  if (o.align) t.textAlignHorizontal = o.align;
  if (o.width) {
    t.textAutoResize = 'HEIGHT';
    t.resize(o.width, t.height);
  }
  return t;
};

// ---- column widths: CSS grid 1.15fr 1fr 1fr, gap 24, content 1120 ----
const GAP = 24;
const CONTENT = 1120;
const unit = (CONTENT - GAP * 2) / 3.15;
const W_ORG = Math.round(unit * 1.15);
const W_ROLE = Math.round(unit);
const W_DATE = CONTENT - GAP * 2 - W_ORG - W_ROLE;

const mkRow = (d) => {
  const row = figma.createFrame();
  row.name = d.org;
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisAlignItems = 'CENTER';
  row.itemSpacing = GAP;
  row.paddingTop = 17;
  row.paddingBottom = 17;
  row.fills = [];
  // border-bottom: 1px solid #ebedf2
  row.strokes = solid('#ebedf2');
  row.strokeAlign = 'INSIDE';
  row.strokeTopWeight = 0;
  row.strokeLeftWeight = 0;
  row.strokeRightWeight = 0;
  row.strokeBottomWeight = 1;

  // org cell: logo tile + name
  const org = figma.createFrame();
  org.name = 'org';
  org.layoutMode = 'HORIZONTAL';
  org.counterAxisAlignItems = 'CENTER';
  org.itemSpacing = 16;
  org.fills = [];
  org.resize(W_ORG, 38);

  const tile = figma.createFrame();
  tile.name = 'logo';
  tile.layoutMode = 'HORIZONTAL';
  tile.primaryAxisAlignItems = 'CENTER';
  tile.counterAxisAlignItems = 'CENTER';
  tile.cornerRadius = 9;
  tile.clipsContent = true;
  tile.fills = solid(d.logoBg);
  tile.resize(38, 38);
  const mono = mkText(d.org.charAt(0), {
    size: 18, style: 'Bold', color: monogramInk(d.logoBg), lh: 18,
  });
  tile.appendChild(mono);
  org.appendChild(tile);

  const name = mkText(d.org, {
    size: 20, style: 'Bold', color: '#111318', ls: -0.2, lh: 28,
  });
  org.appendChild(name);
  row.appendChild(org);
  org.layoutSizingHorizontal = 'FIXED';
  org.layoutSizingVertical = 'HUG';

  const role = mkText(d.role, { size: 17, color: '#6b7280', lh: 26, width: W_ROLE });
  row.appendChild(role);

  const dates = mkText(d.dates, {
    size: 17, color: '#6b7280', lh: 26, width: W_DATE, align: 'RIGHT',
  });
  row.appendChild(dates);

  return row;
};

const mkGroup = (heading, rows) => {
  const g = figma.createFrame();
  g.name = heading;
  g.layoutMode = 'VERTICAL';
  g.itemSpacing = 10;
  g.fills = [];

  const h = mkText(heading.toUpperCase(), {
    size: 15, color: '#a8adb8', ls: 2.5, lh: 22,
  });
  g.appendChild(h);

  const list = figma.createFrame();
  list.name = 'rows';
  list.layoutMode = 'VERTICAL';
  list.itemSpacing = 0;
  list.fills = [];
  rows.forEach((d) => {
    const r = mkRow(d);
    list.appendChild(r);
    r.layoutSizingHorizontal = 'FILL';
    r.layoutSizingVertical = 'HUG';
  });
  g.appendChild(list);
  list.layoutSizingHorizontal = 'FILL';
  list.layoutSizingVertical = 'HUG';

  return g;
};

// ---- data (mirrors src/data/*.json) ----
const EXPERIENCE = [
  { org: 'Ikarus 3D', role: 'Product Design Intern', dates: 'Sep 2023 - Jul 2024', logoBg: '#111318' },
];
const EDUCATION = [
  { org: 'UPES', role: 'M.Des Product Design', dates: 'Jul 2024 - Jul 2026', logoBg: '#0b4da2' },
  { org: 'Chitkara University', role: 'B.Des Design', dates: 'Jul 2020 - Jun 2024', logoBg: '#b4232a' },
];

// ---- section wrapper ----
const section = figma.createFrame();
section.name = 'Experience & Education';
section.layoutMode = 'VERTICAL';
section.itemSpacing = 68;
section.paddingLeft = 400;
section.paddingRight = 400;
section.paddingTop = 120;
section.paddingBottom = 140;
section.fills = solid('#ffffff');
section.resize(1920, 100);

const gExp = mkGroup('Experience', EXPERIENCE);
section.appendChild(gExp);
gExp.layoutSizingHorizontal = 'FILL';
gExp.layoutSizingVertical = 'HUG';

const gEdu = mkGroup('Education', EDUCATION);
section.appendChild(gEdu);
gEdu.layoutSizingHorizontal = 'FILL';
gEdu.layoutSizingVertical = 'HUG';

section.layoutSizingHorizontal = 'FIXED';
section.layoutSizingVertical = 'HUG';

// ---- place inside the empty slide ----
const slide = await figma.getNodeByIdAsync('47:9');
slide.appendChild(section);
section.x = 0;
section.y = Math.round((slide.height - section.height) / 2);

createdNodeIds.push(section.id, gExp.id, gEdu.id);

return {
  createdNodeIds,
  sectionId: section.id,
  sectionHeight: section.height,
  columnWidths: { org: W_ORG, role: W_ROLE, dates: W_DATE },
};
