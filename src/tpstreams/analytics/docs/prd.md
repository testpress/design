
---

## Overview

* Adds a self-serve, **library-wide** **Video Analytics Dashboard** to TPStreams, complementing the existing per-video analytics on individual asset detail pages.
* Provides a single view showing **all videos** in the library with period-specific performance metrics (Total Views, Unique Viewers, Avg. Watch Time, Completion Rate, Storage Size).
* Allows users to answer all their key questions directly on-screen without contacting Support or exporting data.
* Includes summary views highlighting Top and Bottom performers at a glance.
* CSV export available as a secondary, optional action for users who need offline data manipulation.
* Eliminates the Client → Support → Engineering → Support → Client loop entirely.


---

## Problem Statement

* Per-video analytics exist only on each video's detail page — no cross-library view exists. Clients with large libraries cannot get a strategic overview without visiting each video individually.
* Clients are unable to run their own monthly workflows, including:
  * **Content Strategy:** Identifying which topics or individual videos are performing well or declining.
  * **Storage Optimization:** Finding videos with consistently low or zero views and calculating storage savings from archiving them.
* This capability represents a **regression** for clients migrating from platforms like Vimeo, where aggregated, library-wide asset-level analytics were available directly in the dashboard.
* The current manual process (Support ticket → Engineering script → emailed report) doesn't scale and creates dependency, delays, and potential for errors.
* **The underlying problem isn't the absence of a report—it's the absence of visibility.** Users shouldn't have to ask a human or download a file to see basic performance data about their own content.


---

## Objective

* Enable any authenticated user to access a single page that provides **complete, library-wide visibility** into video performance across any date range.
* The dashboard must answer all user questions directly on-screen, without requiring Support intervention or CSV export.
* **Scope of Completion (Definition of Done):** The dashboard must enable users to answer the following questions directly on the page:

### Content Strategy Questions

* Which videos/topics are performing well?
* Which individual videos are getting the most views?
* Which content is getting low or no engagement?
* How does video performance change month over month?
* Which content should we focus on creating more of?
* Which videos are my top performers?
* Which videos are my bottom performers?

  

### Storage & Cost Optimization Questions

* Which videos have consistently low or zero views over several months?
* Which videos are candidates for archiving or deletion?
* What's the storage cost impact of deleting a video?
* How much storage can I save by archiving unused videos?
* Which assets have not been viewed for several months?

### Workflow & Decision Support Questions

* What does my library-wide performance look like for a specific month or date range?
* How does this month compare to previous months?
* Can I generate/download this data myself without contacting Support?
* Can I export this data for use in my own reporting tools?


* **Outcome:** Support tickets for monthly view requests drop to zero; users regain the capability they had on previous platforms; content and storage decisions happen independently and instantly.


---

## User Stories

### Generate a Monthly Views Report

*As a user, I want to select a month and generate a video views report, so that I can see my library's performance without contacting Support.*

**Acceptance Criteria**

* User can pick a month/year via a preset selector.
* Table renders total views per video for that period, sorted by views descending, paginated.
* Table includes all videos — those with zero views display "0".
* CSV export can be triggered from the same screen.

### Export a Custom Date Range

*As a user, I want to export view data for a custom start/end date, so that I can evaluate a specific campaign or period.*

**Acceptance Criteria**

* Custom start and end date inputs are available alongside the monthly preset.
* Date range selector is capped at a maximum of 3 months.
* Export and table both respect the custom range.
* Export is synchronous and streams the CSV directly to the browser.

### Download a Completed Report

*As a user, I want to download my generated CSV immediately, so that I can use it in my own reporting tools.*

**Acceptance Criteria**

* Export runs synchronously via Django `StreamingHttpResponse`.
* CSV streams directly to the browser chunk-by-chunk as the database is queried.
* No background task (Celery) is used.
* No intermediate file is stored.
* CSV contains columns: Asset UUID, Asset Title, Total Views.
* Browser saves the file locally with a meaningful filename (e.g., `video_views_YYYY-MM-DD.csv`).


---

## User Stories

### View Library-Wide Performance

*As a user, I want to see a single page showing performance metrics for all my videos, so that I can understand my library's performance without opening each video individually.*

**Acceptance Criteria**

