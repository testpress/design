# AI Interview Architect UI Documentation

**UI Name:** AI Interview Architect (/jobs/design)
**Date:** 2026-04-28

---

## Purpose of This UI

This UI functions as a **trustable AI-driven hiring system designer**. It empowers hiring managers to translate a raw hiring intent into a complete, structured, and explainable hiring system. The UI must help users understand, validate, and refine the AI's generated plan before accepting it, establishing the foundational "brain" of the company's hiring process for that role. 

*Note: Plans created here form the basis of the entire hiring system and can later be reused as templates for similar roles.*

---

## Problem Statement

### Without This UI
* Hiring managers struggle to design comprehensive interview loops from scratch, often leaving rounds vague.
* AI-generated outputs often act as "black boxes" where users cannot see why certain rounds or priorities were selected.
* Interview signals lack actionable instructions, leading to inconsistent evaluations by different interviewers.

### How This UI Solves It
* Converts raw text into a structured system of execution units (Rounds & Signals).
* Provides an "Interpretation Layer" so the user can verify the AI correctly understood the intent before looking at the output.
* Forces clarity by defining exactly what the candidate must do and what evidence the interviewer must capture in every round.

---

## Target Audience
* **Primary Users:** Hiring Managers, Recruiters.
* **User Goals:** Generate, validate, and trust a comprehensive evaluation framework for a specific role in minutes.

---

## Page Overview

### Multi-Page / Stateful UI Navigation

```text
View 1: [INPUT VIEW]
  ↓ (User enters intent & clicks Generate)
View 2: [REVEAL VIEW]
```

**Navigation Flow:**
* **INPUT VIEW:** Displays a prompt (`IntentPanel`) where the user describes the role.
* **REVEAL VIEW:** Displays the generated hiring system. Contains clear Next Action CTAs at the bottom to continue, as well as options to regenerate or refine if the AI output misses the mark.

---

## Visual Layout (ASCII Wireframe)

### View 1: INPUT VIEW

```text
┌──────────────────────────────────────────────────────────────┐
│ [← Back to Jobs] | AI Interview Architect                    │
└──────────────────────────────────────────────────────────────┘

                          Design with Intent
      Translate your hiring needs into a structured process.
      
      ┌──────────────────────────────────────────────────┐
      │ (IntentPanel)                                    │
      │ I need a Senior React Developer who is great at  │
      │ performance optimization...                      │
      │                                                  │
      │                          [ ✨ Generate Process ] │
      └──────────────────────────────────────────────────┘
```

### View 2: REVEAL VIEW

```text
┌──────────────────────────────────────────────────────────────┐
│ [← Back to Jobs] | AI Interview Architect     [⟲ Regenerate] │
└──────────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │ Summary & AI Interpretation                             │
   │ Role: Senior React Developer | Seniority: Senior        │
   │ Total Evaluation Time: ~2 hrs 15 mins | Rounds: 3       │
   │ Focus Areas: React, Web Vitals, Mentorship              │
   │                                                         │
   │ ℹ️ Generated based on industry-standard frontend patterns │
   └─────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │ Role Definition                                         │
   │ Responsibilities: Own frontend architecture, mentor...  │
   │ Key Expectations: Ship performant UI, lead code reviews │
   └─────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │ Strategy                                                │
   │ Philosophy: Independent contributor with system focus.  │
   │ Rationale: Seniority demands architectural thinking.    │
   │ Impact on Evaluation: Heavy indexing on system design.  │
   └─────────────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────────────┐
   │ Round 1: Recruiter Screen (Screening) - 30 mins         │
   │ Purpose: Filters basic alignment before deeper technical│
   │ Format: Phone Interview                                 │
   │ Candidate Task: Discuss past roles and career goals.    │
   │ Evidence Captured: Provides at least 2 concrete examples│
   │ of past architectural impact.                           │
   │                                                         │
   │ Signals:                                                │
   │ ├─ [▮▮▮▮▮] Communication (50%)                          │
   │ │  Justification: Baseline requirement for remote work. │
   │ └─ [▮▮▮▮▮] Culture Fit (50%)                            │
   │    Justification: Ensures alignment with core values.   │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ Round 2: System Design (Technical) - 60 mins            │
   │ ...                                                     │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ Round 3: Leadership & Behavioral (Interview) - 45 mins  │
   │ ...                                                     │
   └─────────────────────────────────────────────────────────┘
   
   ┌─────────────────────────────────────────────────────────┐
   │ [ Edit Intent ]               [ Save & Setup Interviews ➔ ]
   └─────────────────────────────────────────────────────────┘
```

---

## Section-by-Section Breakdown (Reveal View)

### 1. Summary & AI Interpretation
**What it shows:** Top-level scan summary (Role, Seniority, Total Time, Total Rounds) and Focus Areas.
**Why it exists:** Allows the user to scan the entire framework in <10 seconds and verifies the AI correctly understood the prompt before reading further.

### 2. Role Definition
**What it shows:** Core Responsibilities and Key Expectations.
**Why it exists:** Grounds the entire evaluation plan. Ensures interview rounds aren't floating without context.

### 3. Strategy
**What it shows:** Hiring Philosophy, Rationale, and *How this impacts evaluation*.
**Why it exists:** Explains *why* the process is structured the way it is, tying the philosophy directly to actionable round designs.

