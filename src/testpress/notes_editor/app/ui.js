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

  // ---- the note itself (classes handed to TipTap) ---------------------------------------------------------
  // Container: base type + the elements that have no node/mark of their own to carry a class (headings, table wrapper).
  prose: [
    'note-prose group/prose caret-primary-600 text-[17px] leading-[1.65] text-gray-800 outline-none [word-break:break-word] selection:bg-primary-500/25 dark:text-gray-200',
    'group-data-[space=shared]/app:cursor-auto group-data-[space=shared]/app:caret-transparent',
    '[&>*+*]:mt-[.6em]',
    '[&_h1[data-title]]:m-0 [&_h1[data-title]]:mb-[.25em] [&_h1[data-title]]:text-[34px] [&_h1[data-title]]:font-bold [&_h1[data-title]]:leading-[1.2] [&_h1[data-title]]:tracking-[-.02em] [&_h1[data-title]]:text-gray-900 max-lg:[&_h1[data-title]]:text-[28px] dark:[&_h1[data-title]]:text-white',
    '[&_h1:not([data-title])]:mt-[1.2em] [&_h1:not([data-title])]:text-[27px] [&_h1:not([data-title])]:font-bold [&_h1:not([data-title])]:leading-[1.25] [&_h1:not([data-title])]:tracking-[-.015em]',
    '[&_h2]:mt-[1.3em] [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:leading-[1.3] [&_h2]:tracking-[-.01em]',
    '[&_h3]:mt-[1.1em] [&_h3]:text-[18px] [&_h3]:font-semibold [&_h3]:leading-[1.35]',
    "[&_.is-empty::before]:pointer-events-none [&_.is-empty::before]:float-left [&_.is-empty::before]:h-0 [&_.is-empty::before]:text-[#c0c5cc] [&_.is-empty::before]:content-[attr(data-placeholder)]",
    '[&_hr]:my-[1.4em] [&_li>p]:m-0 [&_td>p]:m-0 [&_th>p]:m-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit',
    '[&_.tableWrapper]:my-[.8em] [&_.tableWrapper]:cursor-default [&_.tableWrapper]:overflow-x-auto',
  ].join(' '),
  // node / mark classes
  bulletList: 'list-disc ps-[1.4em]',
  orderedList: 'list-decimal ps-[1.5em]',
  listItem: 'marker:text-gray-400 [&+li]:mt-[.2em]',
  taskList: 'list-none p-0',
  taskItem: 'flex items-start gap-2.5 [&+li]:mt-[.2em] [&>label]:m-0 [&>label]:flex [&>label]:h-[1.65em] [&>label]:flex-none [&>label]:select-none [&>label]:items-center [&>label_input]:m-0 [&>label_input]:size-[18px] [&>label_input]:flex-none [&>label_input]:cursor-pointer [&>label_input]:rounded-[5px] [&>label_input]:text-primary-600 [&>div]:min-w-0 [&>div]:flex-1 [&[data-checked=true]>div]:text-gray-400 [&[data-checked=true]>div]:line-through [&_ul[data-type=taskList]]:mt-[.2em]',
  blockquote: 'border-s-[3px] border-primary-600 ps-4 text-gray-600',
  hr: 'border-0 border-t border-gray-300 [&.ProseMirror-selectednode]:border-primary-600',
  codeInline: 'rounded-[5px] bg-gray-100 px-[.35em] py-[.1em] text-[.88em] font-medium [font-family:ui-monospace,SFMono-Regular,Menlo,monospace] dark:bg-[#2a2a2a]',
  codeBlock: 'overflow-x-auto rounded-[10px] bg-[#0f1729] px-4 py-3.5 text-[14px] leading-[1.55] text-gray-200',
  mark: 'rounded-[3px] bg-amber-100 px-[.1em] py-[.05em] text-inherit',
  link: 'cursor-text text-primary-700 underline underline-offset-2',
  callout: "relative rounded-[10px] border border-primary-100 bg-primary-50 py-2.5 pe-3.5 ps-11 before:absolute before:left-3.5 before:top-2.5 before:leading-[1.65] before:content-['💡'] [&>*+*]:mt-[.4em] dark:border-primary-500/25 dark:bg-primary-500/[.12]",
  toggle: "toggle flex items-start gap-1.5 [&>button]:grid [&>button]:h-7 [&>button]:w-6 [&>button]:flex-none [&>button]:place-items-center [&>button]:rounded-md [&>button]:text-gray-500 [&>button:hover]:bg-gray-100 [&>button::before]:content-['▸'] [&>button::before]:text-[15px] [&>button::before]:leading-none [&>button::before]:transition-transform [&.is-open>button::before]:rotate-90 [&>div]:min-w-0 [&>div]:flex-1",
  toggleSummary: 'block cursor-text list-none font-semibold [&::-webkit-details-marker]:hidden',
  toggleContent: 'mt-[.3em] ps-1 [&>*+*]:mt-2',
  table: 'w-full table-auto border-collapse text-[15px] leading-normal',
  tableCell: "relative min-w-28 cursor-text border border-gray-300 px-2.5 py-[7px] text-start align-top dark:border-[#3a3a3a] [&.selectedCell::after]:pointer-events-none [&.selectedCell::after]:absolute [&.selectedCell::after]:inset-0 [&.selectedCell::after]:bg-primary-500/[.18] [&.selectedCell::after]:content-['']",
  tableHeader: "relative min-w-28 cursor-text border border-gray-300 bg-gray-100 px-2.5 py-[7px] text-start align-top font-semibold dark:border-[#3a3a3a] dark:bg-[#2a2a2a] [&.selectedCell::after]:pointer-events-none [&.selectedCell::after]:absolute [&.selectedCell::after]:inset-0 [&.selectedCell::after]:bg-primary-500/[.18] [&.selectedCell::after]:content-['']",
  activeCell: 'is-active-cell outline outline-2 -outline-offset-2 outline-primary-600',

  // ---- note meta line (widget under the title) ------------------------------------------------------------
  meta: 'note-meta mb-[1.4em] flex min-h-6 select-none flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-[1.4] text-gray-400 [font-family:inherit]',
  metaEmpty: 'opacity-0 transition-opacity duration-150 hover:opacity-100 focus-within:opacity-100 group-focus-within/prose:opacity-100',
  metaShared: 'note-meta note-meta--shared mb-[1.4em] flex min-h-6 select-none flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-[1.4] text-gray-400 [font-family:inherit]',
  metaFrom: 'note-meta__from text-gray-500',
  metaRo: 'note-meta__ro inline-flex items-center gap-1 rounded-full bg-gray-100 py-px pe-2 ps-1.5 text-xs font-medium text-gray-500',
  metaChip: 'inline-flex cursor-pointer items-center gap-[5px] -ms-1.5 rounded-md px-1.5 py-0.5 hover:bg-gray-100 hover:text-gray-700 focus-visible:bg-gray-100 focus-visible:text-gray-700 focus-visible:outline-none',
  metaChipDim: 'inline-flex cursor-pointer items-center gap-[5px] -ms-1.5 rounded-md px-1.5 py-0.5 opacity-70 hover:bg-gray-100 hover:text-gray-700 focus-visible:bg-gray-100 focus-visible:text-gray-700 focus-visible:outline-none',
  metaDot: 'note-meta__dot text-[#c0c5cc]',
  metaTag: 'note-meta__tag group/tag inline-flex items-center gap-0.5 rounded-md bg-gray-100 py-px pe-1 ps-[7px] text-gray-600',
  metaTagX: 'size-4 cursor-pointer rounded-[4px] text-center text-sm leading-[14px] text-gray-400 opacity-0 hover:bg-gray-200 hover:text-gray-700 group-hover/tag:opacity-100 group-focus-within/tag:opacity-100',

  // ---- slash menu + preview --------------------------------------------------------------------------------
  slashMenu: 'slash-menu fixed z-[90] max-h-[min(18rem,50vh)] w-60 overflow-y-auto overscroll-contain rounded-[10px] border border-gray-200 bg-white p-1 shadow-[0_10px_30px_rgba(17,24,39,.14)] [scroll-padding-bottom:46px] [scroll-padding-top:34px] max-lg:w-[min(18rem,calc(100vw-16px))] dark:border-[#3a3a3a] dark:bg-[#262626]',
  slashItem: "slash-item group/si relative flex w-full items-center gap-2.5 rounded-md px-2 py-[7px] text-start text-[14px] text-gray-700 dark:text-gray-200 [&.is-active]:bg-primary-100 [&.is-active]:text-gray-900 dark:[&.is-active]:bg-primary-500/30 dark:[&.is-active]:text-white [&.is-active::before]:absolute [&.is-active::before]:bottom-2 [&.is-active::before]:left-[3px] [&.is-active::before]:top-2 [&.is-active::before]:w-[3px] [&.is-active::before]:rounded-[3px] [&.is-active::before]:bg-primary-600 [&.is-active::before]:content-['']",
  slashLabel: 'slash-item__label flex-1',
  slashHint: 'slash-item__hint text-[11px] font-medium leading-none text-gray-400 [font-family:ui-monospace,Menlo,monospace] group-[.is-active]/si:text-primary-700',
  slashGroup: 'slash-group px-2 pb-1 pt-2 text-[12px] font-medium text-gray-400 [&:not(:first-child)]:mt-1 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-[#f0f1f3] [&:not(:first-child)]:pt-2.5',
  slashEmpty: 'slash-empty p-2.5 text-[13px] text-gray-500',
  slashFoot: 'slash-foot sticky -bottom-1 -mx-1 -mb-1 mt-1 flex items-center justify-between rounded-b-[10px] border-t border-[#f0f1f3] bg-white px-3 py-2 text-[13px] text-gray-500 dark:border-[#3a3a3a] dark:bg-[#262626] [&_kbd]:text-[11px] [&_kbd]:font-medium [&_kbd]:leading-none [&_kbd]:text-gray-400 [&_kbd]:[font-family:ui-monospace,Menlo,monospace]',
  slashPreview: 'slash-preview pointer-events-none fixed z-[91] w-56 rounded-[10px] bg-gray-800 p-2 text-white shadow-[0_10px_30px_rgba(17,24,39,.22)] max-lg:!hidden',
  slashPreviewPage: 'slash-preview__page note-mini h-[6.5rem] overflow-hidden rounded-md bg-white px-3 py-2.5 text-[11px] leading-normal text-gray-700 [&>*+*]:mt-[.4em] [&_h1]:text-[17px] [&_h1]:font-bold [&_h1]:leading-[1.2] [&_h2]:text-[14px] [&_h2]:font-bold [&_h3]:text-[12px] [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:ps-[1.2em] [&_ol]:list-decimal [&_ol]:ps-[1.3em] [&_blockquote]:border-s-[3px] [&_blockquote]:border-primary-600 [&_blockquote]:ps-2 [&_blockquote]:text-gray-600 [&_pre]:rounded-md [&_pre]:bg-[#0f1729] [&_pre]:px-2.5 [&_pre]:py-2 [&_pre]:text-[11px] [&_pre]:text-gray-200 [&_hr]:my-[.8em] [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-gray-300',
  slashPreviewCap: 'slash-preview__cap px-1 pb-0.5 pt-2 text-[13px]',

  // ---- folder / tag popovers (meta line + filter bar) ------------------------------------------------------
  metaPop: 'meta-pop fixed z-[95] w-[17rem] max-w-[calc(100vw-16px)] rounded-xl border border-gray-200 bg-white p-2 shadow-[0_12px_32px_rgba(17,24,39,.16)] [&[hidden]]:hidden dark:border-[#3a3a3a] dark:bg-[#262626]',
  libPop: 'meta-pop lib-pop fixed z-[95] w-72 max-w-[calc(100vw-16px)] rounded-xl border border-gray-200 bg-white p-2 shadow-[0_12px_32px_rgba(17,24,39,.16)] [&[hidden]]:hidden dark:border-[#3a3a3a] dark:bg-[#262626]',
  libPopWide: 'meta-pop lib-pop fixed z-[95] w-[21rem] max-w-[calc(100vw-16px)] rounded-xl border border-gray-200 bg-white p-2 shadow-[0_12px_32px_rgba(17,24,39,.16)] [&[hidden]]:hidden dark:border-[#3a3a3a] dark:bg-[#262626]',
  popHead: 'meta-pop__head px-1 pb-1.5 pt-0.5 text-[11px] font-semibold uppercase tracking-[.06em] text-gray-400',
  popChips: 'meta-pop__chips flex flex-wrap gap-1 px-0.5 pb-1.5 text-[13px]',
  popInput: 'meta-pop__input h-[34px] w-full rounded-lg border border-gray-300 bg-white px-2.5 text-[14px] shadow-none outline-none focus:border-primary-600 focus:shadow-[0_0_0_3px_rgb(var(--color-primary-500)/.18)] focus:ring-0 dark:border-[#444] dark:bg-[#1f1f1f] dark:text-gray-100',
  popList: 'meta-pop__list mt-1.5 max-h-56 overflow-y-auto overscroll-contain [scroll-padding-bottom:8px]',
  popEmpty: 'meta-pop__empty px-2 py-2.5 text-[13px] text-gray-500',
  popFoot: 'meta-pop__foot mt-1.5 border-t border-[#f0f1f3] px-1 pt-1.5 text-[12px] text-gray-400 dark:border-[#3a3a3a]',
  metaOpt: 'meta-opt flex w-full items-center justify-between rounded-md px-2 py-[7px] text-start text-[14px] text-gray-700 hover:bg-primary-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-primary-500/30 dark:hover:text-white [&.is-active]:bg-primary-100 [&.is-active]:text-gray-900 dark:[&.is-active]:bg-primary-500/30 dark:[&.is-active]:text-white [&.is-create]:font-medium [&.is-create]:text-primary-700',
  libRow: 'meta-opt lib-row group/row relative box-border flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-2 py-0 text-start text-[14px] text-gray-700 hover:bg-primary-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-primary-500/30 dark:hover:text-white [&.is-active]:bg-primary-100 [&.is-active]:text-gray-900 dark:[&.is-active]:bg-primary-500/30 dark:[&.is-active]:text-white [&.is-create]:font-medium [&.is-create]:text-primary-700',
  libLead: 'lib-lead size-4 flex-none text-gray-500 group-[.is-active]/row:text-gray-700 group-[.is-create]/row:text-primary-700',
  libLeadPin: 'lib-lead lib-pin size-4 flex-none text-primary-600',
  libCheck: 'lib-check grid size-4 flex-none place-items-center rounded-[4px] border border-[#cbd0d6] text-[11px] text-white',
  libCheckOn: 'lib-check is-on grid size-4 flex-none place-items-center rounded-[4px] border border-primary-600 bg-primary-600 text-[11px] text-white',
  libLabel: 'lib-label min-w-0 flex-1 truncate',
  libCount: "lib-count text-[12px] text-gray-400 [.lib-row:hover:has(.lib-actions)_&]:invisible [.lib-row.is-active:has(.lib-actions)_&]:invisible",
  libTick: 'lib-tick size-4 [.lib-row:hover:has(.lib-actions)_&]:invisible [.lib-row.is-active:has(.lib-actions)_&]:invisible',
  libActions: 'lib-actions pointer-events-none absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 gap-0.5 rounded-r-md pl-[18px] opacity-0 [background:linear-gradient(to_right,transparent,rgb(var(--color-primary-100))_14px)] group-hover/row:pointer-events-auto group-hover/row:opacity-100 group-[.is-active]/row:pointer-events-auto group-[.is-active]/row:opacity-100 dark:[background:linear-gradient(to_right,transparent,#33473f_14px)]',
  libActionBtn: 'grid size-[26px] place-items-center rounded-[5px] text-gray-500 hover:bg-black/[.07] hover:text-gray-900',
  libRename: 'lib-rename h-7 w-full rounded-md border border-primary-600 bg-white px-2 text-[14px] shadow-none outline-none focus:border-primary-600 focus:shadow-none focus:ring-0 dark:bg-[#1f1f1f] dark:text-gray-100',
  libMatch: 'lib-match flex items-center gap-2 whitespace-nowrap px-1 pb-2 text-[12px] text-gray-500',

  // ---- table controls (grips, add strips, menu, drag ghost) ----------------------------------------------
  tblGrip: 'tbl-grip fixed z-[45] grid cursor-grab touch-none place-items-center rounded-md border border-gray-300 bg-white text-gray-400 hover:border-primary-600 hover:bg-primary-600 hover:text-white focus-visible:border-primary-600 focus-visible:bg-primary-600 focus-visible:text-white focus-visible:outline-none aria-expanded:border-primary-600 aria-expanded:bg-primary-600 aria-expanded:text-white [&.is-dragging]:cursor-grabbing [&.is-dragging]:border-primary-600 [&.is-dragging]:bg-primary-600 [&.is-dragging]:text-white [&[hidden]]:hidden max-lg:hidden',
  tblAdd: 'tbl-add pointer-events-none fixed z-[45] grid cursor-pointer place-items-center rounded-[4px] border border-[#eceef1] bg-gray-50 p-0 text-[#b4bac3] opacity-0 transition-opacity duration-100 hover:border-primary-600 hover:bg-primary-50 hover:text-primary-700 focus-visible:pointer-events-auto focus-visible:border-primary-600 focus-visible:bg-primary-50 focus-visible:text-primary-700 focus-visible:opacity-100 focus-visible:outline-none [&.is-near]:pointer-events-auto [&.is-near]:opacity-100 [&[hidden]]:hidden max-lg:hidden',
  tblMenu: 'tbl-menu fixed z-[92] min-w-[15rem] rounded-[10px] border border-gray-200 bg-white p-1 shadow-[0_10px_30px_rgba(17,24,39,.14)] [&[hidden]]:hidden max-lg:hidden dark:border-[#3a3a3a] dark:bg-[#262626]',
  tblItem: 'tbl-item flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-start text-[14px] text-gray-700 hover:bg-primary-50 focus-visible:bg-primary-50 focus-visible:outline-none dark:text-gray-200 dark:hover:bg-white/10 dark:focus-visible:bg-white/10',
  tblItemDanger: 'tbl-item is-danger flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-start text-[14px] text-red-700 hover:bg-primary-50 focus-visible:bg-primary-50 focus-visible:outline-none dark:text-red-400 dark:hover:bg-white/10 dark:focus-visible:bg-white/10',
  tblHint: 'tbl-item__hint ms-auto whitespace-nowrap rounded-[5px] border border-gray-200 bg-gray-100 px-[7px] py-[3px] text-[12px] font-semibold leading-none tracking-[.02em] text-gray-700 [font-family:ui-sans-serif,system-ui,sans-serif] dark:border-[#444] dark:bg-[#333] dark:text-gray-200',
  tblDrop: 'tbl-drop pointer-events-none fixed z-[46] rounded-[3px] bg-primary-600 shadow-[0_0_0_1px_#fff] [&[hidden]]:hidden',
  tblGhost: 'tbl-ghost pointer-events-none fixed z-[47] -rotate-[1.2deg] overflow-hidden rounded-[4px] border border-primary-600 bg-white opacity-[.88] shadow-[0_12px_28px_rgba(17,24,39,.22)]',
  tblGhostRow: 'tbl-ghost__row flex',
  tblGhostCell: 'tbl-ghost__cell box-border flex-none overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 bg-white px-2.5 py-[7px] text-[15px] leading-normal text-gray-800',
  tblGhostHead: 'tbl-ghost__cell is-head box-border flex-none overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 bg-gray-100 px-2.5 py-[7px] text-[15px] font-semibold leading-normal text-gray-800',
  dragBody: ['tbl-dragging', 'cursor-grabbing', 'select-none', '[&_*]:!cursor-grabbing', '[&_*]:!select-none'],

  // ---- desktop bubble menu ---------------------------------------------------------------------------------
  bmBar: 'bm-bar flex items-center gap-0.5',
  bmBtn: 'bm-btn inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md px-1.5 text-[13px] font-medium text-gray-300 hover:bg-white/10 hover:text-white focus-visible:bg-white/[.16] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white [&.is-on]:bg-white/[.16] [&.is-on]:text-white [&.is-open]:bg-white/[.16] [&.is-open]:text-white',
  bmBtnText: 'bm-btn bm-btn--text inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md px-2 text-[13px] font-medium text-gray-300 hover:bg-white/10 hover:text-white focus-visible:bg-white/[.16] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white [&.is-on]:bg-white/[.16] [&.is-on]:text-white [&.is-open]:bg-white/[.16] [&.is-open]:text-white',
  bmSep: 'bm-sep mx-[3px] h-[18px] w-px bg-white/[.18]',
  bmMenu: 'bm-pop bm-menu absolute left-0 top-[calc(100%+6px)] flex min-w-[11.5rem] flex-col rounded-[9px] bg-gray-900 p-0.5 shadow-[0_8px_24px_rgba(0,0,0,.28)]',
  bmLink: 'bm-pop bm-link absolute left-0 top-[calc(100%+6px)] flex items-center gap-2 rounded-[9px] bg-gray-900 py-0.5 pl-2 pr-1 shadow-[0_8px_24px_rgba(0,0,0,.28)]',
  bmItem: 'bm-item flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-start text-[14px] text-gray-200 hover:bg-white/10 focus-visible:bg-white/[.16] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white [&.is-on]:font-semibold [&.is-on]:text-white',
  bmInput: 'bm-input h-[30px] w-60 rounded-md border-0 bg-white/10 px-2 text-[14px] text-white shadow-none outline-none focus:bg-white/[.16] focus:shadow-none focus:ring-0',
  bmApply: 'bm-apply h-[30px] rounded-md bg-primary-600 px-2.5 text-[13px] font-semibold text-white focus-visible:bg-white/[.16] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white',
}
