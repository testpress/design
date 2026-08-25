# Unclaimed Opportunities

## Primary Purpose

Unclaimed Opportunities is the salesperson's **full working list of purchase Opportunities that are currently available to claim**.

It exists so the salesperson can:

* See which unclaimed Opportunities are available.
* Understand who the student is, what product they may purchase, and why the Opportunity matters.
* Prioritize the most worthwhile Opportunities without manually calculating intent.
* Quickly claim an Opportunity when they decide to take ownership.
* Preview an Opportunity before claiming when more context is needed.

The screen should create a clear answer to:

> **“Which unclaimed Opportunities are worth taking next?”**

while minimizing friction between:

**finding a worthwhile unclaimed Opportunity → understanding it → claiming it**

The PRD defines the unclaimed/high-value experience around financially worthwhile Opportunities with meaningful purchase interest, ranked automatically using product value, purchase interest, Signal strength, potential incentive, and unclaimed ownership state. 

---

# Core User Intent

A user visiting this screen may want to:

* See all Opportunities that are currently available to claim.
* Find a specific student or product.
* Understand why an Opportunity exists.
* Identify the strongest purchase-interest Opportunities first.
* Compare product value and purchase interest.
* Preview an Opportunity before claiming it.
* Claim a student when they decide to take responsibility.

The screen should naturally support these workflows.

---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A generic student directory.
* A lead database that requires manual sorting.
* A complicated CRM pipeline.
* A full activity feed.
* A reporting or analytics dashboard.
* A page where the salesperson has to calculate which Opportunity is valuable.

It SHOULD feel like:

* A **prioritized pool of available sales Opportunities**.
* Opportunity-focused.
* Easy to scan.
* Financially aware.
* Clear about why an Opportunity is worth considering.
* Fast to act on.

The experience should prioritize:

* **Opportunity value**
* **Purchase-interest evidence**
* **Primary Signal**
* **Latest meaningful activity**
* **Claiming as the main action**

The Opportunity is the primary sales-work unit: student + product + product value + reason + next action. 

---

# 2. Primary Layout Expectations

The screen should immediately help the salesperson understand:

> **“What unclaimed sales Opportunities are available, and which ones should I look at first?”**

The first information should establish:

1. Page purpose.
2. Search.
3. Current prioritization/sort.
4. Filters as secondary controls.
5. The Opportunity list.

The highest-emphasis action on an unclaimed Opportunity is **Claim**. The PRD explicitly defines Claim as the primary action for unclaimed Opportunities. 

### Suggested High-Level Layout

* Page Header
* Search + Sort + Filter
* Unclaimed Opportunities Table
* Pagination

---

# 3. Unclaimed Opportunity List

This is the most important section.

Users should instantly understand:

> **“Which Opportunities are available for me to claim?”**

## Expected Information

Each Opportunity should provide:

* Student
* Student avatar
* Product
* Product value
* Latest activity
* Primary Signal
* Primary action: Claim
* Secondary action: View Opportunity

Recommended information hierarchy:

**Opportunity | Latest Activity | Primary Signal | Actions**

### Opportunity

Combine the student and product/value into one identity block:

> **Rahul Kumar**
> UPSC Foundation · ₹20K

This keeps the table compact while still communicating:

* Who
* What product
* What value

The source material defines the Opportunity around exactly these dimensions. 

### Latest Activity

Show the **most recent meaningful event**.

Examples:

> **Payment failed · 1 hr ago**

> **Asked about purchase · 2 hrs ago**
> “I have some questions about the pricing plan.”

> **Repeated product interest · 2 hrs ago**

Latest Activity answers:

> **“What happened most recently?”**

It should not be treated as the complete activity history.

The broader Sales Queue guidance explicitly says the compact view should not show every chat, every product view, or every page visit; complete history belongs in Opportunity Detail. 

### Primary Signal

Show **one current/strongest Signal**.

