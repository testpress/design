# Central Monitoring Dashboard Documentation (Global)

UI Name: Central Monitoring Dashboard (Global — All Active Exams & Centres)  
Date: 2026-02-12  
Author: Karthik (drafted with Cursor AI)

---

## Purpose of This UI

This UI provides a centralized, read-only command-centre view of how **all currently running (or scheduled) exams** are operating across **all physical exam centres**. It helps exam authorities quickly assess **system health**, **exam execution progress**, and **exceptions** across the fleet so they can intervene early when something goes wrong.

Key questions this UI answers:

- Which exams are currently active, and which need attention?
- Are centres operational and reporting right now (node health / last seen / battery)?
- Which exams/centres are falling behind on attendance or verification?
- Which centres/sessions are at risk (offline server node, low battery, stalled progress, unusually high unmarked)?
- Where should the central team intervene first, and what should they drill into next (Exam → Centre → Session)?

---

## Problem Statement

High-stakes exams are delivered at many physical locations using offline-capable exam software. Without a centralized monitoring layer, authorities cannot reliably observe real-time progress, identify operational risks, or prioritize interventions across centres.

### Without This UI

- No single place to see which centres are **active / reporting / offline** during exam operations.
- Limited visibility into **attendance marking progress** (present/absent/unmarked) across centres and sessions.
- Limited visibility into **verification completion** and evidence capture status.
- Exceptions (power/device issues, node offline, low battery, stalled progress) are discovered **late** via manual calls/messages.
- Intervention is reactive and uncoordinated, increasing risk to exam integrity and operational continuity.

### How This UI Solves It

- **Active exams overview** provides immediate visibility into which exams are currently in progress and their high-level health.
- **Centralized centre health view** surfaces online/offline, last-seen, battery, and node role signals per centre (across exams).
- **Progress-based KPIs** show attendance and verification completion at a global level, with the ability to filter to an exam.
- **Exception-first design** highlights exams/centres with stalled progress, high unmarked counts, low battery, or offline nodes.
- **Drill-down navigation** enables quick pivot from global summary → exam → centre → session to identify root cause.
- **Consistent definitions** for participation/verification metrics reduce ambiguity and improve decision quality.

---

## Target Audience

**Primary Users**

- Central Exam Authority / Tenant Admin (operations command centre)

**Secondary Users (optional)**

- Observers / auditors with read-only access
- Regional supervisors monitoring a subset of centres (if role-scoped)

**User Goals**

- Monitor exam execution health across centres and sessions.
- Detect and prioritize operational risks early.
- Ensure attendance and verification are progressing as expected.
- Maintain traceability of centre-level progress and status.

**Typical Use Cases**

- During the exam window: continuous monitoring, focusing on exceptions.
- At check-in start: ensure verification starts on time across centres.
- Mid-exam: identify centres with low appeared/attempt progress (if available).
- Near closing: ensure attendance/verification are completed; track unresolved exceptions.

---

## Success Metrics

- Reduction in time-to-detect centre issues (offline / low battery / stalled progress).
- Reduction in time-to-triage (from alert to identifying the impacted centre/session).
- Higher completion rate of verification within expected time windows (fewer “unverified at start” cases).
- Lower rate of unmarked attendance at defined checkpoints (e.g., \(T+30\) mins from session start).
- Increased operator confidence / fewer manual status calls (qualitative).

---

## Page Overview (Single-Page UI)

### Page Title

**Central Monitoring Dashboard**

### Page Header Elements

**Title**

- Central Monitoring Dashboard

**Subtitle / Badge (context)**

- Scope badge: `All exams` (default) or `Filtered` (when filters applied)
- Last refresh: `[HH:MM:SS]` + “Auto-refresh ON/OFF”

**Actions**

- Refresh now
- Toggle auto-refresh (default ON during Active exams)
- Export snapshot (CSV) (optional; can be excluded for MVP—see exclusions)
- View alerts (opens right-side panel or scrolls to Alerts section)

**Filters**