* Page loads with a default date range (current month).
* Table shows all videos with columns: Asset UUID, Title, Total Views, Unique Viewers, Avg. Watch Time, Completion Rate, Storage Size.
* Table is paginated for large libraries.
* Data is specific to the selected date range.

### Identify Top and Bottom Performers

*As a user, I want to quickly see which videos are performing best and worst, so that I can make informed content decisions.*

**Acceptance Criteria**

* Table can be sorted by any column (views, engagement metrics, storage size).
* Summary cards at the top show Top 5 and Bottom 5 performers based on Total Views.
* Sorting is intuitive and responsive.

### Analyze Performance Over Time

*As a user, I want to compare video performance across different periods, so that I can track trends and identify declining content.*

**Acceptance Criteria**

* Date range selector includes monthly presets (This Month, Last Month, Last 3 Months, etc.).
* Custom date range selection is available (capped at 3 months).
* Table updates automatically when date range changes.

### Identify Archiving Candidates

*As a user, I want to filter for videos with zero or low views, so that I can identify assets that may be candidates for archiving.*

**Acceptance Criteria**

* Quick filter for "Zero/Low-View" videos is available.
* Filter identifies videos with no views in the selected period.
* Videos with no views at all (all-time) are also surfaced.
* Last Viewed Date is visible to distinguish abandoned assets from newly uploaded ones.

### Calculate Storage Savings

*As a user, I want to see storage size alongside performance data, so that I can prioritize which videos to archive based on cost savings.*

**Acceptance Criteria**

* Storage Size (GB/MB) is displayed as a column in the table.
* Table can be sorted by Storage Size.
* Users can identify high-storage, low-performance videos easily.

### Export Data (Optional)

*As a user, I want to download the current view as CSV, so that I can use the data in my own reporting tools if needed.*

**Acceptance Criteria**

* Export button is available but not prominently emphasized.
* CSV contains all columns shown in the table.
* Export respects current filters and sorting.
* File is downloaded with a meaningful filename.

### Self-Service Access

*As a user, I want to access this dashboard without contacting Support, so that I can run my monthly workflows independently.*

**Acceptance Criteria**

* Dashboard is accessible to all authenticated users in the organization.
* No special permissions or roles required.
* No Support ticket needed to generate or view data.


---

## Use Cases

### View Library-Wide Performance Dashboard

**Actors:** Any authenticated user in an organization

**Preconditions:** User is logged in; organization has at least one video

**Main Flow**


1. User navigates to Analytics → Video Analytics.
2. Dashboard loads with default date range (current month).
3. Table displays all videos with performance metrics.
4. User can:
   * Sort by any column to identify top/bottom performers.
   * Change date range to view different periods.
   * Apply quick filters to isolate specific segments.
5. User gains immediate visibility into library performance without exporting or contacting Support.

**Alternate Flows**

* **No videos in library:** Dashboard displays empty state with clear message.
* **Zero views in range:** Videos with zero views display "0" in relevant columns.
* **Large library:** Table is paginated; performance remains responsive.


---

### Identify Archiving Candidates

**Actors:** Any authenticated user in an organization

**Preconditions:** User is logged in; organization has videos with low/no views

**Main Flow**


1. User navigates to Analytics → Video Analytics.
2. User selects date range (e.g., Last 3 Months).
3. User applies "Zero/Low-View" filter.
4. Table updates to show only videos with no views in the selected period.
5. User reviews Last Viewed Date and Storage Size columns.
6. User identifies high-storage, zero-view videos as archiving candidates.
7. User makes data-driven decision on which videos to archive.

**Alternate Flows**

* **No zero-view videos:** Filter returns empty state with message.
* **All videos have zero views:** Table shows all videos; user can still review and decide.


---

### Analyze Monthly Performance Trends

**Actors:** Any authenticated user in an organization

**Preconditions:** User is logged in; organization has videos with view data

**Main Flow**


1. User navigates to Analytics → Video Analytics.
2. User selects "This Month" from date presets.
3. User reviews Top 5 performers summary cards.
4. User sorts table by Total Views descending.
5. User changes date range to "Last Month" to compare.
6. User identifies videos with significant changes in performance.
7. User makes content strategy decisions based on trends.

**Alternate Flows**

* **Custom date range:** User selects specific start/end dates (capped at 3 months).
* **Invalid date range:** System shows validation error if range exceeds 3 months or includes future dates.


