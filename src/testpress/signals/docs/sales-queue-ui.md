# Sales Queue

## Primary Purpose

The **Sales Queue** is the salesperson's daily working screen for quickly identifying **which student Opportunities need attention and what they should work on next**.

It solves the problem of salespeople having to manually search through students and Opportunities to decide where to spend their time.

The screen should help the salesperson:

* Identify Opportunities requiring action now
* Complete today's committed follow-ups
* Discover valuable unclaimed Opportunities worth taking
* Keep track of upcoming follow-ups
* See a compact view of their results and recently closed Opportunities

The experience should minimize friction between:

> **Purchase interest → sales action → conversion**

---

# Core User Intent

A salesperson visiting this screen may want to:

* Know **what needs my attention right now**
* Complete **follow-ups due today**
* Find **valuable unclaimed Opportunities to claim**
* Check **what follow-ups are coming later**
* Quickly see **my results and recently closed Opportunities**

The screen should naturally guide the salesperson from the most immediate work toward less urgent information.

---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A CRM database
* A generic student list
* A reporting dashboard
* A full chat inbox
* A large activity feed
* A support-ticket queue
* A place where the salesperson has to manually figure out what matters

It SHOULD feel like:

* Focused
* Action-oriented
* Prioritized
* Easy to scan
* Financially aware
* Calm and efficient

The experience should prioritize:

* **Immediate action over browsing**
* **Clear reasons over unexplained scores**
* **Opportunity value and purchase interest where relevant**
* **The next action the salesperson should take**
* **Today before later**

---

# 2. Primary Layout Expectations

When the salesperson opens Sales Queue, they should immediately understand **what requires their attention now**.

The most important information should appear first.

### Suggested High-Level Layout

**Top**

* Sales Queue
* Short page description
* Search students or products

**Primary Work**

* Needs your attention
* Follow-ups due today
* High-value opportunities
* Upcoming follow-ups

**Supporting Information**

* My Results
* Recently closed

The highest emphasis should go to **Needs your attention**, because it represents meaningful events requiring action now.

---

# 3. Needs Your Attention

Users should instantly understand:

> **“What changed that requires my response?”**

This is the most important working section on the page.

## Expected Information

For each relevant Opportunity:

* Student
* Product
* Product value
* Meaningful event
* When the event happened, when relevant
* Short context
* What the salesperson should do next
* Primary action

Examples of meaningful events:

* Student replied
* Payment failed
* Checkout was abandoned

Example:

> **Arjun Kumar**
> JEE Test Series · ₹15,000
>
> Student replied
> “Can I get a discount?”
>
> **Next: Reply to student**
>
> **Chat**

## UX Expectations

Prioritize based primarily on **action urgency and response time**, not simply Opportunity value.

A lower-value Opportunity can be more important than a high-value one if the student is actively waiting for a response.

The section should:

* Surface meaningful actionable events
* Avoid showing every minor student activity
* Make the reason for appearing in the section obvious
* Make the next action clear
* Avoid requiring the salesperson to open the Opportunity just to understand what happened

Do not automatically treat these as attention-worthy:

* Single product views
* Ordinary page visits
* Every normal chat message

---

# 4. Follow-ups Due Today

## Purpose

Show commitments the salesperson has already made that need to be completed today.

The key question is:

> **“What follow-ups do I need to handle today?”**

## Expected Information

Each Opportunity should communicate:

* Student
* Product
* Product value
* Follow-up due time
* Short reason/context
* Next action
* Primary action

Example:

> **Rahul Kumar**
> UPSC Foundation · ₹20,000
>
> Follow-up due · 10:00 AM
>
> Student asked about pricing yesterday.
>
> **Next: Continue conversation**
>
> **Chat**

## Expected Behavior

Rank primarily by:

1. Overdue
2. Due soon
3. Later today

The section should not be ranked primarily by product value.

A lower-value follow-up that is due now is still a commitment the salesperson needs to handle.

## Expected Feeling

> **“I know exactly which commitments I need to complete today.”**

---

# 5. High-Value Opportunities

## Purpose

Help the salesperson discover **valuable unclaimed Opportunities that show meaningful purchase interest**.

The key question is:

> **“What valuable Opportunity should I claim next?”**

## Expected Information

Each Opportunity should show:

* Student
* Product
* Product value
* Purchase-interest explanation
* Concrete Signal evidence
* Potential incentive
* Primary action

