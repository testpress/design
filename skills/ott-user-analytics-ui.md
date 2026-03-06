# OTT User Analytics UI – Planning Document

**Author:** Karthikeyan J  
**Purpose:** Describe the current User analytics page in Flimix and the specific questions it answers, based only on the sections that are actually implemented today.

This page answers:

- **Are viewers actively watching content over this period?**
- **Are we gaining new users?**
- **Are users coming back after signing up or returning in this period?**
- **How much time are viewers spending watching content?**

This version of the document is intentionally **scoped to the implemented UI only**:

- Header with date range selector  
- Top KPI row (4 cards)  
- “Are viewers actively watching content over time?” trend card  

Future ideas from the earlier plan (engagement depth, device distribution, lifecycle buckets, etc.) are **out of scope here** and can be added back later as separate sections when the UI is built.

All analytics still follow the shared rules in `analytics-ui-principles.md` (time context, comparisons, integrity for partial periods, etc.).

---

## Page Overview (current state)

### Layout

- **Header**
  - Title: `User analytics`
  - Short helper text (under title): explains that this page shows how people are watching content and coming back over time.
  - **Date range selector** (top-right, page‑level): changes all cards on the page together.

- **KPI row (4 cards, left → right)**
  1. **Active viewers**
  2. **New signups**
  3. **Returning viewers**
  4. **Total watch time**

- **User activity section**
  - Card titled: **“Are viewers actively watching content over time?”**
  - Contains:
    - Status badge (Good / Attention / Critical) with tooltip.
    - Two side‑by‑side charts:
      - **Active viewers** over time (left).
      - **Watch time** over time (right).
    - Small legend pills under the header: `Active viewers` (blue) and `Watch time` (green).
    - “How to read this” modal explaining patterns (↑ / ↓ / →) and what to do next.

---

## Primary Metric (anchor)

### Total watch time

**What it is**  
Total hours of content watched across the platform during the selected period.

**Why this matters**  
If watch time is shrinking, users are either:

- Not coming back, or  
- Watching less per visit.

Both cases point to **engagement and retention risk**.

**How it’s shown in the UI**  
As a KPI card in the top row:

- Title: `Total watch time`
- Value: large numeric value in **hours** (e.g. `124,500 hours`)
- Subtext: % change vs previous period (e.g. `+8% vs previous period`)

**Typical decisions**  

- Is overall viewing time **growing, stable, or dropping** for this tenant?
- When watch time moves, should we investigate **audience size** or **depth of engagement** first?

---

## KPI Cards (Top Row)

The KPI row gives a **quick at‑a‑glance summary**. Titles are **metric names** (not questions), but each card is designed to clearly answer a specific question.

### 1. Active viewers

- **Question answered:**  
  **How many users actually watched something in this period?**

- **What it shows in UI:**
  - Title: `Active viewers`
  - Primary value: count of unique users who watched at least one piece of content  
    (e.g. `18,240`)
  - Subtext: % change vs previous period  
    (e.g. `-5% vs previous period`, with red down arrow)

- **How to read it:**
  - **Up vs previous period:** more people are watching at least once → broader audience.
  - **Down vs previous period:** fewer people are coming back or arriving → acquisition or retention issue.

- **What to do:**
  - If this drops while watch time per user seems okay → focus on **acquisition / re‑engagement**.
  - If this grows but total watch time doesn’t → users come, but don’t watch much → check content and UX.

---

### 2. New signups

- **Question answered:**  
  **Are we adding new users during this period?**

- **What it shows in UI:**
  - Title: `New signups`
  - Primary value: count of users who signed up in the period  
    (e.g. `2,430`)
  - Subtext: % change vs previous period  
    (e.g. `+12% vs previous period`)

- **How to read it:**
  - Pairs with **Active viewers**: new signups show **top‑of‑funnel**, while active viewers show **who watched**.
  - High new signups but weak active viewers → people are signing up but not watching → onboarding/content issue.

- **What to do:**
  - If new signups fall: check **campaigns, app store traffic, referral channels, and pricing changes**.
  - If new signups rise but returning viewers are weak: improve onboarding and first‑watch experience.

---

### 3. Returning viewers

- **Question answered:**  
  **Are users coming back after signing up or after a previous visit?**

- **What it shows in UI:**
  - Title: `Returning viewers`
  - Primary value: % of viewers who returned in the period  
    (e.g. `62%`)
  - Subtext: raw viewer count + change  
    (e.g. `7,540 viewers • +4%`)

- **How to read it:**
  - Higher % and count → more people build a habit of watching.
  - Low or dropping values → users try once and don’t return → early retention risk.