---

### Export Data for Offline Analysis

**Actors:** Any authenticated user in an organization

**Preconditions:** User is logged in; dashboard is displaying the desired view

**Main Flow**


1. User navigates to Analytics → Video Analytics.
2. User applies desired filters and date range.
3. User clicks Export button.
4. System streams CSV directly to browser.
5. Browser downloads file with meaningful filename.
6. User uses CSV in external reporting tools.

**Alternate Flows**

* **Export fails:** System shows error message; user can retry.
* **Large dataset:** Export streams progressively without timeout.


---

## Empathy Lens

### What the User Actually Feels

* "I shouldn't need to ask a human for data about my own content."
* "On Vimeo, I could see all my videos at once. Why can't I do that here?"
* "I have to do this every month—why can't I just click a button?"
* "I don't want a CSV—I want to see the answer immediately."

### The Real Need

* Users don't want a report—they want **visibility**.
* They want to make decisions, not request data.
* They want independence, not dependency.

### What Success Looks Like

* The moment a user opens the dashboard and sees their entire library's performance on one screen.
* The moment they sort by views and instantly see their top-performing video.
* The moment they apply the zero-view filter and identify their first archiving candidate—without exporting, without waiting, without asking.

### What Failure Would Feel Like

* The dashboard is slow or times out.
* The data doesn't match what they see on individual video pages.
* They still need to export a CSV to answer their questions.
* They still need to contact Support for anything.

### Why This Matters

The user's workflow is **monthly and recurring**. Every month they:


1. Need to see what performed well.
2. Need to decide what content to create next.
3. Need to identify what to archive.
4. Need to calculate storage savings.

They can't do any of this without data. Currently, they wait for us. With this dashboard, they can do it **immediately, on their own schedule, without interruption.**


---

To maintain your exact document structure and formatting without altering existing sections, here are the **3 specific additions/adjustments** to incorporate:


1. **Updated Screen Mockup**: Cleaned up the mockup to remove the obsolete Folder dropdown, selection checkboxes, and Archive/Delete sticky bar (since asset lifecycle management was removed from scope).
2. **Data & Payload Contracts added under API Requirements**: Added the explicit JSON Data Payload Contract and CSV Column Header format under API Requirements so front-end UI mockups and back-end implementation share the exact same key names.
3. **Comprehensive Edge Cases Table**: Expanded the **Edge Cases & Mitigations** table to include all 8 edge cases (including large tenant scale, cross-tenant isolation, connection drops, and concurrent exports) in your exact Markdown table format.

Here is your complete document with these updates seamlessly integrated:


---

## Functional Requirements (FRs)

### FR-1: Library-Wide Aggregated Performance Table

* **Single Unified View:** Render all library assets in a central table where each row represents one video asset (replacing the need to visit individual video detail pages).
* **Date Range Selector:**
  * Presets: *This Month* (default), *Last Month*, *Last 30 Days*, *Last 90 Days (3 Months)*, and *Custom Date Range*.
  * **Constraint:** Custom date ranges are capped at a **maximum of 3 months (90 days)** to ensure high-performance query execution and fast streaming.
* **Period-Scoped Metrics (Hit** `**AssetViewerLog**`**):**
  * `Total Views (Period)`: Count of session views within the selected date range.
  * `Unique Viewers (Period)`: Distinct count of `visitor_id`s in the period.
  * `Average Watch Time (Period)`: Mean view duration in seconds in the period.
  * `Completion Rate (Period)`: % of views reaching completion criteria within the period.
* **Column Sorting:** Allow ascending/descending sorting on all key metrics (`Total Views`, `Unique Viewers`, `Storage Size`, `Last Viewed Date`, `Completion Rate`).

### FR-2: Storage-Cost Optimization & Low/Zero-View Detection

* **Storage Size Display:** Surface total asset storage size (`Asset.bytes` formatted into MB/GB).
* **Last Viewed Recency:** Display `Last Viewed Date` (`MAX(created)` from `AssetViewerLog` across all time) and `Days Since Last View`.
* **Quick Filter Toggles:**
  * Zero Views in Selected Period
  * Unviewed in Last 90+ Days
  * Low Performers (< N views)

### FR-3: Content Strategy & At-a-Glance Insights

