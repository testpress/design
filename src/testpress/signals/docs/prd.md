# Testpress Signals — V1 UI & Product Design Specification

## 1. Product definition

### What is Testpress Signals?

**Testpress Signals identifies students showing meaningful purchase interest and turns that activity into actionable sales Opportunities for sales staff to work and convert.**

It is **not primarily a chat feature**.

Chat is the communication mechanism used after a salesperson takes an Opportunity.

The core workflow is:

> **Detect buying interest → surface Opportunity → salesperson works it → chat/follow up → student purchases or Opportunity is closed**

Signals collects multiple student activities silently and uses meaningful combinations of those activities to surface fewer, useful Opportunities rather than showing every activity individually. The underlying PRD explicitly defines Signals as evidence that can be grouped into a student–product Opportunity.

### Core question the product must answer

> **Which students should I work on, why are they worth my attention, and what should I do next?**


---

# 2. V1 primary persona

## Primary user: Salesperson

V1 is designed for:

> **The salesperson working the sales queue.**

Not:

* CEO
* Institute owner
* Sales manager
* Marketing team

The salesperson's goal is to **convert student opportunities into purchases and earn incentive from eligible conversions**.

The UI therefore prioritizes:


1. Opportunities worth working
2. Product value
3. Student buying signals
4. What needs attention now
5. What action to take
6. What the salesperson has already converted
7. What the salesperson has earned


---

# 3. Future roles

These are **not separate V1 experiences**.

### Sales Manager — future add-on

Would eventually need:

* Team opportunities
* Ownership
* Reassignment
* Team activity
* Conversion performance
* Revenue
* Incentive/performance
* Follow-up performance

### Institute Admin — future/additional experience

Would eventually need:

* Signal configuration
* Product/discount configuration
* Sales configuration
* Overall revenue impact
* Assisted revenue
* Directly attributed revenue
* Product/template/owner reporting

The existing Signals specification already anticipates administrative Signal-template settings and management reporting separately from the staff workflow.

**Do not design these as alternate versions of the V1 salesperson home.**


---

# 4. Core concepts

## Signal

A **Signal** is evidence that a student may be considering a purchase or needs purchase-related assistance.

Examples:

* Repeatedly viewed a product
* Started checkout
* Abandoned checkout
* Payment failed
* Pre-purchase enquiry
* EMI enquiry
* Discount request

Signals are **evidence**, not work items.

The PRD specifically requires Signal explanations to be based on concrete activity such as “Payment failed 6 minutes ago” or “Viewed this product four times in five days,” rather than unexplained scores.


---

## Opportunity

An **Opportunity** is the actual sales work item.

Example:

> **Priya Sharma** UPSC Foundation · ₹20,000 Strong purchase interest

Multiple Signals can belong to one Opportunity.

Example:

> Viewed 4× → Started checkout → Payment failed → Returned again

These should **not become four rows**.

They are evidence for one Opportunity:

> **Priya Sharma — UPSC Foundation — ₹20,000**

The underlying model should maintain one active Opportunity for the same institute + student + product combination.


---

## Ownership

An Opportunity can have one salesperson responsible for working it.

### V1 action

**Claim**

We discussed “Assign to me,” but the completed Action Vocabulary decision already uses **Claim**, and there is no strong reason to reopen it.

Use:

> **[Claim]**

After claiming:

> **Owner: You**

Internally, ownership should still be modeled as assignment/ownership so future manager assignment or automatic assignment can be supported without redesigning the domain model.


---

# 5. Final Opportunity lifecycle

For the salesperson-facing V1, keep the lifecycle simple:

```text
UNCLAIMED
    ↓
ACTIVE
    ↓
 ┌─────────────┐
 ↓             ↓
WON           LOST
```

## Unclaimed

Opportunity exists but nobody is working it.

Example:

> Priya Sharma NEET Premium · ₹50,000 Strong purchase interest
>
> **[Claim]**


---

## Active

The salesperson has claimed the Opportunity and is working it.

The salesperson can:

* Chat
* Follow up
* Offer an approved discount
* Continue working the Opportunity
* Close it if it will not convert

Do **not** create separate Opportunity statuses for:

* Waiting on student
* Waiting on institute
* Chatting
* Follow-up
* Student replied
* Discount requested
* Payment failed

Those are **events, conversation states, or actions**, not separate core Opportunity lifecycle states.


