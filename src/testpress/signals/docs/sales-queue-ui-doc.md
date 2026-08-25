# Sales Queue UI

## Primary Purpose

The Sales Queue is the salesperson's **daily working screen** for deciding what sales work to do now and what valuable Opportunity to take next.

It solves the problem of having to manually inspect students, conversations, and activity to determine who needs attention.

The screen should create a clear path from:

> **Student purchase activity → Salesperson action → Purchase outcome**

while minimizing friction between **identifying the right Opportunity → taking the next sales action**


---

# Core User Intent

A salesperson visiting this screen may want to:

* See which students need a response or action now.
* Complete follow-ups that are due today.
* Find strong purchase-interest Opportunities worth claiming.
* See what is scheduled for later without it distracting from today's work.
* Quickly understand recent sales activity and results.

The screen should naturally support these workflows without becoming a full CRM or analytics workspace.


---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A generic CRM dashboard.
* A support-ticket inbox.
* A generic chat inbox.
* A student directory.
* A complex sales pipeline.
* An analytics/reporting dashboard.
* A feed of every student activity.

It SHOULD feel like:

* A focused daily sales workspace.
* Smart about what deserves attention.
* Clear about what the salesperson should do next.
* Financially aware without being sales-pressure heavy.
* Calm and easy to scan.

The experience should prioritize:

* **Actionability over information volume.**
* **Relevant Opportunities over raw activity.**
* **Automatic prioritization over manual sorting.**
* **Clear next action over complicated status.**
* **Today's work over future work.**

The salesperson should open the page and immediately feel:

> **“I know what I should work on.”**


---

# 2. Primary Layout Expectations

The screen should immediately help the salesperson answer:

> **What should I work on right now?**

The most important information should appear first:


1. Opportunities requiring attention now.
2. Follow-ups due today.
3. Strong purchase-interest Opportunities worth claiming.
4. Future commitments.
5. Lightweight results/awareness.

The highest emphasis should go to **actionable sales work**, not metrics.

### Suggested High-Level Layout

* Page Header
* Needs Your Attention
* Follow-ups Due Today
* High Purchase Interest
* Upcoming Follow-ups
* My Results
* Recently Closed


---

# 3. Needs Your Attention

This is the most important section.

Users should instantly understand:

> **“Which students need me to act right now?”**

## Expected Information

Each Opportunity should communicate:

* Student
* Product
* Product value
* Latest relevant activity
* Time
* What the salesperson should do next

If the student has sent a message, the latest student message should be visible as a short preview.

Examples:

> **Rahul Kumar** · student replied 2 min ago “Can I pay this in installments?” UPSC Foundation · ₹20,000

For activity without a message:

> **Meena Sharma** · payment failed 15 min ago NEET Premium · ₹25,000

> **Karthik R** · checkout abandoned 30 min ago JEE Test Series · ₹15,000

The full Signal context does not need to appear here. It belongs in the Opportunity detail.

## UX Expectations

* Show only Opportunities requiring staff action now.
* Keep the section compact; it is a **quick work queue**, not the complete Opportunity list.
* Show up to **5** Opportunities in the Sales Queue.
* Provide access to the remaining Opportunities through the full queue.
* Prioritize action urgency and recency rather than product price.
* A recent student response should normally rise above older actionable events.
* An Opportunity waiting for the student should not appear as requiring staff attention.
* Future follow-ups should not appear here until they become due.

The salesperson should understand the required action without opening the Opportunity merely to figure out what happened.


---

# 4. Follow-ups Due Today

## Purpose

Show commitments the salesperson has already made that need to be completed today.

## Expected Information

* Student
* Product
* Product value
* Follow-up time
* Short reason/context
* Next action

Example:

> **10:00 AM** Rahul Kumar UPSC Foundation · ₹20,000 Asked about pricing

## Expected Behavior

* Show only follow-ups due today or already overdue.
* Order by **due time**, with overdue items first.
* Future follow-ups should stay out of this section.
* When a future follow-up becomes due, it moves into today's work.
* Keep the section focused on commitments rather than general Opportunity priority.

