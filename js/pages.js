// Decides which HTML templates in src/ are published as pages.
//
// Published: full pages, i.e. a template that
//   - extends a layout ({% extends %}), or
//   - is a whole HTML document (<html> or <!doctype>), or
//   - has front matter (title, tags, permalink, …).
// Not published:
//   - partials: anything else. Pages pull them in with {% include %}.
//   - layouts: templates that other templates extend and that are named
//     *base*/*layout* or sit in a layout/ or layouts/ folder.
//
// Skipped templates still work as includes and layouts; they just don't get
// their own URL.
const fs = require("fs");
const path = require("path");

const EXTENDS = /\{%-?\s*extends\s+["']([^"']+)["']/g;
const FULL_PAGE = /\{%-?\s*extends\b|<html[\s>]|<!doctype/i;
const LAYOUT_NAME = /(^|\/)layouts?\/|(base|layout)[^/]*\.html$/;

function htmlFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === "node_modules" || entry.name === "_includes") continue;
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) htmlFiles(file, out);
        else if (entry.name.endsWith(".html")) out.push(file);
    }
    return out;
}

// Layout files inside the input folder (src/_includes is never published)
function findLayouts(inputDir) {
    const layouts = new Set();
    for (const file of htmlFiles(inputDir)) {
        for (const [, target] of fs.readFileSync(file, "utf8").matchAll(EXTENDS)) {
            let resolved;
            if (target.startsWith(".")) resolved = path.join(path.dirname(file), target);
            else if (target.startsWith(inputDir + "/")) resolved = target;
            else continue;
            resolved = path.normalize(resolved);
            if (LAYOUT_NAME.test(resolved)) layouts.add(resolved);
        }
    }
    return layouts;
}

function isPage(inputPath, content, layouts) {
    const file = path.normalize(inputPath);
    if (layouts.has(file)) return false;
    if (FULL_PAGE.test(content)) return true;
    return fs.readFileSync(file, "utf8").startsWith("---");
}

module.exports = { findLayouts, isPage };