---

## Won

**Automatically detected when the student successfully purchases the same product associated with the Opportunity.**

Example:

> Student purchases UPSC Foundation ↓ Testpress detects purchase ↓ Opportunity → **Won**

The PRD explicitly requires same-product conversion to automatically convert the active Opportunity and record purchase reference, value, conversion time and owner at conversion.

The salesperson should **not manually mark a successful purchase as Won**.


---

## Lost

Manually closed by the salesperson when the opportunity will not convert.

Flow:

> **Close → Lost → Select reason**

Suggested reasons:

* Not interested
* Chose another product/provider
* Too expensive
* No response
* Other

The exact reason list should remain configurable at the product/business level if required.


---

## Invalid — special/system state

The PRD also supports invalid Opportunities.

For V1 UI, I would **not make Invalid a normal sales outcome alongside Won/Lost**.

It is a data-quality/qualification action rather than a sales result.

Example:

> Opportunity created incorrectly / wrong product / duplicate / not actually a sales opportunity

It can be handled through a secondary action such as:

> **More → Mark as invalid**

This keeps the salesperson's main mental model:

> **Open work → Won / Lost**

while still allowing the system to maintain data quality.


---

# 6. Conversation state

Opportunity lifecycle and conversation state are different.

An active Opportunity can have one of these actionable states:

### Needs response

Student has replied and the salesperson needs to respond.

Example:

> 💬 **Student replied 5 min ago**
>
> “Can I get a discount?”

Primary action:

> **[Chat]**


---

### Awaiting response

Salesperson has sent the latest message and there is currently no student response.

Do **not** treat this as a separate Opportunity lifecycle status.

It simply means:

> No immediate response is required from the salesperson.


---

### Follow-up due

A salesperson previously scheduled a follow-up and its due time has arrived.

Primary action:

> **[Chat]**


---

### Future follow-up

Scheduled but not due yet.

Keep it **collapsed/out of the way** until its date.

> **Upcoming follow-ups · 8 ▸**

When the date arrives, it moves into:

> **Follow-ups due today**


---

# 7. Terminology

## Use

* Signal
* Opportunity
* Claim
* Chat
* Follow up
* Close
* Won
* Lost
* High priority
* Product value
* Incentive earned
* Needs response
* Follow-up due
* Awaiting response

## Do not use

* Waiting on student
* Waiting on institute
* Ticket pending
* Ticket resolved
* Deal stage
* Closed ticket
* MRR / ARR
* BDR / BDM
* Complex HubSpot pipeline terminology

### Priority vs urgency

For the **salesperson UI**, use:

> **Priority**

Do not show separate Priority and Urgency labels.

However, this does **not mean the backend must eliminate urgency**.

The technical PRD defines **intent and urgency as separate internal concepts**, with urgency able to decay over time. That is useful for Signal processing.

Therefore:

> **Backend:** Signals may maintain intent and urgency. **Salesperson UI:** Do not expose “Urgency” as a competing label. Surface the resulting **Priority** and explain why.


---

# 8. Priority

## What does Priority mean?

> **Priority tells the salesperson which opportunity deserves attention before another opportunity.**

Do not expose an unexplained score such as:

> 87/100

Instead show:

> 🔥 **High priority**
>
> Payment failed 10 min ago · ₹20,000 opportunity

or:

> 🔥 **High priority**
>
> Student replied 5 min ago · ₹50,000 opportunity

The salesperson sees **the conclusion and the reason**.


---

## Priority inputs

The final backend formula still needs to be defined, but the useful inputs are:

### Purchase intent

How strongly the student's activity indicates purchase consideration.

Examples:

* Repeated product interest
* Checkout started
* Checkout abandoned
* Payment failed
* Pre-purchase enquiry
* Discount request

### Opportunity value

How much the associated product is worth.

### Action required

Whether the salesperson currently needs to act.

Examples:

* Student replied
* Follow-up due
* Payment failed

### Important

These are **inputs to ranking**, not separate labels that need to clutter the UI.

The system should rank opportunities automatically.


---

# 9. Value-ranked opportunities

This is a specific requirement from the Sales Team discussion.

A salesperson may choose between:

> ₹3,000 product ₹20,000 product

If both represent meaningful opportunities, the higher-value opportunity has greater earning potential.

