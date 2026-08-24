# My Opportunities

## Primary Purpose

**My Opportunities is the salesperson's secondary workspace for viewing and finding all active Opportunities currently owned by them.**

The salesperson does **not** come here to decide what they should work on first. That is the job of the **Sales Queue**, which is the main daily working page.

The primary journey is:

> **Sales Queue → My Opportunities → select an Opportunity → Opportunity Detail → continue sales work**

My Opportunities solves the problem of:

> **“I have multiple active Opportunities. Show me all of mine and help me quickly find the one I want to work on.”**

It should allow the salesperson to:

* See their complete active Opportunity workload
* Find a specific student
* Find Opportunities for a specific product
* Narrow the list using useful filters
* Understand the current state of each Opportunity
* Open an Opportunity and continue working it

The screen should minimize friction between:

> **Owned Opportunities → find the right Opportunity → continue sales work**

The page should remain focused on **active Opportunities only**. Won and Lost Opportunities are historical outcomes and belong in **My Results**, while unclaimed Opportunities belong in the discovery/claiming flow. The core Opportunity model is still student + product + purchase opportunity, with one active Opportunity normally existing for a given student and product.  

---

# Core User Intent

A salesperson visiting this screen may want to:

* **See all active Opportunities I currently own**
* **Find a specific student or product**
* **Filter my Opportunities to a smaller, useful set**
* **Understand what is currently happening with each Opportunity**
* **Open an Opportunity and continue working it**

The screen should naturally support this workflow:

> **Sales Queue → My Opportunities → Search/filter → Find Opportunity → Open → Work**

The Sales Queue remains the salesperson's **main daily queue** and automatically prioritizes what deserves attention. My Opportunities should therefore provide **control and visibility**, rather than trying to replace the prioritization performed by Sales Queue. 

---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A second Sales Queue
* A CRM pipeline
* A student database
* A reporting dashboard
* A full Activity Feed
* A chat inbox
* A complex sales-management system
* A page where the salesperson must manually figure out what is most important

It SHOULD feel like:

* **Organized**
* **Searchable**
* **Flexible**
* **Easy to scan**
* **Opportunity-focused**
* **Calm**
* **Efficient**
* **Useful for managing a personal workload**

The experience should prioritize:

* **Complete visibility of active owned Opportunities**
* **Fast finding through search**
* **Useful filtering without unnecessary complexity**
* **Clear Opportunity context**
* **Product and value visibility**
* **Current state and next action**
* **Easy movement into Opportunity Detail**
* **Keeping prioritization in Sales Queue rather than duplicating it here**

A critical principle:

> **Sales Queue tells me what I should work on. My Opportunities lets me find any active Opportunity that is mine.**

---

# 2. Primary Layout Expectations

When the salesperson enters My Opportunities from Sales Queue, they should immediately understand:

> **“These are all the active Opportunities I currently own.”**

The screen should not require them to understand complicated sales stages.

The most important information should appear first:

1. Page identity
2. Search and filtering
3. Number of active Opportunities
4. Active Opportunity list
5. Relevant current context
6. Opportunity action/opening path

The highest emphasis should go to:

> **Finding and opening an Opportunity**

rather than creating new Opportunities or performing bulk management.

### Suggested High-Level Layout

**Top**

* My Opportunities
* Short description
* Search

**Controls**

* Filters
* Sort
* Active Opportunity count
* Applied filter indicators

**Primary Section**

* Active Opportunities

**Bottom**

* Pagination / additional Opportunities if required

There should not be separate Won/Lost sections because those are historical outcomes rather than current work.

---

# 3. Active Opportunities

This is the most important section.

Users should instantly understand:

> **“What active Opportunities am I currently responsible for?”**

## Expected Information

Each Opportunity should communicate enough information for the salesperson to recognize it without opening the detail page.

Show:

* Student
* Product
* Product value
* Current Opportunity state
* Priority when relevant
* Current meaningful activity/reason
* Awaiting state when relevant
* Follow-up information when relevant
* Next action when useful
* Entry into Opportunity Detail

