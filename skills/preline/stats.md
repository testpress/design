# Stats

Preline + Tailwind stats grid. Card layout: icon, label, value, optional subtitle. Use for dashboards and summary sections.

**From course feedback page.** Add more stat variants below as needed.

```html
<!-- Stats Grid -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
  <!-- Card: Total Responses -->
  <div class="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
    <div class="sm:flex sm:gap-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-blue-400">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" />
      </svg>
      <div class="sm:order-1 grow space-y-1">
        <h2 class="sm:mb-3 text-sm text-gray-500 dark:text-neutral-400">Total Responses</h2>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">156</p>
      </div>
    </div>
    <div class="mt-1 flex items-center gap-x-2">
      <span class="text-sm leading-5 text-gray-500 dark:text-neutral-400">78% completion rate</span>
    </div>
  </div>


  <div class="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
    <div class="sm:flex sm:gap-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-yellow-400">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
      <div class="sm:order-1 grow space-y-1">
        <h2 class="sm:mb-3 text-sm text-gray-500 dark:text-neutral-400">Average Rating</h2>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">4.3</p>
      </div>
    </div>
    <div class="mt-1 flex items-center gap-x-2">
      <div class="flex gap-x-1">
        <svg class="shrink-0 size-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
        <svg class="shrink-0 size-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
        <svg class="shrink-0 size-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
        <svg class="shrink-0 size-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
        <svg class="shrink-0 size-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/></svg>
      </div>
    </div>
  </div>

  <!-- Card: Text Responses -->
  <div class="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
    <div class="sm:flex sm:gap-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-green-400"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/></svg>
      <div class="sm:order-1 grow space-y-1">
        <h2 class="sm:mb-3 text-sm text-gray-500 dark:text-neutral-400">Text Responses</h2>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">142</p>
      </div>
    </div>
    <div class="mt-1 flex items-center gap-x-2">
      <span class="text-sm leading-5 text-gray-500 dark:text-neutral-400">91% provided text</span>
    </div>
  </div>

  <!-- Card: Positive Feedback Rate -->
  <div class="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
    <div class="sm:flex sm:gap-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-purple-400"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>
      <div class="sm:order-1 grow space-y-1">
        <h2 class="sm:mb-3 text-sm text-gray-500 dark:text-neutral-400">Positive Feedback Rate</h2>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">83%</p>
      </div>
    </div>
    <div class="mt-1 flex items-center gap-x-2">
      <span class="text-sm leading-5 text-gray-500 dark:text-neutral-400">4-5 star ratings</span>
    </div>
  </div>
</div>
<!-- End Stats Grid -->
```

## Card pattern

- **Container:** `grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5`
- **Card:** `p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700`
- **Inside:** icon (colored, e.g. `text-blue-400`), label (plain or badge), value (`text-lg md:text-xl font-semibold`), optional subtitle (`text-sm text-gray-500`)

**Label options:** plain `h2` with `text-sm text-gray-500`, or **badge** (bar + text):

```html
<span class="flex items-center gap-x-1.5 py-px">
  <span class="w-1 h-3 bg-sky-500 rounded-full"></span>
  <span class="font-medium text-[13px] text-sky-800 dark:text-sky-400">Label</span>
</span>
```

Use `bg-{color}-500` for the bar and `text-{color}-800 dark:text-{color}-400` for the text. Icon colors: `text-blue-400`, `text-yellow-400`, `text-green-400`, `text-purple-400`.

---

## Colored stats (tinted card background)

Same layout as above but each card has a tinted background and matching icon/label color. Use for dashboards where you want stronger visual separation between metrics.

**Card:** `p-4 sm:p-5 bg-{color}-100 rounded-xl shadow-2xs dark:bg-{color}-500/20` (no border).  
**Label (badge):** bar `w-1 h-3 bg-{color}-500 rounded-full` + text `font-medium text-[13px] text-{color}-800 dark:text-{color}-400`.  
**Icon:** `size-6 text-{color}-500`.  
**Value:** keep `text-gray-800 dark:text-neutral-200`.  
**Subtitle:** keep `text-gray-500 dark:text-neutral-400`.  
**Layout:** use `space-y-3` in the grow div so badge and value are spaced.

Colors: `sky`, `amber`, `emerald`, `violet` (or `indigo`).

