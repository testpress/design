# Table — Referral Users Table Card

Preline card with search, filter dropdown, sortable columns, row actions dropdown, pagination.

**Design rule:** Do not add custom table styling that is not defined in this doc (e.g. row hover background). Always ask before adding any such design.

**Optional:** Add table tabs above the filter group only when the table needs to switch content by tab (e.g. All sessions / Running / Ended). Omit the tabs block when not needed. Use **gray variant** (no design tokens) so tabs work in any theme:

```html
<!-- Table tabs: gray variant (use when table content switches by tab) -->
<nav class="relative flex space-x-1 after:absolute after:bottom-0 after:inset-x-0 after:border-b-2 after:border-gray-200 dark:after:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active" id="hs-tab-item-1" aria-selected="true" data-hs-tab="#hs-tab-panel-1" aria-controls="hs-tab-panel-1" role="tab">All</button>
  <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-tab-item-2" aria-selected="false" data-hs-tab="#hs-tab-panel-2" aria-controls="hs-tab-panel-2" role="tab">Running</button>
  <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-tab-item-3" aria-selected="false" data-hs-tab="#hs-tab-panel-3" aria-controls="hs-tab-panel-3" role="tab">Ended</button>
</nav>
```

Tab panels: first panel has no `hidden` class; others use `class="hidden"` and `role="tabpanel"` with matching `id` and `aria-labelledby` pointing to the tab button id.

**Legacy (design tokens):** If using design tokens, tabs may use `flex gap-1`, `after:border-line-2`, `hs-tab-active:after:bg-foreground`, `text-muted-foreground-1`, etc. Prefer the gray variant above for consistency.