* **Top 5 & Bottom 5 Performer Summary Cards:** Render visual highlight cards above the main table showing the top 5 most-viewed and bottom 5 least-viewed videos in the selected date range.
* **Storage Cleanup Opportunity Card:** Displays total unviewed assets in the last 90+ days alongside total reclaimable storage (e.g., *"34 Assets with 0 views in > 90 days | Total Reclaimable Storage: 512 GB"*).
* **Month-over-Month Trend Indicator:** Display a directional trend badge next to period view counts comparing current period performance to an equal preceding period (e.g., `▲ +24% vs. previous month`).

### FR-4: Synchronous Streaming CSV Download

* **Instant Browser Download:** Clicking "Export CSV" immediately triggers a native browser file download using Django's `StreamingHttpResponse`. The backend streams chunk-by-chunk directly to the browser for the active filter state.


---

## Non-Functional Requirements (NFRs)

### NFR-1: Performance & Responsiveness

* **Synchronous Response Streaming:** CSV exports must stream data chunks immediately using Django's `StreamingHttpResponse` to keep the HTTP connection alive and prevent Gateway Timeouts (504).
* **Bounded Query Execution:** Enforce a maximum 3-month date range cap to ensure database aggregations complete rapidly.
* **Backend Pagination:** Server-side pagination (25, 50, 100 items per page) for table UI rendering.

### NFR-2: Data Security & Multi-Tenancy

* **Tenant Isolation:** Enforce strict organization scoping (`organization=current_tenant`) on all database queries and log aggregations.
* **Role-Based Access Control (RBAC):**
  * Viewers/All Users: View analytics table and stream CSV exports.

### NFR-3: Data Accuracy & Distinction

* **Period vs. Lifetime Separation:** Strict code separation so period analytics hit `AssetViewerLog` filtered by `created__date` and never pull lifetime stats from `Asset.views_count`.


---

## User Navigation & Screen Definitions

### Navigation Flow

```
[ Main Sidebar ] ──► [ Analytics ] ──► [ Library Video Analytics Page ]
                                                      │
                                    ┌─────────────────┴─────────────────┐
                                    ▼                                   ▼
                       (View On-Screen Table & Cards)          (Click "Export CSV" Button)
                        Renders directly in browser             Triggers instant file download
```

### Screen Mockup & Component Layout

```
+---------------------------------------------------------------------------------------------------------+
|  Analytics / Library Video Analytics                                                                    |
|                                                                                                         |
|  [ Date Range: This Month (Aug 1 - Aug 31) v ]    [ Search Assets...        ]                           |
|  [ Quick Filters: [x] Low/Zero View  [ ] Unviewed > 90 Days ]              [ Direct Download CSV ]    |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|  +-------------------------------------+   +-------------------------------------+                      |
|  | TOP PERFORMERS (Aug)                |   | STORAGE CLEANUP OPPORTUNITY         |                      |
|  | 1. Intro to React (1,240 views)     |   | 34 Assets with 0 views in > 90 days |                      |
|  | 2. Advanced Django (980 views)      |   | Total Reclaimable Storage: 512 GB   |                      |
|  +-------------------------------------+   +-------------------------------------+                      |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
| Asset Title             | Storage Size | Views (Period) | Trend   | Unique Viewers | Last Viewed        |
+---------------------------------------------------------------------------------------------------------+
| 01_Intro_Lecture.mp4    | 4.2 GB       | 0              |  --     | 0              | 120 days ago       |
| Module_2_DeepDive.mp4   | 12.8 GB      | 0              |  --     | 0              | Never              |
| React_Hooks_Final.mp4   | 1.1 GB       | 450            | ▲ +12%  | 380            | Yesterday          |
+---------------------------------------------------------------------------------------------------------+
| Pagination: < 1 2 3 4 5 >                                                            Items per page: [25] |
+---------------------------------------------------------------------------------------------------------+
```


---

## API Requirements

**2 Django views** will be created.

### View 1: `AggregatedVideoAnalyticsView` (Django Class-Based View)

* **HTTP Method:** `GET`
* **Query Parameters:** `start_date`, `end_date`, `search`, `zero_views_only` (bool), `unviewed_days` (int), `ordering`, `page`, `page_size`

### View 2: `AggregatedVideoAnalyticsExportView` (Django Streaming View)