- Exam status (default = Active): Active / Scheduled / Completed / All
- Exam selector (optional): All exams (default) or a specific exam
- Region / District (optional, if centres are tagged)
- Centre type: Permanent / Temporary / All
- Centre status: OK / At Risk / Critical / Unknown
- Node status: Online / Offline / Degraded / Unknown
- Session (optional): All / specific session window
- Search: Exam name/code OR Centre name/code OR city

---

## Visual Layout (ASCII Wireframe)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Central Monitoring Dashboard                                                               │
│ Scope: [All Active Exams ▼]  Last refresh: 10:42:18  Auto-refresh: [On]                    │
│ Filters: [Exam ▼] [Exam Status ▼] [Region ▼] [Centre Type ▼] [Centre Status ▼] [Node ▼]    │
│          [Session ▼] [Search exams/centres]                                                 │
│ Actions: [Refresh] [View Alerts] [Export Snapshot]                                          │
└────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Active Exams │ │ Centres      │ │ Sessions     │ │ Attendance   │ │ Verification │
│ In progress  │ │ Online/Offln │ │ Live/At Risk │ │ Marked %     │ │ Complete %   │
│ Needs attn   │ │ Critical     │ │ Stalled      │ │ Unmarked     │ │ Pending      │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Section: Active Exams (quick cards)                                                        │
│ [EXB-001 Active] Centres: 24  Offline: 1  Marked: 62%  Verified: 40%  Alerts: 3  [Open]    │
│ [EXB-002 Active] Centres: 12  Offline: 0  Marked: 71%  Verified: 65%  Alerts: 1  [Open]    │
└────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Section: Alerts & Exceptions (priority queue)                                               │
│ [Critical] EXB-001 / Centre C-018: Server offline (last seen 12m) | [At Risk] Battery 8%    │
└────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Section: Centre Operations Table                                                            │
│ Columns: Exam | Centre | Type | Status | Live sessions | Allocated | Present | Unmarked    │
│          Verified | Node health (server/client) | Last seen | Battery | Exceptions | →       │
└────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐ ┌───────────────────────────────────────────┐
│ Section: Progress Over Time (optional)       │ │ Section: Node Health Summary               │
│ Attendance/verification trend by time slice  │ │ Online/Offline/Degraded counts, last-seen  │
└──────────────────────────────────────────────┘ └───────────────────────────────────────────┘
```

---

## Section-by-Section Breakdown

### Section 1: Header (Context + Filters + Actions)

**What it shows**

- Global monitoring context (default: **all active exams**), refresh state, and filters (exam, exam status, region, centre/node status, session window, search).

**Why it exists**

- Ensures monitoring is interpreted within the correct operational scope (all active exams by default) and lets users quickly narrow down to the affected exam/region/centre.

**Decision it supports**

- “Which exam / region / centre do I need to monitor right now?”  
- “Do I need to refresh or check if data is stale?”

**Visual**

```text
┌──────────────────────────────────────────────────────────────┐
│ Scope: [All Active Exams ▼]  Last refresh: 10:42:18           │
│ Filters: [Exam] [Exam Status] [Region] [Centre Status] [Node] │
│          [Centre Type] [Session] [Search exams/centres]       │
│ Actions: [Refresh] [Auto-refresh On] [View Alerts]            │
└──────────────────────────────────────────────────────────────┘
```

---

### Section 2: KPI Summary Strip (Top Metrics)

**What it shows**

High-level KPIs across all exams/centres in the current scope (default: **active exams**), with the ability to filter to a specific exam:

- Active exams: In progress / Needs attention
- Centres: Total / OK / At Risk / Critical / Unknown
- Sessions: Total / Live / Completed / Upcoming / At Risk
- Students: Allocated / Checked-in (if tracked) / Unallocated (optional)
- Attendance: Present / Absent / Late / Unmarked + completion %
- Verification: Complete / Pending / Locked + completion %

**Why it exists**

- Provides instant situational awareness and a baseline expectation of progress.

**Decision it supports**

- “Are operations progressing normally overall?”  
- “Is the primary issue attendance, verification, or centre health?”

**Visual**

```text
┌──────────────┐
│ Attendance   │
│ 62% marked   │
│ Unmarked: 410│
│ [sparkline]  │
└──────────────┘
```

Notes:

- Sparkline is optional. If used, show last N refresh intervals.

---

### Section 3: Active Exams Overview (Quick Cards)

**What it shows**

A compact list/grid of **currently active** (and optionally scheduled) exams, each with:

- Exam code + name + status
- Centres: total + at risk/critical
- Attendance/verification completion %
- Alerts count (critical/at risk)
- CTA: “Open exam dashboard” (drills into the **Exam-Level Monitoring Dashboard**)

**Why it exists**

- In a command-centre view, operators often start by identifying **which exam** needs attention before drilling into centre/session details.

**Decision it supports**

- “Which exam should I open right now?”

**Visual**

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Active Exams                                                            │
│ [EXB-001 Active] Marked 62% | Verified 40% | Centres at risk: 2 | [Open] │
│ [EXB-002 Active] Marked 71% | Verified 65% | Centres at risk: 0 | [Open] │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Section 4: Alerts & Exceptions (Priority Queue)

**What it shows**

A prioritized list of exceptions across centres/sessions, grouped by severity:

- **Critical**: centre server offline, multiple nodes offline, no reporting beyond threshold, power/system outage flagged
- **At Risk**: low battery, degraded connectivity, high unmarked attendance, verification backlog
- **Stalled**: no change in attendance/verification counts for N minutes during active session
- **Data quality**: inconsistent totals (e.g., marked > allocated), missing capacity/session config

Each alert item includes:

- Severity badge
- Exam + centre + session (if applicable)
- Short reason + key value (e.g., “Last seen 12m”, “Battery 8%”)
- Timestamp / “since”
- CTA: “View centre” (drill-down) / “Acknowledge” (optional; can be excluded for MVP)

**Why it exists**

- Monitoring UIs are only effective if they direct attention to anomalies first.

**Decision it supports**

- “Where should we intervene now?”  
- “Which centre is most urgent to contact?”

**Visual**

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Alerts                                                                       │
│ [Critical] EXB-001 / Centre C-018: Server offline (last seen 12m)   [View]    │
│ [At Risk]  Centre C-004: Battery low (8%)                 [View]              │
│ [Stalled]  Centre C-023: No attendance updates (15m)      [View]              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### Section 5: Centre Operations Table (Primary Working Surface)

**What it shows**

A sortable, filterable table of centres with operational metrics:

- Exam (code/name)
- Centre Code + Name + City
- Centre type: Permanent/Temporary
- Centre status (derived): OK / At Risk / Critical / Unknown
- Live sessions count (and session window summary)
- Students: allocated, present, absent, late, unmarked
- Verification: complete, pending, locked (if applicable)
- Node health summary: server online/offline, #clients online, last seen
- Battery (min battery across nodes, or server battery if relevant)
- Exceptions indicator (count + top reason)
- Drill-down link to Centre detail (and optionally session detail)

**Why it exists**

- Provides the operational “grid” for scanning and comparing centres quickly.

**Decision it supports**

- “Which centres are at risk and why?”  
- “Which centres are behind on marking or verification?”

**Visual**

| Exam | Centre | Type | Status | Live sessions | Allocated | Present | Unmarked | Verified | Node | Last seen | Battery | Exceptions | →
|-----:|-------:|------|--------|---------------|----------:|--------:|---------:|---------:|------|----------|--------:|-----------|---|
| EXB-001 | C-018 ABC Govt School | Temp | Critical | 1 | 240 | 98 | 120 | 40 | Server: Offline | 12m | — | 2 | View |
| EXB-002 | C-004 XYZ College     | Perm | At Risk  | 2 | 320 | 210| 20  | 180| Server: Online, Clients: 8/10 | 1m | 8% | 1 | View |

---

### Section 6: Progress Over Time (Optional — if time-series is available)

**What it shows**

- Attendance completion % over time (e.g., last 60 minutes)
- Verification completion % over time
- Marked count delta per refresh interval

**Why it exists**

- Helps detect systemic slowdowns (e.g., network degradation across regions) and measure whether interventions improve throughput.

**Decision it supports**

- “Is progress accelerating or stalling across the system?”

**Visual**

```text
Attendance marked %
 100 |                           ╱────
  75 |                    ╱─────╱
  50 |             ╱─────╱
  25 |      ╱─────╱
   0 └────────────────────────────────
      10:00 10:15 10:30 10:45 11:00