Use:

* Payment failed
* Checkout abandoned
* Pre-purchase enquiry
* Repeated product interest

The Signal answers:

> **“Why is this Opportunity commercially relevant?”**

If the latest activity and Primary Signal are different, that is acceptable.

Example:

> Latest activity: **Repeated product interest · 2 hrs ago**
> Primary Signal: 🔴 **Payment failed**

This is intentionally different information:

* Latest Activity = newest event.
* Primary Signal = strongest/current purchase-interest reason.

The V1 Signal hierarchy recommends Payment Failure → Checkout Abandonment → Pre-Purchase Enquiry → Repeated Product Interest for selecting the primary reason. 

### Signal presentation

Use a **small colored dot + text**, rather than a large colored badge.

Example:

> 🔴 Payment failed
> 🟠 Checkout abandoned
> 🔵 Pre-purchase enquiry
> 🟢 Repeated product interest

Keep each Signal to **one line**.

Do not show:

> Payment failed + 3 more

The full Signal history belongs in Opportunity Detail.

### Actions

**Primary:**

> **Claim**

**Secondary:**

> View Opportunity

A compact eye icon can represent View when space is limited.

The PRD identifies Claim as the primary unclaimed action and View Opportunity as a secondary action. 

---

# 4. Purchase-Interest Prioritization

## Purpose

The list should help the salesperson identify the most worthwhile Opportunities **without requiring them to manually figure out which ones have strong purchase intent**.

The source explicitly says the system should automatically rank valuable unclaimed Opportunities based on product value, purchase interest, Signal strength, potential incentive, and unclaimed ownership. 

## Expected Information

The default sorting should be:

> **Purchase interest**

This is a **sort/ranking strategy, not a filter**.

### Ranking

The strongest purchase-interest Signals should generally appear first:

1. **Payment failed**
2. **Checkout abandoned**
3. **Pre-purchase enquiry**
4. **Repeated product interest**

Within comparable Signal strength, use:

> **Product value → Recency**

This ensures weaker Opportunities such as repeated product interest are **not hidden**. They simply appear lower in the prioritization.

The source describes repeated product interest as the most conservative V1 Signal because repeated viewing is weaker evidence than checkout or payment activity. 

## Expected Behavior

The default list should already be intelligently prioritized.

The salesperson should **not need to manually create a “High Intent” filter** just to find worthwhile Opportunities.

The source explicitly recommends automatic prioritization rather than making the salesperson manually search/filter for high-value or high-intent work. 

## Expected Feeling

> **“The best Opportunities are already near the top.”**

---

# 5. Search

## Purpose

Help the salesperson locate a specific Opportunity when they already know what they are looking for.

## Expected Information

Search by:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

The source explicitly defines search around student, product, and Opportunity. 

## Expected Behavior

Search should narrow the existing unclaimed Opportunity list.

It should **not replace automatic prioritization**.

The salesperson should not need to search:

> “high purchase interest”

to discover valuable work.

Those Opportunities should already be prioritized automatically. 

## No Results

> **No Opportunities found**

> Try another student or product.

---

# 6. Filtering

Filtering should remain **secondary**, not the main way the salesperson discovers Opportunities.

The source specifically advises against a primary filter row such as:

> All | New | Active | Won | Lost | High | Medium | Low

because the system should organize and rank the salesperson's work automatically. 

## Filter Categories

If filtering is needed for operational use, support:

### Student

Select specific students.

### Product

Select specific products.

### Signal

Use the four V1 Signal categories:

* Payment failed
* Checkout abandoned
* Pre-purchase enquiry
* Repeated product interest

Do not turn evidence variations such as:

> Viewed 7 times in 2 days

into separate filter categories.

Those are evidence belonging to **Repeated Product Interest**.

### Activity

Useful time ranges:

* Today
* Yesterday
* Last 7 days
* Last 30 days
* Custom range

## Expected Behavior

