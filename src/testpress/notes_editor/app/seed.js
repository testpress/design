import { buildDoc } from './doc-utils.js'

const H = 3600e3
const D = 24 * H

// Seed notes, newest first. updatedAt is relative to "now" so grouping looks right on any day.
export function seedNotes(now = Date.now()) {
  const n = (id, ago, folder, tags, title, blocks) => ({
    id,
    folder,
    tags,
    updatedAt: now - ago,
    doc: buildDoc(title, blocks),
  })
  return [
    n('n1', 4 * 60e3, 'Physics', ['revision', 'doubts'], "Electrostatics — Gauss's law and conductors", [
      ['p', "Gauss's law is just flux counting: total flux through a closed surface = q enclosed / ε₀. The trick is picking a surface where E is either constant or zero."],
      ['h2', 'Choosing the Gaussian surface'],
      ['ul', ['Point charge or sphere → concentric sphere', 'Infinite line charge → coaxial cylinder, E = λ / 2πε₀r', 'Infinite sheet → pillbox, E = σ / 2ε₀ (does not depend on distance)']],
      ['h2', 'Conductors in equilibrium'],
      ['ul', ['E = 0 everywhere inside the material', 'All excess charge sits on the outer surface', 'Just outside the surface: E = σ / ε₀ — twice the sheet value']],
      ['p', '==This is where I keep mixing up σ/ε₀ and σ/2ε₀.== Sheet: field on both sides. Conductor: field only outside.'],
      ['h2', 'Before Saturday'],
      ['task', [[true, 'DPP 3, Q1–Q12'], [false, 'Re-read NCERT 1.14–1.15'], [false, 'Ask Sir why a cavity inside a conductor stays field-free even when the outside charge moves']]],
    ]),
    n('n2', 3 * H, 'Planning', ['weekly'], 'Week 14 study plan', [
      ['p', 'Mon: finish Electrostatics DPP 3. Tue: Organic — named reactions revision. Wed: Mock Test 7.'],
      ['task', [[false, 'Mon — Electrostatics DPP 3'], [false, 'Tue — Named reactions'], [false, 'Wed — Mock Test 7 (3 hrs, no breaks)']]],
    ]),
    n('n3', 1 * D + 2 * H, 'Mock tests', ['mistakes'], 'Mock Test 6 — mistakes to fix', [
      ['p', 'Q12 sign error in work done. Q27: used the wrong limits in the integral. Q41: **read the question wrong** — it asked for the minimum.'],
      ['quote', 'Slow down on the first read. Underline what is being asked.'],
    ]),
    n('n4', 1 * D + 4 * H, 'Chemistry', ['ncert'], 'Named reactions to memorise', [
      ['p', 'Aldol, Cannizzaro, Reimer–Tiemann, Wolff–Kishner, Clemmensen, Sandmeyer, Gattermann.'],
      ['ol', ['Aldol — aldehydes/ketones with α-H, base catalysed', 'Cannizzaro — no α-H, concentrated base', 'Sandmeyer — diazonium + CuX']],
    ]),
    n('n5', 3 * D, 'Maths', ['revision'], 'Integration by parts — ILATE', [
      ['p', 'Pick u by ILATE order. Watch for cyclic integrals — solve for the integral algebraically.'],
      ['p', '`∫ u dv = uv − ∫ v du`'],
    ]),
    n('n6', 4 * D, 'Physics', ['formulae'], 'Rotational motion — key formulas', [
      ['ul', ['Ring: I = MR²', 'Disc: I = ½MR²', 'Solid sphere: I = ⅖MR²']],
    ]),
    n('n7', 6 * D, 'Biology', ['ncert'], 'Transport in plants — NCERT ch. 11', [
      ['p', 'Apoplast vs symplast. Root pressure explains guttation but not tall trees.'],
    ]),
    n('n8', 7 * D, 'Planning', ['weekly'], 'Things I keep forgetting', [
      ['p', 'Speed of sound ≈ 343 m/s at 20 °C. Avogadro: 6.022 × 10²³.'],
      ['hr'],
      ['p', 'Ask about the Kirchhoff sign convention again.'],
    ]),
    n('n9', 40 * D, 'Chemistry', ['revision'], 'Coordination compounds — naming', [
      ['p', 'Ligands alphabetically, then metal with oxidation state in Roman numerals.'],
    ]),
  ]
}
