## **Overview**

* The Admin Dashboard is a centralized command center within the OTT SaaS platform that provides admins and staff with a real-time overview of platform status, content readiness, and key business metrics.
* It consolidates critical information such as content publishing status, transcoding progress, user activity, and revenue snapshots into a single, accessible view.
* The feature enables users to quickly understand what is happening across the platform, identify items that require attention, and take immediate action without navigating across multiple sections.
* It addresses the lack of a unified view by bringing together operational, content, and business insights, reducing dependency on multiple pages for basic decision-making.
* The dashboard improves efficiency by highlighting actionable insights such as unpublished content, pending processes, and recent activities, helping admins manage the platform more effectively.
* It enhances usability for both business owners and operational staff by balancing monitoring and action-driven workflows, ensuring faster decision-making and smoother day-to-day operations.

  

## **Problem Statement**

* Admins and staff lack a centralized view to understand overall platform status, requiring navigation across multiple sections to gather basic information.
* There is no clear visibility into content readiness, making it difficult to identify which assets are incomplete, not transcoded, or not published.
* Operational issues such as failed or pending transcoding jobs are not immediately visible, leading to delays in content availability.
* Key business indicators like revenue and active subscriptions are not easily accessible at a glance, limiting quick decision-making.
* Admins do not have a structured way to identify what requires immediate attention versus what is functioning normally.
* The absence of a unified dashboard increases time spent on routine checks and reduces overall operational efficiency.

  

## **Objective**

* Provide a centralized dashboard that gives a real-time overview of platform status, content readiness, and key business metrics.
* Enable admins and staff to quickly understand what is happening, what requires attention, and what actions need to be taken.
* Allow users to access critical insights such as content status, transcoding progress, user activity, and revenue snapshots without navigating multiple sections.
* Support both business-focused users (admins) and operational users (staff) by balancing high-level visibility with actionable cues.
* Improve operational efficiency by reducing time spent on manual checks and enabling faster, informed decision-making.
* Ensure smoother day-to-day platform management by surfacing issues early and guiding users toward next steps.

  

## **User Stories**

### **View Platform Status at a Glance**

As an admin, I want to see a consolidated overview of platform activity and performance, so that I can quickly understand the current state of my OTT platform.

**Acceptance Criteria**

* Dashboard displays key metrics such as total content, published vs unpublished content, active subscriptions, and revenue snapshot
* Data is updated in near real-time or at defined intervals
* Information is visible without navigating to other sections
* Metrics are presented in a clear and easily understandable format


---

### **Identify Content That Requires Attention**

As a content manager, I want to know which content is incomplete or not ready, so that I can take action to publish it.

**Acceptance Criteria**

* Dashboard shows counts of content that are not transcoded, missing required assets, or not published
* “Ready to publish” content is clearly indicated
* Clicking on any category redirects to the relevant filtered list page
* Data reflects the latest content status


---

### **Monitor Transcoding and Processing Status**

As an operational staff member, I want to track transcoding progress and failures, so that I can ensure content processing is completed without issues.

**Acceptance Criteria**

* Dashboard displays number of ongoing, completed, and failed transcoding jobs
* Failed jobs are clearly highlighted
* Recent processing activity is visible
* Clicking on the section navigates to the processing queue page


---

### **Access Key Business Metrics Quickly**

As a business owner, I want to view revenue and subscription insights at a glance, so that I can make quick business decisions.

**Acceptance Criteria**

* Dashboard shows revenue for today and current period
* Active subscription count is displayed
* Metrics are summarized and easy to interpret
* Data is consistent with analytics pages


---

### **Perform Quick Actions from Dashboard**

As an admin or staff user, I want quick access to common actions, so that I can efficiently manage the platform without unnecessary navigation.

**Acceptance Criteria**

* Dashboard includes shortcuts for actions like uploading content, creating movies/series, and accessing the design page
* Actions are easily accessible and clearly labeled
* Clicking an action takes the user to the correct workflow page
* Actions are available based on user permissions


## **Use Cases**

### **Access Dashboard Overview**

**Actors**

* Admin
* Staff User

**Preconditions**

* User is logged into the OTT admin platform
* User has permission to access the dashboard

