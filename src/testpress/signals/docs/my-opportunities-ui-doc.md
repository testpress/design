# My Opportunities

## Primary Purpose

My Opportunities is the salesperson's working view of **all active Opportunities they currently own**.

It exists so the salesperson can:

* Review their complete active Opportunity workload.
* Understand what recently happened with each student.
* See why each Opportunity has purchase relevance.
* See scheduled follow-ups and decide what to work next.
* Quickly open or manage an Opportunity without returning to the Sales Queue.

The Opportunity remains the primary sales-work unit: it represents a specific **student + product purchase opportunity**. 

The page should create a clear answer to:

> **“What active Opportunities am I responsible for, and what is happening with each one?”**

while minimizing friction between:

**reviewing active Opportunities → deciding what to work next**

---

# Core User Intent

A user visiting this screen may want to:

* See all active Opportunities they own.
* Find a specific student, product, or Opportunity.
* Understand the latest activity and student conversation context.
* See the current Signal and follow-up status.
* Schedule a follow-up or close an Opportunity when needed.
* Reorder the list based on purchase interest, recency, follow-up date, or product value.

The screen should naturally support these workflows.

---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A daily attention inbox.
* A support-ticket system.
* A generic student directory.
* A full activity feed.
* A complicated CRM pipeline.
* A data-heavy reporting screen.

It SHOULD feel like:

* A clear list of **my active sales work**.
* Easy to scan and compare.
* Easy to search and narrow when needed.
* Context-rich without showing the entire conversation.
* Structured enough for managing many Opportunities.

The experience should prioritize:

* **Who owns the Opportunity**
* **What product and value are involved**
* **What happened most recently**
* **Why the Opportunity has purchase relevance**
* **What follow-up is currently scheduled**

The underlying model supports one active Opportunity per institute + student + product, while allowing multiple active Opportunities for the same student across different products. 

---

# 2. Primary Layout Expectations

The screen should help the salesperson immediately see their **active Opportunity workload**.

The first information should establish:

1. What page they are on.
2. How many active Opportunities they own.
3. Quick ways to narrow the workload.
4. The Opportunity list itself.

The primary interaction is **opening an Opportunity**.

### Suggested High-Level Layout

* Page Header
* Search + Quick Chips
* Opportunity List
* Filters / Sort
* Pagination or additional results

The page should use a **structured list/table**, rather than the card-based Sales Queue pattern.

---

# 3. Active Opportunities

This is the most important section.

Users should instantly understand:

> **“What active Opportunities am I currently responsible for?”**

## Expected Information

Each Opportunity should provide:

* Student
* Student avatar
* Product
* Product value
* Latest activity
* Latest student message when relevant
* Signal
* Follow-up
* Opportunity actions

The table should remain Opportunity-focused rather than student-focused. The product-specific Opportunity is the sales-work unit, even though ownership is ultimately managed at the student/conversation level. 

### Recommended information structure

**Student | Product | Value | Latest Activity | Signal | Follow-up | Actions**

Example:

| Student      | Product         | Value | Latest Activity                                                 | Signal               | Follow-up        | Actions  |
| ------------ | --------------- | ----: | --------------------------------------------------------------- | -------------------- | ---------------- | -------- |
| Rahul Kumar  | UPSC Foundation |  ₹20K | **Student replied · 2 min ago**<br>“Can I pay in installments?” | Checkout abandoned   | Today · 4 PM     | Open · ⋮ |
| Meena Sharma | NEET Premium    |  ₹25K | **Payment failed · 15 min ago**                                 | Payment failed       | —                | Open · ⋮ |
| Karthik R    | GATE CS Pack    |  ₹30K | **You replied · 1 hr ago**                                      | Pre-purchase enquiry | Tomorrow · 10 AM | Open · ⋮ |

### UX Expectations

**Latest Activity** answers:

> “What happened most recently?”

It should show the most recent **meaningful** event.

Examples:

* Student replied → show the latest student message.
* Staff replied → show `You replied`.
* Follow-up scheduled → show `Follow-up scheduled` and relevant context.
* Follow-up due → show `Follow-up due`.
* Payment failed → show `Payment failed`.
* Checkout abandoned → show `Checkout abandoned`.
* Pre-purchase enquiry → show the enquiry and latest message where relevant.

Do not turn the column into a complete activity history.

The Opportunity model explicitly maintains latest activity, primary reason, current intent, urgency, follow-up details, and other current context. 

### Signal

Show **one current/strongest Signal**, not the complete Signal history.

The Signal answers:

> **“Why is this Opportunity commercially relevant?”**

Use the four supported purchase-interest Signals:

* Payment failed
* Checkout abandoned
* Pre-purchase enquiry
* Repeated product interest

If multiple Signals exist, show the strongest/current one.

For example:

> Payment failed + Checkout abandoned + enquiry + repeated views

should display:

> **Payment failed**

The complete Signal history belongs in Opportunity Detail. The underlying model retains all contributing Signals chronologically and allows a stronger Signal to replace the current primary reason without deleting historical Signals. 

### Follow-up

Show the **current scheduled or due follow-up**.

Example:

> Today · 4 PM

The Follow-up column remains separate from Latest Activity because they answer different questions:

* **Latest Activity:** What happened?
* **Follow-up:** What commitment is scheduled?

If the latest activity is:

> Follow-up scheduled

the Follow-up column still shows:

> Tomorrow · 10 AM

Do not repeat the follow-up reason in the Follow-up column if it is already represented as activity context.

### Row behavior

The row should allow the salesperson to open the Opportunity.

The list should not become a chat interface.

The full conversation, complete Signals, history, and detailed Opportunity context belong in Opportunity Detail. The PRD specifically expects staff to open an Opportunity to review its supporting Signals and shared conversation. 

---

# 4. Quick Views

## Purpose

Help the salesperson quickly narrow their active Opportunities around common work situations.

## Expected Information

Quick chips:

* **All**
* **Needs Your Attention**
* **Follow-ups Due Today**
* **Upcoming Follow-ups**

There should be **no High Purchase Interest chip**.

Purchase interest is better represented as a **sorting/ranking strategy**, not a subset that hides other active Opportunities.

## Expected Behavior

Selecting a chip changes the Opportunities shown in the table.

The table structure remains the same.

### All

Shows all active Opportunities owned by the salesperson.

### Needs Your Attention

Shows their active Opportunities where a meaningful event currently requires action.

This is consistent with the distinction between urgency and financial value: a recent student reply can require attention regardless of product value. 

### Follow-ups Due Today

Shows Opportunities with follow-ups due today.

### Upcoming Follow-ups

Shows Opportunities with future scheduled follow-ups.

Future follow-ups should not be treated as today's work until their scheduled time. 

## Expected Feeling

> **“I can quickly focus my active workload without losing the full list.”**

---

# 5. State Expectations

## Active

**Purpose**

The normal state for this page.

**Expected Information**

Show the active Opportunity with its student, product, latest activity, Signal, and follow-up.

**Primary Action**

Open Opportunity.

**Expected Feeling**

> “This is work I currently own.”

The core lifecycle defines Active as an Opportunity that is owned and being worked. 

---

## Follow-up Scheduled

**Purpose**

Indicate that the Opportunity remains active but has a future commitment.

**Expected Information**

Show the current follow-up date/time.

**Primary Action**

Open or manage the Opportunity.

**Expected Feeling**

> “I know when I need to come back to this.”

A scheduled follow-up does not represent a final Opportunity outcome. 

---

## Needs Attention

**Purpose**

Identify an active Opportunity where new action is required.

**Expected Information**

Latest activity and student message when relevant.

**Primary Action**

Open / Chat.

**Expected Feeling**

> “I know this needs action.”

---

## Won

Won Opportunities should **not remain in My Opportunities** because this page is specifically the salesperson's active Opportunity workload.