### Example

**Rahul Kumar**

UPSC Foundation · **₹20,000**

**High priority**

Student replied · 5 min ago

**Next: Reply to student**

---

Another:

**Priya Sharma**

NEET Premium · **₹50,000**

Follow-up scheduled · Tomorrow, 10:00 AM

**Next: Continue conversation**

---

Another:

**Karthik R**

JEE Test Series · **₹15,000**

Awaiting student

---

## UX Expectations

### Show the complete active workload

The list should represent:

> **All active Opportunities owned by the salesperson.**

Do not automatically hide lower-priority Opportunities.

The Sales Queue already handles prioritization.

### Do not turn this into a ranked queue

The page should not communicate:

> “Opportunity #1 is the most important thing you should work on.”

That is the Sales Queue's responsibility.

Instead:

> “Here are all your active Opportunities. Find the one you need.”

### Keep the Opportunity as the primary unit

If one student has:

* NEET Premium
* UPSC Foundation

they should remain two Opportunity records.

Do not collapse them into:

> Rahul Kumar — 2 Opportunities

The product-specific Opportunity remains the actual sales-work unit. 

### Make the list scannable

The salesperson should be able to recognize:

> Who → Product → Value → Current context

without opening every Opportunity.

### Avoid excessive activity

Do not show every Signal or every student action.

For example, don't turn a row into:

> Viewed product → viewed pricing → viewed page → clicked checkout → returned → viewed product...

Signals are evidence supporting the Opportunity. The detailed evidence belongs in Opportunity Detail. 

---

# 4. Search and Filtering

## Purpose

Search and filtering are important on this page because the salesperson may have many active Opportunities.

The key question is:

> **“How can I quickly find the Opportunity I'm looking for?”**

### Expected Information

The page should provide:

* Search
* Filters
* Active filter visibility
* Clear filters
* Result count

### Search should support:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

> `NEET Premium`

The existing Signals UX defines search primarily around student and product discovery. 

### Filtering should support meaningful Opportunity dimensions

Useful filter categories include:

#### Product

> Which product are these Opportunities for?

This is likely one of the most important filters because one student can have multiple product-specific Opportunities.

#### Priority

> Which Opportunities have a particular level of priority?

Use the salesperson-facing concept:

* High
* Medium
* Low

Do not expose internal numeric scores.

The product definition specifically says the salesperson UI should use **Priority**, while internal intent and urgency can remain separate backend concepts. 

#### Awaiting / current conversation state

Useful states include:

* Needs response
* Awaiting response
* Follow-up due
* Future follow-up
* No conversation yet

These should be treated as **current working context**, not Opportunity lifecycle stages. 

#### Signal / reason

Allow the salesperson to find Opportunities based on meaningful purchase-interest evidence such as:

* Repeated product interest
* Pre-purchase enquiry
* Checkout abandoned
* Payment failed

These are supported Signal types in the current product definition. 

#### Follow-up

Useful options:

* Due today
* Upcoming
* No follow-up

This helps a salesperson find Opportunities based on their commitments.

#### Opportunity value

Where useful, allow filtering by value/range.

For example:

* Lower-value Opportunities
* Mid-value Opportunities
* High-value Opportunities

The exact ranges should not be treated as product rules until business configuration is confirmed.

### UX Expectations

Filters should help answer:

> **“Show me the subset of my active Opportunities I need to find.”**

They should not become a CRM-style filter builder.

Use a small number of meaningful categories rather than exposing every possible backend field.

The technical PRD supports filtering dimensions such as product, Signal type, awaiting state, urgency, attention labels, owner and lifecycle state. Since this page is already scoped to the current salesperson's active Opportunities, **owner and lifecycle do not need to become user-facing filters here**. 

### Filter behavior

Multiple filter categories should work together.

Example:

> Product: NEET Premium
> Priority: High
> Follow-up: Due today

Result:

> Only active NEET Premium Opportunities matching those conditions.