Therefore the **unclaimed opportunity section must be ranked by value**, not presented as an arbitrary list.

### Example

**Priya Sharma**

NEET Premium · **₹50,000**

🔥 Strong purchase interest

Viewed 4× · Checkout started

**Potential incentive: ₹500**

`[Claim]`

Then:

**Rahul Kumar**

JEE Test Series · **₹3,000**

Strong purchase interest

Viewed 5×

**Potential incentive: ₹30**

`[Claim]`

Assuming the configured incentive is 1%.


---

# 10. Product value and incentive

Product price is available in Testpress.

Actual purchase value is available from order data.

Therefore Signals can surface:

> **Product value: ₹20,000**

The incentive model we are proposing is:

> **Backend-configured percentage × eligible purchase value**

Example:

> Product purchase = ₹20,000 Incentive = 1% **Earned = ₹200**

Another example:

> Product purchase = ₹200 Incentive = 1% **Earned = ₹2**

### Important distinction

Before purchase:

> **Potential incentive**

After eligible purchase:

> **Incentive earned**

Do not show actual earnings before conversion.


---

# 11. Incentive attribution

Ownership and purchase attribution are **not automatically the same thing**.

A salesperson owning a student should not automatically receive incentive for every future purchase by that student.

The current PRD supports attribution based on a qualifying staff interaction before the same-product purchase, and records the owner at conversion.

Therefore:

> **Student ownership ≠ automatic lifetime purchase attribution**

For V1:

* Opportunity has an owner.
* Staff must have a qualifying interaction before conversion.
* Student purchases the same product.
* Purchase is matched to the active Opportunity.
* Owner at conversion is recorded.
* Eligible incentive is calculated.


---

# 12. Sales Queue — Main V1 page

This is the **most important screen**.

Its purpose is:

> **What should I work on today?**

It is not a dashboard.

It is not a database.

It is not a full Activity Feed.


---

## Section 1 — Follow-ups due today

**Always at the top.**

Example:

### Follow-ups due today · 2

**Rahul Kumar** UPSC Foundation · ₹20,000 Follow-up due **10:00 AM**

**Next:** Continue conversation

`[Chat]`


---

**Priya Sharma** NEET Premium · ₹50,000 Follow-up due **2:00 PM**

**Next:** Follow up

`[Chat]`

### Show

* Student
* Product
* Product value
* Due time
* Next action
* Primary action

### Do not show

* Full conversation
* Full activity timeline
* Every Signal
* Internal score


---

# 13. Sales Queue — Needs your attention

This section contains active opportunities where something important requires action now.

Examples:

### Student replied

**Arjun Kumar** JEE Test Series · ₹15,000

💬 **Student replied 5 min ago**

> “Can I get a discount?”

**Next:** Reply to student

`[Chat]`


---

### Payment failed

**Meena Sharma** NEET Premium · ₹25,000

⚠️ **Payment failed 15 min ago**

**Next:** Contact student

`[Chat]`


---

### Checkout abandoned

**Karthik** UPSC Foundation · ₹20,000

🛒 **Checkout abandoned 30 min ago**

**Next:** Chat with student

`[Chat]`

The underlying PRD explicitly identifies payment failure, checkout abandonment, repeated product interest and pre-purchase enquiries as supported Signal types.


---

# 14. Sales Queue — High-value opportunities

This section is for **unclaimed opportunities worth pursuing**.

Example:

### High-value opportunities

**Priya Sharma** NEET Premium · **₹50,000**

🔥 Strong purchase interest

Viewed 4× · Checkout started

Potential incentive: **₹500**

`[Claim]`


---

**Rahul Kumar** UPSC Foundation · **₹20,000**

Strong purchase interest

Viewed 6× in 3 days

Potential incentive: **₹200**

`[Claim]`

The product should rank these automatically.

The salesperson should not have to create a filter:

> ₹20K+ → High priority


---

# 15. Sales Queue — Recent activity

Keep this compact.

Example:

### Recent activity

> 💬 Rahul replied · 5 min ago 👤 Priya opportunity claimed · 20 min ago 🎉 Meena purchased · 1 hr ago 🔴 Arjun marked Lost · 2 hrs ago

This is **not a second chat inbox**.

Only meaningful sales events should appear.


---

# 16. Sales Queue — My results

A compact financial/result summary:

### This week

**8 Won** **₹1,42,000 Revenue** **₹1,420 Earned**