* **HTTP Method:** `GET`
* **Query Parameters:** Same filter parameters as View 1 (`start_date`, `end_date`, `search`, `zero_views_only`, etc.)
* **Response Type:** `StreamingHttpResponse` (`text/csv`)


---

### Input Validation Rules

| Field / Parameter | Validation Rule | Default Fallback |
|:------------------|:----------------|:-----------------|
| `start_date` **&** `end_date` | Must be valid ISO dates (`YYYY-MM-DD`). `start_date` must be `<= end_date`. | Default to current month: `start_date = 1st of current month`, `end_date = today`. |
| **Date Range Duration** | `(end_date - start_date).days` **must not exceed 90 days (3 months)**. | Reject submission / cap range. |
| `end_date` **Future Cap** | `end_date` cannot be in the future (`> today`). | Auto-cap `end_date` to `today`. |
| `unviewed_days`   | Must be a non-negative integer (`>= 0`). | Default to `0` (ignored). |
| `page` **&** `page_size` | `page` must be an integer `>= 1`. `page_size` restricted to allowed choices `[25, 50, 100]`. | `page = 1`, `page_size = 25`. |
| `ordering`        | Must be one of allowed white-listed fields: `['period_views', '-period_views', 'bytes', '-bytes', 'last_viewed_at', '-last_viewed_at', 'title', '-title']`. | Default to `-period_views`. |


---

### Error Conditions & Handling

```
                                  [ User Request ]
                                         │
                        ┌────────────────┴────────────────┐
                        ▼                                 ▼
             [ Auth / Tenant Check ]             [ Date & Input Validation ]
                        │                                 │
           ┌────────────┴────────────┐       ┌────────────┴────────────┐
           ▼                         ▼       ▼                         ▼
   [ 401 Unauthorized ]      [ 403 Forbidden ] [ Form Error / 400 ] [ 200 OK / CSV Stream ]
```

#### 1. Authentication & Permission Errors

* **Condition: Unauthenticated User**
  * **Handling:** Enforce `LoginRequiredMixin`. Unauthenticated GET requests are redirected to login (HTTP 302).
* **Condition: Missing Organization / Tenant Access**
  * **Handling:** Enforce `PermissionRequiredMixin` and tenant scoping (`get_current_tenant()`). If the user does not belong to the organization, return **HTTP 403 Forbidden**.

#### 2. Date & Filter Input Validation Errors

* **Condition: Date Range Exceeds 90 Days**
  * **Dashboard UI View:** Display inline form validation error: *"Date range cannot exceed 90 days (3 months). Please select a narrower date range."*
  * **Export View:** Return **HTTP 400 Bad Request** with message: `{"error": "Date range cannot exceed 90 days"}`.
* **Condition: Inverted Date Range (**`**start_date > end_date**`**)**
  * **Handling:** Render form validation error: *"Start date cannot be after end date."* (Export View returns **HTTP 400 Bad Request**).
* **Condition: Invalid Date String (e.g.** `**start_date=invalid_string**`**)**
  * **Handling:** Catch `ValueError` on date parsing and fall back to the default current month preset while attaching a user warning message via `messages.warning()`.

#### 3. Data & Streaming Runtime Errors

* **Condition: Empty Dataset (0 Matching Assets)**
  * **Dashboard UI View:** Render empty table state component (*"No assets found matching the selected criteria"*).
  * **Export View:** Return HTTP 200 with CSV header row only (`Asset UUID, Title, Storage Size, Period Views, ...`) without raising an exception.
* **Condition: Client Disconnect During Streaming (**`**StreamingHttpResponse**`**)**
  * **Handling:** Catch `BrokenPipeError` / `ConnectionResetError` gracefully on backend generator iteration to log a warning and avoid polluting exception logs.


---

### Data Payload & CSV Contracts

#### Data Payload Structure (`GET` Data Context / Response)