Applied filters should remain visible so the salesperson understands why the result set changed.

Provide:

> **Clear all**

when filters are active.

---

# 5. Opportunity Context and Current State

Purpose:

Help the salesperson understand:

> **“What is happening with this Opportunity right now?”**

## Expected Information

The Opportunity may currently have context such as:

### Needs response

> Student replied · 5 min ago

### Awaiting response

> Awaiting student

### Follow-up due

> Follow-up due · Today, 2:00 PM

### Future follow-up

> Follow-up scheduled · Tomorrow, 10:00 AM

### Payment issue

> Payment failed · 15 min ago

### Checkout issue

> Checkout abandoned · 30 min ago

### No conversation

> No conversation yet

These are **contextual states**, not separate lifecycle stages.

The Opportunity lifecycle remains:

> **Unclaimed → Active → Won / Lost**

and My Opportunities contains the **Active** portion relevant to the salesperson. 

## Expected Behavior

The current context should be concise.

The salesperson should be able to understand:

> **What happened recently?**

without seeing the entire Activity timeline.

The list should favor the **most useful current explanation**, not every underlying Signal.

### Expected Feeling

> **“I understand where this Opportunity currently stands.”**

---

# 6. Sorting Expectations

Sorting is relevant because My Opportunities is a browse/manage view rather than the prioritized daily queue.

## Purpose

Allow the salesperson to organize their active Opportunities according to how they want to browse them.

### Possible sorting options

* Recently updated
* Priority
* Follow-up due
* Product value
* Student name

### Recommended default

> **Recently updated**

This gives the salesperson a useful chronological view without competing with Sales Queue's automatic prioritization.

## Expected Behavior

Changing the sort should reorganize the current active list without changing:

* Ownership
* Opportunity state
* Filters
* Search

Sorting should feel like:

> **“How do I want to look through my Opportunities?”**

not:

> **“What does the system think I should work on?”**

---

# 7. State Expectations

## Active Opportunities

### Purpose

Represent Opportunities currently owned and being worked by the salesperson.

### Expected Information

* Student
* Product
* Value
* Current context
* Priority when relevant
* Follow-up context when relevant
* Next action

### Primary Action

Open / continue working the Opportunity.

### Expected Feeling

> **“These are the Opportunities I'm responsible for.”**

---

## Active — Needs Response

### Purpose

Indicate that the student has responded and the salesperson needs to act.

### Expected Information

> Student replied · 5 min ago

Optionally include a short conversation preview.

### Primary Action

**Chat**

### Expected Feeling

> **“This student is waiting for me.”**

---

## Active — Awaiting Response

### Purpose

Show that the salesperson has already acted and is currently waiting.

### Expected Information

> Awaiting response

### Primary Action

**View**

No urgent action should be implied.

### Expected Feeling

> **“I've done my part for now.”**

---

## Active — Follow-up Due

### Purpose

Indicate that a previously scheduled commitment is now due.

### Expected Information

> Follow-up due · Today, 2:00 PM

### Primary Action

**Chat**

### Expected Feeling

> **“This is a commitment I need to complete.”**

---

## Active — Future Follow-up

### Purpose

Show that the Opportunity remains active but the next action is scheduled for later.

### Expected Information

> Follow-up scheduled · Tomorrow, 10:00 AM

### Primary Action

**View**

The Opportunity should remain active.

A scheduled future follow-up does not mean the Opportunity has entered another lifecycle stage. 

### Expected Feeling

> **“This is already scheduled; I don't need to act on it yet.”**

---

## Active — No Conversation Yet

### Purpose

Represent an Opportunity that has been claimed but has not yet had a meaningful conversation.

### Expected Information

> No conversation yet

### Primary Action

**Chat**

### Expected Feeling

> **“I know I need to start the conversation.”**

---

## No Active Opportunities

### Purpose

Communicate that the salesperson currently has no active Opportunities.

### Expected Information

> **No active Opportunities**

> Opportunities you own will appear here while you're working on them.

### Primary Action

No forced action.

