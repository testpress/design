# Exam Board — Overall Dashboard: Design Structure & Real-Time Data (Figma)

Use this spec for layout, copy, and sample data in Figma. All values are realistic for a "live" dashboard.

---

## 1. PAGE CONTAINER

- **Max width:** 1280px (max-w-7xl)
- **Padding:** 40px vertical, 32px horizontal (lg), 16px horizontal (mobile)
- **Background:** #F3F4F6 (gray-100)
- **Vertical spacing between sections:** 20px (space-y-5)

---

## 2. HEADER (Section 1)

**Layout:** Single row, left-aligned; optional right slot for filters/actions.

| Element | Copy / Value |
|--------|----------------|
| **Title (H1)** | Exam Centre Monitoring |
| **Subtitle** | Track ongoing and upcoming exams across exam centres in your organization. |

**Typography (suggested):**
- Title: 18–20px, semibold, #1F2937 (gray-800)
- Subtitle: 14px, regular, #6B7280 (gray-500)

---

## 3. KPI CARDS (Section 2) — 4 cards in a row

**Grid:** 4 columns (desktop), 2 columns (tablet), 2 columns (mobile). Gap: 8px (mobile) to 20px (desktop).

**Card style:** White background, border 1px #E5E7EB, rounded 12px, padding 16–20px. Optional small icon (24×24) per card.

---

### KPI 1: Active exams

| Field | Value |
|-------|--------|
| **Label** | Active exams |
| **Value** | 3 |
| **Sublabel** | Running right now |

**Icon:** Document/clipboard (blue accent, e.g. #60A5FA).

---

### KPI 2: Total exam centres

| Field | Value |
|-------|--------|
| **Label** | Total exam centres |
| **Value** | 4 |
| **Sublabel** | Participating in active exams |

**Icon:** Map pin / location (purple accent, e.g. #C084FC).

---

### KPI 3: Allocated students

| Field | Value |
|-------|--------|
| **Label** | Allocated students |
| **Value** | 17,320 |
| **Sublabel** | Across active exams |

**Icon:** Users / people (green accent, e.g. #4ADE80).

---

### KPI 4: Nodes online

| Field | Value |
|-------|--------|
| **Label** | Nodes online |
| **Value** | 3 of 4 |
| **Sublabel** | 1 centre offline |

**Icon:** Server / activity (amber or red if any offline, e.g. #FBBF24 or #F87171).

**Alternative display:** "3/4 centres online" or a small status dot + "3 online, 1 offline".

---

## 4. ACTIVE EXAMS TABLE (Section 3)

**Block title:** Active exams  
**Optional:** Search placeholder — "Search exam"  
**Table columns:** Exam name | Centres | Allocated students | Attendance | Started | Actions

### Table content (real-time data)

| Exam name | Centres | Allocated students | Attendance | Started | Actions |
|-----------|---------|--------------------|------------|---------|---------|
| ACCP Professional Certification Exam | 2 | 12,480 | 62% (progress bar) | 2h ago | View detail |
| ADCA Certification Exam | 1 | 3,280 | 76% (progress bar) | 4h ago | View detail |
| ADIT Certification Exam | 1 | 1,560 | 48% (progress bar) | 1h ago | View detail |

**Row 1 detail:**  
- Name: ACCP Professional Certification Exam  
- Centres: 2  
- Students: 12,480  
- Attendance: 62% — sublabel or tooltip: "Unmarked 4,742"  
- Started: 2h ago  
- Action: Button/link "View detail"

**Row 2:**  
- ADCA Certification Exam | 1 | 3,280 | 76% | 4h ago | View detail  

**Row 3:**  
- ADIT Certification Exam | 1 | 1,560 | 48% | 1h ago | View detail  

**Pagination (below table):** "1" of "3" (current page 1 of 3), Previous / Next buttons. Optional "Go to page" input.

---

## 5. UPCOMING EXAMS (Section 4)

**Block title:** Upcoming exams  
**Sublabel (optional):** Next 7 days

### List or compact table

| Exam name | Centres | Allocated students | Starts |
|-----------|---------|--------------------|--------|
| BCS Foundation Certificate Exam | 3 | 8,200 | Feb 15, 2026 · 9:00 AM |
| CISM Practice Exam | 1 | 1,100 | Feb 16, 2026 · 10:00 AM |

**Row 1:**  
- BCS Foundation Certificate Exam  
- 3 centres  
- 8,200 students  
- Starts: Feb 15, 2026 · 9:00 AM  

**Row 2:**  
- CISM Practice Exam  
- 1 centre  
- 1,100 students  
- Starts: Feb 16, 2026 · 10:00 AM  

**Empty state (if no upcoming):** "No upcoming exams in the next 7 days."  
**Optional:** "View all exams" link to Exam List page.

---

## 6. ALERTS / EXCEPTIONS (Optional Section 5)

**Block title:** Alerts  
**Use when:** At least one alert exists.

**Example rows:**

| Severity | Message |
|----------|--------|
| Warning | North City Centre (1 node) has been offline for 15 minutes. |
| Info | ACCP exam: 4,742 attendance entries still unmarked. |

**Severity styles:**  
- Warning: amber icon + amber text or border  
- Info: blue icon + blue text  

**Data to show in Figma:**  
- 1 warning: "North City Centre (1 node) has been offline for 15 minutes."  
- 1 info: "ACCP exam: 4,742 attendance entries still unmarked."

---

## 7. DATA SUMMARY (copy-paste for Figma text layers)

```
--- HEADER ---
Exam Centre Monitoring
Track ongoing and upcoming exams across exam centres in your organization.

--- KPI 1 ---
Active exams
3
Running right now

--- KPI 2 ---
Total exam centres
4
Participating in active exams

--- KPI 3 ---
Allocated students
17,320
Across active exams

--- KPI 4 ---
Nodes online
3 of 4
1 centre offline

--- ACTIVE EXAMS TABLE HEADER ---
Active exams
[Search: Search exam]

Columns: Exam name | Centres | Allocated students | Attendance | Started | Actions

Row 1: ACCP Professional Certification Exam | 2 | 12,480 | 62% | 2h ago | View detail
Row 2: ADCA Certification Exam | 1 | 3,280 | 76% | 4h ago | View detail
Row 3: ADIT Certification Exam | 1 | 1,560 | 48% | 1h ago | View detail

Pagination: 1 of 3

--- UPCOMING EXAMS ---
Upcoming exams
Next 7 days

Row 1: BCS Foundation Certificate Exam | 3 centres | 8,200 students | Feb 15, 2026 · 9:00 AM
Row 2: CISM Practice Exam | 1 centre | 1,100 students | Feb 16, 2026 · 10:00 AM

--- ALERTS (optional) ---
Alerts
⚠ North City Centre (1 node) has been offline for 15 minutes.
ℹ ACCP exam: 4,742 attendance entries still unmarked.
```

---

## 8. LAYOUT ORDER (top to bottom)

1. Header (title + subtitle)  
2. KPI row (4 cards)  
3. Active exams card (table with search, columns, 3 rows, pagination)  
4. Upcoming exams card (title + 2 rows)  
5. Alerts card (optional; 2 sample alerts)

---

## 9. RESPONSIVE NOTES

- **Desktop (≥1024px):** 4 KPI cards in one row; full table.  
- **Tablet (768–1023px):** 2×2 KPI grid; table horizontal scroll if needed.  
- **Mobile (&lt;768px):** 2×2 KPI grid; table as cards or stacked rows; single column for upcoming list.

Use this document as the single source of truth for structure and real-time data when building the Overall Dashboard in Figma.
