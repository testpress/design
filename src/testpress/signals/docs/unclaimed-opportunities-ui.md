Absolutely. Based on the PRD and the Sales Queue decisions we've already finalized, **Unclaimed Opportunities should be a focused discovery-and-claim page**, not another Sales Queue and not a general CRM list.

The important product rule is that **unclaimed Opportunities are surfaced because they are available for ownership**, while the Sales Queue's High-value section specifically helps the salesperson decide what valuable opportunity to claim next. 

# Unclaimed Opportunities

## Primary Purpose

Unclaimed Opportunities exists so the salesperson can **discover active purchase Opportunities that nobody currently owns, evaluate which ones are worth taking, and claim them**.

The page solves the problem of:

> **“I have finished/need more work. Which available Opportunities should I take ownership of?”**

It should provide enough information to make a confident claim without requiring the salesperson to open every Opportunity.

Include:

> **while minimizing friction between**
> discovering an Opportunity → understanding its value and purchase interest → claiming it

The core lifecycle remains:

> **Unclaimed → Active → Won/Lost**

Unclaimed means the Opportunity is available to claim; it is not another sales status such as “waiting” or “needs attention.” 

---

# Core User Intent

A salesperson visiting this screen may want to:

* Find available Opportunities worth pursuing
* Understand **why** each Opportunity is worth taking
* Compare Opportunities across students, products, value, and purchase interest
* Find a specific student or product
* Claim an Opportunity and take ownership
* Avoid claiming Opportunities without enough useful context

The screen should naturally support:

> **Discover → evaluate → claim → continue working**

---

# 1. High-Level UX Philosophy

This screen should NOT feel like:

* A CRM database
* A generic lead list
* A student directory
* A complex sales pipeline
* A manual lead-scoring tool
* An analytics dashboard
* A place where salespeople have to calculate which Opportunities are valuable

It SHOULD feel like:

* A **pool of available sales Opportunities**
* Smart and prioritized
* Easy to evaluate
* Action-oriented
* Financially aware
* Fast to scan
* Trustworthy

The experience should prioritize:

* **Why this Opportunity matters**
* Product and potential value
* Concrete purchase-interest evidence
* Clear ownership consequence
* Fast claiming

The product should do the prioritization work; the salesperson should focus on **choosing and working**. The PRD explicitly says the salesperson should not need to manually construct filters such as high-value or high-intent to discover worthwhile work. 

---

# 2. Primary Layout Expectations

The screen should immediately communicate:

> **These are Opportunities available for me to claim.**

The most important information should appear before secondary filtering/navigation.

### Suggested High-Level Layout

**Header**

**Quick filters / search**

**Available Opportunities**

**Opportunity list**

**Pagination / additional results**

The page should prioritize the **Opportunity list**, rather than adding dashboard-style summaries.

---

# 3. Available Opportunities

This is the most important section.

Users should instantly understand:

> **“Which Opportunities can I claim, and why should I care about them?”**

## Expected Information

Each Opportunity should communicate:

* Student
* Product
* Product value
* Purchase-interest explanation
* Concrete Signal evidence
* Potential incentive, where applicable
* Primary action: **Claim**
* Enough context to understand what the salesperson is taking ownership of

Example:

> **Priya Sharma**
> NEET Premium · **₹50,000**
>
> 🔥 **Strong purchase interest**
>
> Viewed 4× · Checkout started
>
> Potential incentive: **₹500**
>
> **[Claim]**

The PRD specifically establishes this card information pattern: student, product, value, purchase-interest explanation, concrete Signal evidence, potential incentive, and Claim. 

## UX Expectations

### Prioritization

The system should automatically rank available Opportunities based primarily on:

* Product value
* Purchase interest
* Strength of relevant Signals
* Potential incentive
* Unclaimed ownership state

The salesperson should **not need to manually calculate or configure these factors**. 

### Signal explanation

Use concrete evidence:

> Viewed 4× · Checkout started

rather than:

> Intent score: 87

The salesperson should understand:

> **“This is worth taking.”**

The PRD explicitly rejects unexplained intent scores in favor of concrete evidence. 

### Value

Product value should be visible because financial value helps the salesperson decide which Opportunity to pursue.

### Incentive

Before conversion, show:

> **Potential incentive: ₹500**

Do not show actual earned incentive before purchase. The distinction is explicitly established in the Signals design principles. 

### Claim clarity

The salesperson should understand that Claim is not merely claiming a product card.

Claim has a **student-level ownership consequence**.

If needed, confirmation should communicate:

> **Claim Priya Sharma?**
> You'll become responsible for this student and their active Opportunities.

The PRD specifically defines this ownership consequence. 

---

# 4. Search and Discovery Controls

Purpose:

Help the salesperson find a **specific available Opportunity** when they already know what they're looking for.