Example:

> **Priya Sharma**
> NEET Premium · ₹50,000
>
> Strong purchase interest
>
> Viewed 4× · Checkout started
>
> Potential incentive: ₹500
>
> **Claim**

## Expected Behavior

Rank automatically using signals such as:

* Product value
* Purchase interest
* Relevant Signals
* Potential incentive
* Unclaimed state

Do not require the salesperson to manually identify high-value Opportunities.

Do not show unexplained scores such as:

> Intent: 87/100

Instead show understandable evidence:

> Viewed 4× · Checkout started

The salesperson should be able to understand:

> **“This is worth taking.”**

Only **unclaimed Opportunities** belong here.

---

# 6. Upcoming Follow-ups

## Purpose

Show future commitments without allowing them to compete with today's work.

The key question is:

> **“What have I scheduled for later?”**

## Expected Information

When expanded:

* Student
* Product
* Scheduled date/time
* Opportunity value

## Expected Behavior

Keep this section secondary and collapsed by default.

Example:

> **Upcoming follow-ups · 8 ▸**

Future follow-ups should remain here until their scheduled time.

Once due, they move into:

> **Follow-ups due today**

## Expected Feeling

> **“I know they're scheduled, so I don't need to worry about them right now.”**

---

# 7. My Results

## Purpose

Provide a compact view of the salesperson's current results without turning Sales Queue into an analytics dashboard.

The key question is:

> **“What have I converted and earned?”**

## Expected Information

Show three key results:

* **Won**
* **Sales**
* **Incentive**

Example:

> **This week**
>
> **8 Won** · **₹1,42,000 Sales** · **₹1,420 Incentive**
>
> **View my results →**

## Expected Behavior

The three metrics should be easy to scan together.

Detailed performance information belongs on the dedicated **My Results** page.

Do not introduce large charts or extensive analytics here.

## Expected Feeling

> **“I can quickly see how I'm doing.”**

---

# 8. Recently Closed

## Purpose

Provide a compact view of the salesperson's recently closed Opportunities and their outcomes.

The key question is:

> **“What Opportunities recently finished, and what was the outcome?”**

This is supporting information, not another work queue.

## Expected Information

Show:

* Student
* Product
* Opportunity value
* Won/Lost outcome

Example:

> ✓ **Rahul Kumar**
> UPSC Foundation · ₹20,000
>
> × **Priya Sharma**
> NEET Premium · ₹25,000
>
> ✓ **Karthik R**
> JEE Test Series · ₹15,000

Use a clear outcome icon.

Do not repeat **Won** or **Lost** as text if the visual treatment already makes the outcome unambiguous.

Do not show time in the compact card.

## Expected Behavior

Show only the salesperson's own recently closed Opportunities.

Keep the section compact, around 4–5 items.

A **View all** action can lead to the broader closed-opportunity/results view.

Won Opportunities are particularly useful because a student purchase can automatically close an Opportunity, meaning the salesperson may not have manually closed it.

## Expected Feeling

> **“I can quickly see the outcomes of the Opportunities I was working on.”**

---

# 9. State Expectations

## Needs Your Attention — No Items

**Purpose**

Communicate that there are currently no actionable events.

**Expected Information**

> **Nothing needs your attention right now**
>
> New actionable activity will appear here.

**Primary Action**

No action is required.

**Expected Feeling**

Positive and calm — not like an error.

---

## Follow-ups Due Today — No Items

**Purpose**

Confirm that there are no commitments requiring action today.

**Expected Information**

> **No follow-ups due today**
>
> You're all caught up.

**Primary Action**

No action required.

**Expected Feeling**

Reassured.

---

## High-Value Opportunities — No Items

**Purpose**

Communicate that there are currently no unclaimed valuable Opportunities.

**Expected Information**

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.

**Primary Action**

No forced action.

**Expected Feeling**

Clear and informative.

---

## Recently Closed — No Items

**Purpose**

Handle the case where the salesperson has not yet closed any Opportunities.

**Expected Information**

> **No recently closed Opportunities**
>
> Your latest Won and Lost Opportunities will appear here.

**Primary Action**

No forced action.

**Expected Feeling**

Neutral and informative.

---

## First-Time Salesperson

**Purpose**

Explain what the Sales Queue will contain before meaningful Opportunities exist.