```html
<!-- Referral Users Table Card (with legacy tab style) -->
<div class="p-5 space-y-4 flex flex-col bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-2xs rounded-xl">
  <!-- Table tabs (optional: use gray variant from above instead) -->
  <nav class="flex gap-1 relative after:absolute after:bottom-0 after:inset-x-0 after:border-b after:border-gray-200 dark:after:border-neutral-700" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
    <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 active" id="hs-pro-tabs-dut-item-all" aria-selected="true" data-hs-tab="#hs-pro-tabs-dut-all" aria-controls="hs-pro-tabs-dut-all" role="tab">All</button>
    <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" id="hs-pro-tabs-dut-item-validaccounts" aria-selected="false" data-hs-tab="#hs-pro-tabs-dut-validaccounts" aria-controls="hs-pro-tabs-dut-validaccounts" role="tab">Valid accounts</button>
    <button type="button" class="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700" id="hs-pro-tabs-dut-item-fakeaccounts" aria-selected="false" data-hs-tab="#hs-pro-tabs-dut-fakeaccounts" aria-controls="hs-pro-tabs-dut-fakeaccounts" role="tab">Fake accounts</button>
  </nav>

  <!-- Filter Group -->
  <div class="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-5">
    <div>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
          <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input type="text" class="py-1.5 sm:py-2 ps-10 pe-8 block w-full min-w-75 bg-gray-100 dark:bg-neutral-700 border-transparent rounded-lg sm:text-sm text-gray-800 dark:text-neutral-200 placeholder:text-gray-500 dark:placeholder:text-neutral-400 focus:bg-white dark:focus:bg-neutral-800 focus:border-blue-700 dark:focus:border-blue-600 focus:ring-blue-700 dark:focus:ring-blue-600" placeholder="Search referral users" />
      </div>
    </div>
    <div class="flex flex-wrap md:justify-end items-center gap-2">
      <div class="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
        <button id="hs-pro-dupfind" type="button" class="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white shadow-2xs hover:bg-gray-50 dark:hover:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
          Filter
          <span class="font-medium text-[10px] py-0.5 px-[5px] bg-gray-900 dark:bg-white text-white dark:text-neutral-800 leading-3 rounded-full">5</span>
        </button>
        <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-44 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white dark:bg-neutral-900 border border-transparent rounded-xl shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-dupfind">
          <div class="p-1">
            <div class="flex items-center gap-x-3 py-1.5 px-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" id="hs-pro-dupfindch2" checked />
              <label for="hs-pro-dupfindch2" class="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-gray-800 dark:text-neutral-200">Name</label>
            </div>
            <div class="flex items-center gap-x-3 py-1.5 px-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" id="hs-pro-dupfindch3" checked />
              <label for="hs-pro-dupfindch3" class="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-gray-800 dark:text-neutral-200">Date</label>
            </div>
            <div class="flex items-center gap-x-3 py-1.5 px-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" id="hs-pro-dupfindch4" checked />
              <label for="hs-pro-dupfindch4" class="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-gray-800 dark:text-neutral-200">Status</label>
            </div>
            <div class="flex items-center gap-x-3 py-1.5 px-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" id="hs-pro-dupfindch5" checked />
              <label for="hs-pro-dupfindch5" class="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-gray-800 dark:text-neutral-200">Product</label>
            </div>
            <div class="flex items-center gap-x-3 py-1.5 px-2 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" id="hs-pro-dupfindch6" checked />
              <label for="hs-pro-dupfindch6" class="flex flex-1 items-center gap-x-3 cursor-pointer text-[13px] text-gray-800 dark:text-neutral-200">Amount</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
    <div class="min-w-full inline-block align-middle">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead>
          <tr class="border-t border-gray-200 dark:border-neutral-700">
            <th scope="col" class="px-3 py-2.5 text-start">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" />
            </th>
            <th scope="col" class="min-w-[270px]">
              <div class="hs-dropdown relative inline-flex w-full cursor-pointer">
                <button id="hs-pro-eptnms" type="button" class="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap whitespace-nowrap font-normal text-gray-500 dark:text-neutral-400 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false">Name <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></button>
                <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white dark:bg-neutral-900 border border-transparent rounded-xl shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-eptnms">
                  <div class="p-1">
                    <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800">Sort ascending</button>
                    <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800">Sort descending</button>
                  </div>
                </div>
              </div>
            </th>
            <th scope="col" class="min-w-36">
              <span class="px-5 py-2.5 block w-full text-start text-sm font-normal text-gray-500 dark:text-neutral-400 text-nowrap whitespace-nowrap">Date</span>
            </th>
            <th scope="col" class="min-w-42.5">
              <span class="px-5 py-2.5 block w-full text-start text-sm font-normal text-gray-500 dark:text-neutral-400 text-nowrap whitespace-nowrap">Status</span>
            </th>
            <th scope="col" class="min-w-75">
              <span class="px-5 py-2.5 block w-full text-start text-sm font-normal text-gray-500 dark:text-neutral-400 text-nowrap whitespace-nowrap">Product</span>
            </th>
            <th scope="col">
              <span class="px-5 py-2.5 block w-full text-start text-sm font-normal text-gray-500 dark:text-neutral-400 text-nowrap whitespace-nowrap">Amount</span>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
          <tr>
            <td class="size-px whitespace-nowrap px-3 py-4">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" />
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1">
              <div class="w-full flex items-center gap-x-3">
                <img class="shrink-0 size-[2.375rem] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3" alt="Avatar" />
                <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">Amanda Harvey</span>
              </div>
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1"><span class="text-sm text-gray-600 dark:text-neutral-300">29 Aug, 2023</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1">
              <span class="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 rounded-full">Pending</span>
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1"><span class="text-sm text-gray-600 dark:text-neutral-300">Mango Women's shoe</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1 text-end"><span class="text-sm text-gray-600 dark:text-neutral-300">$29.99</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1 text-end">
              <div class="flex justify-end items-center -space-x-px">
                <button type="button" class="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium first:rounded-s-lg last:rounded-e-lg bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-focus">
                  Reply
                </button>
                <div class="hs-dropdown relative inline-flex [--auto-close:inside] [--placement:top-right] first:rounded-s-lg last:rounded-e-lg bg-layer border border-layer-line shadow-2xs hover:bg-layer-hover">
                  <button id="hs-pro-errtmd1" type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-e-lg text-layer-foreground disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-hover" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-24 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-dropdown border border-dropdown-line rounded-xl shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-errtmd1" tabindex="-1">
                    <div class="p-1">
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Publish
                      </button>
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Unpublish
                      </button>
                      <div class="my-1 border-t border-dropdown-divider"></div>
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="size-px whitespace-nowrap px-3 py-4">
              <input type="checkbox" class="shrink-0 size-4 bg-transparent border-gray-300 dark:border-neutral-600 rounded-sm shadow-2xs text-blue-600 dark:text-blue-500" />
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1">
              <div class="w-full flex items-center gap-x-3">
                <span class="flex shrink-0 justify-center items-center size-[2.375rem] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-white text-xs font-medium uppercase rounded-full">Rd</span>
                <span class="text-sm font-medium text-gray-800 dark:text-neutral-200">Rachel Doe</span>
              </div>
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1"><span class="text-sm text-gray-600 dark:text-neutral-300">11 Aug, 2023</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1">
              <span class="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">Rejected</span>
            </td>
            <td class="size-px whitespace-nowrap px-4 py-1"><span class="text-sm text-gray-600 dark:text-neutral-300">Calvin Klein T-shirts</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1 text-end"><span class="text-sm text-gray-600 dark:text-neutral-300">$29.99</span></td>
            <td class="size-px whitespace-nowrap px-4 py-1 text-end">
              <div class="flex justify-end items-center -space-x-px">
                <button type="button" class="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium first:rounded-s-lg last:rounded-e-lg bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-focus">
                  Reply
                </button>
                <div class="hs-dropdown relative inline-flex [--auto-close:inside] [--placement:top-right] first:rounded-s-lg last:rounded-e-lg bg-layer border border-layer-line shadow-2xs hover:bg-layer-hover">
                  <button id="hs-pro-errtmd2" type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-e-lg text-layer-foreground disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-hover" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <div class="hs-dropdown-menu hs-dropdown-open:opacity-100 w-24 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-dropdown border border-dropdown-line rounded-xl shadow-xl" role="menu" aria-orientation="vertical" aria-labelledby="hs-pro-errtmd2" tabindex="-1">
                    <div class="p-1">
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Publish
                      </button>
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Unpublish
                      </button>
                      <div class="my-1 border-t border-dropdown-divider"></div>
                      <button type="button" class="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-dropdown-item-foreground hover:bg-dropdown-item-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-dropdown-item-focus">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="mt-5 flex flex-wrap justify-between items-center gap-2">
    <!-- Go to page -->
    <div class="relative inline-block">
      <input id="hs-pro-daemtt" type="text" class="py-1.5 sm:py-2 px-3 block w-16 border-gray-200 rounded-lg sm:text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600" placeholder="Go to">
    </div>

    <!-- Pagination -->
    <nav class="flex justify-end items-center gap-x-1" aria-label="Pagination">
      <button type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-neutral-700" aria-label="Previous">
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        <span class="sr-only">Previous</span>
      </button>
      <div class="flex items-center gap-x-1">
        <span class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-100 text-gray-800 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:text-white" aria-current="page">1</span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">of</span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">3</span>
      </div>
      <button type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-neutral-700" aria-label="Next">
        <span class="sr-only">Next</span>
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
      </button>
    </nav>
  </div>
</div>
```