**Main Flow**


1. User logs into the platform
2. System redirects user to the Admin Dashboard (or user navigates to it)
3. System loads and displays key metrics including content summary, revenue snapshot, user metrics, and recent activity
4. User views the consolidated information without navigating to other modules

**Alternate Flows**

* If data is temporarily unavailable, system displays fallback state (e.g., “Data not available” or last updated timestamp)

**Postconditions**

* User gains a clear understanding of current platform status


---

### **Identify Content Requiring Attention**

**Actors**

* Admin
* Content Manager

**Preconditions**

* Content assets exist in the system
* Some content may be incomplete (e.g., not transcoded, missing metadata, not published)

**Main Flow**


1. User accesses the dashboard
2. System displays content readiness indicators (e.g., not transcoded, missing assets, unpublished)
3. User reviews the counts and identifies areas needing attention
4. User selects a specific category (e.g., unpublished content)
5. System redirects user to the relevant filtered content listing page

**Alternate Flows**

* If no content issues exist, system displays a “All content ready” state

**Postconditions**

* User identifies and navigates to content that requires action


---

### **Monitor Transcoding Status**

**Actors**

* Admin
* Operations Staff

**Preconditions**

* Transcoding jobs have been initiated for one or more assets

**Main Flow**


1. User accesses the dashboard
2. System displays transcoding summary (processing, completed, failed jobs)
3. User reviews the current status
4. User selects the transcoding section
5. System navigates to the detailed processing queue page

**Alternate Flows**

* If there are failed jobs, system highlights them for visibility
* If no jobs are active, system displays an idle/empty state

**Postconditions**

* User understands the status of content processing and can take further action if needed


---

### **View Revenue and Subscription Summary**

**Actors**

* Admin (Business Owner)

**Preconditions**

* Subscription plans are active
* Users have subscribed to plans

**Main Flow**


1. User accesses the dashboard
2. System displays revenue metrics (e.g., today’s revenue, monthly revenue)
3. System displays active subscription count
4. User reviews the metrics for quick business insights

**Alternate Flows**

* If no revenue data exists, system displays zero values or an empty state

**Postconditions**

* User gains a quick understanding of business performance


---

### **Perform Quick Actions from Dashboard**

**Actors**

* Admin
* Staff User

**Preconditions**

* User has required permissions for actions (e.g., upload content, create content, access design page)

**Main Flow**


1. User accesses the dashboard
2. System displays quick action options (e.g., Upload Content, Create Movie/Series, Go to Design Page)
3. User selects a desired action
4. System redirects user to the corresponding module or workflow

**Alternate Flows**

* If user lacks permission for an action, system hides or disables that option

**Postconditions**

* User is able to quickly initiate key workflows without navigating through multiple menus

  

## **Empathy Lens**


---

### **1. User Context & Pain**

Q: Who is the primary user? A: OTT platform admins (business owners) and staff responsible for content operations, publishing, and platform monitoring.

Q: What are they trying to achieve (in their own words)? A: “I want to quickly know if my platform is running properly, what content is ready, and what needs my attention right now.”

Q: What is frustrating or broken today? A: There is no single place to see platform status, forcing users to check multiple pages to understand content readiness, revenue, and system health.


---

### **2. Behavioral Intent**

Q: What user behavior is this feature trying to influence? A: Encourage users to start their workflow from the dashboard, regularly monitor platform health, and take immediate action on issues.

Q: What happens today without this feature? A: Users navigate across multiple modules manually, miss important issues like unpublished content or failed transcodes, and delay actions.


---

### **3. Emotional Drivers**

Q: Why does this matter to the user emotionally? A: The dashboard reduces uncertainty by giving clear visibility into whether their OTT platform is functioning and generating business.

Q: What anxiety, urgency, or motivation exists? A: Users feel anxious about missing revenue opportunities, incomplete content going live, or platform issues affecting viewers.


---

### **4. Success Visibility (Outcome + Attribution + Debuggability + Discoverability)**

Q: What measurable outcomes will prove THIS dashboard is working? A: Reduction in time taken to identify issues, faster content publishing cycles, and increased number of issues resolved directly from dashboard insights.