```json
{
  "summary": {
    "total_period_views": 45200,
    "total_library_bytes": 536870912000,
    "formatted_total_library_size": "500 GB",
    "storage_cleanup_opportunity": {
      "reclaimable_unviewed_90d_count": 34,
      "reclaimable_unviewed_90d_bytes": 128849018880,
      "formatted_reclaimable_size": "120 GB"
    },
    "top_performers": [
      { "uuid": "ast_9a8b7c6d5e4", "title": "Intro to React Hooks", "period_views": 1240, "formatted_size": "1.2 GB" }
    ]
  },
  "pagination": { "count": 142, "page": 1, "page_size": 25, "total_pages": 6 },
  "results": [
    {
      "uuid": "ast_9a8b7c6d5e4",
      "title": "Intro to React Hooks",
      "bytes": 1288490188,
      "formatted_size": "1.2 GB",
      "period_views": 1240,
      "period_unique_viewers": 950,
      "period_avg_watch_time": 485,
      "period_completion_rate": 78.5,
      "trend_percentage": 24.5,
      "trend_direction": "up",
      "last_viewed_at": "2026-08-30T14:22:10Z",
      "days_since_last_view": 1,
      "created_at": "2026-01-15T08:00:00Z"
    }
  ]
}
```

#### CSV Stream Structure (Export View)

* **Headers:** `Asset UUID,Asset Title,Storage Size (Bytes),Formatted Storage Size,Period Views,Period Unique Viewers,Period Avg Watch Time (sec),Period Completion Rate (%),Last Viewed Date,Days Since Last View,Uploaded Date`
* **Sample Row:** `"ast_9a8b7c6d5e4","Intro to React Hooks",1288490188,"1.2 GB",1240,950,485,78.5,"2026-08-30 14:22:10",1,"2026-01-15 08:00:00"`


---

## Data & Entity Considerations

### Existing Model Capabilities

* **[Asset]**(`app/models/asset.py`):
  * `Asset.bytes` and `Asset.source_file_size_bytes` **already exist** to provide storage sizes.
* **[AssetViewerLog]**(`app/models/asset.py`):
  * Stores granular view events (`asset`, `visitor_id`, `duration`, `created`, `organization`).

### Performance Optimization (DB Indexing)

* Add a composite index on `AssetViewerLog(organization_id, created, asset_id)` via a lightweight Django migration to accelerate period-scoped `GROUP BY` aggregations.


---

## Edge Cases & Mitigations

| Edge Case | Risk | Mitigation |
|:----------|:-----|:-----------|
| **Date Range Exceeds 3 Months** | Synchronous query takes too long to stream. | Frontend enforces a max 90-day selection on date pickers; API validates and rejects date ranges > 90 days with `400 Bad Request`. |
| **Newly Uploaded Assets** | A video uploaded 2 days ago has 0 views and shows up in zero-view filters. | Display `Uploaded Date` alongside `Last Viewed Date`. Exclude assets uploaded in the last < 30 days from default cleanup filters. |
| **Assets Never Viewed** | `AssetViewerLog` has zero entries, causing `MAX(created)` to return `NULL`. | Explicitly handle `NULL` as `"Never Viewed"` and format gracefully as `"N/A"`. |
| **Timezone Boundaries** | Views near midnight recorded in UTC don't match the client's local month. | Convert `start_date` and `end_date` using Organization's configured timezone before querying. |
| **Large Tenant (Millions of Log Rows)** | Table loads slowly or memory spikes. | **Table UI:**Server-side paginated.<br>**Export:** CSV generation streams chunk-by-chunk using Django's `StreamingHttpResponse` iterator. |
| **Cross-Tenant Data Leakage** | Security risk of accessing another org's data. | **Strict Tenant Isolation:** Every query and export path filters by `organization=current_tenant`. No code path accepts an asset ID without verifying org ownership. |
| **Browser Closed Mid-Export** | Interrupts streaming CSV export connection. | **Zero Stale State:** Nothing is saved to S3/disk. Backend catches `BrokenPipeError` gracefully; user re-triggers export upon returning. |
| **Concurrent Export Requests** | Multiple export clicks by a user. | Each click opens an independent HTTP stream. Runs as a separate query stream without complex lock logic for MVP. |


---

## Success Metrics

### What Changes Upon Feature Rollout?

* **0 Support & Engineering Manual Tickets:** Self-service streaming export completely removes recurring monthly engineering query requests.
* **Immediate Download Experience:** Instant CSV stream without waiting for background queues or email notifications.
* **Actionable Storage Cleanup:** Clients can immediately identify zero-view videos over 90 days old, calculate storage savings, and execute cleanup directly.


---

## Tasks

### PR 1: UI Design (Mockup)

