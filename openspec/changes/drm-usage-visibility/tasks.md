## 1. Create the DRM usage sidebar area

- [x] 1.1 Add a primary sidebar Usage item.
  - Add desktop and mobile sidebar navigation for `Usage`. Done when the sidebar points to the DRM Usage page and highlights for usage pages.

- [x] 1.2 Create the DRM Usage page under the new Usage area.
  - Add `src/tpstreams/usage/drm_usage.html` using the TPStreams sidebar layout. Done when users can review DRM usage from the Usage sidebar item.

## 2. Build the monthly usage experience

- [x] 2.1 Add month selection so users can inspect a reporting period.
  - Implement current-month default, `?month=YYYY-MM` URL sync, previous/next controls, and a month dropdown. Done when the selected month updates the daily values and URL.

- [x] 2.2 Show summary cards so users can quickly understand the selected month.
  - Add cards for total license requests, average per day, and highest usage day. Done when the cards update from the selected month’s daily counts.

- [x] 2.3 Add graph and table views so users can scan daily DRM usage.
  - Build a `Daily License Requests` card with graph/table toggle, a daily chart, and a table for date and license requests. Done when the table includes every day in the selected month.

- [x] 2.4 Add the no-usage state so empty months are clear.
  - Show a customer-facing empty state when the selected month has zero total license requests. Done when the graph/table content is replaced by the empty state for zero-usage mock data.

## 3. Verify the design

- [ ] 3.1 Verify the design page in the local design environment.
  - Run the available design build or dev server and check desktop/mobile layout. Done when the page renders without template errors and the controls do not overlap.