`View my results`

This directly addresses the salesperson's motivation to see what they closed and what they earned.


---

# 17. Future follow-ups

Do not make scheduled future follow-ups dominate the page.

Show:

> **Upcoming follow-ups · 8 ▸**

When a follow-up becomes due:

> It moves automatically into **Follow-ups due today**.

This follows the Basecamp direction:

> **If scheduled, bury it until its date.**


---

# 18. Filters

Do **not** make filters the primary interface.

Avoid:

> All | New | Active | Won | Lost | High | Medium | Low

The product's job is to rank the salesperson's work.

### Search can still exist

If the salesperson needs to find:

> Rahul Kumar

they should be able to search.

But:

> **Search = finding something specific**

not:

> **Filters = deciding what to work on**


---

# 19. Opportunity Card

Every card should communicate:

> **Who? Why? What next?**

### Active card

```text
Rahul Kumar
UPSC Foundation · ₹20,000

💬 Student replied 5 min ago
“Can I get a discount?”

Next: Reply to student

[Chat]
```

### Unclaimed card

```text
Priya Sharma
NEET Premium · ₹50,000

🔥 Strong purchase interest
Viewed 4× · Checkout started

Potential incentive: ₹500

[Claim]
```

### Follow-up card

```text
Arjun Kumar
JEE Test Series · ₹15,000

📅 Follow-up due today · 2:00 PM

Next: Continue conversation

[Chat]
```


---

# 20. Opportunity Detail

The Opportunity Detail page is where the salesperson **works the Opportunity**.

It answers:

> **What is this student interested in? Why did this opportunity appear? What has happened? What should I do next?**


---

## Header

Example:

**Rahul Kumar**

UPSC Foundation · **₹20,000**

🔥 High priority

**Owner: You**

`[Chat] [Follow up] [Close]`


---

# 21. Opportunity Detail — Why this opportunity?

Show the supporting Signals.

Example:

### Why this opportunity surfaced

* Viewed UPSC Foundation **4 times in 5 days**
* Started checkout
* Payment failed **15 minutes ago**

This is much better than:

> Intent score: 84

The PRD explicitly requires concrete Signal explanations instead of unexplained scores.


---

# 22. Opportunity Detail — Chat

Chat is the **actual sales conversation**.

Example:

> **Student:** Can I get a discount?
>
> **Salesperson:** I can check what offer is available for you.

The salesperson can:

* Send messages
* See conversation history
* See product context
* See student responses
* Continue the sales conversation

The persistent conversation should remain available even when Opportunities change, while individual Opportunity context remains attached to the relevant product. The technical design explicitly supports one persistent institute–student conversation with messages associated with Opportunities.


---

# 23. Opportunity Detail — Activity

Activity is **not every chat message**.

### Show meaningful sales events

* Opportunity created
* Opportunity claimed
* Product added to Opportunity
* Follow-up scheduled
* Follow-up changed
* Student replied
* Discount offer sent
* Payment failed
* Purchase detected
* Won
* Lost
* Reopened, if supported

### Do not duplicate the whole conversation

Therefore:

> **Chat = complete conversation**

> **Activity = important sales events**

The PRD also expects staff-visible timeline markers for ownership, follow-ups, conversion, closure and other important Opportunity changes.


---

# 24. Opportunity Detail — Next action

The salesperson should always know what to do.

Examples:

### Student replied

> **Student replied — respond now**

`[Chat]`

### Follow-up due

> **Follow-up due today**

`[Chat]`

### Awaiting student

> **Awaiting response**

No immediate action required.

### Unclaimed

> **Claim this opportunity**

`[Claim]`


---

# 25. Follow-up

Follow-up is an **action**, not an Opportunity status.

Flow:

> **Follow up → Select date/time → Save**

Example:

> Follow up with Rahul Tomorrow · 10:00 AM

Once saved:

> 📅 **Follow-up scheduled for tomorrow**

The Opportunity remains Active.

When the date arrives:

> **Follow-up due**

and it returns to the Sales Queue.


---

# 26. Discount system — new proposed capability

This is one of the important additions we discussed.

Testpress already has user-specific discount capability in the backend.

Signals should **use that existing discount mechanism**, not create an unrelated pricing system inside Chat.


---

## Admin/product configuration

The discount rules should be controlled by the institute/backend.