## Expected Feeling

> **“These are the things I promised to do today.”**

Future commitments should not compete with today's work.


---

# 5. High Purchase Interest

## Purpose

Show **unclaimed Opportunities with strong purchase interest** so the salesperson can decide what valuable opportunity to claim next.

Users should instantly understand:

> **“Which unclaimed students are showing the strongest buying interest?”**

## Expected Information

Each Opportunity should show:

* Student
* Product
* Product value
* Purchase-interest evidence
* Relevant Signal
* Potential incentive, when applicable
* Claim action

Example:

> **Priya Sharma** NEET Premium · **₹50,000** Payment failed Potential incentive: ₹500 **Claim**

## UX Expectations

This section is **not an urgency queue**.

Its ranking should prioritize:

### 1. Signal strength


1. **Payment Failure**
2. **Checkout Abandonment**
3. **Pre-Purchase Enquiry**
4. **Repeated Product Interest**

### 2. Product value

Within the same Signal type, the higher-value product comes first.

Example:

> Payment failed · ₹50,000 Payment failed · ₹30,000 Payment failed · ₹10,000

Then:

> Checkout abandoned · ₹50,000 Checkout abandoned · ₹30,000

### 3. Recency

Use recent relevant activity as a further tie-breaker.

If one Opportunity has multiple Signals, the **strongest/current Signal** should determine its purchase-interest position.

Example:

> Repeated Product Interest + Payment Failure

should be treated as **Payment Failure** for ranking.

Earlier Signals remain part of the Opportunity's history.

Show up to **5** Opportunities in this quick view.

The key distinction is:

> **Needs Your Attention = what needs action now.** **High Purchase Interest = what is worth claiming next.**

This separation prevents financial value and urgency from becoming the same ranking system.


---

# 6. Upcoming Follow-ups

## Purpose

Give visibility into future commitments without making them compete with today's work.

## Expected Information

* Student
* Product
* Product value
* Scheduled date/time

## Expected Behavior

* Remain secondary to today's work.
* Can remain collapsed by default.
* Show future commitments in chronological order.
* When a follow-up becomes due, it moves into **Follow-ups Due Today**.

## Expected Feeling

> **“These are already scheduled. I don't need to worry about them right now.”**


---

# 7. My Results

## Purpose

Provide a lightweight reminder of the salesperson's recent performance.

## Expected Information

Show a concise summary such as:

> **This week** 8 Won · ₹1,42,000 Purchase Value · ₹1,420 Incentive Earned

Provide a path to the full **My Results** experience.

## Expected Behavior

* Remain visually secondary.
* Do not turn Sales Queue into an analytics dashboard.
* Detailed performance belongs in My Results.

## Expected Feeling

> **“I can quickly see how I'm doing without leaving my work.”**


---

# 8. Recently Closed

## Purpose

Provide lightweight visibility into Opportunities that the salesperson recently completed, so they can quickly see recent outcomes without leaving the Sales Queue.

## Expected Information

Show:

* Student
* Product
* Product value
* Outcome
* Closed time

Examples:

> **Rahul Kumar** · UPSC Foundation · ₹20,000\n**Won** · 2 min ago

> **Priya Sharma** · NEET Premium · ₹50,000\n**Lost** · 1 hr ago

## Expected Behavior

* Show only recently closed Opportunities.
* Order by **most recently closed first**.
* Keep the list short and lightweight.
* Do not show the full conversation, Signal history, or closure details here.
* Opening an item should take the salesperson to the relevant Opportunity detail.
* Detailed performance and historical analysis belong in **My Results**.

## Expected Feeling

> **“I can quickly see what I recently completed and how it ended.”**


---

# 9. State Expectations

## Normal populated state

The salesperson sees relevant active work across:

* Needs Your Attention
* Follow-ups Due Today
* High Purchase Interest
* Upcoming Follow-ups
* Recent Activity
* My Results

The salesperson should immediately understand what deserves attention.

## No follow-ups due

> **No follow-ups due today** You're all caught up.

The other sections remain available.

## Nothing needs attention

