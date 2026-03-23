# Client Request Video:

<https://www.loom.com/share/e62c7e4ffdca41c8a1241b6e2d31f558?sid=04285b91-beef-4dac-8bce-3cd90308fb33>

# Overview

## **Client Requirement**

Zara Tutorials, a Testpress client conducting weekly SAT practice, needs a way to display projected SAT scores to students using their historical performance. The projected scores should estimate the student’s potential SAT performance based on averages of their past practice exams.

## **Feature Introduction**

To support this, Testpress will introduce a new **Student Report Card** feature.

## **Purpose**

At Level 1, the Report Card will let admins create **report card sections** (e.g., “Reading & Writing”, “Math”, “Total SAT Projection”) that group multiple exams.
These sections compute and display **aggregated performance metrics** including averages, totals, and additional insights.

In future levels, these sections will also support non-exam items such as assignments, videos, or custom learning units — without needing a redesign.

## **Functionality**

Admins can create report card sections and include items inside them (currently: exams; future-proof for other content types).
Students see their computed metrics per section.

## **Impact**

* Delivers SAT projection as required by Zara Tutorials
* Establishes a scalable **Report Card framework** not limited to exams
* Enables long-term performance insights instead of isolated scores


# Problem Statement

Zara Tutorials administers weekly SAT practice tests, but students currently only see scores for individual attempts.
There is no way to view:

* aggregated performance
* historical trends
* projected SAT capability

Additionally, Testpress lacks a framework to group related learning items (currently exams) into meaningful categories.

A **Student Report Card** is needed to group multiple assessments and compute projection metrics.


# Objective

## **Purpose**

Introduce a **Student Report Card** that allows grouping related assessments and configuring how projection scores are calculated (average, total, rounding, percentile, etc.).
Compute additional insights like trend, consistency, percentile, and attempt count.

## **Users**

### **Admins**

* Create and manage **Report Card Sections**
* Add items to each section (currently exams; future-ready for other items)
* Configure scoring logic (average, total, rounding, percentile)

### **Students**

* View consolidated SAT projection and associated insights
* Understand long-term performance trends

### **Functionality**

Admins define Report Card Sections and link items to them.
Each section supports:

* average or total score
* rounding mode
* optional percentile calculation

The system computes:

* projection score
* trend
* consistency
* percentile
* attempt count

### **Key Outcomes**

* Flexible scoring system aligned with institute needs
* Deep performance insights for students
* Reusable computation pipeline independent of “exams”


# **User Stories**

## **1. As a Parent**

As a parent, I want to see the student’s average English and Math scores clearly summarized at the top of the report card, so that I can immediately understand how my child is performing in both key SAT sections.

**Acceptance Criteria**

* Report card shows:
  * English average score
  * Math average score
  * Total score = (English Avg + Math Avg)
* Values must be rounded and formatted cleanly.
* Appears at the top of the public report card.
* Loads quickly and is mobile-friendly.


---

## **2. As a Parent**

As a parent, I want a single combined total score so that I can quickly get a holistic understanding of my child’s readiness.

**Acceptance Criteria**

* Total score = sum of English and Math averages.
* Displayed prominently and visually separated.
* Works even if the student has taken only one exam in a section.


---

## **3. As a Student**

As a student, I want a clear summary of my average section-wise performance, so that I know how I am doing overall.

**Acceptance Criteria**

* Summary reflects all my English attempts.
* Summary reflects all my Math attempts.
* Correctly updates when I give new exams.


---

## **4. As an Instructor**

As an instructor, I want the system to automatically calculate section averages, so that I don't have to manually prepare weekly progress summaries.

**Acceptance Criteria**

* English average is automatically computed.
* Math average is automatically computed.
* Total score automatically updates on every new attempt.
* No manual intervention required.


---

## **5. As an Admin**

==As an admin, I want an easy way to add new exams to an existing report card without manually editing report card settings every week, so that the report card always stays up-to-date automatically.==

(When discussed with Shantanu regarding the below and after pointing out issues related to auto-including future exam is not solid plan. Not included in current scope due to tight deadlines)

### **Acceptance Criteria**

* Admin can configure a ReportCardGroup (e.g., “SAT English”) to automatically include:
  * **All future exams in a selected course**, OR
  * **All future exams matching a selected name (e.g., “English”)**.
* When a new exam is created in the course:
  * The system automatically detects it.
  * If the exam’s section(s) match the group rules, it is **auto-added** to the report card.
* No weekly manual actions required by the admin.
* Admin can override auto-selection rules for any specific item if needed.
* Newly added exams become visible on the report card within minutes (or immediately if synchronous).
* Auto-selection rules must not break even if:
  * An instructor renames an exam
  * An exam is added to another chapter
  * Multiple admins are adding exams simultaneously

### **Examples**

