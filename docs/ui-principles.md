# UI principles

Notes on the principles in *Refactoring UI* (Adam Wathan & Steve Schoger, [refactoringui.com](https://www.refactoringui.com/)), organised by the book's chapters and written for designing pages in this repo. Apply them to every page and to any component added to `ui-system`.

## 1. Starting from scratch

- **Start with a feature, not a layout.** Design the actual thing the user does on the screen (the form, the list, the decision) before the shell around it (navigation, sidebars, headers).
- **Detail comes later.** Settle structure and hierarchy first; fonts, shadows and icons come after the layout works.
- **Don't design too much.** Build the simplest version that works, then iterate. Don't design every edge feature up front.
- **Choose a personality.** Decide how the product should feel (calm and professional, friendly, dense and technical) and keep font, color, corner radius and wording consistent with it.
- **Limit your choices.** Pick from a fixed set of sizes, spacing values and colors instead of inventing a new value each time. A constrained system makes decisions faster and the result more consistent.

## 2. Hierarchy is everything

- **Not all elements are equal.** Decide what is primary, secondary and tertiary on every screen, and make the difference visible.
- **Size isn't everything.** Use font weight and color to show importance, not only font size. A slightly smaller but darker, bolder value can lead better than a big light one.
- **Don't use grey text on colored backgrounds.** Grey on color looks washed out. Use a lighter or darker shade of the background's own hue, or white with reduced opacity.
- **De-emphasize to emphasize.** When the main element doesn't stand out, make the elements competing with it quieter instead of making the main one louder.
- **Labels are a last resort.** If the format makes the meaning clear (an email, a date, "12 students"), drop the label. When a label is needed, make it secondary and the value primary.
- **Separate visual hierarchy from document hierarchy.** Use the HTML element that's semantically right (`h1`, `h2`), but style it by its visual importance. A page section title doesn't have to be huge.
- **Balance weight and contrast.** Heavy elements like icons and bold text draw more attention, so give them a softer color to balance them with lighter text nearby.
- **Semantics are secondary.** A button's emphasis should follow its importance, not its meaning. Not every destructive action needs a big red button: use a quieter style and confirm on the next step.

## 3. Layout and spacing

- **Start with too much white space.** Give elements generous room, then tighten until it feels right. Starting cramped and adding space rarely gets there.
- **Establish a spacing and sizing system.** Use a small, fixed scale (Tailwind's `1, 2, 3, 4, 6, 8, 12, 16` steps) instead of arbitrary values.
- **You don't have to fill the whole screen.** Give content the width it needs: a form in a narrow column (`max-w-xl` to `max-w-3xl`), not stretched across a wide screen.
- **Grids are overrated.** Fixed widths often work better than percentages: a sidebar or side panel at a fixed width, the main area flexible.
- **Relative sizing doesn't scale.** Don't scale everything proportionally between breakpoints. Large headings shrink more on mobile than body text does, and padding doesn't follow font size.
- **Avoid ambiguous spacing.** The space between groups must be clearly larger than the space inside a group, so it's obvious which label belongs to which field and which items belong together.

## 4. Designing text

- **Establish a type scale.** Use a handful of sizes (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`) and stick to them.
- **Use good fonts.** Use the product's font (Inter in most layouts). Don't introduce new fonts per page.
- **Keep your line length in check.** Paragraphs read best at roughly 45–75 characters per line (`max-w-prose`), even on a wide page.
- **Baseline, not center.** When different text sizes sit on one line, align them on their baseline (`items-baseline`), not their vertical center.
- **Line-height is proportional.** Small text and long lines need more line height; large headings need less (`leading-tight` on big titles).
- **Not every link needs a color.** In navigation and dense UI, links can be the normal text color with a hover state; reserve the primary color for links inside running text.
- **Align with readability in mind.** Left-align text. Center only short, standalone text (empty states, headings over centered content). Right-align numbers in tables so they line up.
- **Use letter-spacing effectively.** Tighten large headings slightly; add a little tracking to small uppercase labels so they stay readable.

## 5. Working with color

- **Ditch hex for HSL.** Think of color as hue, saturation and lightness, which makes it easier to build shades that belong together. In this repo, pick from the Tailwind palette and the `primary-*` scale instead of new hex values.
- **You need more colors than you think.** A real UI needs a full range of greys (8–10 shades), a primary color with its shades, and accent colors for success, warning and danger, each with shades.
- **Define your shades up front.** Choose shades from the defined palette (`50`–`900`); don't create one-off colors on a page.
- **Don't let lightness kill your saturation.** Very light and very dark shades can look dull; they often need a bit more saturation to keep their character.
- **Greys don't have to be grey.** Slightly warm or cool greys make the interface feel intentional. Stay within the grey family the product already uses (`gray-*` / `neutral-*`).
- **Accessible doesn't have to mean ugly.** Meet contrast requirements (WCAG AA) without heavy colors. For example, use dark text on a light tint instead of white text on a saturated color.
- **Don't rely on color alone.** Pair status colors with text or an icon, so color-blind users and grey-scale screenshots still get the meaning.

## 6. Creating depth

- **Emulate a light source.** Light comes from above: raised elements are slightly lighter on top and cast shadows below; inset elements (inputs, wells) are the reverse.
- **Use shadows to convey elevation.** Small shadows for slightly raised things (buttons, cards), larger ones for things floating above the page (dropdowns, popovers, modals). The bigger the shadow, the closer it feels.
- **Shadows can have two parts.** A larger soft shadow plus a small tight one directly underneath looks more natural than a single shadow (Tailwind's shadows already combine two).
- **Even flat designs can have depth.** A lighter or darker background, or a subtle border, can show layers without shadows.
- **Overlap elements to create layers.** Letting an element cross the edge of another (an avatar over a cover, a card over a header band) adds depth.

## 7. Working with images

- **Use good photos.** Placeholder or low-quality images make the whole design look worse; use realistic, good-quality mock images.
- **Text needs consistent contrast.** Text over images needs an overlay, a gradient or a solid background so it stays readable over any photo.
- **Everything has an intended size.** Icons and illustrations designed small look clumsy scaled up; put small icons inside a tinted shape instead of enlarging them.
- **Beware user-uploaded content.** Constrain user images to a fixed aspect ratio (`aspect-*`, `object-cover`) and handle missing or odd-shaped images so the layout never breaks.

## 8. Finishing touches

- **Supercharge the defaults.** Replace plain defaults with richer versions: bullets as icons, quotes as visual elements, plain checkboxes as styled ones.
- **Add color with accent borders.** A thin colored border on top of a card, beside an alert or under the active tab adds polish without much effort.
- **Decorate your backgrounds.** A subtle background color change, gradient or pattern can break up a long page; keep it low contrast.
- **Don't overlook empty states.** An empty screen is often the first thing a user sees. Explain what goes here and give the action to start; don't show empty tables and headers.
- **Use fewer borders.** Too many borders look cluttered. Separate elements with spacing, a background color difference or a shadow first.
- **Think outside the box.** A table doesn't have to be a plain grid, a dropdown can contain rich content, and radio buttons can be selectable cards. Pick the presentation that serves the content.

## 9. Leveling up

- Study interfaces you admire and ask why they work: the spacing, the hierarchy, the choices behind them.
- When something looks off, compare it against these principles to find out which one it breaks.