The salesperson can return to the Sales Queue to discover new work.

### Expected Feeling

Calm and informative.

Not:

> “Something is wrong.”

---

# 8. Actions Expectations

## Primary Actions

### Open Opportunity

The primary interaction is:

> **Open the Opportunity**

The salesperson should be able to enter Opportunity Detail from the Opportunity itself.

### Chat

When the current context requires a response:

> **Chat**

Chat is the most relevant direct action when a student has replied or a follow-up is due.

---

## Secondary Actions

* Search
* Filter
* Sort
* View Opportunity
* Clear filters

---

## Contextual Actions

Depending on the active Opportunity:

* Chat
* Follow up
* Close
* Offer approved discount

These actions should not all appear simultaneously.

The action shown should reflect:

> **What makes sense for this Opportunity right now?**

The PRD explicitly treats Chat, Follow up, Close and approved discount as actions rather than lifecycle states. 

---

## Actions That Should NOT Exist Here

Do not show:

* Claim
* Mark Won
* Mark Lost
* Create Opportunity
* Assign to another salesperson
* Bulk close
* Bulk assign

### Why?

**Claim** belongs to the unclaimed discovery flow.

**Won** is automatically detected after the same-product purchase.

**Lost** is an outcome action available while working the Opportunity, not a browsing status for this page.

Management/assignment workflows are future manager/admin concerns.

---

# 9. Discovery Expectations

My Opportunities is **not a discovery engine for new sales work**.

The salesperson discovers new work through:

> **Sales Queue**

and, where applicable:

> **Unclaimed Opportunities**

My Opportunities is for discovering something **within the salesperson's existing workload**.

### Useful discovery paths

A salesperson may:

> Sales Queue → My Opportunities

then:

> Search → Rahul Kumar

or:

> Filters → Product: NEET Premium

or:

> Filters → Follow-up due today

or:

> Filters → Priority: High

This gives the salesperson control without duplicating the Sales Queue's prioritization.

### No recommendations

Do not add:

> “You may also want to work on…”

or:

> “Recommended Opportunities”

The Sales Queue already provides automatic prioritization.

---

# 10. Empty State Expectations

## First-time / No Active Opportunities

### Purpose

Explain what the page contains before the salesperson owns any active Opportunities.

### Expected Information

> **No active Opportunities yet**

> Opportunities you own will appear here when you claim them from your sales queue.

### Suggested CTA direction

No forced CTA.

If navigation is useful:

> **Go to Sales Queue**

can be offered as a secondary navigation path.

### Expected Feeling

> **“I understand where my Opportunities will come from.”**

---

## No Results From Search

### Purpose

Explain that the current search did not find an active Opportunity.

### Expected Information

> **No Opportunities found**

> Try another student or product.

### Suggested CTA direction

> **Clear search**

### Expected Feeling

Clear and recoverable.

---

## No Results From Filters

### Purpose

Explain that active Opportunities exist, but none match the current filters.

### Expected Information

> **No Opportunities match your filters**

> Try changing or clearing your filters.

### Suggested CTA direction

> **Clear filters**

### Expected Feeling

Informative rather than broken.

---

## No Results From Search + Filters

If both search and filters are active:

> **No Opportunities match your search and filters**

> Try changing your search or clearing some filters.

Primary recovery:

> **Clear all**

---

# 11. Error State Expectations

## Loading Failure

### Purpose

Tell the salesperson that their Opportunity list could not be retrieved.

### Expected Information

> **We couldn't load your Opportunities.**

> Please try again.

### Primary Action

**Try again**

### Expected Feeling

Temporary and recoverable.

---

## Filter/Search Failure

If a search or filter operation cannot complete:

> **Couldn't update your Opportunities.**

> Try again.

The current list should not unnecessarily disappear.

---

## Stale Opportunity

If an Opportunity changes while the salesperson is viewing the list:

> The Opportunity should reflect its latest state.

For example, if a student purchases the product while the salesperson is looking at the list:

> The Opportunity becomes Won.