Q: What exact per-instance metrics will the user look at? A: Count of unpublished content, number of failed transcoding jobs, revenue today, active subscriptions, and recent activity logs.

Q: How will the user distinguish working vs not working? A: If counts of failed jobs or unpublished content are low and recent activity shows smooth operations, the system is working; spikes indicate issues.

Q: How will the user distinguish misconfigured vs ineffective? A: If content is uploaded but not appearing in “ready to publish,” it indicates misconfiguration (missing assets or transcoding); if published but low engagement, it is ineffective.

Q: How will outcomes be attributed to THIS dashboard? A: Faster detection of issues (e.g., identifying failed transcodes from dashboard) directly leads to quicker resolution and improved platform readiness.

Q: What comparisons will the user expect? A: Today vs yesterday revenue, number of active vs inactive content, and current vs previous activity trends.

Q: What exact business questions should the UI answer? A: “Is my platform running smoothly?”, “What content is pending?”, “Am I earning today?”, “What needs my attention right now?”

Q: Where exactly in the product does the user see this information? A: On the main Admin Dashboard landing page immediately after login.

Q: How quickly can the user determine if it is working? A: Within a few seconds of opening the dashboard, by scanning key metrics and alerts.

Q: What confusion or bad decisions happen if this visibility is missing? A: Users may assume everything is fine while critical issues exist, delay publishing content, or miss revenue-impacting problems.


---

### **5. Decision Enablement**

Q: Based on these outcomes, what decisions will the user take? A: Prioritize fixing failed transcodes, complete missing content details, publish ready content, and monitor revenue trends.

Q: What specific parts of the configuration will they want to adjust? A: Content metadata, publishing status, transcoding actions, and subscription or monetization settings.


---

### **6. Failure & Risk Perception**

Q: What could go wrong from the user’s perspective? A: Important issues may be overlooked if not clearly surfaced, leading to incomplete content being unavailable to viewers.

Q: What fears or unintended outcomes might they worry about? A: Losing revenue due to unpublished content, users facing broken experiences, or delays in content availability.


---

### **7. Lifecycle Thinking**

Q: What happens after the first successful use? A: The dashboard becomes the default entry point for daily platform monitoring and management.

Q: How will the user want to scale, repeat, or evolve this? A: Users will expect deeper insights, automation (e.g., scheduling), and more advanced analytics as their platform grows.


## **Functional Requirements**

* The system shall display a centralized dashboard accessible to authorized admin and staff users upon login.
* The system shall present a summary of total content categorized by type (movies, series, audio, ebooks).
* The system shall display counts of content by status, including published and unpublished.
* The system shall identify and display content that is not ready for publishing, including:
  * Not transcoded
  * Missing required assets (e.g., images)
* The system shall display a count of content that is fully ready to be published.
* The system shall display a summary of transcoding jobs, including counts of:
  * Processing jobs
  * Completed jobs
  * Failed jobs
* The system shall highlight failed transcoding jobs for visibility.
* The system shall display revenue metrics, including:
  * Revenue for the current day
  * Revenue for the current period (e.g., month)
* The system shall display the total number of active subscriptions.
* The system shall display user metrics, including:
  * Total users
  * Newly registered users within a defined period
* The system shall display a recent activity feed including:
  * Recently uploaded assets
  * Recently published content
  * Recent subscription activity
* The system shall provide quick action shortcuts for commonly used tasks, including:
  * Upload content
  * Create movie or series
  * Navigate to design/page builder
* The system shall allow users to navigate to relevant modules when interacting with dashboard elements (e.g., clicking on unpublished content redirects to filtered list).
* The system shall ensure that all displayed data is updated at defined intervals to reflect current system state.
* The system shall restrict visibility of actions and data based on user roles and permissions.
* The system shall display appropriate empty states when no data is available.
* The system shall display error or fallback states when data cannot be retrieved.

  ## **Tasks**

  ### **PR 1: Dashboard UI (Design First with Mock Data)**
  - [ ] Implement dashboard layout using existing design system/components
  - [ ] Add sections: metrics, content readiness, transcoding, activity, quick actions
  - [ ] Bind static/mock data directly in UI (no API yet)
  - [ ] Ensure layout, spacing, and responsiveness match design
  - [ ] Add basic empty/loading visual states
  - [ ] Validate usability (can visually understand dashboard without backend)

  
