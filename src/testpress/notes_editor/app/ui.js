// Tailwind class recipes for markup that is built from JS. Every token is written out in full so Tailwind's
// scanner finds it (it reads this file like any other source). The old semantic names (note-row, nav-row...) stay on
// the elements as plain hooks for scripts and tests; they carry no styles.
//
// Written to work on the current Tailwind 3.4 build and to behave the same on Tailwind 4: explicit border colours,
// no renamed utilities (shadow-sm, rounded, ring, outline-none) and arbitrary values where the scales differ.

export const ring = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
const ring1 = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600'

export const ui = {
  // ---- list ------------------------------------------------------------------------------------------------
  noteRow: `note-row block w-full rounded-lg px-2.5 py-[9px] mb-px text-start hover:bg-[#f1f3f5] dark:hover:bg-[#262626] max-lg:py-3 [&.is-active]:bg-primary-50 [&.is-active]:hover:bg-primary-50 [&.is-selected]:bg-primary-50 [&.is-selected]:hover:bg-primary-50 dark:[&.is-active]:bg-primary-500/[.15] dark:[&.is-active]:hover:bg-primary-500/[.15] [&_mark]:rounded-[2px] [&_mark]:bg-amber-200 [&_mark]:text-inherit ${ring}`,
  noteRowTop: 'note-row__top flex items-baseline gap-2',
  noteRowTitle: 'note-row__title min-w-0 flex-1 truncate text-[14px] font-semibold [&.is-derived]:font-medium',
  noteRowTime: 'note-row__time flex-none text-[12px] text-gray-400',
  noteRowSub: 'note-row__sub mt-px block truncate text-[13px] text-gray-500',
  noteRowSubChecked: 'note-row__sub mt-px block truncate ps-6 text-[13px] text-gray-500',
  noteRowCheck: 'note-row__check me-2 grid size-4 flex-none place-items-center self-center rounded-[5px] border-[1.5px] border-[#cbd0d6] text-[11px] leading-none text-white [&.is-on]:border-primary-600 [&.is-on]:bg-primary-600',
  rowWarn: 'row-warn inline-flex text-amber-600',
  listGroup: 'list-group px-2.5 pb-1 pt-3.5 text-[12px] font-medium text-gray-400',
  listGroupSort: 'list-group list-group--sort flex items-center justify-between px-2.5 pb-1 pt-3.5 text-[12px] font-medium text-gray-400',
  listSort: 'list-sort inline-flex items-center gap-[3px] rounded-[5px] px-1.5 py-px text-[12px] text-gray-400 hover:bg-[#eceff2] hover:text-gray-700 aria-expanded:bg-[#eceff2] aria-expanded:text-gray-700',
  listEmpty: 'list-empty px-4 py-7 text-center text-[14px]',
  listEmptyBtn: 'list-empty__btn mt-2.5 text-[13px] font-semibold text-primary-700 underline',
  rowDel: `row-del absolute right-3 z-[3] grid size-[26px] place-items-center rounded-md border border-gray-200 bg-white text-gray-500 shadow-[0_1px_2px_rgba(0,0,0,.06)] hover:border-red-200 hover:bg-red-50 hover:text-red-700 ${ring}`,
  statusDot: 'status-dot me-1.5 size-1.5 rounded-full bg-current group-data-[state=saving]/st:animate-[pulse_1s_ease-in-out_infinite] group-data-[state=still]/st:animate-[pulse_1s_ease-in-out_infinite] group-data-[state=idle]/st:bg-primary-600 motion-reduce:!animate-none',

  // ---- nav pane --------------------------------------------------------------------------------------------
  // an "All notes" / "All folders" row: one button
  navRowBtn: `nav-row group/nr relative flex h-[34px] w-full items-center gap-2.5 rounded-lg px-2.5 text-start text-[14px] text-gray-600 hover:bg-gray-100 [&.is-active]:bg-primary-50 [&.is-active]:font-semibold [&.is-active]:text-primary-700 [&.is-active]:hover:bg-primary-50 ${ring1}`,
  navRowMore: `nav-row nav-row--more group/nr relative flex h-[34px] w-full items-center gap-2.5 rounded-lg px-2.5 text-start text-[14px] text-gray-500 hover:bg-gray-100 hover:text-gray-900 ${ring1}`,
  // a folder row: wrapper (hover/active background) + main button + overlay actions
  navRowWrap: 'nav-row group/nr relative flex h-[34px] w-full items-center gap-2.5 rounded-lg text-start text-[14px] text-gray-600 hover:bg-gray-100 [&.is-active]:bg-primary-50 [&.is-active]:font-semibold [&.is-active]:text-primary-700 [&.is-active]:hover:bg-primary-50',
  navRowMain: `nav-row__main flex h-full min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 text-start ${ring1}`,
  navRowLabel: 'nav-row__label min-w-0 flex-1 truncate',
  navRowCount: 'nav-row__count text-[12px] font-normal text-gray-400 group-[.is-active]/nr:text-primary-700 group-[.is-active]/nr:opacity-80',
  navRowCountFolder: 'nav-row__count text-[12px] font-normal text-gray-400 group-hover/nr:invisible group-focus-within/nr:invisible group-[.is-active]/nr:text-primary-700 group-[.is-active]/nr:opacity-80',
  navRowChev: 'nav-row__chev size-3.5 text-gray-400',
  navPin: 'nav-pin size-4 text-primary-600',
  navActions: 'nav-actions pointer-events-none absolute right-1 top-1/2 inline-flex -translate-y-1/2 gap-0.5 rounded-e-lg bg-[linear-gradient(to_right,transparent,#f3f4f6_12px)] ps-4 opacity-0 group-hover/nr:pointer-events-auto group-hover/nr:opacity-100 group-focus-within/nr:pointer-events-auto group-focus-within/nr:opacity-100 group-[.is-active]/nr:bg-[linear-gradient(to_right,transparent,rgb(var(--color-primary-50))_12px)]',
  navActionBtn: `grid size-6 place-items-center rounded-[5px] text-gray-500 hover:bg-black/[.07] hover:text-gray-900 ${ring1}`,
  navEdit: 'nav-row-edit py-0.5',
  navRename: 'nav-rename h-[30px] w-full rounded-lg border border-primary-600 bg-white px-2 text-[14px] shadow-none outline-none ring-0 focus:border-primary-600 focus:shadow-none focus:outline-none focus:ring-0',
  navTag: `nav-tag rounded-md px-2 py-0.5 text-[13px] text-gray-500 hover:bg-gray-100 hover:text-gray-700 [&.is-on]:bg-primary-100 [&.is-on]:font-semibold [&.is-on]:text-primary-700 ${ring1}`,
  navTagMore: `nav-tag nav-tag--more rounded-md px-2 py-0.5 text-[13px] font-medium text-primary-700 hover:bg-gray-100 ${ring1}`,
  navEmpty: 'nav-empty px-2.5 py-1 text-[13px] text-gray-400',
  navMatch: 'nav-match flex basis-full items-center gap-2 whitespace-nowrap px-1.5 pt-2 text-[12px] text-gray-500',
  seg: 'seg inline-flex rounded-full border border-gray-200 bg-gray-100 p-0.5',
  segBtn: `rounded-full border-0 bg-transparent px-3 py-px text-[12px] font-medium text-gray-500 hover:text-gray-900 aria-pressed:bg-white aria-pressed:font-semibold aria-pressed:text-primary-700 aria-pressed:shadow-[inset_0_0_0_1px_rgb(var(--color-primary-600)),0_1px_2px_rgba(0,0,0,.06)] ${ring1}`,

  // ---- inline delete confirmation card (nav pane, folder/tag lists) ---------------------------------------
  confirm: 'lib-confirm my-[3px] rounded-[10px] border border-red-200 bg-red-50 px-3 pb-3 pt-2.5 dark:border-red-400/[.35] dark:bg-red-600/[.12]',
  confirmText: 'lib-confirm__text flex flex-col gap-0.5',
  confirmTitle: 'text-[13.5px] font-semibold text-red-900 [overflow-wrap:anywhere] dark:text-red-200',
  confirmNote: 'text-[12.5px] leading-[1.4] text-[#b45454] dark:text-red-300',
  confirmBtns: 'lib-confirm__btns mt-2.5 flex justify-end gap-2',
  confirmYes: `lib-yes h-[30px] rounded-lg bg-red-600 px-3.5 text-[13px] font-semibold leading-none text-white hover:bg-red-700 ${ring}`,
  confirmNo: `lib-no h-[30px] rounded-lg border border-gray-200 bg-white px-3.5 text-[13px] font-semibold leading-none text-gray-700 hover:bg-gray-50 dark:border-[#444] dark:bg-[#333] dark:text-gray-200 ${ring}`,
}