```

---

### Section 7: Node Health Summary (Right Panel or Bottom Block)

**What it shows**

- Totals by node status: Online / Offline / Degraded / Unknown
- Centres with “no heartbeat” beyond threshold
- Lowest battery centres (top 5)
- Last-seen distribution (e.g., <1m, 1–5m, 5–15m, >15m)

**Why it exists**

- Provides a quick technical health scan and early warning for infrastructure instability.

**Decision it supports**

- “Is the problem localized to a few centres or systemic?”

**Visual**

```text
┌───────────────────────────────────────────┐
│ Node Health                               │
│ Online: 94   Degraded: 6   Offline: 3     │
│ No heartbeat (>10m): 2 centres            │
│ Lowest battery: C-004 (8%), C-019 (11%)   │
└───────────────────────────────────────────┘
```

---

## States & Scenarios (Must Document)

### Loading State

- Show skeleton KPI cards + skeleton table rows.
- Header remains visible with scope context and disabled actions until first load completes.
- If auto-refresh is enabled, show subtle “Refreshing…” indicator without blocking interactions.

### Empty States

**Empty 1: No exams available (system not configured)**

- Message: “No exams found.”  
- Guidance: “Create an Exam Board exam in admin to start monitoring.”

**Empty 2: No active exams in scope**

- Message: “No active exams right now.”  
- Guidance: “Change the Exam Status filter to Scheduled/Completed, or select a specific exam.”

**Empty 3: No centres match the current filters**

- Message: “No centres found for the selected filters.”  
- Guidance: “Clear filters or broaden scope (All exams / All regions).”

**Empty 4: Specific exam selected but no centres linked**

- Message: “No centres added for this exam.”  
- Guidance: “Add permanent centres or create temporary centres to begin allocations.”

**Empty 5: Specific exam selected but no sessions configured**

- Message: “No sessions configured for centres under this exam.”  
- Guidance: “Create sessions under each exam centre before allocation and monitoring.”

**Empty 6: Specific exam selected but no students allocated**

- Message: “No students allocated yet.”  
- Guidance: “Allocate students to a session to enable attendance/verification monitoring.”

### Error States

- **Data fetch failed**: show retry banner + last successful refresh timestamp.
- **Partial data**: show warning “Some centres are not reporting. Metrics may be incomplete.”
- **Inconsistent data**: show “Data mismatch detected” flag per centre row; provide drill-down.

### Stale Data / Connectivity Scenarios

- If “last refresh” exceeds threshold (e.g., >2 minutes), show a **stale badge** in header.
- If centre node last-seen exceeds threshold (e.g., >10 minutes), elevate to At Risk/Critical based on policy.
- Always show the timestamp basis for “live” vs “stale” computations.

### Permissions / Access

- If user lacks permission: show “You don’t have access to monitoring.”
- Region-scoped roles: only show centres in assigned region; KPIs reflect scoped dataset.

### Exam Lifecycle Scenarios

- **Draft/Scheduled**: monitoring emphasizes configuration completeness (centres/sessions/allocations) rather than real-time alerts.
- **Active**: auto-refresh default ON; exceptions enabled.
- **Completed**: auto-refresh OFF; show final summary (still read-only).

---

## Data Requirements

> Note: MVP data entry is via Django Admin (as per PRD). This UI consumes aggregated, read-only data.

### Core Context

| Field Name | Data Type | Format / Example | Required | Source |
|---|---|---:|:---:|---|
| scope_exam_status | Enum | Active/Scheduled/Completed/All | Yes | Filter selection |
| scope_exam_id | UUID/Int | `42` | No | Filter selection |
| scope_region_id | UUID/Int | `7` | No | Filter selection |
| scope_centre_type | Enum | Permanent/Temporary/All | No | Filter selection |
| scope_node_status | Enum | Online/Offline/Degraded/Unknown/All | No | Filter selection |
| last_refresh_at | Datetime | `2026-02-12 10:42:18` | Yes | UI/client |

### Centre Table Fields (per centre row)

| Field Name | Data Type | Format / Example | Required | Source |
|---|---|---:|:---:|---|
| exam_id | UUID/Int | `42` | Yes | ExamBoardExam |
| exam_code | String | `EXB-2026-001` | Yes | ExamBoardExam |
| exam_name | String | `State Civil Services 2026` | No | ExamBoardExam / Online exam metadata |
| centre_id | UUID/Int | `901` | Yes | ExamCentre |
| centre_code | String | `C-018` | Yes | Centre or ExamCentre temp code |
| centre_name | String | `ABC Govt School` | Yes | Centre / ExamCentre (temp) |
| centre_type | Enum | Permanent/Temporary | Yes | ExamCentre |
| city | String | `Madurai` | No | Centre/ExamCentre |
| capacity | Int | `300` | Yes | ExamCentre/Session capacity basis |
| live_sessions_count | Int | `1` | Yes | Derived from ExamSession time window |
| allocated_students | Int | `240` | Yes | StudentAllocation (filtered) |
| attendance_present | Int | `98` | Yes | StudentAllocation |
| attendance_absent | Int | `22` | Yes | StudentAllocation |
| attendance_late | Int | `0` | Yes | StudentAllocation |
| attendance_unmarked | Int | `120` | Yes | Derived (allocated - marked) |
| verification_complete | Int | `40` | Yes | StudentAllocation verification flags |
| verification_pending | Int | `200` | Yes | Derived |
| verification_locked | Int | `35` | No | Allocation lock field (if exists) |
| server_status | Enum | Online/Offline/Unknown | Yes | CentreNode (server) |
| clients_online | Int | `8` | No | CentreNode (client) |
| clients_total | Int | `10` | No | CentreNode (client) |
| last_seen_at | Datetime | `2026-02-12 10:41:52` | Yes | CentreNode |
| min_battery_pct | Int | `8` | No | CentreNode battery |
| exceptions_count | Int | `2` | Yes | Derived rule engine |
| centre_risk_status | Enum | OK/At Risk/Critical/Unknown | Yes | Derived |

### Derived Metric Definitions (must be consistent)

- **Attendance marked** = Present + Absent + Late  
- **Attendance completion %** = Attendance marked / Allocated students  
- **Unmarked** = Allocated students − Attendance marked  
- **Verification complete** = count of students meeting configured verification completeness rule (see below)

Verification completeness rule (define per policy):

- MVP default: `photo_captured == true` AND `biometric_completed == true`
- If evidence is optional, provide a toggle/label: “Verification = photo + biometric” (avoid ambiguity)

Risk status (suggested policy; adjust per operations):

- **Critical** if server offline OR no heartbeat > 10m during Active OR multiple alerts present
- **At Risk** if degraded connectivity OR min battery < 15% OR unmarked above threshold at checkpoint
- **Unknown** if no node data has ever been received
- **OK** otherwise

---

## What This UI Intentionally Excludes

This UI intentionally excludes:

- **Editing centres/sessions/students** → Monitoring is read-only; setup is via Admin (MVP).
- **Performing attendance/verification actions** → Done by Centre Staff in Session Detail UI.
- **Real-time chat/calling workflows** → Keep MVP focused; external comms handled outside system.
- **Detailed audit logs** → Available in audit views/admin; dashboard only surfaces summary + exceptions.
- **Candidate PII** → Central monitoring should avoid exposing student-level identity unless explicitly required and permissioned.

---

## Related Documentation

- Design Files: (to add)
- Prototype: (to add)
- Technical Specs: Exam Board PRD / backend model specs (to add)
- User Research: (to add)