---

  ### **PR 2: Data Contract + Gap Identification**
  - [ ] Derive required data fields from UI (finalize JSON structure)
  - [ ] Document API response shape (single payload)
  - [ ] Identify missing backend data points required by UI
  - [ ] Identify any missing fields in existing models
  - [ ] Review with backend expectations before implementation

  
---

  ### **PR 3: Data Model / Schema Updates (If Needed)**
  - [ ] Add/modify fields required for dashboard (if gaps found)
  - [ ] Add minimal flags or computed fields if needed (e.g., readiness indicators)
  - [ ] Create and run migrations
  - [ ] Ensure backward compatibility with existing features
  - [ ] Add basic model-level validations
  - [ ] Add unit tests for new/updated fields

  
---

  ### **PR 4: Domain Logic (Aggregation + Readiness)**
  - [ ] Implement single aggregation service for dashboard data
  - [ ] Compute:
    * Content counts (total, published, unpublished)
    * Content readiness (not transcoded, missing assets, ready)
    * Transcoding summary (processing, failed, completed)
    * User metrics (total, new users)
    * Revenue metrics (today, current period)
    * Recent activity (latest items only)
  - [ ] Keep logic centralized (no duplication across views)
  - [ ] Optimize queries for minimal DB hits
  - [ ] Add unit tests for aggregation logic

  
---

  ### **PR 5: Dashboard API**
  - [ ] Create single API endpoint to return full dashboard payload
  - [ ] Map aggregation service output to response format
  - [ ] Add authentication and permission checks
  - [ ] Handle empty and fallback states in response
  - [ ] Add API tests (success, empty, permission cases)

  
---

  ### **PR 6: UI Integration (Replace Mock with API)**
  - [ ] Integrate dashboard UI with API endpoint
  - [ ] Replace mock data with real response mapping
  - [ ] Handle loading, error, and fallback states
  - [ ] Ensure all sections render correctly with real data
  - [ ] Validate navigation from UI elements (links to modules)

  
---

  ### **PR 7: Final Testing & Fixes**
  - [ ] Perform end-to-end validation of dashboard flow
  - [ ] Verify all metrics match source data
  - [ ] Test edge cases (no data, partial data, failures)
  - [ ] Validate role-based visibility (admin vs staff)
  - [ ] Fix UI/data inconsistencies
  - [ ] Basic performance check (dashboard load time)

  

Got it — let’s clean this up properly. No clutter, no nested mess. Just **clear, readable, PR-level breakdown** 👇


---

## **Timeline Prediction**

| Task | Estimated Duration (hrs) | Dependencies | Notes |
|----|----|----|----|
| PR 1: Dashboard UI (Design + Mock Data) | 5 | None | Full layout using existing components |
| PR 2: Data Contract + Gap Identification | 1 | PR 1 | Define API response + identify missing data |
| PR 3: Data Model / Schema (if needed) | 2 | PR 2 | Only if UI needs new fields |
| PR 4: Domain Logic (Aggregation) | 4 | PR 2/3 | Single aggregation service |
| PR 5: Dashboard API | 2 | PR 4 | One endpoint |
| PR 6: UI Integration | 3 | PR 5 | Replace mock with API |
| PR 7: Final Testing & Fixes | 2 | All | Smoke testing only |


---

## 🔢 **Roll-up Summary**

### **Total Engineering Hours**

👉 **19 hours**


---

### 📅 **Estimated Delivery Time**

👉 **\~2.5 days**

* Day 1 → PR 1 + PR 2
* Day 2 → PR 3 + PR 4 + PR 5
* Day 3 → PR 6 + PR 7


---

## ⚡ **Parallelization Opportunities**

If 2 engineers:

* Dev 1 → PR 1 (UI)
* Dev 2 → Start PR 4 (backend assumptions)

👉 Can reduce to **\~2 days**


---

## 🧠 Key Clarity (Why this is clean)

* No sub-task noise
* Each row = **1 PR = 1 deliverable**
* Easy to track in GitHub / Jira
* Matches your **actual workflow (UI → data → API → integration)**