Since My Opportunities contains active Opportunities only, it should no longer appear in the active list after the state updates.

The converted Opportunity remains available historically through the appropriate results/history experience. The technical PRD requires converted Opportunities to be retained as historical records. 

### Expected UX principle

> **Show the latest truth rather than allowing an outdated action.**

---

## Action Failure

If an action such as follow-up or close fails:

Explain:

1. What happened
2. What the salesperson can do next

For example:

> **Couldn't schedule the follow-up.**

> Try again.

Avoid generic:

> Something went wrong.

---

# 12. Responsive Expectations

## Desktop

Optimize for:

> **Scanning many active Opportunities quickly.**

The salesperson should be able to:

* Search
* Filter
* Sort
* Compare Opportunities
* Open one quickly

The full active workload should be comfortably browsable.

The page should feel denser than Sales Queue because this is a list-management view, but it should still avoid the feeling of an enterprise CRM.

---

## Tablet

Maintain the same information hierarchy.

The salesperson should still quickly understand:

* Student
* Product
* Value
* Current context
* Next action

Less important information can become secondary.

The interaction model should remain:

> Search → Filter → Browse → Open.

---

## Mobile

Use a single-column Opportunity browsing experience.

Keep visible:

* Student
* Product
* Value
* Current context
* Priority when useful
* Next action
* Primary action

Search should remain immediately accessible.

Filters should remain easy to reach.

The salesperson should never need to remember information from another screen just to understand what an Opportunity represents.

Avoid turning the experience into a horizontally scrolling desktop-style data table.

---

# 13. UX Personality

The screen should feel:

* **Organized**
* **Focused**
* **Efficient**
* **Flexible**
* **Clean**
* **Professional**
* **Calm**
* **Trustworthy**

NOT:

* A CRM
* Administrative
* Overwhelming
* Report-heavy
* Mechanical
* A data dump
* A support-ticket system
* A second Sales Queue
* Overly analytical

The salesperson should open this page and feel:

> **“These are all my active Opportunities. I can find exactly the one I need.”**

---

# Suggested Layout Structure

## Top

**My Opportunities**

> Active Opportunities you're currently working on.

Search for:

> Student or product

---

## Controls

Search

Filters

Sort

Active Opportunity count

---

## Applied Filters

Show active filters clearly when filtering is being used.

Example:

> Product: NEET Premium ×
> Priority: High ×
> Follow-up: Due today ×

> **Clear all**

---

## Primary Section

### Active Opportunities

All active Opportunities currently owned by the salesperson.

Each Opportunity communicates:

* Student
* Product
* Value
* Current context
* Priority when relevant
* Follow-up context
* Next action

---

## Bottom

Additional Opportunities through pagination/load-more behavior if the active workload is large.

No Won/Lost section.

No separate historical section.

No analytics section.

---

# Most Important Jobs This Screen Must Solve

1. **Show the salesperson all active Opportunities they currently own.**

2. **Make it easy to find a specific student or product.**

3. **Allow the salesperson to narrow their workload using meaningful filters.**

4. **Help the salesperson understand the current context of an Opportunity without opening every one.**

5. **Keep product and Opportunity value visible so the salesperson understands what they are working on.**

6. **Show useful conversation/follow-up context without turning the page into an Activity Feed.**

7. **Let the salesperson quickly open an Opportunity and continue the actual sales workflow.**

8. **Keep the distinction between active work and historical outcomes clear.**

9. **Avoid duplicating Sales Queue's job of automatically deciding what the salesperson should work on first.**

10. **Keep new/unclaimed Opportunity discovery outside this page.**

11. **Keep Won/Lost history outside this page and in My Results/history.**

12. **Make search and filtering powerful enough for a salesperson with a large active workload, without turning the experience into a complex CRM.**

13. **Keep the Opportunity—not the student, Signal, chat message, or activity—the central unit of the page.**

14. **Maintain a clear path from Sales Queue → My Opportunities → Opportunity Detail.**

> **That is the real purpose of the My Opportunities.**