**Goal:** Create design mockup for Analytics → Video Library Analytics page.

**Tasks:**

- [ ] Design date-range selector component (monthly presets + custom range with 3-month cap).
- [ ] Design Executive Summary Cards at page top:
  * **Top Performers Card** (Top 5 videos by views in selected period).
  * **Storage Cleanup Opportunity Card** (Count of videos unviewed > 90 days & total reclaimable storage size).
- [ ] Design Quick Filter Toggle buttons (*Zero/Low Views*, *Unviewed > 90 Days*).
- [ ] Design paginated table showing columns:
  * `Asset Title` (with UUID tooltip/subtext)
  * `Storage Size` (formatted in MB/GB)
  * `Views (Period)` & `Trend Badge` (`▲ +X%`)
  * `Unique Viewers`
  * `Last Viewed Date` (with `Days Since Last View`)
- [ ] Design Export button ("Export CSV" primary action in page header).
- [ ] Design empty state (*No videos found matching criteria*).
- [ ] Design loading state for table refresh.
- [ ] Design error state (e.g., date range > 90 days validation error).
- [ ] Ensure mobile-responsive design.
- [ ] Get design reviewed and approved.

**Testing & Verification:**

- [ ] Mockup reviewed by stakeholders.
- [ ] Design follows TPStreams design system.
- [ ] All states (idle, loading, empty, error) are represented.


---

### PR 2: Backend — Database Index, Views & Export Logic

**Goal:** Implement database indexing, backend query logic, summary card calculations, and streaming CSV export.

**Tasks:**

- [ ] **Create Database Index Migration:**
  * Add composite index on `AssetViewerLog` for `(organization_id, created, asset_id)` to optimize date-range aggregation queries.
- [ ] **Create** `**VideoViewsReportView**` **(ListView / TemplateView):**
  * Query all `Asset` objects for current organization (`organization=current_tenant`).
  * Annotate period metrics from `AssetViewerLog`: `period_views`, `period_unique_viewers`, `period_avg_watch_time`.
  * Annotate recency stats: `last_viewed_at` (`MAX(created)`) and `days_since_last_view`.
  * Include all videos (zero-view videos show 0 views, unviewed show `last_viewed_at = None`).
  * Calculate Summary Card data: **Top 5 Performers** and **Storage Cleanup Opportunity** (assets with `last_viewed_at < 90 days` or `None`, and sum of `Asset.bytes`).
  * Apply pagination (25, 50, or 100 per page).
  * Support white-listed column sorting (`period_views`, `bytes`, `last_viewed_at`, `title`).
  * Apply Quick Filters (`zero_views_only`, `unviewed_days`).
  * Enforce strict tenant isolation on all query branches.
- [ ] **Create** `**VideoViewsExportView**` **(Streaming View):**
  * Accept same filter parameters (`start_date`, `end_date`, `search`, `zero_views_only`, `unviewed_days`).
  * Run the annotated asset query without pagination using `queryset.iterator()`.
  * Return `StreamingHttpResponse(content_type="text/csv")`.
  * Yield CSV headers: `Asset UUID, Asset Title, Storage Size (Bytes), Formatted Storage Size, Period Views, Period Unique Viewers, Period Avg Watch Time (sec), Period Completion Rate (%), Last Viewed Date, Days Since Last View, Uploaded Date`.
  * Format `last_viewed_at = None` as `"Never Viewed"` and `days_since_last_view = None` as `"N/A"`.
  * Set `Content-Disposition: attachment; filename="video_analytics_YYYY_MM_DD.csv"`.
  * Catch `BrokenPipeError` / `ConnectionResetError` gracefully for connection drops.
  * **No Celery — synchronous streaming only.**
- [ ] **Modify** `**urls.py**`**:**
  * Add route for `analytics/video-views/` → `VideoViewsReportView`.
  * Add route for `analytics/video-views/export/` → `VideoViewsExportView`.
- [ ] **Add validation logic:**
  * Enforce maximum date range of 3 months (90 days).
  * `start_date` ≤ `end_date`.
  * Auto-cap future `end_date` to `today`.
- [ ] **Add error handling:**
  * Return HTTP 400 for invalid date ranges with clear JSON / form error message.
  * Return HTTP 403 for unauthorized/cross-tenant requests.

