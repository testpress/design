import { buildDoc } from './doc-utils.js'

// "Shared with Me": notes mentors have shared with the student. Strictly read-only, newest first.
// (Static prototype data: there is no backend, and no read/unread tracking by design.)
const DAY = 864e5

export function sharedNotes(now = Date.now()) {
  const e = (id, daysAgo, from, role, title, blocks) => ({
    id,
    title,
    from,
    role,
    sharedAt: now - daysAgo * DAY - 3 * 36e5,
    doc: buildDoc(title, blocks),
  })
  return [
    e('s1', 2, 'Ms. Rao', 'Mentor', 'Revision plan — Electrostatics', [
      ['p', "Here's how I'd use the next five days. Don't try to cover everything: **Gauss's law and conductors** carry most of the marks."],
      ['h2', 'Day by day'],
      ['task', [[false, 'Day 1 — flux and Gauss’s law, 10 numericals'], [false, 'Day 2 — conductors and cavities'], [false, 'Day 3 — potential and capacitors'], [false, 'Day 4 — DPP 3 under timed conditions'], [false, 'Day 5 — only the questions you got wrong']]],
      ['callout', 'If a question gives you symmetry, use Gauss’s law first. Reach for Coulomb’s law only when there is none.'],
    ]),
    e('s2', 5, 'Mr. Iyer', 'Physics mentor', 'Mock Test 6 — feedback', [
      ['p', 'Good attempt overall. Three patterns cost you marks:'],
      ['ol', ['Sign errors in work done — always draw the displacement and the force first.', 'Wrong limits when you change variables in an integral.', 'Misreading what is asked (Q41 wanted the **minimum**).']],
      ['quote', 'Slow down on the first read. Underline what is being asked.'],
      ['p', 'Redo Q12, Q27 and Q41 before Saturday and send me your working.'],
    ]),
    e('s3', 9, 'Dr. Menon', 'Chemistry mentor', 'Named reactions — cheat sheet', [
      ['p', 'Learn the reagent and the one thing each reaction is famous for. Everything else follows.'],
      ['table', [['Reaction', 'Reagent', 'Remember'], ['Aldol', 'Dilute NaOH', 'Needs α-hydrogen'], ['Cannizzaro', 'Conc. NaOH', 'No α-hydrogen'], ['Sandmeyer', 'CuCl / CuBr', 'Diazonium → aryl halide'], ['Clemmensen', 'Zn–Hg / HCl', 'C=O → CH₂ (acidic)']]],
      ['hr'],
      ['p', 'Wolff–Kishner does the same job in basic conditions. Pick by what else is on the molecule.'],
    ]),
    e('s4', 20, 'Ms. Rao', 'Mentor', 'How to review a mock test', [
      ['h2', 'The 20-minute review'],
      ['ul', ['Mark every question as **careless**, **concept** or **time**.', 'Fix the careless ones first — they are free marks.', 'Write one line for each concept gap and add it to your revision list.']],
      ['callout', 'A review you do the same day is worth three you do next week.'],
    ]),
  ]
}
