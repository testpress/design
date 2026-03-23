# Student Report Card Documentation

**UI Name:** Student Report Card (List & Detail)  
**Date:** 2026-03-23  
**Author:** Antigravity

---

## Purpose of This UI

The Student Report Card UI provides students and parents with a consolidated view of academic performance. It aggregates individual exam attempts into subject-specific projected SAT scores and calculates overall readiness metrics to track progress over time.

---

## Problem Statement

### Without This UI

* Students and parents only see a list of individual exam scores.
* There is no immediate way to see a "Projected SAT Score" based on history.
* Historical trends and consistency across English/Math aren't visualized.
* The reporting lacks a formal, "school-style" structure.

### How This UI Solves It

* **Automated Aggregation:** Automatically calculates averages for English and Math sections.
* **Score Projection:** Sums section averages to show a total projected SAT score.
* **Trend Analysis:** Visualizes performance over time to indicate if a student is improving.

---

## Target Audience

* **Primary Users:** Students (to track their study goals).
* **Secondary Users:** Parents (to monitor progress and readiness).
* **User Goals:** Understand current SAT readiness at a glance.
* **Typical Use Cases:** Weekly review of practice test performance.

---

## Success Metrics

* **Mobile Access:** High percentage of views from mobile devices.
* **Clarity:** Reduction in manual calculation requests from parents.
* **Engagement:** Increased weekly active users tracking their "Projected Score".

---

## Page Overview

### Multi-Page UI — Page Navigation

```
Page 1: My Academic Reports (List)
  ↓
Page 2: SAT Projection Report (Detail)
```

**Navigation Flow:**

* **Page 1 (List)** → Click on a report card card to view the **Page 2 (Detail)**.
* **Page 2 (Detail)** → Back button or breadcrumb navigation to return to the **Page 1 (List)**.

---

## Visual Layout (ASCII Wireframe)

### Page 1: My Academic Reports (List)

```
┌──────────────────────────────────────────────────────────────┐
│  My Report Cards                      [Filter] [Search]      │
└──────────────────────────────────────────────────────────────┘

┌────────────────────────┐  ┌────────────────────────┐
│ SAT Readiness - Q1     │  │ SAT Readiness - Prep   │
│ Period: Jan - Mar 2025 │  │ Period: Oct - Dec 2024 │
│                        │  │                        │
│ Projected: 1280        │  │ Projected: 1240        │
│ [View Details]         │  │ [View Details]         │
└────────────────────────┘  └────────────────────────┘
```

### Page 2: SAT Readiness Report (Detail)

```
┌──────────────────────────────────────────────────────────────┐
│ Reports > Q1 SAT Report                [Print] [Share]       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  PROJECTED SAT SCORE                                         │
│                                                              │
│           ┌──────────┐                                       │
│           │   1280   │                                       │
│           │  TOTAL   │                                       │
│           └──────────┘                                       │
│                                                              │
│   ┌──────────────────┐        ┌──────────────────┐           │
│   │  English Avg     │        │  Math Avg        │           │
│   │  620 / 800       │        │  660 / 800       │           │
│   └──────────────────┘        └──────────────────┘           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  Performance Trend                                           │
│  [Score Chart: Upward Trend Chart Area]                      │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  Subject Breakdown: Reading & Writing                        │
│  | Exam Name | Date | Score | Percentile | Output |          │
│  |-----------|------|-------|------------|--------|          │
│  | Test A    | 03/10| 640   | 85%        | View   |          │
└──────────────────────────────────────────────────────────────┘
```

---

## Section-by-Section Breakdown

### Section 1: Hero Score Card (Detail Page)

**What it shows:** A large, prominent display of the "Total Projected SAT Score" alongside the English and Math averages.

**Why it exists:** Provides the most important information immediately without requiring scrolling.

---

### Section 2: Subject Breakdown Tables (Detail Page)

**What it shows:** Tabular data of individual exam attempts assigned to each section (English/Math).

**Why it exists:** Allows students to audit the source of their averages and see granular performance.

---

## Data Requirements

| Field Name | Data Type | Format / Example | Required | Source |
|----|----|----|----|----|
| projected_total | Number | 1280 | Yes | Calculated (Eng + Math Avg) |
| english_avg | Number | 620 | Yes | Calculated |
| math_avg | Number | 660 | Yes | Calculated |
| attempt_list | List | Array of UserExams | Yes | Database |

---

## What This UI Intentionally Excludes

* **Admin Mocking:** This view is for student consumption only.
* **Detailed Question Analysis:** This UI focuses on *scores*; question-level review is handled by the existing Exam Review UI.

---

## Related Documentation

* **PRD:** [report_card.md](file:///\\wsl.localhost/Ubuntu-22.04/home/karthik/project/design/docs/prd/report_card.md)
* **Design File:** [Figma Link Placeholder]