* **Example 1:** ReportCardGroup “SAT English” → rule = “Include all exam sections named English from Course X”. Instructor creates a new SAT weekly exam → system finds English section → auto-adds it.
* **Example 2:** ReportCardGroup “SAT Math” → rule = “Include all exams from Module ‘SAT Weekly Tests’”. Every new weekly test automatically appears in the report card → no admin effort needed.

# **Use Cases**

## **Display Section-Wise Score Summary in Public Report Card**

### **Actor(s)**

* **Primary Actor:** Parent (viewer of public report card)
* **Secondary Actors:**
  * Student
  * Instructor
  * LMS System (auto-calculation engine)


---

### **Preconditions**


1. Student has attempted at least one SAT English or Math exam.
2. Public Report Card URL is generated and active.
3. All exam attempts have valid scores stored in the system.
4. Difficulty breakdown is already implemented and functioning (though not part of this UC).


---

## **Main Flow (Step-by-Step)**

### **1. Parent opens the Public Report URL**

* The parent accesses the link shared by the institute or student.

### **2. System retrieves all scored exam attempts**

* LMS fetches:
  * All English-section UserExam records.
  * All Math-section UserExam records.

### **3. System computes averages**

* **English Average Score** = (sum of English exam scores) / (number of English attempts)
* **Math Average Score** = (sum of Math exam scores) / (number of Math attempts)
* Rounding rules applied (nearest integer).

### **4. System computes Total Score**

* **Total Score = English Average + Math Average**

### **5. System renders Summary Block at the top**

The top section of the report card shows:

| Metric | Value |
|----|----|
| English Average | e.g., 320 |
| Math Average | e.g., 340 |
| Total Score | 660 |

Formatting:

* Clean, minimal UI.
* Large typography.
* Works well on mobile.

### **6. Parent views detailed results below**

* Existing difficulty-level analysis and exam-level details appear below the summary block.


---

## **Alternate Flows**

### **A1: Student has no English attempts**


1. System displays Math Average normally.
2. English Average shows: **“No attempts yet”**.
3. Total Score = Math Average.

### **A2: Student has no Math attempts**


1. System displays English Average normally.
2. Math Average shows: **“No attempts yet”**.
3. Total Score = English Average.

### **A3: Student has no attempts in either section**


1. System displays a summary block with:
   * English: **“No attempts yet”**
   * Math: **“No attempts yet”**
   * Total Score: **“Not available”**
2. Report card still loads difficulty breakdown if available.

### **A4: Data retrieval failure**

* System shows a fallback message: **“Unable to load summary at the moment. Please refresh.”**
* Detailed view still attempts to load available data.


---

## **Postconditions**


1. Parent has a clear, simple understanding of the student’s performance.
2. All averages reflect accurate, real-time scores.
3. Total score correctly sums English and Math averages.
4. No manual intervention required from instructors.
5. System reduces the need for offline/Excel-based weekly progress card creation.


Below is a **clean, concise, implementation-ready Functional Requirements section** based on our final model design and the client’s requirement (English Avg, Math Avg, Total Score, plus future extensibility with curricular/extracurricular sections).


---

# **Functional Requirements**

## **1. Report Card Setup (Admin Features)**

### **1.1 Create & Manage Report Cards**

* **FR-1**: The admin must be able to create a new **ReportCardLayout** with a title, academic period, and optional metadata (footer notes, branding, remarks).
* **FR-2**: The admin must be able to edit or deactivate an existing report card layout.

### **1.2 Configure Report Card Sections**

* **FR-3**: The admin must be able to create one or more **ReportCardSections** within a ReportCardLayout.
* **FR-4**: The admin must be able to set a section **type** (e.g., *curricular, extracurricular, behavioral, attendance, remarks,* etc.).
* **FR-5**: The admin must be able to reorder sections.

### **1.3 Map Sections to Academics or Custom Inputs**

* **FR-6**: For **curricular** sections, the admin must be able to select:
  * One or more **Exams**
  * OR one or more **Exam Sections** (if supported in future)
* **FR-7**: For **non-curricular** sections, the admin must be able to enter custom metrics (e.g., participation, discipline, sports rating, attendance %).

### **1.4 Student Enrollment**

* **FR-8**: The system must generate a **ReportCardInstance** for each selected student based on the layout.


---

## **2. Student Score Aggregation**

### **2.1 Calculating Curricular Metrics**

* **FR-10**: For each curricular section, the system must calculate:
  * Average score across all selected exams.
  * Percentage representation of the student's performance.
* **FR-11**: When multiple curricular sections exist (e.g., English, Math), the system must calculate:
  * A **total composite score** using the section-level averages.
  * Ensure formula = sum of averages unless admin overrides in future.

### **2.2 Handling Exam Attempts**

* **FR-12**: The system must only include **completed attempts** made by the student.
* **FR-13**: The system must ignore:
  * Unattempted exams
  * Exams not assigned to this report card
  * Draft/unpublished attempts


---

## **3. Report Card Rendering (UI + Data Presentation)**

### **3.1 Student View**

