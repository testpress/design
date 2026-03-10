# User Analytics Dashboard Documentation

**UI Name**: User Analytics Dashboard
**Date**: March 9, 2026
**Author**: Flimix Design Team

## Purpose of This UI

This dashboard is designed to provide platform administrators with a comprehensive overview of audience behavior, engagement, and demographics on Flimix. It helps operators answer critical questions about viewer activity trends, dominant viewing platforms, peak usage hours, geographic distribution, and viewing habits (binge vs. casual).

## Problem Statement

### Without This UI

1. Administrators cannot accurately track viewer engagement trends over time, such as active viewers and total watch time.
2. It is difficult to know which device platforms (Web, Mobile, TV) to prioritize for development and marketing without clear usage distribution data.
3. Content scheduling and push notification timings are based on guesswork without knowing peak viewing hours.
4. The platform cannot effectively tailor regional content strategy or marketing campaigns without geographic insights.
5. There is an inability to segment the audience into casual viewers versus binge-watchers, making retention strategies difficult to design.

### How This UI Solves It

* **Problem 1**: Provides clear KPI indicators and a prominent "Viewer activity trend" area chart for both active viewers and watch time spanning various selectable date ranges.
* **Problem 2**: Shows a dedicated "Device distribution" chart (Android, Web, iOS, TV) to help prioritize tech investments and platform-specific promotions.
* **Problem 3**: Displays a "Viewing by hour" 24-hour bar chart to identify peak usage times, optimizing content release schedules.
* **Problem 4**: Visualizes "Viewer locations" via a horizontal bar chart to guide regional marketing, localization efforts, and content acquisition.
* **Problem 5**: Includes a "Binge vs Casual" donut chart that segments viewer sessions into categories (e.g., <30 min, 30-90 min, 90+ min) to inform engagement strategies.

## Target Audience

**Primary Users**: Platform Administrators, Content Managers, Marketing Leads
**Secondary Users**: Product Managers, Executives
**User Goals**: Understand audience behavior, make data-driven decisions regarding content acquisition and marketing, and track overall platform growth.
**Typical Use Cases**: Reviewing monthly performance metrics, deciding on regional marketing budgets, scheduling new content drops, and prioritizing application updates based on device usage.

## Success Metrics

* **Decision efficiency**: Reduction in time spent pulling manual reports for user engagement metrics.
* **Adoption**: High weekly active usage of this dashboard by admin and marketing staff.
* **Actionable Outcomes**: Improved engagement rates triggered by optimizing release timings and targeting dominant geographic or device segments.

## Page Overview

**Single-Page UI — Page Structure**

**Page Title**: User analytics
**Page Header Elements**:
* **Title**: User analytics
* **Subtitle / Badge**: Status Indicator (e.g., "Good", "Attention", "Critical" derived from recent activity patterns).
* **Actions**: "How to read this" modals available for every chart to educate users on interpreting data patterns.
* **Filters**: Date Range Selector (e.g., Last 7 days, Last 30 days, Last 90 days, Last 12 months).