**Expected Information**

> **Your sales queue is ready**
>
> Purchase opportunities will appear here when students show meaningful buying interest.

**Expected Action**

No forced action.

---

# 10. Search Expectations

Search is relevant because the salesperson may occasionally need to find a specific student or product.

## Users may search for:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

## Expected Behavior

Search should help users **find something specific**.

It should not become the primary way to discover sales work.

The salesperson should not need to search:

> `high-value opportunities`

because valuable unclaimed Opportunities should already be surfaced automatically.

---

# 11. Actions Expectations

## Primary Actions

The primary action depends on the Opportunity context:

### Needs your attention

**Chat**

### Follow-up due

**Chat**

### High-value unclaimed Opportunity

**Claim**

## Secondary Actions

* View Opportunity
* View My Results
* View all recently closed Opportunities
* Expand Upcoming Follow-ups

## Contextual Actions

* Follow up
* Close
* Offer approved discount

Actions should always communicate **what the salesperson should do next**, rather than exposing every possible operation.

---

# 12. Empty State Expectations

The empty states should feel like part of the normal workflow, not failures.

### First-time

> **Your sales queue is ready**
>
> Purchase opportunities will appear here when students show meaningful buying interest.

### Nothing needs attention

> **Nothing needs your attention right now**
>
> New actionable activity will appear here.

### No follow-ups

> **No follow-ups due today**
>
> You're all caught up.

### No high-value opportunities

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.

### No recently closed

> **No recently closed Opportunities**
>
> Your latest Won and Lost Opportunities will appear here.

Avoid unnecessary CTAs that force the salesperson to manually browse or filter.

---

# 13. Error State Expectations

## Loading failure

Explain that the Sales Queue could not be loaded.

> **We couldn't load your sales queue.**
>
> Please try again.

Primary action:

**Try again**

## Claim failure

> **Couldn't claim this Opportunity.**
>
> It may have already been claimed by someone else.

The user should understand that the Opportunity may have changed before they acted.

## Follow-up failure

> **Couldn't schedule the follow-up.**
>
> Try again.

## Stale Opportunity

If an Opportunity changes while the salesperson is viewing it, the screen should reflect the latest state rather than allowing an invalid action.

The general principle is:

> **Explain what happened + what the salesperson can do next.**

---

# 14. Responsive Expectations

## Desktop

Optimize for quickly scanning and prioritizing multiple Opportunities.

The hierarchy should remain:

1. Needs your attention
2. Follow-ups due today
3. High-value opportunities
4. Upcoming follow-ups
5. My Results
6. Recently closed

## Tablet

Maintain the same priority order while allowing sections to become more compact or stacked.

The salesperson should still understand:

* Who
* Product
* Value
* Why
* Next action

## Mobile

Use a single-column working experience.

Keep the most important information visible:

* Student
* Product
* Value
* Reason
* Next action
* Primary action

Upcoming follow-ups remain secondary.

Recently closed remains secondary.

---

# 15. UX Personality

The screen should feel:

* Focused
* Smart
* Action-oriented
* Financially aware
* Calm
* Efficient
* Trustworthy

NOT:

* Administrative
* Overwhelming
* Report-heavy
* Mechanical
* Support-ticket-like
* Like a data dump
* Overly analytical

The salesperson should open the page and immediately feel:

> **“I know what I should work on.”**

---

# Suggested Layout Structure

### Top

**Sales Queue**

Students showing purchase interest and needing your attention.

**Search students or products**

### Primary Work

**Needs your attention**

Immediate actionable Opportunities.

**Follow-ups due today**

Today's commitments.

**High-value opportunities**

Valuable unclaimed Opportunities.

**Upcoming follow-ups**

Future commitments, collapsed until needed.

### Supporting Information

**My Results**

Won · Sales · Incentive.

**Recently closed**

Recent closed Opportunities and outcomes.

---

# Most Important Jobs This Screen Must Solve

1. Help the salesperson immediately identify **what needs attention now**.
2. Help the salesperson understand **why an Opportunity needs attention**.
3. Help the salesperson complete **follow-ups due today**.
4. Help the salesperson discover **valuable unclaimed Opportunities**.
5. Make the **next action** clear.
6. Keep **future follow-ups** separate from today's work.
7. Give the salesperson a quick view of **their results**.
8. Give lightweight visibility into **recently closed Opportunities**.