**Testing & Verification:**

- [ ] Unit tests for `AssetViewerLog` period aggregation and recency (`MAX(created)`).
- [ ] Unit tests for summary card calculations (Top 5 & 90+ days reclaimable storage).
- [ ] Unit tests for tenant isolation (verify no cross-tenant data leakage).
- [ ] Unit tests for date range validation (3-month cap, future dates).
- [ ] Unit tests for zero-view and never-viewed assets.
- [ ] Unit tests for CSV output format and column headers.
- [ ] Test streaming behavior (`StreamingHttpResponse`).
- [ ] Integration test: export endpoint returns valid chunked CSV.
- [ ] Performance test: aggregation query over large log dataset executes rapidly with composite DB index.


---

### PR 3: UI Implementation (Django Templates & JS)

**Goal:** Implement approved design in Django templates, wired to backend views.

**Tasks:**

- [ ] **Modify sidebar navigation & tabs:**
  * Update navigation links in `sidebar_desktop.html` and `sidebar_mobile.html` to point to Video Library Analytics.
  * Update `desktop_tabs.html` and `tablet_tabs.html` to set active state correctly.
- [ ] **Create/Modify Template** `**video_views.html**`**:**
  * Implement date-range selector (monthly presets + custom date picker) with 3-month cap validation.
  * Render **Top Performers Card** and **Storage Cleanup Opportunity Card** at top of page.
  * Render Quick Filter toggle buttons (*Zero/Low Views*, *Unviewed > 90 Days*).
  * Implement table displaying `Asset Title`, `Storage Size`, `Views (Period)`, `Trend Badge`, `Unique Viewers`, `Last Viewed Date`.
  * Render "Never" for unviewed assets.
  * Implement "Export CSV" button calling the export route with active GET filter parameters.
  * Render pagination controls (25, 50, 100 per page choices).
  * Render loading state spinner during table updates.
  * Render empty state (*No videos found matching criteria*).
  * Render error alert when date range validation fails.
- [ ] **JavaScript Interactions:**
  * Date range change / filter toggle → trigger table update (via AJAX / GET query reload).
  * Frontend date validation: alert/prevent custom date selections > 90 days.
  * Export button click → trigger native browser CSV download.

**Testing & Verification:**

- [ ] Test navigation: sidebar → Analytics → Video Library Analytics loads correctly.
- [ ] Test date-range selector: presets and custom ranges work up to 90 days limit.
- [ ] Test summary cards: display correct top performers and reclaimable storage numbers.
- [ ] Test table rendering: displays storage size, period views, recency, and zero-view assets.
- [ ] Test CSV Export: downloads file with correct headers, filename, and filtered data.
- [ ] Test 3-month cap: UI blocks selection exceeding 90 days.
- [ ] Test loading, empty, and error states.
- [ ] Test mobile responsiveness across devices.
- [ ] End-to-end workflow test: page load → filter date range → view summary cards & table → stream CSV export.


---

## Timeline Predictor

| **Task** | **Owner** | **Estimated Duration** | **Dependencies** | **Notes** |
|------|-------|--------------------|--------------|-------|
| **Design UI Mockup** | Design team | 0\.5 days (4 hrs)  | None         | Can start in parallel with backend development. |
| **Backend DB Index, Views & Export Logic** | Engineering | 0\.5–0.75 days (4–5 hrs) | None         | Includes DB index migration, annotated ORM queries, summary cards logic, and streaming CSV. |
| **UI Implementation** | Engineering | 0\.5 days (4 hrs)  | Design finalized, Backend views ready | Integrates templates, summary cards, table filters, and JS interactions. |
| **Testing & Verification** | Engineering | 0\.25–0.5 days (2–3 hrs) | UI Implementation complete | Covers unit tests (tenant isolation, date validation), streaming CSV verification, and performance tests. |

## Roll-up Summary

**Total engineering hours:** \~10 hours

**Approximate delivery time:** 3-4 calendar days (assuming 8-hour workdays, parallel work possible, with delays)

**Opportunities for Parallelization:**

* UI Design and Backend Query/Index work can execute simultaneously.
* Frontend Django template implementation begins as soon as the design mockup and backend view contracts are ready.

**Total across all teams:** \~2–3 days end-to-end with parallelization (4 days maximum accounting for testing, code review, and QA).