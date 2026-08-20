# Sales Queue UI

import pypandoc

content = r"""# Testpress Signals — V1 Sales Queue UI Product Design Specification

## 1. Product Purpose

### What is the Sales Queue?

The **Sales Queue** is the salesperson's daily working screen for identifying and acting on student purchase Opportunities.

It should immediately answer:


1. **What needs my attention now?**
2. **Why does it need my attention?**
3. **What should I do next?**
4. **What valuable Opportunity should I claim next?**

The system should prioritize the work automatically so the salesperson does not need to manually browse students, sort large datasets, or create filters.

The core workflow is:

> **Student purchase interest → Opportunity surfaced → salesperson acts → chat/follow-up → purchase**

The Sales Queue is **not**:

* A CRM database
* A reporting dashboard
* A generic student list
* A complete chat inbox
* A support-ticket queue

It is the salesperson's **daily work queue**.


---

# 2. V1 User

V1 is designed for the **Salesperson** role.

The salesperson's job is to work purchase Opportunities, communicate with students, follow up, and convert eligible Opportunities into purchases.

Manager, admin, and management-reporting experiences are outside this page.


---

# 3. Core Mental Model

## Opportunity

An **Opportunity** represents a specific student + product purchase opportunity.

Example:

> Priya Sharma → NEET Premium → ₹50,000

The Opportunity is the **primary sales-work unit shown in the UI**.

It communicates:

* Who the student is
* Which product they may buy
* Product value
* Why the Opportunity exists
* What should happen next

## Student ownership

Ownership is ultimately at the **student/conversation level**.

When a salesperson claims an Opportunity, they become responsible for that student and the student's active Opportunities.

This does **not** mean the Sales Queue should become student-based.

The UI should remain Opportunity-focused because the salesperson is deciding:

> **Which sales opportunity should I work?**

The ownership consequence can be explained during Claim.

### Example

Priya has:

* NEET Premium — ₹50,000
* UPSC Foundation — ₹30,000

Sales Queue can surface:

> **Priya Sharma**\nNEET Premium · ₹50,000\nCheckout started\nPotential incentive: ₹500\n**[Claim]**

When Claim is selected:

> **Claim Priya Sharma?**\nYou'll become responsible for this student and their active Opportunities.
>
> NEET Premium · ₹50,000\nUPSC Foundation · ₹30,000
>
> **[Claim student]**

This keeps the UI consistent while making the ownership rule clear.


---

# 4. What the Sales Queue Must Answer

The page should guide the salesperson through these questions:

### 1. What must I handle now?

**Follow-ups due today** and **Needs your attention**

### 2. What valuable work can I take next?

**High-value opportunities**

### 3. What recently changed?

**Recent activity**

### 4. What is scheduled for later?

**Upcoming follow-ups**

### 5. What have I achieved?

**My Results summary**


---

# 5. Page Header

## Heading

# Sales Queue

## Subtext

> **Students showing purchase interest and needing your attention.**

The description should be short enough for a first-time user to understand the page without requiring prior knowledge of Signals.

## Search

Placeholder:

> **Search students or products**

Search is for finding something specific.

It is not the primary mechanism for discovering work.


---

# 6. Page Layout

Recommended order:


1. **Follow-ups due today**
2. **Needs your attention**
3. **High-value opportunities**
4. **Recent activity**
5. **Upcoming follow-ups**
6. **My Results**

The first three sections are the primary working queue.

The last three provide supporting awareness.


---

# 7. Follow-ups Due Today

## Purpose

Show commitments the salesperson has already made that are due today.

Core question:

> **What follow-ups do I need to handle today?**

This section comes first because the salesperson has already committed to doing this work.

## Membership

An Opportunity appears here when its scheduled follow-up becomes due.

## Card information

Show:

* Student
* Product
* Product value
* Follow-up due time
* Short reason/context
* Next action
* Primary CTA

Example:

> **Rahul Kumar**\nUPSC Foundation · ₹20,000
>
> **Follow-up due · 10:00 AM**
>
> Student asked about pricing yesterday.
>
> **Next: Continue conversation**
>
> **[Chat]**

## Ranking

Rank primarily by:


1. Overdue
2. Due soon
3. Later today

Do not make product value the primary ranking factor here.

A ₹5,000 follow-up that is due now is still a commitment that needs to be handled.

## UX principle

> **See → understand → act.**

Do not show the full conversation or full activity history here.


---

# 8. Needs Your Attention

## Purpose

Show active Opportunities where a meaningful event has happened and the salesperson may need to act now.

Core question:

> **What changed that requires my response?**

## Primary ranking logic

This section is primarily **action/response-time based**, not money based.

The important question is:

> **How strongly does this event require the salesperson to act now?**

Useful inputs may include:

* How recently the event occurred
* Event type
* Whether the student is waiting for a response
* Follow-up timing
* Purchase context

Opportunity value may influence ranking, but **value does not define membership** in this section.

## Examples

### Student replied

> **Arjun Kumar**\nJEE Test Series · ₹15,000
>
> 💬 **Student replied 5 min ago**
>
> “Can I get a discount?”
>
> **Next: Reply to student**
>
> **[Chat]**

### Payment failed

> **Meena Sharma**\nNEET Premium · ₹25,000
>
> ⚠️ **Payment failed 10 min ago**
>
> **Next: Contact student**
>
> **[Chat]**

### Checkout abandoned

> **Karthik**\nUPSC Foundation · ₹20,000
>
> 🛒 **Checkout abandoned 20 min ago**
>
> **Next: Chat with student**
>
> **[Chat]**

## What should not automatically appear here?

Do not surface every low-value activity.

For example:

* Single product view
* Ordinary page visit
* Every normal chat message

These may contribute to an Opportunity's purchase-interest evidence but do not necessarily mean:

> **The salesperson needs to act now.**

## Important distinction

A ₹5,000 Opportunity where the student replied two minutes ago can belong here.

A ₹100,000 Opportunity with strong purchase interest but no new actionable event may belong in **High-value opportunities** instead.


---

# 9. High-Value Opportunities

## Purpose

Surface **unclaimed Opportunities that are financially worthwhile and show meaningful purchase interest**.

Core question:

> **What valuable Opportunity should I claim next?**

## Primary ranking logic

This section is driven mainly by:

* Product value
* Purchase interest
* Strength of relevant Signals
* Potential incentive
* Unclaimed ownership state

The system should rank the Opportunities automatically.

The salesperson should not need to manually filter:

> ₹20K+

or:

> High intent

to find worthwhile work.

## Card information

Show:

* Student
* Product
* Product value
* Purchase-interest explanation
* Concrete Signal evidence
* Potential incentive
* Primary action

Example:

> **Priya Sharma**\nNEET Premium · **₹50,000**
>
> 🔥 **Strong purchase interest**
>
> Viewed 4× · Checkout started
>
> **Potential incentive: ₹500**
>
> **[Claim]**

Another:

> **Rahul Kumar**\nUPSC Foundation · **₹20,000**
>
> Strong purchase interest
>
> Viewed 6× in 3 days
>
> **Potential incentive: ₹200**
>
> **[Claim]**

## Do not show unexplained scores

Do not show:

> Intent: 87/100

Instead show concrete evidence:

> Viewed 4× · Checkout started

The salesperson should understand:

> **This is worth taking.**


---

# 10. Claim Behavior

The Sales Queue remains Opportunity-focused, but Claim has a student-level ownership consequence.

## Before claim

The card shows:

> **[Claim]**

## Claim confirmation

Where needed:

> **Claim Priya Sharma?**
>
> You'll become responsible for this student and their active Opportunities.
>
> NEET Premium · ₹50,000\nUPSC Foundation · ₹30,000
>
> **[Claim student]**

## After claim

The salesperson becomes the owner of the student's active Opportunities.

The UI can show:

> **Owner: You**

This prevents the salesperson from mistakenly believing they only own the one product Opportunity they clicked.


---

# 11. Recent Activity

## Purpose

Provide lightweight awareness of meaningful changes in the salesperson's sales work.

Core question:

> **What has changed recently?**

This is not another work queue.

## Show

Examples:

> **2 min ago**\nRahul Kumar replied · UPSC Foundation · ₹20,000

> **15 min ago**\nFollow-up due · Priya Sharma · NEET Premium

> **1 hr ago**\nYou claimed Arjun Kumar · JEE Test Series

> **Yesterday**\nOpportunity won · Meena · ₹20,000\nIncentive earned: ₹200

## Do not show

* Every chat message
* Every product view
* Every page visit
* Raw student activity
* Detailed activity by other salespeople

Clicking an activity should open the relevant Opportunity.

The Sales Queue provides a compact activity view; the complete history belongs to Opportunity Detail.


---

# 12. Upcoming Follow-ups

## Purpose

Show future commitments without allowing them to compete with today's work.

Core question:

> **What have I scheduled for later?**

## Default state

Collapsed:

> **Upcoming follow-ups · 8 ▸**

## Expanded information

Show:

* Student
* Product
* Scheduled date/time
* Opportunity value

## Behavior

Future follow-ups should stay out of the main attention queue until their scheduled time.

When the scheduled time arrives, the Opportunity moves into:

> **Follow-ups due today**

The desired feeling is:

> “I know those are scheduled. I don't need to worry about them right now.”


---

# 13. My Results Summary

## Purpose

Provide a compact reminder of recent results without turning Sales Queue into an analytics dashboard.

Core question:

> **What have I converted and earned?**

Example:

> ### This week
>
> **8 Won** · **₹1,42,000 Purchase value** · **₹1,420 Incentive earned**
>
> **View my results →**

Keep this visually secondary.

Detailed results belong on **My Results**.

Do not add large charts or extensive analytics to Sales Queue.


---

# 14. Opportunity Lifecycle

The core lifecycle remains:

> **Unclaimed → Active → Won / Lost**

### Unclaimed

Available to claim.

### Active

Owned and being worked.

### Won

Automatically recorded when the student purchases the relevant product.

### Lost

Manually closed when the Opportunity will not convert.

Do not create separate lifecycle statuses for:

* Student replied
* Follow-up
* Awaiting student
* Discount requested
* Payment failed

These are context, events, or actions — not separate core Opportunity lifecycle stages.


---

# 15. Actions

## Primary actions

### Unclaimed

> **Claim**

### Student replied

> **Chat**

### Follow-up due

> **Chat**

### Active Opportunity

> **Chat**

The primary CTA should communicate what the salesperson should do now.

## Secondary actions

* View Opportunity
* Search
* Expand Upcoming Follow-ups
* View My Results

## Contextual actions

* Follow up
* Close
* Offer approved discount

Do not show every possible action on every card.


---

# 16. Search

Search is for finding something specific.

Users may search:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

Search results should show matching Opportunities.

## No results

> **No Opportunities found**
>
> Try another student or product.

Search should never replace automatic prioritization.

The salesperson should not need to search:

> “high-value opportunities”

because those should already be surfaced.


---

# 17. Filtering

Do not place a primary filter row such as:

> All | New | Active | Won | Lost | High | Medium | Low

The system should organize and rank the salesperson's work automatically.

If filtering is required later for a specific operational need, it should remain secondary.


---

# 18. States

## Normal populated state

The queue contains relevant Opportunities across:

* Follow-ups due
* Needs your attention
* High-value opportunities
* Recent activity

The salesperson should immediately understand what to do.


---

## No follow-ups due

> **No follow-ups due today**
>
> You're all caught up.

Keep the rest of the queue visible.


---

## Nothing needs attention

> **Nothing needs your attention right now**
>
> New actionable activity will appear here.


---

## No high-value/unclaimed Opportunities

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.


---

## No recent activity

> **No recent sales activity**
>
> Your meaningful sales activity will appear here.


---

## First-time salesperson

> **Your sales queue is ready**
>
> Purchase opportunities will appear here when students show meaningful buying interest.


---

## No current work

> **You're all caught up**
>
> No Opportunities need your attention right now.

This should feel positive rather than like an error.


---

# 19. Loading and Error States

## Loading

Use lightweight skeleton/loading states appropriate to the sections.

Do not show a blank page.

## Queue loading failure

> **We couldn't load your sales queue.**
>
> Please try again.

**[Try again]**

## Claim failure

> **Couldn't claim this Opportunity.**
>
> It may have already been claimed by someone else.

## Follow-up scheduling failure

> **Couldn't schedule the follow-up.**
>
> Try again.

## Stale Opportunity

If an Opportunity changes while the salesperson is viewing the queue, refresh its state rather than allowing an invalid action.

Errors should explain:

> **What happened + what the salesperson can do next.**


---

# 20. Responsive Behavior

## Desktop

Optimize for scanning multiple Opportunities quickly.

The hierarchy remains:


1. Follow-ups due
2. Needs attention
3. High-value opportunities
4. Recent activity
5. Upcoming follow-ups
6. My Results

Avoid dense CRM-style tables.

## Tablet

Maintain the same hierarchy with narrower/stacked sections.

The salesperson should still see:

* Who
* Product
* Value
* Why
* Next action

## Mobile

Use a single-column working queue.

Keep visible:

* Student
* Product
* Value
* Reason
* Next action
* Primary CTA

Upcoming follow-ups remain collapsed.

Recent activity remains secondary.

Avoid horizontal scrolling.


---

# 21. UX Personality

The Sales Queue should feel:

* Focused
* Smart
* Action-oriented
* Financially aware
* Calm
* Efficient
* Trustworthy

It should not feel:

* Administrative
* Overwhelming
* Report-heavy
* Mechanical
* Support-ticket-like
* Like a data dump
* Overly analytical

The salesperson should open it and feel:

> **“I know what I should work on.”**


---

# 22. Final Layout

## Header

**Sales Queue**

Students showing purchase interest and needing your attention.

**Search students or products**


---

## Primary work

### Follow-ups due today

Committed work that must be handled today.


---

### Needs your attention

Meaningful events that require a response or action now.


---

### High-value opportunities

Unclaimed Opportunities ranked by value and purchase interest.


---

## Supporting awareness

### Recent activity

Meaningful changes in the salesperson's sales work.


---

### Upcoming follow-ups · 8 ▸

Future commitments, collapsed until needed.


---

## Supporting results

### This week

Won · Purchase value · Incentive earned

**View my results →**


---

# 23. Section Logic Summary

| Section | Primary question | Main driver | UI unit |
|---------|------------------|-------------|---------|
| **Follow-ups due today** | What did I promise to do today? | Due time    | Opportunity |
| **Needs your attention** | What needs my response now? | Action/response urgency | Opportunity |
| **High-value opportunities** | What should I claim next? | Value + purchase interest | Opportunity |
| **Recent activity** | What changed recently? | Meaningful events | Opportunity/event |
| **Upcoming follow-ups** | What is scheduled later? | Scheduled time | Opportunity |
| **My Results** | What did I convert/earn? | Outcomes    | Result  |


---

# 24. Important Product Rule

### Do not confuse the ranking logic between sections.

**Needs your attention is not the "most expensive opportunities" section.**

It is primarily about:

> **Time-sensitive action and response.**

**High-value opportunities is not the "most urgent" section.**

It is primarily about:

> **Financial value + meaningful purchase interest.**

**Follow-ups due today is not the "highest priority" section.**

It is about:

> **Commitments that are due today.**

This separation prevents the three sections from becoming duplicates.


---

# 25. Core Card Pattern

Every actionable Opportunity card should answer:

> **Who? What? Why? Value? What next?**

Example:

> **Priya Sharma**\nNEET Premium · **₹50,000**
>
> 🔥 Strong purchase interest\nCheckout started · Viewed 4×
>
> Potential incentive: **₹500**
>
> **Next: Claim**
>
> **[Claim]**

For an active Opportunity:

> **Arjun Kumar**\nJEE Test Series · **₹15,000**
>
> 💬 Student replied 5 min ago “Can I get a discount?”
>
> **Next: Reply to student**
>
> **[Chat]**

The card should not require the salesperson to open the Opportunity just to understand what they should do.


---

# 26. What This Page Should Not Become

V1 Sales Queue should not become:

* Full HubSpot-style CRM
* Support-ticket system
* Generic chat inbox
* Student directory
* Analytics dashboard
* Complex sales pipeline
* Manual lead-scoring interface
* Full activity feed
* Discount-management system

The page exists to answer:

> **“What sales work should I do now, and what should I take next?”**


---

# 27. Most Important Jobs

The Sales Queue must:


 1. Tell the salesperson what needs attention today.
 2. Explain why an Opportunity needs attention.
 3. Distinguish **action urgency** from **financial value**.
 4. Surface valuable unclaimed Opportunities automatically.
 5. Make the next sales action obvious.
 6. Keep future commitments out of today's work.
 7. Provide lightweight awareness of meaningful changes.
 8. Let the salesperson find a specific student or product when necessary.
 9. Keep Opportunity lifecycle simple.
10. Keep the UI consistently Opportunity-focused.
11. Make the student-level ownership consequence of Claim clear.
12. Help the salesperson move from purchase interest to sales action and ultimately conversion.


---

# 28. Final Mental Model

The salesperson should be able to open Sales Queue and think:

> **Follow-ups due today**\n“These are my commitments.”
>
> **Needs your attention**\n“These students need me to respond now.”
>
> **High-value opportunities**\n“These are the valuable opportunities I can take next.”
>
> **Recent activity**\n“This is what changed.”
>
> **Upcoming follow-ups**\n“These are already scheduled; I can deal with them later.”
>
> **My Results**\n“This is what I've converted and earned.”