> **Nothing needs your attention right now** New actionable activity will appear here.

## No high purchase-interest Opportunities

> **No unclaimed Opportunities right now** New purchase opportunities will appear here when available.

## No upcoming follow-ups

> **No upcoming follow-ups**

## No recent activity

> **No recent sales activity** Your meaningful sales activity will appear here.

## First-time salesperson

> **Your sales queue is ready** Purchase opportunities will appear here when students show meaningful buying interest.

## No current work

> **You're all caught up** No Opportunities need your attention right now.

Empty states should feel reassuring, not like an error.

# 15. Empty State Expectations

### First-time use

> **Your sales queue is ready** Purchase opportunities will appear here when students show meaningful buying interest.

### No current attention

> **Nothing needs your attention right now** New actionable activity will appear here.

### No follow-ups

> **No follow-ups due today** You're all caught up.

### No high purchase interest

> **No unclaimed Opportunities right now** New purchase opportunities will appear here when available.

### No recent activity

> **No recent sales activity** Your meaningful sales activity will appear here.

The CTA direction should encourage the salesperson to continue working elsewhere only when useful; the empty state itself should not create unnecessary work.


---

# 16. Error State Expectations

## Loading failure

Explain what happened and offer recovery:

> **We couldn't load your sales queue.** Please try again.

**Try again**

## Claim failure

> **Couldn't claim this Opportunity.** It may have already been claimed by someone else.

The salesperson should see the updated ownership state rather than being left with stale information.

## Follow-up action failure

> **Couldn't schedule the follow-up.** Try again.

## Stale Opportunity

If an Opportunity changes while the salesperson is viewing the queue, the experience should reflect the latest state before allowing the salesperson to continue.

Errors should always communicate:

> **What happened + what the salesperson can do next.**


---

# 17. Responsive Expectations

## Desktop

Optimize for quickly scanning multiple Opportunities and understanding the work hierarchy.

The salesperson should see:

* Who
* Product
* Value
* Why
* Next action

The screen should remain focused rather than becoming a dense CRM table.

## Tablet

Maintain the same information hierarchy while allowing sections to become more compact.

The salesperson should still understand the next action without opening every Opportunity.

## Mobile

Prioritize a single-column working experience.

Keep the most important information visible:

* Student
* Product
* Value
* Reason/activity
* Next action
* Primary CTA

Upcoming follow-ups can remain secondary/collapsed.

Avoid forcing the salesperson to interpret a dense data layout.


---

# 18. UX Personality

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

The desired feeling is:

> **“I know what I should work on.”**


---

# Suggested Layout Structure

### Top

**Sales Queue**

Short description explaining that this is the salesperson's daily purchase-work queue.

Search for a specific student or product.

### Primary Work

**Needs Your Attention**

Immediate actionable Opportunities.

**Follow-ups Due Today**

Commitments that must be completed today.

**High Purchase Interest**

Strong unclaimed Opportunities worth claiming next.

### Secondary Work

**Upcoming Follow-ups**

Future commitments that do not require attention yet.

### Supporting Awareness

**Recently Closed**\nA quick view of the salesperson's recently completed Opportunities and their outcomes.

### Supporting Results

**My Results**

Compact view of recent conversion and incentive performance.


---

# Most Important Jobs This Screen Must Solve


 1. Tell the salesperson **what needs action now**.
 2. Show **why the Opportunity needs attention** without overwhelming them.
 3. Make the **next action obvious**.
 4. Keep **action urgency separate from purchase interest and product value**.
 5. Surface **strong purchase-interest Opportunities** worth claiming.
 6. Rank High Purchase Interest by **Signal strength → product value → recency**.
 7. Keep future follow-ups out of today's immediate work.
 8. Help the salesperson complete today's commitments.
 9. Provide lightweight awareness of meaningful sales activity.
10. Let the salesperson find a specific student or product when needed.
11. Keep the Sales Queue focused on **Opportunities**, not raw student activity.
12. Make claiming ownership intentional and understandable.
13. Move the salesperson naturally from **purchase interest → action → conversation → conversion**.
