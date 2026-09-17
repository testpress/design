## Primary Purpose

The Video Analytics Overview gives users a high-level understanding of how their **entire video library is performing** within a selected period.

It should help users quickly move from overall performance to the most important content, audience, and storage insights without having to open videos individually or request a report from TPStreams Support.

The screen should answer:

* How is my video library performing?
* Is performance improving or declining?
* Which content is performing well or poorly?
* Who is watching and where are they watching from?
* Which devices are being used?
* Are there unused videos consuming storage?

The PDR describes this as an ongoing workflow: review viewer data → identify high performers → plan content → identify low/no-view assets → reduce storage cost.

**while minimizing friction between**

**understanding library performance → identifying meaningful insights → deciding what to do next**


---

# Core User Intent

A user visiting this screen may want to:

* Understand overall video performance for a specific month or date range.
* See how performance has changed compared with a previous period.
* Quickly identify top-performing and underperforming content.
* Understand the overall audience through location/region and device usage.
* Identify videos that have little or no recent usage and may represent storage-cleanup opportunities.
* Move from an overall insight into detailed video-level analysis when necessary.

The screen should support both the **monthly content-strategy workflow** and the **storage-optimization workflow** identified in the PDR.


---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A raw data report.
* A copy of the existing per-video Analytics page at a larger scale.
* A dashboard filled with every metric TPStreams can collect.
* A screen where users must export CSV to understand what is happening.

It SHOULD feel like:

* A **health check for the entire video library**.
* A clear progression from **overall performance → insights → deeper analysis**.
* A self-service analytics experience that helps users make decisions independently.

The experience should prioritize:

* **Immediate understanding**
* **Important changes and trends**
* **Content performance**
* **Audience understanding**
* **Storage awareness**
* **Progressive exploration**
* **Context over raw numbers**

The underlying problem is not simply the absence of a downloadable report; it is the absence of library-wide visibility.


---

# 2. Primary Layout Expectations

When users enter the screen, they should immediately understand **what period they are looking at and how their library is performing**.

The date range should therefore be prominent and treated as the primary reporting context.

The page should then move from high-level information to increasingly detailed insights.

The most important action is **understanding the analytics**, not exporting them.

The PRD defines This Month as the default and supports Last Month, Last 30 Days, Last 90 Days, and Custom Date Range, with custom ranges capped at 90 days.

## Suggested High-Level Layout

**Page Header**

* Video Analytics
* Date Range
* Export

**Library Performance**

* Key performance metrics
* Period comparison
* Performance trend

**Content Performance**

* Top Performers
* Bottom Performers

**Audience Insights**

* Regions / Locations
* Devices

**Storage Insights**

* Storage Cleanup Opportunity

**Detailed Analysis**

* Path to All Videos / asset-level analysis


---

# 3. Library Performance Overview

This is the most important section.

Users should instantly understand:

> **“How is my entire video library performing during this period?”**

## Expected Information

The overview should communicate the most important period-based library metrics:

* Total Views
* Unique Viewers
* Average Watch Time
* Completion Rate
* Period-over-period change

These metrics are explicitly identified in the PRD as library-wide period metrics.

## UX Expectations

* The selected period must be obvious.
* Users should understand that the metrics represent the **selected period**, not lifetime totals.
* Changes should be contextualized rather than shown as isolated numbers.
* Comparison should use an equal preceding period.
* The overview should help users understand the direction of performance before they investigate individual videos.
* Changing the date range should naturally update the period-dependent insights.

The PRD explicitly requires a directional trend indicator against an equal preceding period.


---

# 4. Performance Over Time

### Purpose

Show how the library's performance changes throughout the selected period.

A single total number cannot tell users whether performance is growing, declining, or fluctuating.

## Expected Information

* Views over time.
* Appropriate time-based aggregation for the selected range.
* Selected reporting period.
* Previous-period comparison where appropriate.

## Expected Behavior

* Changing the date range updates the trend.
* Shorter periods can provide more granular time information.
* Longer periods should remain readable and meaningful.
* The trend should help users recognize significant changes rather than forcing them to interpret raw data points.

## Expected Feeling

**“I can see what is happening with my library over time.”**


---

# 5. Content Performance

### Purpose

Help users understand **which content is driving library performance**.

This section connects the high-level overview to actual videos.

## Expected Information

### Top Performers

* Top 5 most-viewed videos.
* Views during the selected period.
* Clear ranking.

### Bottom Performers

* Bottom 5 least-viewed videos.
* Views during the selected period.
* Clear ranking.

The PRD explicitly requires Top 5 and Bottom 5 performer summaries based on Total Views for the selected period.

## UX Expectations

* Rankings should update with the selected reporting period.
* Users should immediately understand why a video appears in the list.
* The section should encourage users to investigate content rather than overwhelm them with a full asset list.
* Zero-view content should remain understandable as a legitimate result.

## Expected Feeling

**“I immediately know what content is working and what content needs attention.”**

This directly supports the content-strategy workflow described in the PDR.


---

# 6. Audience Insights

### Purpose