Filters narrow the existing unclaimed list.

They should not change the fundamental Opportunity information hierarchy.

---

# 7. Sort Expectations

Sort is more important here than a High Purchase Interest chip.

## Default

> **Purchase interest**

This puts the most commercially promising Opportunities first while still keeping weaker Opportunities discoverable.

## Other useful sorts

* **Most recent**
* **Highest product value**
* **Lowest product value**

If follow-up data is relevant to an unclaimed Opportunity, follow-up date can be considered as an additional operational sort.

### Important distinction

**Sort changes order.**

**Filter changes which Opportunities are shown.**

High Purchase Interest should therefore remain a **ranking/sort concept**, not a separate filter that hides repeated-interest Opportunities.

---

# 8. Claim Behavior

## Purpose

Claim is the primary outcome of this screen.

The salesperson should be able to go from:

> **“This looks worth pursuing.”**

to:

> **“I'm responsible for it.”**

with minimal friction.

## Before Claim

Show:

> **Claim**

The source defines Claim as the primary action for an unclaimed Opportunity. 

## Claim Confirmation

Because ownership is ultimately at the **student/conversation level**, claiming an Opportunity can make the salesperson responsible for the student's active Opportunities.

Where confirmation is needed:

> **Claim Rahul Kumar?**
>
> You'll become responsible for this student and their active Opportunities.
>
> GATE CS Pack · ₹30K
> UPSC Foundation · ₹20K
>
> **Cancel** · **Claim student**

The source explicitly defines this student-level ownership consequence. 

## After Claim

The Opportunity should leave the unclaimed list.

The salesperson's ownership state becomes:

> **Owner: You**

The important UX expectation is that the salesperson understands:

> **“I didn't just claim one row; I took responsibility for this student's active sales Opportunities.”**

---

# 9. View Opportunity

## Purpose

Allow the salesperson to gather more context before claiming when the list does not provide enough information.

## Expected Information

Opportunity Detail can provide:

* Complete Signal history
* Full conversation
* Product context
* Purchase activity
* Follow-up context
* Ownership context
* Other Opportunity details

The list should remain lightweight; the full history belongs in Detail. 

## Expected Behavior

View should be secondary to Claim.

The salesperson should not have to open every Opportunity to understand basic:

> Who? What? Value? Why?

The table should already provide that information.

## Expected Feeling

> **“I can inspect this before taking responsibility.”**

---

# 10. State Expectations

## Available / Unclaimed

**Purpose**

Normal state for this page.

**Expected Information**

Show active unclaimed Opportunities with their current purchase context.

**Primary Action**

Claim.

**Expected Feeling**

> “These are opportunities I can take.”

The Opportunity lifecycle defines Unclaimed as available to claim. 

---

## Claimed While Viewing

If another salesperson claims the Opportunity while the current user is viewing the page:

**Purpose**

Prevent stale ownership actions.

**Expected Information**

The Opportunity should update to reflect that it is no longer available.

**Primary Action**

View if appropriate.

**Expected Feeling**

> “Someone else took this; I won't accidentally claim it.”

The source explicitly calls for stale Opportunities to refresh rather than allowing invalid actions. 

---

## Won

A Won Opportunity should no longer appear as unclaimed.

The lifecycle is:

> **Unclaimed → Active → Won / Lost**

A purchase automatically results in Won. 

---

## Lost / Closed

A closed/lost Opportunity should not appear as available to claim.

---

# 11. Empty State Expectations

## No Unclaimed Opportunities

> **No unclaimed Opportunities right now**

> New purchase opportunities will appear here when available.

This is directly aligned with the source guidance. 

The page should feel **quiet and positive**, not broken.

Suggested CTA direction:

> **Back to Sales Queue**

if navigation is useful.

---

## No Search Results

> **No Opportunities found**

> Try another student or product.

Suggested action:

> **Clear search**

---

## No Filter Results