- **What to do:**
  - If returning viewers fall while new signups are healthy:
    - Improve **onboarding flows**, “Continue watching”, and **recommended rows** on home.
  - If both new signups and returning viewers drop:
    - Check **overall value proposition** (content library, pricing, and platform issues).

---

### 4. Total watch time

- **Question answered:**  
  **How much time did viewers spend watching content in this period?**

- **What it shows in UI:**
  - Title: `Total watch time`
  - Primary value: hours watched (e.g. `124,500 hours`)
  - Subtext: % change vs previous period (e.g. `+8% vs previous period`)

- **How to read it:**
  - Use together with **Active viewers** and **Returning viewers**:
    - Watch time up + active viewers up → more people and more time watched.
    - Watch time flat + active viewers up → each user watches less → depth issue.
    - Watch time down + returning viewers down → serious engagement/retention issue.

- **What to do:**
  - If watch time drops while active viewers is stable:
    - Review **content freshness**, homepage rows, and **content discovery**.
  - If watch time drops together with active viewers:
    - Investigate outages, app issues, or major catalog changes.

---

## User Activity Trend Card

### Card

- **Title:** `Are viewers actively watching content over time?`
- **Location:** Below the KPI row, full‑width card.
- **Elements:**
  - Status badge (Good / Attention / Critical) with tooltip.
  - Two side‑by‑side area charts:
    - **Active viewers** (left, blue).
    - **Watch time (hours)** (right, green).
  - Tiny legend pills (no numbers) showing which color is which line.
  - “How to read this” link opening a detailed modal.

### Question answered

**Is viewer activity trending up, flat, or down over the selected period?**  
Specifically:

- Are more (or fewer) people watching?
- Are they spending more (or less) time watching?

### Metrics

- **X‑axis:** depends on selected date range
  - Last 7 days → daily points.
  - Last 30 days → weekly points.
  - Longer ranges → weekly/monthly aggregations.
- **Left chart (Active viewers):** number of unique viewers per time bucket.
- **Right chart (Watch time):** total watch hours per time bucket.

### Status badge logic (high level)

The badge summarizes the **combined pattern** of both charts:

- **Good:** both viewers and watch time are trending up.
- **Attention:** mixed or flat patterns (e.g. flat viewers / down watch time, or down viewers / flat watch time).
- **Critical:** both viewers and watch time are trending down.

The tooltip text is aligned with the “How to read this” modal so the message is always:

- What the pattern means.
- What the admin should do next (investigate content, UX, acquisition, etc.).

### How to read the card (summary)

- **Up & up (viewers ↑, watch time ↑):**  
  More people watching more content → strong engagement & growth.
- **Viewers flat, watch time down:**  
  Same audience, less time watched → content or experience problem.
- **Viewers down, watch time stable per viewer:**  
  Fewer people show up, but those who do still watch → acquisition/retention issue.
- **Down & down (viewers ↓, watch time ↓):**  
  Shrinking audience and engagement → critical risk; check outages, content, and UX quickly.

The full pattern grid (↑ / ↓ / → combinations) lives in the **“How to read this” modal** for this card.

---

## Filters (current)

### Date range

- Date range selector in the header:
  - Preset ranges such as **Last 7 days, Last 30 days, Last 90 days, Last 12 months**.
  - All KPIs and charts on this page update together when the range changes.

For now there are **no additional segment filters** (by device, lifecycle, etc.) wired into this page. Those can be added later when the corresponding analytics sections exist.

---

## Data Requirements (for current UI)

To power the existing cards, the analytics layer must at least provide:

### Core events

```text
content_play
content_complete
```

### Core fields

```text
user_id
content_id
content_type
device_type
watch_duration
timestamp
```

From these, the backend can derive:

- Active viewers per period.
- New signups (from auth/subscription system, joined via user_id).
- Returning viewers counts/ratios.
- Total watch time per period.
- Time‑bucketed series for the activity trend charts.

---

## What this page intentionally excludes (for now)

To keep this page focused and readable, **the current version does not cover**:

- Engagement depth buckets (1–10 min, 10–30 min, etc.).
- Session‑level player behavior (pause, resume, seek events).
- Live streaming analytics.
- Device distribution charts.
- Detailed lifecycle buckets (New / Active / At risk / Churned).

Those ideas can return later as **separate cards or dedicated analytics pages**, once designed and implemented.

---

## Focus of this version

The current User analytics page is optimized to answer **a small set of critical questions well**:

1. **Are people watching?** (Active viewers)
2. **Are new users still signing up?** (New signups)
3. **Do viewers come back?** (Returning viewers)
4. **How much do they watch, and is that changing?** (Total watch time + activity trend)

This keeps the page **MVP‑simple**, action‑oriented, and aligned with what exists in the design system today, while leaving room for future sections as the platform and requirements grow.

