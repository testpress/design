// Screenshot a prototype page in desktop, mobile and dark mode for design review.
// Usage: node .claude/skills/design/scripts/screenshot.mjs /<product>/<feature>/<page>/ [--base http://localhost:8080] [--slices 4]
// Needs the dev server running (`npm start`). Writes one PNG per screen-height slice to .design-screenshots/ and prints their paths
// plus any console errors on the page.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const pagePath = args.find((a) => a.startsWith("/"));
const baseIndex = args.indexOf("--base");
const base = baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:8080";
const slicesIndex = args.indexOf("--slices");
const maxSlices = slicesIndex >= 0 ? Number(args[slicesIndex + 1]) : 4;

if (!pagePath) {
  console.error("Usage: screenshot.mjs /<product>/<feature>/<page>/ [--base http://localhost:8080]");
  process.exit(1);
}

const outDir = resolve(".design-screenshots");
mkdirSync(outDir, { recursive: true });
const slug = pagePath.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "index";

const shots = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, dark: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, dark: false, mobile: true },
  { name: "desktop-dark", viewport: { width: 1440, height: 900 }, dark: true },
];

const browser = await chromium.launch();
let failed = false;

for (const shot of shots) {
  const context = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: 1,
    isMobile: Boolean(shot.mobile),
    hasTouch: Boolean(shot.mobile),
    colorScheme: shot.dark ? "dark" : "light",
  });
  // Dark mode in this repo is the `dark` class on <html>, persisted by Preline as `hs_theme`.
  await context.addInitScript((dark) => {
    try {
      localStorage.setItem("hs_theme", dark ? "dark" : "light");
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {}
  }, shot.dark);

  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(err.message));

  const response = await page.goto(base + pagePath, { waitUntil: "networkidle" }).catch((e) => {
    errors.push(e.message);
    return null;
  });
  if (!response || !response.ok()) {
    console.error(`✗ ${shot.name}: could not load ${base + pagePath} (${response ? response.status() : "no response"})`);
    failed = true;
    await context.close();
    continue;
  }

  await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), shot.dark);
  await page.waitForTimeout(400);

  // One image per screen-height slice: a single full-page image of a long page shrinks until unreadable.
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const { width, height } = shot.viewport;
  const total = Math.ceil(pageHeight / height);
  const count = Math.min(total, maxSlices);
  for (let i = 0; i < count; i++) {
    const file = resolve(outDir, `${slug}--${shot.name}-${i + 1}.png`);
    const clipHeight = Math.min(height, pageHeight - i * height);
    await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y: i * height, width, height: clipHeight } });
    console.log(`✓ ${shot.name} ${i + 1}/${total}: ${file}`);
  }
  if (total > count) console.log(`  … ${total - count} more screens not captured (pass --slices ${total} for all)`);
  for (const error of errors) console.log(`  console error: ${error}`);
  await context.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
