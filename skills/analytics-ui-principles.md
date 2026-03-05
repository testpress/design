# Analytics UI Principles

**Mandatory principles, rules, and defaults** for designing Analytics user interfaces in this project. Ensures consistency, correctness, and trust across all analytics surfaces.

Analytics UIs must help users **understand change, diagnose causes, and take action** — not merely display data.

---

## 1. Core Principles

### 1.1 Analytics Are for Decisions

Every analytics view must answer at least one of:

* What changed?
* Why did it change?
* What should I do next?

If no decision is supported, the metric does not belong on the page.

### 1.2 Time Context Is Mandatory

Analytics without time context are incomplete.

**Rule:** If a metric has a delta or trend, it must have an explicit date range.

### 1.3 Rolling vs Calendar Integrity

User intent must never be overridden by calendar artifacts.

**Rule:** Rolling date ranges must be compared to rolling periods of the same length and granularity.

---

## 2. Date Range Rules

### 2.1 Date Filtering (Required)

All analytics views must:

* Support date filtering
* Display the active date range clearly
* **Apply the date range consistently across all metrics and charts** (e.g. when the user changes the date range, every chart and KPI must update to reflect that range)

### 2.2 Default Date Ranges

Do **not** default to "All Time".

Recommended defaults:

* Operational monitoring: Last 7–30 days
* Performance review: Last 30 or 90 days
* Strategic review: Last 12 months

"All Time" may be offered only as an explicit, secondary option.

### 2.3 When "All Time" Is Allowed

Allowed only for cumulative metrics:

* Lifetime revenue
* Total users
* Total events

Restrictions:

* Must be explicitly labeled
* Must not show deltas or trends
* Must not be the default view

---

## 3. Granularity Standards

### 3.1 Default Granularity by Date Range (Grouping)

| Date range selected | Grouping    |
| ------------------- | ----------- |
| **1–14 days**      | Daily       |
| **15–60 days**     | Weekly      |
| **> 60 days**      | **Monthly** |

All time-series charts and trend views must use this grouping. Primary comparison should match the same period length and granularity (e.g. previous 3 months when viewing last 3 months).

Granularity should reduce noise without hiding signal.

### 3.2 Granularity Controls

* Granularity toggles (daily / weekly / monthly) may be provided
* Defaults must follow the table above
* Granularity changes must be visible and labeled

---

## 4. Comparison Rules (Strict)

### 4.1 Primary Comparison Rules

* **Last 30 days** — Daily trend; compare to previous 30 days
* **Last 90 days** — Weekly trend; compare to previous 90 days
* **Last 12 months** — Monthly trend; compare year-over-year

### 4.2 Monthly Comparisons (Restrictions)

Monthly (MoM) comparisons:

* ❌ Must NOT be the primary comparison for rolling ranges (30 / 90 days)
* ✅ May appear only as secondary, clearly labeled context (e.g., run-rate)

---

## 5. Partial Period Handling

Partial periods must never be hidden.

Required behaviors:

* Visually differentiate partial days/weeks/months
* Label tooltips as "Partial" or "Month-to-date"
* Avoid comparing partial periods to full periods without disclosure

---

## 6. Metric Hierarchy

Every analytics page must define:

* **Primary (North Star) metrics** — outcomes
* **Supporting metrics** — drivers
* **Diagnostic metrics** — explanations

The primary metric must be visible **without scrolling**.

---

## 7. Visualization Rules

### 7.1 Chart Selection

* Line → trends over time
* Bar → comparisons
* Stacked bar → composition (limited categories)
* Table → precision and auditing

Avoid:

* Pie charts (>4 categories)
* Dual-axis charts (unless unavoidable)
* Decorative or 3D visuals

### 7.2 Context Requirements

Every chart must include at least one:

* Historical comparison
* Target or benchmark
* Threshold or goal line

Numbers without context are misleading.

---

## 8. Filters & Controls

Filter behavior must be:

* Predictable
* Reversible
* Clearly visible when active

Required filters (when applicable):

* Date range
* Segment / cohort
* Geography
* Product or category

**Implementation note:** Date range controls must be wired so that changing the range updates all dependent charts and metrics (single source of truth; one change propagates everywhere).

---

## 9. States & Edge Cases

All analytics views must explicitly design for:

* Loading states (skeletons preferred)
* Empty states (explain why data is missing)
* Error states (what failed, what to do next)
* Permission-limited views

Never show an empty or broken chart.

---

## 10. Trust & Transparency

To build data trust:

* Define metrics and formulas
* Show "Last updated" timestamps
* Maintain consistent units and formatting
* Surface data caveats when relevant

---

## 11. Accessibility & Readability

Analytics UIs must:

* Use color-blind-safe palettes
* Meet contrast requirements
* Avoid encoding meaning by color alone
* Support keyboard navigation

---

## 12. Validation Checklist (Pre-Ship)

Before shipping any analytics UI:

* Can a user understand the main insight in 5 seconds?
* Is the date range obvious?
* **Does changing the date range update all charts and metrics?**
* Are comparisons logically consistent?
* Are partial periods clearly labeled?
* Would this still work with 2× more metrics?

---

## Guiding Heuristic

> **Make the right insight obvious and the wrong interpretation hard.**