Give customers a **library-wide understanding of their audience**, extending useful dimensions already available in TPStreams's per-video Analytics.

This is a **proposed aggregate-level UX direction**, not an explicitly defined MVP requirement in the PRD.

## Expected Information

### Regions / Locations

Potentially show:

* Top viewing regions/countries.
* Relative share of views or viewers.
* Ability to recognize the major geographic audiences.

### Devices

Potentially show:

* Mobile
* Desktop
* TV
* Other relevant device categories available in TPStreams.

## UX Expectations

* Audience insights should remain high-level.
* They should answer **“Who/where/how are people consuming my content?”**, not become a separate analytics report.
* Only meaningful dimensions should be surfaced.
* The section should not compete with the primary content-performance insights.
* If aggregate location/device data is not available or reliable for all tenants, the experience should gracefully omit or communicate unavailable insights.

## Expected Feeling

**“I understand where my audience is coming from and how they consume my content.”**

### Product Decision

Before implementation, validate whether aggregate **Region/Location and Device** data is available and sufficiently reliable across TPStreams tenants.

The PRD does not currently define these as library-wide metrics, so they should remain a **validated product opportunity rather than an assumed requirement**.


---

# 7. Storage & Cleanup Insights

### Purpose

Help users connect **content usage with storage consumption**.

This is one of the key differentiators of TPStreams's use case.

## Expected Information

* Number of assets unviewed for 90+ days.
* Total potentially reclaimable storage.
* Clear indication that this is a cleanup opportunity.

The PRD explicitly requires the Storage Cleanup Opportunity card.

## UX Expectations

The insight should help users answer:

> **“How much storage might I be using for content that is no longer being watched?”**

It should also help distinguish:

* Never-viewed assets.
* Previously viewed but inactive assets.
* Newly uploaded assets that have not had enough time to accumulate views.

The PRD specifically calls for Uploaded Date alongside Last Viewed Date and exclusion of recently uploaded assets from default cleanup filtering.

The cleanup insight should **not imply that every unviewed asset should automatically be deleted**. It should provide evidence for the user's decision.

## Expected Feeling

**“I can identify potential storage waste without manually checking every video.”**


---

# 8. State Expectations

## Normal / Data Available

**Purpose:** Provide the complete library overview.

**Expected Information:**

* Selected period.
* Library performance.
* Trend.
* Content insights.
* Audience insights where available.
* Storage insight.

**Primary Action:** Explore the insights or change the reporting period.

**Expected Feeling:** Immediately useful and understandable.


---

## Loading

**Purpose:** Communicate that analytics are being calculated or refreshed.

**Expected Information:**

* Preserve page context.
* Clearly indicate that updated information is loading.

**Primary Action:** Wait.

**Expected Feeling:** Predictable rather than broken.

The PRD explicitly requires a loading state during table/analytics refresh.


---

## Empty Library

**Purpose:** Handle organizations without video assets.

**Expected Information:**

* Clear explanation that there is currently no video data to analyze.

**Primary Action:** Guide the user toward adding video content where appropriate.

**Expected Feeling:** Helpful rather than broken.


---

## No Activity in Selected Period

**Purpose:** Handle an organization that has videos but no views during the selected period.

**Expected Information:**

* Videos exist.
* No viewing activity was recorded during the selected period.

**Primary Action:** Change the date range or explore the video library.

**Expected Feeling:** Informative, not erroneous.


---

## No Audience Data

**Purpose:** Handle cases where aggregate location/device information is unavailable.

**Expected Information:**

* Explain that audience breakdown data is unavailable for the current data set.

**Primary Action:** Continue using the available analytics.

**Expected Feeling:** Transparent rather than confusing.


---

## Error

**Purpose:** Handle analytics or date-range failures.

**Expected Information:**

* What went wrong.
* How the user can recover.

**Primary Action:** Retry or correct the input.

**Expected Feeling:** Clear and recoverable.


---

# 9. Search Expectations

Search is relevant when users want to move from **library-level insight to a specific video**.

## What users search for

* Video title.
* Asset name.
* Asset UUID where useful.

## Expected Behavior

* Search should help users locate a specific video in the detailed analysis experience.
* It should not alter the selected reporting period.
* Search should work alongside relevant filters.

## Search Philosophy

Search answers:

> **“I know which video I want to investigate.”**

It should not be the primary discovery mechanism for the Overview.


---

# 10. Filtering Expectations

Filtering should allow users to move from the complete library toward specific decision-making groups.

## Filter Categories

Core PRD filters:

* Zero Views in Selected Period
* Unviewed in Last 90+ Days
* Low Performers

Potential future/validated filters:

* Region / Location
* Device
* Folder / Category

Folder/category filtering appears in the PDR as a nice-to-have rather than a confirmed core requirement.

## Why users need filters

* Find zero-view videos quickly.
* Identify potential cleanup candidates.
* Investigate low-performing content.
* Potentially understand performance by audience segment.

## Expected UX Behavior