# OTT User Analytics UI – Planning Document

**Author:** Karthikeyan J  
**Purpose:** Understand **how users engage with the platform and whether they stay or leave.**

This page answers:

- Are users actually watching content?
- Are users returning after signup?
- Are users dropping off early?
- What devices do users prefer?
- Which users are likely to churn?

This page focuses on **engagement and retention**, **not revenue**.

All analytics follow the shared rules in `analytics-ui-principles.md` (date ranges, comparisons, granularity, and edge cases).

---

## Primary Metric (North Star)

### Total Watch Time

**What it is:**  
Total minutes watched across the platform during the selected period.

**Why this matters:**  
Revenue only exists if **people actually watch content**. If watch time drops → **engagement problem → churn risk**.

**How to read it:**

- Rising with stable/healthy active viewers → good engagement.
- Flat or dropping with similar active viewers → weaker content or weaker product experience.

**What to do when it changes:**

- If **watch time drops**: check **User Activity Trend** and **Engagement Depth** to see whether fewer users watch, or they watch for less time.
- If **watch time grows**: look at **Session Behavior**, **Live Engagement**, or recent releases to understand what is working.

---

## KPI Cards (Top Section)

These appear at the top of the page, under the header. Each card title is a **plain-language question**.

### 1. Total Watch Time — “Are people spending time with our content?”

Shows total viewing time in the selected period.

Example:

```
Total Watch Time
124,500 hours
+8% vs previous period
```

**Decision supported:**  
Is overall engagement **increasing or declining**?

---

### 2. Active Viewers — “How many users actually watched something?”

Users who watched **at least one piece of content** in the period.

Example:

```
Active Viewers
18,240
+5%
```

**Decision supported:**  
Is the audience **actually using the platform**, or are they idle?

---

### 3. Average Watch Time per User — “How much does a typical user watch?”

Example:

```
Average Watch Time / User
46 minutes
+3%
```

**Decision supported:**  
Are users **consuming more content per user**, or only more users are coming in?

---

### 4. Returning Users — “Are users coming back after their first visit?”

Users who came back after their first visit (simple retention ratio for the period).

Example:

```
Returning Users
62%
```

**Decision supported:**  
Is the platform **sticky**, or do users leave after trying once?

---

## Section 1 – User Activity Trend

**Question answered:**  
**Is engagement increasing or decreasing over time?**

**Chart type:** Line chart

**Metrics:**

- Active viewers (per period)
- Watch time (per period)

Example:

```
Watch Time
|
|      ╱╲
|   ╱╲   ╲
| ╱       ╲
└────────────
 Jan Feb Mar
```

**Decision supported:**  
Detect **engagement growth or drop** across weeks or months.

**How to read it:**

- **Both active viewers and watch time up:** healthy user and content growth.
- **Active viewers flat, watch time down:** users still come, but consume less → content or UX issue.
- **Active viewers down, watch time per user stable:** fewer users are coming back → acquisition/retention issue.

**What to do when the graph changes:**

- **Sudden drop in last 1–2 periods:** check recent app releases, outages, or catalog removals.
- **Gradual decline:** investigate content freshness, recommendation quality, or onboarding.

---

## Section 2 – User Retention

**Question answered:**  
**Do users come back after joining?**

**Chart type:** Cohort retention table.

Example:

```
Signup Month | Week1 | Week2 | Week3 | Week4
Jan          | 100%  | 52%   | 35%   | 21%
Feb          | 100%  | 55%   | 38%   | 24%
```

**Decision supported:**  
If retention drops fast → **onboarding or content problem.**

**How to read it:**

- Higher Week2/Week3 values for recent cohorts → improvements are working.
- Steep drop after Week1 → users don’t find enough value quickly.

**What to do when the table changes:**

- If **recent cohorts retain worse** than older ones: review changes in onboarding, paywall, or first content shown.
- If **retention improves**: capture what changed (campaigns, UX, content) and repeat.

---

## Section 3 – Engagement Depth

**Question answered:**  
**How much content do users consume when they visit?**

**Chart type:** Bar chart.

**Metrics:**

- 1–10 minutes users
- 10–30 minutes users
- 30–60 minutes users
- 60+ minutes users

Example:

```
Engagement Duration
█   1–10 min
███ 10–30 min
████ 30–60 min
██  60+ min
```

**Decision supported:**  
If most users are **1–10 minutes → content not engaging** or bad fit.

**How to read it:**

- Healthy distribution has more users in **10–30** and **30–60** buckets.
- Skew to **1–10 min** → users browse, try, and leave.

**What to do when the chart changes:**

- If users move into **short buckets**, improve first-play experience, recommendations, or surface better content.
- If long buckets grow, identify which content types or formats correlate with that.

