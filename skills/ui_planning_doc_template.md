# \[UI NAME\] Documentation

**UI Name:** \[Name of the UI / Feature\] **Date:** \[Current date\] **Author:** \[Your name\]


---

## Purpose of This UI

**Instruction:** Explain in 2–3 sentences what this UI is designed to accomplish. Focus on the primary business or user goal. Clearly state what questions this UI helps answer.

**Content:**\[Describe the primary purpose of this UI. What is it designed to accomplish? What key questions should it answer for the user?\]


---

## Problem Statement

**Instruction:** Describe the problem that exists *without* this UI. Focus on current pain points, inefficiencies, or risks.

### Without This UI

\[List 3–5 specific problems or pain points that exist today\]

* \[Problem 1\]
* \[Problem 2\]
* \[Problem 3\]
* \[Problem 4\]
* \[Problem 5 (optional)\]

### How This UI Solves It

\[Explain how this UI addresses each problem listed above\]

* **Problem 1:** \[How the UI solves it\]
* **Problem 2:** \[How the UI solves it\]
* **Problem 3:** \[How the UI solves it\]


---

## Target Audience

**Instruction:** Identify who will use this UI. Include roles, goals, and common use cases.

**Content:**

* **Primary Users:** \[e.g., Operations Managers, Sales Leads\]
* **Secondary Users:** \[Optional\]
* **User Goals:** \[What they want to achieve\]
* **Typical Use Cases:** \[When and why they use this UI\]


---

## Success Metrics

**Instruction:** Define how success will be measured. Metrics should be measurable and attributable to this UI.

**Content:**

* \[Metric 1 — e.g., Reduction in task completion time\]
* \[Metric 2 — e.g., Weekly active users\]
* \[Metric 3 — e.g., Decision accuracy or error reduction\]


---

## Page Overview

**Instruction:** Use the relevant subsection below based on whether this is a single-page or multi-page UI.


---

### Single-Page UI — Page Structure

* **Page Title:** \[Title\]
* **Page Header Elements:**
  * **Title:** \[e.g., Sales Analytics\]
  * **Subtitle / Badge:** \[e.g., Location, Status\]
  * **Actions:** \[e.g., Export PDF, Export Excel\]
  * **Filters:** \[e.g., Date Range, Region\]


---

### Multi-Page UI — Page Navigation

List all pages/screens and how users move between them.

```
Page 1: [Page Name]
  ↓
Page 2: [Page Name]
  ↓
Page 3: [Page Name]
```

**Navigation Flow:**

* \[Page 1\] → \[How to reach Page 2\]
* \[Page 2\] → \[How to reach Page 3\]
* \[Page 3\] → \[How to return or exit\]


---

## Visual Layout (ASCII Wireframe)

**Instruction:** Create a high-level ASCII wireframe showing overall page structure and major sections.

**Example:**

```
┌──────────────────────────────────────────────────────────────┐
│ Page Header: Title | Filters | Actions                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Section 1    │ │ Section 2    │ │ Section 3    │ │ Section 4    │
│ KPI Card     │ │ KPI Card     │ │ KPI Card     │ │ KPI Card     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

┌──────────────────────────────────────────────────────────────┐
│ Section 5: Large Chart / Table                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐ ┌──────────────────────────────┐
│ Section 6: Left Panel        │ │ Section 7: Right Panel       │
└──────────────────────────────┘ └──────────────────────────────┘
```

**Your Layout:**

```
[Draw your page layout here]
```


---

## Section-by-Section Breakdown

**Instruction:** Repeat the following structure for **each** UI component (card, table, chart, form, etc.).


---

### Section \[Number\]: \[Section Name\]

**What it shows:** \[1–2 sentence description of the content displayed\]

**Why it exists:** \[Explain the purpose and the problem it solves\]

**Decision it supports (Optional — dashboards/reports only):**\[What decision or action the user can take based on this information\]


---

### Visual Representation

Refer this document for deciding the best design pattern:  [Design Rationale Doc Builder](/doc/design-rationale-doc-builder-h1luqUrTt0)

**Example — KPI Card:**

```
┌─────────────────┐
│ Total Revenue   │
│                 │
│ ₹15,45,000      │
│ +15%            │
│ [Sparkline]     │
└─────────────────┘
```

**Example — Table:**

```
| Course Name | Individual Sales | Cohort Sales | Total Revenue | Users |
|-------------|------------------|--------------|---------------|-------|
| Course A    | ₹2,50,000        | ₹2,00,000    | ₹4,50,000     | 330   |
| Course B    | ₹2,00,000        | ₹1,80,000    | ₹3,80,000     | 260   |
```

**Example — Chart:**

```
Registrations
  600 |                               ╱──
      |                         ╱────╱
  400 |                   ╱────╱
      |             ╱────╱
  200 |       ╱────╱
      | ╱────╱
    0 └────────────────────────────────
      Week 1  Week 2  Week 3  Week 4
```

**Your Visual:**

```
[Draw your section layout here]
```


---

## Data Requirements

**Instruction:** List all required data fields and their specifications.

| Field Name | Data Type | Format / Example | Required | Source |
|----|----|----|----|----|
| total_revenue | Number | 1545000 | Yes | Orders table |
| revenue_change | Percentage | +15% or 0.15 | Yes | Calculated |
| time_period | String | Last 30 days | Yes | Filter selection |


---

## What This UI Intentionally Excludes

**Instruction:** Document exclusions to prevent scope creep and clarify boundaries.

**This UI intentionally excludes:**

* \[Item 1\] → \[Reason\]
* \[Item 2\] → \[Reason\]
* \[Item 3\] → \[Reason\]


---

## Related Documentation

**Instruction:** Link all relevant supporting materials.

* **Design Files:** \[Figma / Sketch link\]
* **Prototype:** \[Interactive prototype link\]
* **Technical Specs:** \[API / backend documentation\]
* **User Research:** \[Research findings or insights\]


---