```html
<!-- Colored Stats Grid (with badge) -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
  <!-- Sky -->
  <div class="p-4 sm:p-5 bg-sky-100 rounded-xl shadow-2xs dark:bg-sky-500/20">
    <div class="sm:flex sm:gap-x-3">
      <svg class="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-sky-500" ...></svg>
      <div class="sm:order-1 grow space-y-3">
        <span class="flex items-center gap-x-1.5 py-px">
          <span class="w-1 h-3 bg-sky-500 rounded-full"></span>
          <span class="font-medium text-[13px] text-sky-800 dark:text-sky-400">Label</span>
        </span>
        <p class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">156</p>
      </div>
    </div>
    <div class="mt-1 flex items-center gap-x-2">
      <span class="text-sm leading-5 text-gray-500 dark:text-neutral-400">Subtitle</span>
    </div>
  </div>
  <!-- Amber, emerald, violet: same structure with bg-amber-500, bg-emerald-500, bg-violet-500 for bar and matching text-{color}-* -->
</div>
```

---

## Stats with hover card (link)

Clickable stat cards: hover/focus lift and shadow, with a “View reports” link. Use when each stat links to a detail page.

```html
<!-- Stats Grid (hover cards) -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
  <a class="group p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:shadow-lg focus:-translate-y-0.5 transition" href="#">
    <div class="flex gap-x-3">
      <div class="grow">
        <h2 class="text-xs text-gray-600 dark:text-neutral-300">Total hours (7D)</h2>
        <p class="text-xl font-semibold text-gray-800 dark:text-neutral-200">38h 9m</p>
      </div>
      <svg class="shrink-0 size-6 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.25V14"/><path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/></svg>
    </div>
    <span class="mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 dark:text-blue-500 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-600 group-focus:text-blue-700 dark:group-focus:text-blue-600">
      View reports
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </span>
  </a>

  <a class="group p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:shadow-lg focus:-translate-y-0.5 transition" href="#">
    <div class="flex gap-x-3">
      <div class="grow">
        <h2 class="text-xs text-gray-600 dark:text-neutral-300">Avg. daily hours</h2>
        <p class="text-xl font-semibold text-gray-800 dark:text-neutral-200">5h 32m</p>
      </div>
      <svg class="shrink-0 size-6 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
    </div>
    <span class="mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 dark:text-blue-500 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-600 group-focus:text-blue-700 dark:group-focus:text-blue-600">
      View reports
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </span>
  </a>

  <a class="group p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:shadow-lg focus:-translate-y-0.5 transition" href="#">
    <div class="flex gap-x-3">
      <div class="grow">
        <h2 class="text-xs text-gray-600 dark:text-neutral-300">Over limit</h2>
        <p class="text-xl font-semibold text-gray-800 dark:text-neutral-200">0s</p>
      </div>
      <svg class="shrink-0 size-6 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12A10 10 0 1 1 12 2"/><path d="M22 2 12 12"/><path d="M16 2h6v6"/></svg>
    </div>
    <span class="mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 dark:text-blue-500 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-600 group-focus:text-blue-700 dark:group-focus:text-blue-600">
      View reports
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </span>
  </a>

  <a class="group p-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:shadow-lg focus:-translate-y-0.5 transition" href="#">
    <div class="flex gap-x-3">
      <div class="grow">
        <h2 class="text-xs text-gray-600 dark:text-neutral-300">Under limit</h2>
        <p class="text-xl font-semibold text-gray-800 dark:text-neutral-200">1h 51m</p>
      </div>
      <svg class="shrink-0 size-6 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12a10 10 0 1 1 10 10"/><path d="m2 22 10-10"/><path d="M8 22H2v-6"/></svg>
    </div>
    <span class="mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 dark:text-blue-500 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-600 group-focus:text-blue-700 dark:group-focus:text-blue-600">
      View reports
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </span>
  </a>
</div>
<!-- End Stats Grid -->
```

**Hover card pattern:** Card is an `<a>` with `group`, `hover:shadow-lg hover:-translate-y-0.5`, `focus:shadow-lg focus:-translate-y-0.5`. Label `text-xs`, value `text-xl font-semibold`. Footer link uses `group-hover:` / `group-focus:` for blue emphasis. Icon neutral: `text-gray-500 dark:text-neutral-400`.