## Visual Layout (ASCII Wireframe)

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar  │ User analytics                     [Date Filter]  │
│          │                                                   │
│          │ ┌────────────────┐ ┌────────────────┐             │
│          │ │ KPI: Active    │ │ KPI: Watch     │             │
│          │ │ Viewers        │ │ Time           │             │
│          │ └────────────────┘ └────────────────┘             │
│          │                                                   │
│          │ ┌───────────────────────────────────────────────┐ │
│          │ │ Viewer Activity Trend (Area Chart)            │ │
│          │ └───────────────────────────────────────────────┘ │
│          │                                                   │
│          │ ┌──────────────────────┐ ┌──────────────────────┐ │
│          │ │ Device Distribution  │ │ Binge vs Casual      │ │
│          │ │ (Vertical Bar)       │ │ (Donut Chart)        │ │
│          │ └──────────────────────┘ └──────────────────────┘ │
│          │                                                   │
│          │ ┌──────────────────────┐ ┌──────────────────────┐ │
│          │ │ Viewing by Hour      │ │ Viewer Locations     │ │
│          │ │ (24h Bar Chart)      │ │ (Horizontal Bar)     │ │
│          │ └──────────────────────┘ └──────────────────────┘ │
└──────────┴───────────────────────────────────────────────────┘
```

## Section-by-Section Breakdown

### Section 1: KPI Cards & Viewer Activity Trend
**What it shows**: Top-level metrics for Active Viewers and Total Watch Time, paired with a dual-tab area chart showing trends over the selected date range. Includes an automatic trend status badge (Good, Attention, Critical).
**Why it exists**: To give an immediate health check of platform viewership and identify macro-level growth or decline trends.
**Decision it supports**: Whether to maintain current growth strategies, investigate sudden drops, or celebrate platform milestones.

### Section 2: Device Distribution
**What it shows**: A vertical single-color bar chart displaying the number of viewers across different platforms (Android, Web, iOS, TV).
**Why it exists**: To reveal how users prefer to access the platform.
**Decision it supports**: Where to allocate engineering resources for app updates or which platforms to target for ad campaigns.

### Section 3: Binge vs Casual
**What it shows**: A donut chart segmenting viewing sessions into Casual (<30 min), Normal (30–90 min), and Binge (90+ min).
**Why it exists**: To understand audience consumption depth and content stickiness.
**Decision it supports**: Whether to release content episodically (if casual dominates) or in full seasons (if binge watching is prominent).

### Section 4: Viewing by Hour
**What it shows**: A 24-hour vertical bar chart showing average concurrent viewers or total viewing sessions for each hour of the day.
**Why it exists**: To pinpoint when the platform experiences the highest load and when users are most active.
**Decision it supports**: Ideal times to send push notifications, schedule live events, or release highly anticipated content.

### Section 5: Viewer Locations
**What it shows**: A horizontal single-color bar chart highlighting the top 5 viewer geographic locations (countries) by percentage share.
**Why it exists**: To display where the audience is concentrated globally.
**Decision it supports**: Guiding localization efforts (subtitles/dubbing), regional marketing spend, and acquiring culturally relevant content.

## Data Requirements

| Field Name | Data Type | Format / Example | Required | Source |
|------------|-----------|------------------|----------|--------|
| `date_range` | String | "30" (days) | Yes | UI Filter |
| `active_viewers_trend` | Array of numbers | `[15000, 15500, ...]` | Yes | Analytics Engine |
| `watch_time_trend` | Array of numbers | `[110000, ...]` | Yes | Analytics Engine |
| `trend_status` | Enum | "Good", "Attention", "Critical" | Yes | Calculated |
| `device_distribution` | Object | `{"Android": 5200, "Web": ...}` | Yes | Session Logs |
| `session_segments` | Object | `{"casual": 40, "normal": ...}` | Yes | Session Length Calc |
| `hourly_distribution` | Array of numbers | Length 24, e.g. `[60, 40, ...]`| Yes | Activity Logs |
| `viewer_locations` | Object/Array | `{"United States": 35.5, ...}` | Yes | GeoIP / User Profile |

## What This UI Intentionally Excludes

This UI intentionally excludes:
* **Individual user tracking**: Focuses entirely on aggregate data to spot macro trends without violating privacy or cluttering the interface.
* **Revenue and Financial metrics**: Excluded to keep the focus purely on usage and engagement. Revenue data should live in a separate Business/Sales Dashboard.
* **Specific Content Title Performance**: Excluded to avoid overwhelming the user. Analyzing the performance of individual movies or shows is deferred to a dedicated "Content Analytics" dashboard.

## Related Documentation

**Design Files**: Flimix internal UI design repository (HTML/Tailwind implementation at `src/flimix/analytics/user_analytics/` folder).
**Prototype**: `/flimix/analytics/user_analytics/` local environment endpoint.