Example:

### UPSC Foundation

Price: ₹20,000

Approved salesperson discount:

> Maximum: **10%**

Potentially time-based:

| Validity | Discount |
|----------|---------:|
| Buy today | 10%      |
| Buy by Aug 21 | 5%       |
| After Aug 21 | 0%       |

The salesperson **cannot invent their own discount**.


---

# 27. Salesperson discount flow

When a student asks:

> “Can you give me a discount?”

Salesperson sees:

> **Offer discount**

Then:

### Special offer

Original price:

**₹20,000**

> **10% off**

Final price:

**₹18,000**

Valid until:

**Today, 11:59 PM**

`[Send offer]`


---

After sending:

> **Offer sent**
>
> ₹18,000 · 10% off Valid until today, 11:59 PM

This should also appear as an Activity event:

> **Discount offer sent — 10%**


---

# 28. Discount safety

Salesperson should:

### Be able to

* Select an approved discount
* Offer it to the student
* See final price
* Send the offer
* See expiry

### Not be able to

* Create arbitrary discounts
* Exceed maximum discount
* Change base product price
* Give unlimited discounts
* Create personal pricing rules

This protects the institute while still giving sales staff a legitimate closing tool.


---

# 29. Time-based offers

This is a strong potential V1/V1.1 capability.

Example:

> **Buy today → 10% off**

After today:

> **5% off**

After offer expiry:

> **No offer**

The salesperson doesn't control the deadline.

The backend/product configuration does.

This creates legitimate urgency without allowing staff to manipulate pricing.


---

# 30. Discount and attribution

A particularly important rule from the technical PRD:

A purchase can be **directly attributed** when the student uses a user-specific discount created/shared through the same Opportunity for the same product. Directly attributed revenue is a subset of assisted revenue.

Therefore:

> Discount offer through Opportunity → Student purchases same product → Purchase can be directly attributed to that Opportunity according to the attribution rules.

This is much stronger evidence than simply saying:

> “The salesperson owned the student.”


---

# 31. Activity Feed scope

The Activity Feed should never become another Chat page.

### Include

* Opportunity created
* Opportunity claimed
* Student reply
* Follow-up due
* Follow-up scheduled
* Checkout abandoned
* Payment failed
* Discount offer sent
* Purchase completed
* Won
* Lost
* Incentive earned

### Don't include

* Every “Hi”
* Every normal chat message
* Every page view
* Every internal interaction
* Detailed activity from other salespeople

The technical PRD similarly requires raw/non-qualifying activity not to be surfaced directly in the Attention Inbox.


---

# 32. Where Activity appears

### Sales Queue

Show a **small Recent Activity** section.

Purpose:

> What just happened?

### Opportunity Detail

Show the **full Activity history**.

Purpose:

> What happened throughout this Opportunity?

Do not create a separate full Activity page for V1 unless actual usage later proves it necessary.


---

# 33. My Results

The salesperson needs a place to see what they achieved.

### Summary

> **My Results**
>
> This week
>
> **8 Won**
>
> **₹1,42,000 Purchase Value**
>
> **₹1,420 Incentive Earned**

Then:

### Won

**Priya Sharma** NEET Premium · ₹50,000 Purchased Aug 19 **Incentive earned: ₹500**


---

**Rahul Kumar** UPSC Foundation · ₹20,000 Purchased Aug 18 **Incentive earned: ₹200**


---

### Lost

Can be shown separately:

> Arjun Kumar JEE Test Series · ₹15,000 Lost — Not interested

The primary emphasis should remain on:

> **Won + Earned**


---

# 34. Main navigation / screen model

For V1, keep navigation small.

### Recommended

**Signals**

* **Sales Queue**
* **My Results**

Then Opportunity Detail opens from the Sales Queue.

Do not create navigation for:

* Signals
* Opportunities
* Activities
* Follow-ups
* Chat
* Won
* Lost
* Discounts

as separate top-level pages.

Those are parts of the workflow.


---

# 35. Final V1 user flow

```text
Sales Queue
     │
     ├── Follow-ups due today
     │
     ├── Needs your attention
     │
     └── High-value opportunities
                │
                ▼
        Opportunity Detail
                │
       ┌────────┼─────────┐
       ▼        ▼         ▼
     Chat    Activity   Follow up
       │                  │
       └────────┬─────────┘
                ▼
        Student continues
          conversation
                │
       ┌────────┴────────┐
       ▼                 ▼
   Purchases          Will not buy
       │                 │
       ▼                 ▼
      WON               LOST
       │
       ▼
Purchase value
+ Incentive earned
       │
       ▼
My Results
```