Expected Information:

* Search
* Relevant quick filters
* Result count

Expected Behavior:

Search should support:

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `UPSC Foundation`

Search should **not replace automatic prioritization**.

The salesperson shouldn't have to search:

> `high value`

or:

> `high intent`

to discover worthwhile work. Those Opportunities should already be ranked appropriately. 

Expected Feeling:

> **“I can find something specific when I need to, but the product has already done the hard discovery work.”**

---

# 5. Filtering Expectations

Filtering is useful here because, unlike Sales Queue, this page represents the **larger pool of available Opportunities**.

However, filters should remain secondary to automatic ranking.

## Quick Filters

I would support a small set of useful quick filters:

* **All**
* **High-value**
* **Needs attention**
* **Follow-ups due today**

Only use filters whose underlying logic is already defined by the product.

### All

All currently unclaimed Opportunities.

### High-value

Unclaimed Opportunities where financial value and meaningful purchase interest make them especially worthwhile.

This corresponds closely to the High-value Opportunities logic already defined for Sales Queue. 

### Needs attention

Unclaimed Opportunities where a meaningful recent event may require salesperson action.

This should use the same underlying concept as Sales Queue's Needs your attention logic: meaningful action/response urgency rather than simply high product value. 

### Follow-ups due today

Only if an unclaimed Opportunity can legitimately have a follow-up associated with it. If follow-ups only become relevant after ownership, **do not expose this filter**.

This is an area where the PRD does not explicitly define the behavior for unclaimed Opportunities, so it should not be invented without product confirmation.

## Deeper Filters

If needed:

* Product
* Student
* Product value range
* Signal / reason
* Priority

Do not create a large CRM-style filter panel by default.

---

# 6. Priority Expectations

Priority can help users evaluate available Opportunities, but it should **not become the primary way they discover them**.

If displayed, use a simple human-readable classification:

> **High**

or:

> 🔥 **High priority**

Do not expose:

> Priority score: 87

The underlying exact Priority calculation is not finalized in the source material, so the UI should not define the formula. The product principles only establish that unexplained scores should not be exposed. 

Priority should support the decision:

> **“Should I claim this?”**

not become a manual scoring interface.

---

# 7. Claim Expectations

Claim is the **primary action on this page**.

## Primary Action

> **Claim**

Every actionable unclaimed Opportunity should make Claim easy to find.

## Claim Behavior

Before claiming:

> **[Claim]**

After successful claim:

The Opportunity should no longer appear in the unclaimed list and should become part of the salesperson's **My Opportunities**.

The PRD establishes that claiming makes the salesperson responsible for the student's active Opportunities. 

## Claim Confirmation

For situations where confirmation is appropriate:

> **Claim Priya Sharma?**
>
> You'll become responsible for this student and their active Opportunities.
>
> NEET Premium · ₹50,000
> UPSC Foundation · ₹30,000
>
> **[Claim student]**

The important UX principle is that the salesperson understands **what ownership means before confirming**.

---

# 8. Opportunity Information Expectations

The list should provide enough information to answer:

> **Who? What? Why? Value? What next?**

### Who?

> Priya Sharma

### What?

> NEET Premium

### Value?

> ₹50,000

### Why?

> Strong purchase interest
> Viewed 4× · Checkout started

### What next?

> **Claim**

This follows the established core Opportunity pattern. 

---

# 9. Actions Expectations

## Primary Actions

**Claim**

This is the dominant action.

## Secondary Actions

* View Opportunity
* Search
* Filter
* Sort

## Contextual Actions

Only where relevant:

* View Signals
* View Opportunity
* Claim

Do not expose every possible sales operation on every Opportunity.

The page's job is primarily:

> **Find → evaluate → claim**

not fully work the Opportunity.

---

# 10. State Expectations

## Available

### Purpose

Show Opportunities that are currently unclaimed and available.

### Expected Information

* Student
* Product
* Value
* Purchase-interest explanation
* Signal evidence
* Potential incentive
* Claim action

### Primary Action

**Claim**

### Expected Feeling

> “I understand what this is and can take it.”

---

## Recently Claimed / No Longer Available

If another salesperson claims an Opportunity while the page is open, the UI should update the Opportunity rather than allowing the salesperson to claim stale ownership.

Possible messaging:

> **This Opportunity was just claimed.**

Then remove it from the available list.

The source material explicitly calls for stale Opportunities to have their state refreshed rather than allowing invalid actions. 

---

## No Unclaimed Opportunities

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.

This exact empty-state direction is established in the Sales Queue specification. 

Do not force a CTA such as:

> Create Opportunity

because Opportunities are generated from meaningful purchase-interest Signals rather than manually created by the salesperson.

---

## No Search Results

> **No Opportunities found**
>
> Try another student or product.