* Active filters should be obvious.
* Users should be able to remove filters easily.
* Filters should refine the same reporting context rather than create disconnected analytics experiences.
* Period-based filters should clearly respect the selected date range.
* Cleanup-related recency filters should remain understandable as a separate concept.

### Open Product Decision

The PRD specifies **Low Performers (< N views)** but does not define `N`.

The UI should not invent a threshold until the product decision is made.


---

# 11. Actions Expectations

### Primary Actions

* Change reporting period.
* Explore performance insights.
* Move into detailed video analysis.

### Secondary Actions

* Apply filters.
* Explore Top/Bottom performers.
* Investigate audience insights.

### Contextual Actions

* Export CSV.

CSV should remain accessible but should not dominate the Overview. The PRD describes export as a secondary action because users should be able to answer their questions directly on-screen.


---

# 12. Discovery Expectations

The Overview should create a natural exploration path:

**Library performance**

→ **Performance trend**

→ **Content performance**

→ **Audience insights**

→ **Storage opportunity**

→ **Detailed video analysis**

→ **Existing per-video Analytics**

The screen should help users discover meaningful information without forcing them into a rigid reporting workflow.

The PDR's desired monthly workflow is essentially:

**Understand performance → identify high performers → plan content → identify low/no-view assets → reduce storage cost.**


---

# 13. Empty State Expectations

## First-Time / No Videos

Explain that there are no video assets available for analytics.

**CTA direction:** Guide toward adding/uploading video content.

## No Views

Explain that videos exist but there is no viewing activity for the selected period.

**CTA direction:** Review another period or explore the library.

## No Top/Bottom Results

Explain that there is insufficient activity to provide meaningful ranking.

## No Audience Insights

Explain that location/device data is unavailable or insufficient.

## No Storage Opportunity

This should be treated positively:

> There are currently no significant 90+ day unviewed assets identified.

The user should not feel that “nothing found” means the dashboard is broken.


---

# 14. Error State Expectations

## Invalid Date Range

If the custom range exceeds 90 days:

* Clearly explain the allowed range.
* Help the user correct the selection.
* Avoid silently changing their selection.

The PRD caps custom date ranges at 90 days.

## Future Date

Explain that future dates cannot be used as a meaningful analytics period and guide the user back to a valid range.

## Analytics Loading Failure

* Clearly communicate that the analytics could not be loaded.
* Provide a retry path.
* Preserve the user's selected context where possible.

## Export Failure

* Clearly communicate that the export did not complete.
* Allow retry.
* Never imply a successful download when one did not occur.


---

# 15. Responsive Expectations

## Desktop

The full overview should comfortably support:

* Library performance
* Performance trend
* Content insights
* Audience insights
* Storage opportunity
* Transition into detailed analysis

The user should be able to understand the library without excessive navigation.

## Tablet

Prioritize:


1. Library performance
2. Performance trend
3. Content insights
4. Storage/audience insights
5. Detailed analysis

Secondary information can require additional scrolling.

## Mobile

The experience should preserve the same decision-making hierarchy:


1. Reporting period
2. Library performance
3. Performance trend
4. Key content insights
5. Audience insights
6. Storage opportunity
7. Detailed analysis

The experience should not simply compress the desktop dashboard. Information should be prioritized according to importance.

The PRD requires mobile-responsive behavior.


---

# 16. UX Personality

The screen should feel:

* **Clear**
* **Insightful**
* **Professional**
* **Focused**
* **Actionable**
* **Trustworthy**

NOT:

* Overwhelming
* Technical
* Report-heavy
* A wall of numbers
* Dependent on exports

The user should feel:

> **“I can understand my entire video library from here.”**


---

# Suggested Layout Structure

### Top

**Video Analytics**

* Selected date range
* Export
* Supporting controls

### First

**Library Performance**

* Key metrics
* Period comparison
* Performance trend

### Next

**Content Performance**

* Top Performers
* Bottom Performers

### Next

**Audience Insights**

* Top Regions / Locations
* Device Usage

### Next

**Storage Insights**

* Storage Cleanup Opportunity

### Bottom

**Detailed Video Analysis**

* Entry point to the asset-level analytics experience.

The exact visual arrangement of these sections should be decided during the actual UI design based on information density and hierarchy. The PRD itself confirms the core summary cards, table, filters, date range and export, but does not prescribe the complete visual arrangement of an aggregate audience section.


---

# Most Important Jobs This Screen Must Solve


1. **Help users understand how their entire video library is performing for a selected period.**
2. **Show whether library performance is improving or declining over time.**
3. **Surface the content that is performing best and worst so users can make content-strategy decisions.**
4. **Provide a high-level understanding of audience geography and device usage, if aggregate data is available and validated for TPStreams.**
5. **Help users identify potentially unused content and understand the associated storage opportunity.**
6. **Let users move naturally from high-level insights into detailed asset-level analysis when they need to investigate a specific video.**
7. **Make the recurring monthly analytics workflow self-service, reducing dependence on Support and manual reports.**
8. **Provide enough information directly on-screen that CSV export becomes an optional supporting action rather than the primary way to understand the data.**