---

# 36. What Signals should NOT become

V1 should **not** become:

* Full HubSpot
* Full CRM
* Support-ticket system
* Marketing automation
* Generic chat inbox
* Analytics dashboard
* Team surveillance system
* Complex commission platform
* Arbitrary discount-management system
* Lead-scoring configuration tool

The technical proposal also explicitly warns against introducing speculative CRM/automation/AI complexity and recommends keeping the initial domain small.


---

# 37. What the salesperson should see at a glance

Every important UI should ultimately answer these questions:

| Question | Where answered |
|----------|----------------|
| **Who should I work on?** | Sales Queue    |
| **Why should I work on them?** | Opportunity card / Signal explanation |
| **How much is it worth?** | Opportunity card |
| **What do I earn if it converts?** | Opportunity card / eligible incentive |
| **Who owns it?** | Opportunity    |
| **What happened?** | Activity       |
| **Did the student reply?** | Conversation state / Queue |
| **What should I do now?** | Next action    |
| **What should I say?** | Chat           |
| **Can I offer a discount?** | Chat → Offer discount |
| **When should I follow up?** | Follow-up      |
| **Did they buy?** | Automatic conversion |
| **Why didn't they buy?** | Lost reason    |
| **What did I earn?** | My Results     |


---

# 38. Final design principles

### Principle 1 — The product ranks; the salesperson works

Do not make the salesperson configure filters to find valuable work.


---

### Principle 2 — Signals are evidence, Opportunities are work

Don't expose every behavioural event as a separate sales item.


---

### Principle 3 — Chat is communication, not the product

The product is the **Opportunity workflow**.


---

### Principle 4 — Every card must answer

> **Who? Why? What next?**


---

### Principle 5 — Show money where it helps decisions

Show:

> Product value

and where applicable:

> Potential incentive

After conversion:

> Actual purchase value + incentive earned


---

### Principle 6 — Don't expose unexplained scores

Show:

> **High priority — Payment failed 10 min ago**

not:

> **Priority: 87**

The underlying PRD specifically requires explainable Signal evidence rather than unexplained internal scores.


---

### Principle 7 — Keep lifecycle simple

> **Unclaimed → Active → Won/Lost**

Don't create a status for every interaction.


---

### Principle 8 — Don't confuse waiting with status

> Awaiting response Follow-up due Needs response

are **action/conversation states**, not separate Opportunity lifecycle states.


---

### Principle 9 — Discounts are controlled selling tools

Salespeople can use approved offers but cannot freely change pricing.


---

### Principle 10 — Ownership and attribution are different

Owning a student does not automatically mean earning incentive on every future purchase.


---

# 39. Decisions still requiring backend/business confirmation

The major product direction is now clear, but these should be explicitly confirmed before engineering locks the implementation:

### Priority calculation

We know **what Priority means**, but the exact ranking formula/weights are not finalized.

### Incentive calculation base

Confirm whether the percentage applies to:

> Original product price

or:

> Actual discounted purchase value.

I recommend **actual eligible purchase value**, but this should be a business decision.

### Incentive attribution

Confirm the exact definition of an eligible salesperson interaction and attribution window. The technical PRD currently has a strong rule: qualifying Signal + successful staff interaction before purchase + same product within the attribution window.

### Discount authority

Confirm:

* Maximum discount
* Approved discount levels
* Time-based offers
* Approval requirements, if any

### Lost reasons

Confirm the final list before implementation.

### Opportunity creation

The backend must define exactly which Signal combinations create an Opportunity. The PRD already establishes that qualifying Signals create/update one active student-product Opportunity rather than duplicates.


---

# 40. Final V1 in one sentence

> **Testpress Signals gives a salesperson a ranked daily queue of valuable student purchase Opportunities, explains why each Opportunity matters, lets them claim it, chat and follow up with the student, use controlled offers when appropriate, and automatically records successful purchases so the salesperson can see what they converted and earned.**

That is the **core product**.

Everything else — Signals, Activity, Follow-ups, discounts, incentives, reporting — exists to make that workflow work better.