A successful purchase automatically converts the Opportunity and removes it from the active workload. Pending follow-ups are also cancelled on conversion. 

---

## Closed / Lost

Closed Opportunities should not remain in the active list.

They remain available as historical records through the appropriate results/history experience.

---

## Invalid

Invalid Opportunities should not remain in the active list.

They remain separate from genuine non-conversion outcomes. 

---

# 6. Search Expectations

Search is relevant because My Opportunities can contain many active Opportunities.

Users may search for:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

Search should return matching active Opportunities.

Search should be used for **finding something specific**, not for replacing prioritization. The Sales Queue specification similarly defines search around student, product, and Opportunity. 

### Search philosophy

Search should feel:

> **“I know what I'm looking for.”**

not:

> **“I need search to figure out what I should work on.”**

---

# 7. Filtering Expectations

Filtering is useful on My Opportunities because this is a complete active-work list rather than a quick queue.

## Filter Categories

### Student

Allow selection of specific students.

Why:

> Find all active Opportunities belonging to a particular student.

### Product

Allow selection of one or multiple products.

Why:

> Focus on Opportunities for a particular product.

### Signal

Show only the four meaningful purchase-interest Signal types:

* Payment failed
* Checkout abandoned
* Pre-purchase enquiry
* Repeated product interest

Do not expose individual variations such as:

* Viewed 7 times in 2 days
* Viewed pricing 3 times

Those are evidence variations of **Repeated Product Interest**, not separate Signal categories.

The underlying Signal model defines supported Signal types and retains concrete qualifying evidence separately. 

### Activity

Allow:

* Today
* Yesterday
* Last 7 days
* Last 30 days
* Custom range

This is useful when the salesperson wants to find Opportunities based on recent activity.

## Filter Behavior

Filters should narrow the existing active Opportunity list.

They should not change the table structure.

The user should always be able to understand:

> **“Why am I seeing these Opportunities?”**

---

# 8. Progress / Status Expectations

This page does not need a traditional progress indicator.

An Opportunity is not a linear task that progresses through multiple sales stages.

The core lifecycle is:

> **Unclaimed → Active → Won / Lost**

Student replies, payment failures, follow-ups, awaiting states, and similar events are **context or activity**, not separate Opportunity lifecycle stages. 

For My Opportunities, the list is already restricted to:

> **Active Opportunities owned by the salesperson.**

Therefore, a separate `Status: Active` column is unnecessary and repetitive.

The salesperson can understand the active state from the page itself.

---

# 9. Actions Expectations

## Primary Actions

### Open Opportunity

The main interaction for each row.

It provides access to:

* Conversation
* Signals
* Product context
* Follow-up
* Opportunity history
* Next actions

### Chat

Where a student response or other actionable situation requires communication.

The Sales Queue specification establishes Chat as the primary action for active Opportunities requiring conversation. 

## Secondary Actions

* Search
* Sort
* Filter

## Contextual Actions

Available through the Opportunity's action menu:

* Schedule follow-up
* Close Opportunity
* Other permitted Opportunity actions

These should not all appear as prominent buttons on every row.

### Close behavior

Closing should not be a generic dismissal.

A genuine non-purchase closure requires a structured outcome reason. 

If the student has simply deferred their decision and a future follow-up is appropriate, the Opportunity should **remain active** rather than being closed. 

### Schedule follow-up

Scheduling creates a future commitment.

The follow-up reason is captured when scheduling and remains associated with that follow-up.

The salesperson should not be forced to add another comment simply to mark the follow-up completed.

---

# 10. Discovery Expectations

Discovery is intentionally limited.

The page should not recommend unrelated students or products.

Useful discovery comes from:

* Search
* Filters
* Sorting
* Opening an Opportunity
* Moving from a filtered/quick view into the full active list

The salesperson should be able to move naturally from:

> **My Opportunities → Opportunity Detail**

without losing context.

---

# 11. Empty State Expectations

## No active Opportunities

> **No active Opportunities**

> Opportunities you own will appear here when students show meaningful purchase interest.