Keep the search result state simple.

---

## First-Time / No Data

If the system genuinely has no available Opportunities:

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.

Do not make the salesperson configure anything to populate the page.

---

# 11. Search Expectations

Search is relevant because this page can contain many unclaimed Opportunities.

## Users may search for

* Student name
* Product name
* Specific Opportunity

Examples:

> `Rahul Kumar`

> `NEET Premium`

## Expected Behavior

Search should narrow the available Opportunity list.

Results should preserve the same Opportunity information:

> Student → Product → Why → Value → Claim

Search should never remove the ability to understand **why an Opportunity is worth claiming**.

---

# 12. Sorting Expectations

Sorting can help when there are many available Opportunities.

Useful options could include:

* Recommended
* Highest value
* Most recent activity
* Highest priority

### Default

**Recommended**

The default should preserve the product's automatic ranking.

The salesperson should not have to manually sort by value to find worthwhile opportunities.

The source establishes automatic ranking for High-value Opportunities. 

---

# 13. Discovery Expectations

The page should primarily support **discovery of available work**.

The system should surface Opportunities using:

* Purchase interest
* Signal strength
* Product value
* Potential incentive
* Recency/meaningfulness where appropriate

The user should not need to understand the underlying scoring system.

The experience should communicate:

> **“Here are the Opportunities worth considering.”**

rather than:

> **“Here is a database. Good luck finding the good ones.”**

---

# 14. Empty State Expectations

## No available Opportunities

> **No unclaimed Opportunities right now**
>
> New purchase opportunities will appear here when available.

## No search results

> **No Opportunities found**
>
> Try another student or product.

## Filter returns no results

> **No Opportunities match these filters**
>
> Try changing your filters.

Do not treat these as errors.

---

# 15. Error State Expectations

## Loading failure

> **We couldn't load unclaimed Opportunities.**
>
> Please try again.

Primary action:

> **Try again**

## Claim failure

> **Couldn't claim this Opportunity.**
>
> It may have already been claimed by someone else.

Primary action:

> **Try again**

If the Opportunity is no longer available, remove it from the list.

## Stale Opportunity

If ownership changes while the salesperson is browsing:

> **This Opportunity is no longer available.**

The list should update.

The established product rule is:

> **What happened + what can I do next?** 

---

# 16. Responsive Expectations

## Desktop

Optimize for comparing multiple Opportunities.

The salesperson should easily scan:

* Student
* Product
* Value
* Why it matters
* Potential incentive
* Claim

A table or structured list can work well if the number of Opportunities is large.

## Tablet

Maintain the same information hierarchy while allowing the Opportunity information to stack naturally.

Keep:

* Student
* Product
* Value
* Reason
* Claim

## Mobile

Use a single-column Opportunity list.

Keep immediately visible:

* Student
* Product
* Value
* Reason
* Claim

Secondary information such as detailed Signal evidence can be progressively revealed.

Avoid horizontal scrolling.

---

# 17. UX Personality

The screen should feel:

* **Opportunity-focused**
* Smart
* Action-oriented
* Selective
* Financially aware
* Efficient
* Trustworthy

NOT:

* Administrative
* Like a CRM database
* Like a lead marketplace
* Overwhelming
* Analytical
* Like a support inbox
* Like a raw Signal feed

The salesperson should open it and feel:

> **“There are worthwhile Opportunities here. I can quickly understand them and take the ones I want.”**

---

# Suggested Layout Structure

### Top

**Unclaimed Opportunities**

Short description:

> Opportunities showing purchase interest that are available to claim.

### Quick discovery

**All · High-value · Needs attention · Follow-ups due today**
Search
Filters
Sort

### Primary Section

**Available Opportunities · 42**

Recommended/ranked Opportunity list.

Each item:

> Student
> Product · Value
> Purchase-interest explanation
> Concrete Signal evidence
> Potential incentive
> **Claim**

### Bottom

Pagination / Load more

No dashboard-style analytics.

---

# Most Important Jobs This Screen Must Solve

1. **Show the salesperson what Opportunities are available to claim.**
2. **Explain why each Opportunity is worth considering.**
3. **Show product value clearly.**
4. **Show concrete purchase-interest evidence rather than unexplained scores.**
5. **Help the salesperson compare available Opportunities quickly.**
6. **Surface valuable Opportunities automatically rather than requiring manual discovery.**
7. **Make Claim the obvious primary action.**
8. **Make the student-level ownership consequence of Claim clear.**
9. **Prevent stale/duplicate claiming when another salesperson takes an Opportunity.**
10. **Move successfully claimed Opportunities into My Opportunities.**
11. **Keep the page focused on discovery and claiming rather than turning it into a full CRM.**

**That is the real purpose of the Unclaimed Opportunities page.**