* **FR-14**: A student must be able to view their report card in a clean, school-like format.
* **FR-15**: The report card must display:
  * Section name
  * The calculated score/average for each curricular section
  * Custom values for extracurricular or other section types
  * Total score at the bottom for each curricular report card section

### **3.2 Admin View / Preview**

* **FR-16**: Admins must be able to preview the report card layout before publishing it to students.
* **FR-17**: Admin must be able to download or print report cards (PDF export optional).


---

## **4. Data Handling & Storage**

### **4.1 Instances & Caching**

* **FR-18**: The system must store **ReportCardInstance** objects for each user.
* **FR-19**: Calculated metrics (avg, total) must be stored to avoid recalculation on every page load.
* **FR-20**: The system must allow recalculating metrics when needed (e.g., new exam attempt submitted).

### **4.2 Security & Permissions**

* **FR-21**: Students can only view their own report cards.
* **FR-22**: Admins can view, edit, and regenerate report cards for any student in their institution.


---

## **5. Extensibility & Future-Proofing**

### **5.1 Section Types**

* **FR-23**: The system must support additional section types (e.g., Attendance, Remarks) without schema changes.
* **FR-24**: Each section type must allow configurable input mechanics:
  * Auto-calculated (curricular)
  * Manually entered (extracurricular)
  * Auto-fetched (future: attendance, behavior metrics)

### **5.2 Multi-term or Multi-course Support**

* **FR-25**: A report card layout must be reusable across multiple courses or academic terms if the admin chooses.


---

# **Task Checklist**

### *High-level, independently reviewable, UI-first workflow*


---

## **PR 1 — Report Card Admin UI (Top-level UI for creating report cards)**

- [ ] Build UI to **create/edit ReportCards** (title, description, student_title, visibility).
- [ ] Create a clean layout preview of a Report Card (admin view).


---

## **PR 2 — ReportCardSection Admin UI**

- [ ] UI to **add/view/edit sections** inside a ReportCard (title, type, description, order).
- [ ] Allow add/remove/drag-sort sections.
- [ ] UI toggle for **show_total_score**.
- [ ] Basic validation (title required, type required).


---

## **PR 3 — ReportCardGroup Admin UI**

- [ ] UI to create/edit groups inside a section (title, description, rounding_precision, show_average).
- [ ] Drag-sort handling for group order.
- [ ] Inline UI showing count of attached items.
- [ ] Form-level validation (at least one item required before publishing).


---

## **PR 4 — ReportCardItem Admin UI (Exam & Exam Section picker)**

- [ ] UI to add items under each group using **Exam picker** and **Exam Section picker**.
- [ ] Ensure item type selection (Exam vs Exam Section) changes input fields dynamically.
- [ ] Prevent duplicates inside the same group.
- [ ] Display summary list of items (e.g., "Weekly SAT 1 – English Section").


---

## **PR 5 — Student Report Card UI (Front-end student layout)**

> ==Ignore this task for now because for Zara Tutorials we will just show the data in existing Public Report Card UI. Once the feature is live for them, we will implement a new student side UI - Shantanu==

- [ ] Create the **report card layout** with boxes (sections + groups) in a school-style table format.
- [ ] For each group, show student’s **average score, total score**, attempt count.
- [ ] Add support for section-level computed totals (e.g., SAT Total = Eng + Math).
- [ ] Show footer, remarks box (if enabled).


---

## **PR 6 — Data Model Implementation**

- [ ] Implement all admin-side models: ReportCard, ReportCardSection, ReportCardGroup, ReportCardItem.
- [ ] Implement student-side models: StudentReportCard, StudentReportCardSection, StudentReportCardGroup.
- [ ] Add constraints (unique items, only one content source, exam vs exam_section validation).
- [ ] Add migrations and basic admin integration.


---

## **PR 7 — Domain Logic: Score Computation Engine**

- [ ] Write computation functions for each group → calculate avg, total, attempts.
- [ ] Support both **Exam** and **Exam Section** scorings.
- [ ] Create reusable service functions (`compute_group_score(user, group)`).
- [ ] Add caching or storing results into StudentReportCardGroup.


---

## **PR 8 — Integration: UI ↔ Domain Logic ↔ Models**

- [ ] Integrate student-side UI with StudentReportCardGroup data.
- [ ] On report card load, fetch + compute any missing values.
- [ ] Ensure real-time update after new attempts.
- [ ] Add permission checks (student only sees their own card).


---

## **PR 9 — QA, Validation & Edge Cases**

- [ ] Add unit tests for computation logic (avg, totals, rounding).
- [ ] Validate admin inputs (groups must have valid items).
- [ ] Handle cases: no attempts, only exam sections attached, mixed types.
- [ ] Verify UI gracefully handles empty sections/groups.


---

## **PR 10 — Final Review & Performance Tuning**

- [ ] Add prefetch/select_related in queries to avoid N+1.
- [ ] Polish UI (consistent fonts, section dividers, score alignment).
- [ ] Add loading states & error messages on student side.
- [ ] Final regression tests across exam & exam-section mappings.