> **No Opportunities match these filters**

Suggested action:

> **Clear filters**

---

## First-Time State

> **No unclaimed Opportunities yet**

> New purchase opportunities will appear here when students show meaningful buying interest.

This communicates that the system is working automatically rather than asking the salesperson to manually create or import leads.

---

# 12. Error State Expectations

## Loading

Use lightweight loading states.

Do not show a blank table while the page is loading.

## Loading Failure

> **We couldn't load unclaimed Opportunities.**

> Please try again.

**Try again**

The source recommends explaining the problem and giving the user a next action. 

## Claim Failure

> **Couldn't claim this Opportunity.**

> It may have already been claimed by someone else.

**Try again**

This is particularly important because unclaimed Opportunities can change ownership while multiple salespeople are viewing the list. 

## Stale Opportunity

If an Opportunity becomes unavailable while the page is open:

* Remove it from the available list.
* Do not allow Claim to succeed incorrectly.
* Make the state change understandable.

---

# 13. Responsive Expectations

## Desktop

Optimize for scanning many Opportunities.

Keep visible:

* Student
* Product
* Value
* Latest activity
* Primary Signal
* Claim
* View

The table should remain compact and avoid becoming a dense CRM interface.

## Tablet

Prioritize:

* Student
* Product/value
* Latest activity
* Primary Signal
* Claim

Secondary viewing can remain available without dominating the layout.

## Mobile

Use a compact single-column Opportunity list.

Keep immediately visible:

* Student
* Product
* Value
* Primary Signal
* Latest activity
* Claim

Avoid forcing horizontal table scrolling where possible.

The source's responsive guidance similarly prioritizes Who, Product, Value, Why, and Next Action on smaller screens. 

---

# 14. UX Personality

The screen should feel:

* **Focused**
* **Opportunity-oriented**
* **Smart**
* **Financially aware**
* **Actionable**
* **Efficient**
* **Trustworthy**

NOT:

* Administrative
* Overwhelming
* CRM-heavy
* Like a lead dump
* Analytical
* Like a generic student database

The salesperson should feel:

> **“These are worthwhile Opportunities I can take, and I understand why they are here.”**

The broader Sales Queue UX is intended to feel focused, smart, action-oriented, financially aware, calm, efficient, and trustworthy. 

---

# Suggested Layout Structure

### Top

**Unclaimed Opportunities**

Short description:

> Opportunities showing purchase interest that are available to claim.

### Controls

**Search students or products**

**Sort: Purchase interest**

**Filter**

### Primary Section

**Unclaimed Opportunities**

Table:

> **Opportunity | Latest Activity | Primary Signal | Actions**

Opportunity:

> Avatar + Student
> Product · Value

Latest Activity:

> Event · time
> Optional one-line message preview

Primary Signal:

> Colored dot + Signal

Actions:

> **Claim** · Eye/View

### Bottom

Pagination / additional results.

---

# Most Important Jobs This Screen Must Solve

1. **Show the salesperson which Opportunities are currently available to claim.**
2. **Automatically prioritize the strongest purchase opportunities instead of making the salesperson manually score them.**
3. **Make the student, product, and value immediately understandable.**
4. **Show the latest meaningful activity without turning the list into a full activity feed.**
5. **Show the Primary Signal so the salesperson understands why the Opportunity matters.**
6. **Keep weaker Signals such as repeated product interest discoverable rather than hiding them.**
7. **Make Claim the clearest primary action.**
8. **Allow quick viewing of an Opportunity before claiming when more context is needed.**
9. **Keep Search and Filters secondary to automatic prioritization.**
10. **Make the student-level ownership consequence of Claim clear.**
11. **Handle race conditions where another salesperson claims the Opportunity first.**
12. **Keep the list focused on active, unclaimed Opportunities rather than turning it into a generic lead database.**

**That is the real purpose of the Unclaimed Opportunities.**