Suggested CTA direction:

> **Back to Sales Queue**

This should feel like an empty workload, not an error.

---

## No results for search

> **No Opportunities found**

> Try another student or product.

---

## No results after filtering

> **No Opportunities match these filters**

Suggested CTA direction:

> **Clear filters**

---

## No Opportunities in a quick chip

### Needs Your Attention

> **Nothing needs your attention right now**

### Follow-ups Due Today

> **No follow-ups due today**

### Upcoming Follow-ups

> **No upcoming follow-ups**

Keep the overall page available rather than making the empty section feel like a failure.

---

# 12. Error State Expectations

## Loading

Use lightweight loading states.

Do not show an unexplained blank table.

## Loading failure

> **We couldn't load your Opportunities.**

> Please try again.

**Try again**

## Search/filter failure

Keep the user's search/filter intent visible where possible and allow retry.

## Action failure

If a contextual action fails:

> **Couldn't schedule the follow-up.**

> Try again.

or:

> **Couldn't close this Opportunity.**

> Please try again.

## Stale Opportunity

If an Opportunity changes while the salesperson is viewing the list, update its state rather than allowing an outdated action.

For example, if the student purchases the product while the list is open, the Opportunity should no longer behave as an active Opportunity.

Errors should communicate:

> **What happened + what the salesperson can do next.**

---

# 13. Responsive Expectations

## Desktop

Optimize for scanning many active Opportunities.

The table should make it easy to compare:

* Student
* Product
* Value
* Latest activity
* Signal
* Follow-up

The salesperson should not need to open every Opportunity just to understand its current state.

## Tablet

Prioritize:

* Student
* Product
* Value
* Latest activity
* Follow-up

Less frequently needed information can become secondary.

## Mobile

Use a more compact Opportunity list rather than forcing a wide desktop table.

Keep visible:

* Student
* Product
* Value
* Latest activity
* Follow-up
* Primary action

Filters and sorting should remain easy to access.

Avoid forcing horizontal scrolling where possible.

---

# 14. UX Personality

The screen should feel:

* **Organized**
* **Focused**
* **Actionable**
* **Professional**
* **Calm**
* **Easy to scan**
* **Sales-oriented**

NOT:

* Overwhelming
* CRM-heavy
* Report-like
* Chat-heavy
* Administrative
* Like a raw data table

The salesperson should feel:

> **“These are my active Opportunities, and I can quickly understand what is happening with each one.”**

---

# Suggested Layout Structure

### Top

**My Opportunities**

Short supporting description explaining that this is the salesperson's active Opportunity workload.

### Search + Controls

* Search students/products
* Quick chips
* Sort
* Filter

### Primary Section

**Active Opportunities table**

Student → Product → Value → Latest Activity → Signal → Follow-up → Actions

### Bottom

Pagination / additional active Opportunities.

---

# Most Important Jobs This Screen Must Solve

1. **Show every active Opportunity owned by the salesperson.**
2. **Make each Opportunity easy to understand without opening it.**
3. **Show the latest meaningful activity, including student messages when relevant.**
4. **Show the current/strongest Signal without repeating the full Signal history.**
5. **Show the current follow-up commitment separately from latest activity.**
6. **Allow the salesperson to find a specific student, product, or Opportunity quickly.**
7. **Allow useful filtering without turning the page into a complex CRM.**
8. **Allow sorting by purchase interest, recency, follow-up date, and product value.**
9. **Keep weaker Signals such as repeated product interest visible rather than hiding Opportunities; purchase-interest ranking should prioritize stronger Signals first.**
10. **Support quick actions such as scheduling a follow-up or closing an Opportunity without making every row visually heavy.**
11. **Remove Won, Closed, and Invalid Opportunities from the active workload while preserving them as history.** 
12. **Keep the page distinct from Sales Queue: Sales Queue answers “what should I work on now?”, while My Opportunities answers “what active Opportunities do I own?”**

**That is the real purpose of the My Opportunities.**
