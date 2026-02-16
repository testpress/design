# Page header

Page header with title, optional subtitle, and primary CTA (e.g. Upload, Create, Add new).

```html
<!-- Page header with primary CTA -->
<div class="flex flex-wrap justify-between items-center gap-2">
  <div>
    <h1 class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">Assets</h1>
    <p class="text-sm text-gray-500 dark:text-neutral-400">View and manage all uploaded assets.</p>
  </div>
  <div class="flex justify-end items-center gap-x-2">
    <a href="/flimix/asset/bulk_upload/" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-primary-500">
      Upload
    </a>
  </div>
</div>
```

**Pattern:** Wrapper `flex flex-wrap justify-between items-center gap-2`. Left: `h1` (e.g. `text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200`) + optional `p` subtitle (`text-sm text-gray-500 dark:text-neutral-400`). Right: primary CTA link/button — `py-2 px-3`, `rounded-lg`, `bg-primary-600 text-white hover:bg-primary-700`, `focus:ring-2 focus:ring-primary-500`. For Django/Eleventy, set `href` to the real URL or use your `previewPath`/base URL when needed.