### 4. Rounds (Execution Units)
**What it shows:** Name, Order, Type, Duration, Purpose, Format, Candidate Task, and Evidence Captured. 
**Why it exists:** Upgrades rounds from simple labels into actual execution guides for interviewers. The *Purpose* field explains why the round exists in the flow.
* **Round Type Meaning:** Types are standardized categories that define evaluation intent: `screening` → initial filtering; `technical` → skill depth; `interview` → behavioral/leadership.
* **UI Hint (Progression):** Rounds should visually show a progression (e.g., Screening → Evaluation → Decision) rather than just a stacked list, emphasizing that this is a cohesive system.
* **Evidence Quality:** Evidence must be objective and measurable (e.g., "Identifies at least 3 bottlenecks") rather than subjective ("Gives good feedback").

### 5. Signals
**What it shows:** Scannable breakdown of what to evaluate in each round, including justification.
**UI Hint (Visualization):** Show the weight visually (e.g., a progress bar, badge, or percentage) and highlight the top-weighted signal per round so it can be scanned instantly.

### 6. Failure Handling & Edge States
**What it shows:** Top navigation `[Regenerate]` button and bottom `[Edit Intent]` button.
**Empty / Edge States:** UI should handle incomplete, malformed, or low-confidence AI outputs gracefully by prompting the user to refine their intent rather than displaying a broken page.

### 7. Editability Layer
**What it shows:** 
* **Inline basic edits:** User can adjust signal weights or rename rounds directly on this screen.
* **Deep advanced edits:** Completely overhauling a round's structure happens on the *next* screen after saving.

### 8. Next Actions (CTA)
**What it shows:** Actionable button at the bottom of the page (`Save & Setup Interviews ➔`).
**Why it exists:** Provides a clear path forward. Prevents a dead-end UX.

---

## UI Design Goals

The UI design must enable:
* **Fast understanding:** Users should be able to scan the entire system in <10 seconds.
* **Trust:** Clean typography and clear hierarchies build confidence in the AI's output.
* **Immediate Usability:** Rounds and Signals should read like a manual an interviewer could pick up and use immediately.

---

## Sample JSON Mock Data

```json
{
  "summary": {
    "total_evaluation_minutes": 135,
    "rounds_count": 3
  },
  "interpretation": {
    "role": "Senior React Developer",
    "seniority": "Senior",
    "focus_areas": [
      "Performance Optimization",
      "System Architecture",
      "Mentorship"
    ]
  },
  "role_definition": {
    "responsibilities": [
      "Own complex frontend architectural decisions",
      "Mentor junior engineers on the team"
    ],
    "key_expectations": [
      "Improve Core Web Vitals",
      "Deliver highly reusable UI components"
    ]
  },
  "strategy": {
    "philosophy": "We need an independent contributor who can balance clean code with practical product delivery.",
    "rationale": "Given the Senior requirement and performance focus, evaluation heavily indexes on system design over syntax.",
    "impact_on_evaluation": "System design is prioritized early, and live coding focuses on DOM optimization rather than algorithmic puzzles."
  },
  "rounds": [
    {
      "id": "r1",
      "order": 1,
      "name": "Initial Recruiter Screen",
      "type": "screening",
      "duration_minutes": 30,
      "purpose": "Filters basic alignment and verifies communication baseline before deeper technical evaluation.",
      "format": "Phone Interview",
      "candidate_task": "Discuss past roles, technical leadership experience, and compensation expectations.",
      "evidence_captured": "Provides at least 2 concrete examples of past architectural decisions and their business impact.",
      "signals": [
        {
          "id": "sig1",
          "name": "Communication Clarity",
          "weight": 0.5,
          "description": "Ability to explain complex projects simply.",
          "justification": "Baseline requirement for senior remote roles."
        },
        {
          "id": "sig2",
          "name": "Culture Fit",
          "weight": 0.5,
          "description": "Alignment with core company values.",
          "justification": "Ensures they can collaborate effectively without ego."
        }
      ]
    },
    {
      "id": "r2",
      "order": 2,
      "name": "Frontend System Design",
      "type": "technical",
      "duration_minutes": 60,
      "purpose": "Evaluates architectural depth and ability to design complex client-side applications.",
      "format": "Whiteboard Discussion",
      "candidate_task": "Design the state management and component hierarchy for a real-time analytics dashboard.",
      "evidence_captured": "Identifies at least 3 concrete trade-offs between global state and local state with real-world examples.",
      "signals": [
        {
          "id": "sig3",
          "name": "Architecture Patterns",
          "weight": 0.6,
          "description": "Knowledge of advanced component patterns.",
          "justification": "Crucial for preventing tech debt in complex UIs."
        },
        {
          "id": "sig4",
          "name": "Performance Optimization",
          "weight": 0.4,
          "description": "Strategies for dealing with large DOM nodes.",
          "justification": "Directly impacts the core priority of Web Vitals."
        }
      ]
    },
    {
      "id": "r3",
      "order": 3,
      "name": "Leadership & Code Review",
      "type": "interview",
      "duration_minutes": 45,
      "purpose": "Assesses mentorship capabilities and code quality standards in a practical scenario.",
      "format": "Mock Code Review",
      "candidate_task": "Review a flawed PR submitted by a 'junior developer' and provide feedback.",
      "evidence_captured": "Identifies at least 3 performance bottlenecks and writes constructive feedback comments focused on 'why', not just 'what'.",
      "signals": [
        {
          "id": "sig5",
          "name": "Mentorship",
          "weight": 0.5,
          "description": "Ability to guide rather than just correct.",
          "justification": "Senior engineers act as multipliers for the rest of the team."
        },
        {
          "id": "sig6",
          "name": "Code Quality Standards",
          "weight": 0.5,
          "description": "Catching edge cases and anti-patterns.",
          "justification": "Maintains the integrity of the core platform."
        }
      ]
    }
  ]
}
```