---

## Section 4 – Session Behavior

**Question answered:**  
**How do users interact with the player?**

**Metrics tracked:**

- Play events
- Pause events
- Resume events
- Completed views

**Chart type:** Bar chart (per event type; optionally per content type or device).

**Decision supported:**  
High pause / low completion → possible **content quality or UX issue**.

**How to read it:**

- **High plays + high completes:** satisfying content and stable playback.
- **High plays + low completes:** users abandon mid-way (content, buffering, or UX issue).

**What to do when it changes:**

- Spike in **pauses** or **drops in completion** → investigate affected content types, devices, or bitrates.
- Improvement in completion → understand which content or product changes led to it.

---

## Section 5 – Continue Watching Usage

**Question answered:**  
**Are users resuming content later?**

**Metrics:**

- Resume events
- Continue-watching usage rate (percentage of active users who resume)

**Decision supported:**  
High resume usage → strong **episodic or long-form engagement**.

**How to read it:**

- Growing resume rate → users are treating the platform as an ongoing habit.
- Low or dropping resume rate → people start but don’t return to finish.

**What to do when it changes:**

- If usage drops, review how visible and reliable **Continue Watching** is, and whether content supports multi-session viewing.

---

## Section 6 – Live Stream Engagement

*(Include only if the tenant uses live streaming; otherwise hide this section.)*

**Question answered:**  
**How strong is engagement on live events?**

**Metrics:**

- Total live viewers
- Peak concurrent viewers
- Average watch time for live streams
- Chat messages sent

**Chart type:** Line + bar (e.g., viewership over time with chat volume).

**Decision supported:**  
Evaluate **success of live events** and which formats resonate.

**What to do when it changes:**

- Low peak concurrency or short live watch time → adjust timing, promotion, or event format.
- High chat and stable viewers → double down on similar live formats.

---

## Section 7 – Device Distribution

**Question answered:**  
**Where are users watching?**

**Metrics:**

- Web
- Android
- iOS
- TV (and other major platforms)

**Chart type:** Bar chart.

Example:

```
Device Usage
████ Web
██   Android
█    iOS
███  TV
```

**Decision supported:**  
Decide **where to prioritize app development and QA**.

**What to do when it changes:**

- Sudden drop on one device → potential app or playback problem.
- Growth on TV, for example → prioritize TV UX, features, and content optimized for large screens.

---

## Section 8 – User Lifecycle

**Question answered:**  
**Which users are healthy, at risk, or churned?**

Users categorized into:

- **New Users** – First-time watchers.
- **Active Users** – Watched recently (within a short window).
- **At Risk Users** – No watch activity for 14+ days.
- **Churned Users** – No watch activity for 30+ days.

**Chart type:** Stacked bar over time.

**Decision supported:**  
Detect **early churn signals** and size of each lifecycle bucket.

**How to read it:**

- Growing **At Risk** or **Churned** segment → upcoming revenue and engagement risk.
- Healthy share of **Active** and **Returning** users → strong habit.

**What to do when it changes:**

- If **At Risk** grows: run re-engagement campaigns, push notifications, and highlight top content.
- If **Churned** keeps growing despite outreach: revisit onboarding, pricing, and content positioning.

---

## Filters

### Date Range

Options (following analytics UI principles):

- Last 7 days
- Last 30 days
- Last 90 days
- Last 12 months
- Custom range

All metrics and charts **must update together** when the date range changes.

### Segment Filters

- Device type (Web, Android, iOS, TV, etc.)
- User lifecycle segment (New, Active, At Risk, Churned)

These filters let admins answer questions like:

- “Are **TV users** more engaged than **mobile users**?”
- “How does engagement look for only **At Risk** users?”

---

## Data Requirements

### User Events

Required event types:

```text
content_play
content_pause
content_resume
content_complete
```

### Live Events

```text
live_join
live_leave
chat_message
```

### Tracking Fields

```text
user_id
content_id
content_type
device_type
session_id
watch_duration
timestamp
```

These fields must be available (from the backend repo) for the analytics layer feeding this UI.

---

## What This Page Intentionally Excludes

To avoid confusion and scope creep, this **User Analytics** page does **not** show:

- Revenue
- Plan distribution
- Content performance ranking (top titles, etc.)
- Geographic data

Those belong to **other analytics pages** (Revenue analytics, Content performance, Geo analytics).

---

## Final Insight & Focus

This User Analytics page focuses on **three things only**:

1. **Engagement** – Are users watching content and how much?
2. **Retention** – Do they come back after joining?
3. **Churn risk** – Who is at risk of leaving?

Everything else lives on separate, dedicated analytics pages so each page supports **clear, concrete decisions**.


