# Testpress Signals (Part of Testpress Boost)

## Overview

**Testpress Signals** is an opportunity-identification and follow-up feature within the proposed **Testpress Boost** subscription. It helps institutes recognise moments when a student may need timely assistance while considering or completing a product purchase.

The feature monitors meaningful student activity—such as repeated product interest, checkout abandonment, payment failure, or a purchase-related enquiry—and converts qualifying activity into clear, actionable Signals. These Signals are grouped into an active student–product Opportunity and presented through an **Attention Inbox**.

Instead of showing abstract lead labels, Testpress Signals helps staff quickly understand:

* who may need attention,
* what happened,
* why the Opportunity surfaced,
* how urgent the situation is,
* who is responsible for handling it,
* and what action should be taken next.

Authorized staff can take ownership of an Opportunity, review its supporting Signals, contact the student through an in-house conversation interface, schedule follow-ups, record purchase obstacles, and capture the final outcome.

The feature exists because institutes currently lack a connected way to identify purchase intent or friction and respond while the situation is still relevant. Important moments are often hidden across product activity, checkout records, payment failures, and disconnected conversations, resulting in delayed follow-up, repeated outreach, and missed enrolments.

By connecting Signal detection, staff ownership, student communication, follow-up, outcome tracking, and conservative revenue measurement, Testpress Signals turns scattered student activity into a structured operational workflow. It helps institutes provide timely assistance, improve coordination between staff, understand why students do not purchase, and measure the revenue assisted by their interventions.

Within the wider Testpress ecosystem, Signals acts as the intelligence layer that identifies when attention may be useful. Conversations provide the communication layer, while Testpress Boost can later expand with capabilities such as Campaigns, Automations, and AI-assisted recommendations.


## Problem Statement

* Testpress currently does not provide a system for identifying students who may be considering a purchase, facing payment difficulty, or seeking help before enrolling.
* Institutes have no centralized way to detect meaningful purchase-related activity such as repeated product interest, checkout abandonment, payment failure, or pre-purchase questions.
* Staff must rely on manual observation, payment records, phone calls, WhatsApp, or other external channels to discover and follow up with prospective students.
* Because these signals are not surfaced automatically, staff may contact students too late, miss opportunities entirely, or fail to help students when timely assistance could resolve a purchase obstacle.
* Testpress does not currently provide an in-product conversation system where institute staff and students can continue purchase-related discussions with retained history and clear product context.
* There is no structured way to record why a student did not purchase, such as price concerns, payment problems, product mismatch, parent approval, or delayed intent.
* A dedicated solution is needed to detect actionable student moments, guide staff follow-up, support in-product communication, track outcomes, and help institutes understand the effect of timely intervention.


## Objective

### What the feature enables

Testpress Signals enables institutes to identify actionable moments when a student may need help before completing a purchase.

It allows authorized staff to:

* review explainable Signals and the Opportunities they create,
* understand what happened and why the situation needs attention,
* take ownership of an Opportunity,
* contact the student through an in-product conversation,
* schedule follow-ups,
* record purchase obstacles and final outcomes,
* and measure assisted and directly attributed revenue.

### Who uses it

* **Institute staff** review and handle Opportunities, communicate with students, and record outcomes.
* **Institute owners or authorized administrators** configure Signal templates, assign access, and review performance and revenue impact.
* **Students** receive and respond to purchase-related messages within Testpress.

### How it works

* Testpress records relevant student activity.
* Configured Signal rules determine when the activity becomes actionable.
* Related Signals are grouped into one active student–product Opportunity.
* The Opportunity appears in the Attention Inbox with its reason, urgency, ownership, and current workflow state.
* Staff take action, communicate with the student, schedule follow-up where needed, and record the eventual outcome.
* A completed purchase is linked back to the Opportunity for assisted or attributed revenue reporting.

### Key outcomes

* Faster and more relevant support for students facing purchase friction.
* Fewer missed enrollment opportunities.
* Clear ownership and reduced duplicate outreach.
* Better visibility into why students do not purchase.
* A connected history of Signals, conversations, follow-ups, and outcomes.
* More credible measurement of the revenue assisted by staff intervention.


## User Stories

### Review Actionable Opportunities

As an authorized institute staff member, I want to view actionable product-specific Opportunities with their supporting Signals and shared conversation context, so that I can understand who needs attention, why the situation surfaced, and what action is required.

**Acceptance Criteria**

* The Attention Inbox shows only Opportunities the staff member is authorized to access.
* Each Opportunity displays the student, related product, primary reason, current intent, urgency, owner, and workflow state.
* Staff can view the immutable Signals that contributed to the Opportunity.
* Multiple active Opportunities for the same student may be shown separately by product.
* Opening an Opportunity shows the student’s persistent institute–student conversation alongside all active Opportunities.
* Non-actionable behavioural events do not appear in the Attention Inbox.

### Own the Student Relationship

As an authorized institute staff member, I want to explicitly claim ownership of a student’s sales conversation, so that one accountable staff member manages purchase-related communication across all products.

**Acceptance Criteria**

* Each institute–student sales conversation has exactly one active Conversation Owner once ownership is claimed.
* Opening or viewing a conversation does not automatically assign ownership.
* An unassigned conversation can be claimed explicitly by an authorized staff member.
* The Conversation Owner is also the owner of all active Opportunities for that student.
* A newly created Opportunity automatically inherits the current Conversation Owner.
* Other staff can see the current owner and recent staff activity before taking action.
* Student-facing replies are restricted according to ownership and collaboration permissions.

### Collaborate or Transfer Ownership

As an authorized institute staff member, I want to collaborate on or explicitly transfer a student relationship, so that specialist assistance is possible without creating conflicting ownership or duplicate outreach.

**Acceptance Criteria**

* The Conversation Owner can add permitted staff members as collaborators without changing ownership.
* Collaborators can view the conversation, add internal notes, and provide assistance according to their permissions.
* A collaborator does not become the owner merely by viewing, commenting, or sending a permitted response.
* Ownership transfer must be performed explicitly and include a reason.
* A transfer updates the Conversation Owner and transfers all active Opportunities for that student to the new owner.
* Finalized Opportunities retain the owner recorded when they converted or reached their final outcome.
* Each transfer records the previous owner, new owner, actor, reason, and timestamp.
* The persistent conversation continues without creating a new thread after transfer.

### Continue One Purchase Conversation

As a student, I want one continuous conversation with my institute for all purchase-related questions, so that I can discuss different products and receive help without switching between separate chats.

**Acceptance Criteria**

* The student has one persistent sales conversation per institute.
* The same conversation is reused when the student asks about another product or enters a new buying cycle.
* The student is not moved to another conversation when staff recommends or compares different products.
* The student can read previous messages and send replies.
* Messages may relate to one product, multiple products, or no specific Opportunity.
* Internal Signals, ownership changes, Opportunity states, internal notes, and staff-only timeline markers are not visible to the student.
* Student-facing language remains assistance-oriented and does not reveal behavioural monitoring.

### Manage Opportunity Outcomes

As an institute owner or authorized staff member, I want each product-specific Opportunity to retain its own lifecycle, ownership history, and outcome, so that follow-up, accountability, and revenue impact can be measured accurately.

**Acceptance Criteria**

* Only one active Opportunity normally exists for the same institute, student, and product.
* Additional Signals for the same product update the active Opportunity rather than create a duplicate.
* A new historical Opportunity may be created for a later buying cycle after the previous Opportunity has been finalized.
* Each Opportunity retains its related product, Signals, intent, urgency, state, owner, actions, outcome, and timestamps.
* Ownership snapshots include the owner at creation, first staff contact, current ownership, and conversion or closure.
* Finalized Opportunities do not transfer when the Conversation Owner changes.
* Non-purchase closure requires a defined outcome reason.
* Closed Opportunities can be reopened by an authorized user with a recorded reason.
* Purchases are evaluated separately for assisted and attributed revenue according to the Opportunity’s interaction and discount history.


## Use Cases

### Detect and Surface an Actionable Opportunity

**Actors**

* Student
* System
* Authorized institute staff member

**Preconditions**

* The student is authenticated.
* Relevant student activity is available to Testpress.
* At least one predefined Signal template is enabled for the institute.
* The related product is eligible for Signal detection.
* The student has not already completed the relevant purchase.

**Main Flow**


 1. The student performs one or more purchase-related actions, such as repeatedly viewing a product, starting checkout, encountering a payment failure, or submitting a pre-purchase enquiry.
 2. The system records the underlying behavioural events.
 3. The system evaluates the events against the institute’s configured Signal templates and thresholds.
 4. When an actionable rule is satisfied, the system creates an immutable Signal describing the meaningful moment.
 5. The system checks for an active Opportunity for the same institute, student, and product.
 6. If an active Opportunity exists, the system attaches the Signal and updates the Opportunity’s summary, intent, urgency, primary reason, and latest activity.
 7. If no active Opportunity exists, the system creates a new product-specific Opportunity and links the Signal to it.
 8. The Opportunity inherits the current Conversation Owner, where one exists.
 9. The system adds the Opportunity to the Attention Inbox with a clear explanation of why it surfaced.
10. Authorized staff can review the Opportunity, its supporting Signals, and the shared institute–student conversation.

**Alternate Flows**

* If the activity does not meet an actionable threshold, the system records the event but does not surface it in the Attention Inbox.
* If the student already owns the product, the system does not create an actionable Opportunity.
* If the Signal is identified as duplicate, invalid, or commercially irrelevant, the Opportunity may be marked manually by staff as Invalid / Not an Opportunity.
* If the previous Opportunity for the same product was finalized and the student later demonstrates renewed intent, the system may create a new Opportunity.

**Postconditions**

* An actionable product-specific Opportunity exists or has been updated.
* The Opportunity contains one or more immutable Signals.
* Only one active Opportunity normally exists for the same institute–student–product combination.
* The Attention Inbox explains who needs attention, why, and how urgent the situation is.

### Claim Conversation Ownership

**Actors**

* Authorized institute staff member
* System

**Preconditions**

* A persistent institute–student sales conversation exists.
* The staff member has permission to own sales conversations.
* The conversation is currently unassigned.

**Main Flow**


1. The staff member opens the student’s conversation or an associated Opportunity.
2. The system displays that the conversation is unassigned.
3. The staff member explicitly selects the action to claim ownership.
4. The system validates that the staff member is authorized.
5. The staff member becomes the Conversation Owner and Student Sales Owner.
6. All active Opportunities for that student are assigned to the same owner.
7. Future Opportunities for the student inherit this owner automatically.
8. The system records the ownership assignment with the staff member, actor, and timestamp.
9. A staff-only timeline marker is added to the conversation.

**Alternate Flows**

* If another staff member claims the conversation first, the system prevents conflicting ownership and shows the current owner.
* If the staff member lacks permission, the system denies the action.
* Merely opening or viewing the conversation does not assign ownership.

**Postconditions**

* The conversation has exactly one active Conversation Owner.
* All active Opportunities for the student share the same owner.
* Ownership is visible to authorized staff but not to the student.

### Contact and Follow Up With a Student

**Actors**

* Conversation Owner
* Student
* System

**Preconditions**

* The Conversation Owner is authorized to send student-facing messages.
* A persistent institute–student conversation exists.
* At least one active Opportunity requires attention.

**Main Flow**


 1. The Conversation Owner opens the student’s persistent conversation.
 2. The system displays the full communication history and all active product-specific Opportunities.
 3. The owner selects an Opportunity to review its Signals, intent, urgency, product context, and suggested next action.
 4. The owner sends an assistance-oriented message to the student.
 5. The system adds the message to the persistent conversation.
 6. The system records the first-contact timestamp if this is the first staff interaction for the Opportunity.
 7. The Opportunity is updated to show that the next response is awaited from the student.
 8. The student receives and reads the message within Testpress.
 9. The student replies in the same conversation.
10. The system updates the relevant Opportunity to show that action is now waiting on the institute.
11. The owner continues the conversation until the purchase situation is resolved, deferred, converted, or closed.

**Alternate Flows**

* The message may relate to one Opportunity, multiple Opportunities, or no specific Opportunity.
* If the student asks about another product, the conversation continues in the same thread.
* If the new product becomes meaningfully relevant, authorized staff may explicitly select **Track as opportunity** to create a separate Opportunity.
* If the owner cannot respond immediately, a follow-up date and reason may be recorded.
* If message delivery fails, the system must not treat the Opportunity as successfully contacted.

**Postconditions**

* The persistent conversation contains the communication history.
* The Opportunity reflects the latest interaction and who is expected to respond next.
* Staff intervention timestamps are available for response-time and assisted-revenue measurement.

### Schedule a Follow-Up

**Actors**

* Conversation Owner
* System

**Preconditions**

* An active Opportunity exists.
* The purchase decision has been delayed but remains relevant.
* The Conversation Owner is authorized to manage the Opportunity.

**Main Flow**


1. The owner reviews the Opportunity and determines that no immediate action is required.
2. The owner selects **Schedule follow-up**.
3. The owner enters a follow-up date and time.
4. The owner records a reason, such as waiting for parent approval, salary day, board exams, EMI availability, or a later intake.
5. The system keeps the Opportunity active.
6. The system updates the awaiting state to **Follow-up scheduled**.
7. The Opportunity leaves the immediate Attention Inbox until the scheduled time.
8. When the follow-up time arrives, the system returns the Opportunity to the Attention Inbox.
9. The awaiting state changes to **Waiting on institute**.

**Alternate Flows**

* The owner may reschedule or cancel the follow-up before it becomes due.
* If the student sends a new relevant message before the follow-up date, the Opportunity may return to the Attention Inbox immediately.
* If the student purchases before the follow-up date, the system converts the Opportunity and cancels the pending follow-up.

**Postconditions**

* The delayed buying decision remains active rather than being incorrectly classified as lost.
* The next action date and follow-up reason are recorded.
* The Opportunity returns to staff attention when action is due.

### Collaborate Through Internal Notes

**Actors**

* Conversation Owner
* Authorized collaborator
* System

**Preconditions**

* A persistent institute–student conversation exists.
* The collaborator has permission to view and assist with the conversation.
* The Conversation Owner remains responsible for the student relationship.

**Main Flow**


1. The Conversation Owner or another authorized staff member adds a collaborator.
2. The collaborator opens the shared conversation.
3. The system displays student-facing messages, active Opportunities, and staff-only context according to permission.
4. The collaborator or the owner adds an internal note in the conversation timeline.
5. The system clearly distinguishes the internal note from student-facing messages.
6. The note is visible only to authorized staff.
7. The collaborator may provide product expertise, suggest a response, or assist temporarily.
8. The Conversation Owner retains ownership and remains accountable for follow-up.

**Alternate Flows**

* A collaborator may send a student-facing reply only when explicitly permitted.
* Sending a permitted response does not transfer ownership.
* If the collaborator should take full responsibility, an explicit ownership transfer must be performed.
* The student never sees internal notes, collaboration activity, or staff-only classifications.

**Postconditions**

* Staff can collaborate without creating a separate conversation.
* Ownership and performance credit remain unchanged.
* Internal advice and context are retained in the staff-visible timeline.

### Transfer the Student Relationship

**Actors**

* Current Conversation Owner
* New Conversation Owner
* Authorized transferring user
* System

**Preconditions**

* The conversation has an active owner.
* The new owner is authorized to manage sales conversations.
* At least one user has permission to transfer ownership.

**Main Flow**


 1. An authorized user selects **Transfer ownership**.
 2. The system displays the current owner and the active Opportunities that will be transferred.
 3. The user selects the new owner.
 4. The user provides a transfer reason.
 5. The system validates the new owner’s permissions.
 6. The new staff member becomes the Conversation Owner and Student Sales Owner.
 7. All currently active Opportunities for the student transfer to the new owner.
 8. Future Opportunities inherit the new owner.
 9. Finalized Opportunities retain their historical owner.
10. The persistent conversation continues without interruption.
11. The system records the previous owner, new owner, actor, reason, and timestamp.
12. A staff-only transfer marker is added to the conversation timeline.

**Alternate Flows**

* If the new owner lacks permission, the system prevents the transfer.
* If the transfer is cancelled, no ownership changes occur.
* Closed, converted, expired, lost, or invalid Opportunities are excluded from the transfer.
* Adding a collaborator does not trigger this flow.

**Postconditions**

* One new Conversation Owner is responsible for the student relationship.
* All active Opportunities share the new owner.
* Historical accountability and finalized Opportunity ownership remain unchanged.
* The complete ownership-transfer history is retained.

### Close or Mark an Opportunity Invalid

**Actors**

* Conversation Owner
* Institute owner or authorized staff member
* System

**Preconditions**

* An active Opportunity exists.
* The Opportunity has not converted.
* The staff member has permission to finalize Opportunities.

**Main Flow**


1. The staff member reviews the Opportunity, Signals, conversation, objections, and previous actions.
2. The staff member selects the appropriate finalization action.
3. For a genuine non-purchase outcome, the staff member selects a required reason, such as price, competitor choice, product mismatch, parent rejection, later intake, no response, or explicit lack of interest.
4. For a false or irrelevant Opportunity, the staff member selects **Invalid / Not an opportunity** and records the applicable reason.
5. The system records the final outcome, owner at closure, actor, and timestamp.
6. The Opportunity is removed from the active Attention Inbox.
7. The system adds a staff-only closure marker to the shared conversation.
8. The persistent conversation remains available for future purchase discussions.

**Alternate Flows**

* If the student intends to decide later and a specific future action is appropriate, the staff member schedules a follow-up instead of closing the Opportunity.
* If the student later demonstrates renewed intent for the same product, a new Opportunity may be created.
* An authorized user may reopen the closed Opportunity by providing a reason.
* Contacted, waiting on student, waiting on institute, and conversation resolved are not valid closure reasons.

**Postconditions**

* The Opportunity has a structured final outcome.
* Invalid Signals remain distinguishable from genuine non-conversions.
* Historical ownership, actions, and outcome data remain available for reporting.

### Convert and Attribute an Opportunity

**Actors**

* Student
* System
* Institute owner or authorized staff member

**Preconditions**

* An active Opportunity exists for the student and product.
* The student completes a successful purchase for the same product.

**Main Flow**


 1. The system records the completed purchase.
 2. The system identifies the active Opportunity for the same institute, student, and product.
 3. The system marks the Opportunity as Converted.
 4. The system records the purchase value, conversion timestamp, purchase reference, and owner at conversion.
 5. The Opportunity is removed from the active Attention Inbox.
 6. The system checks whether at least one successfully delivered staff response was explicitly associated with the same Opportunity before purchase and within the applicable attribution window.
 7. If the conditions are met, the purchase is classified as assisted revenue.
 8. The system checks whether the student used the exact Sales Offer issued through the same Opportunity for the same product.
 9. If so, the revenue is additionally classified as directly attributed revenue.
10. Directly attributed revenue is reported as a subset of assisted revenue.
11. A staff-only conversion marker is added to the persistent conversation.

**Alternate Flows**

* If no successfully delivered staff response was associated with that Opportunity before purchase, the purchase is not reported as assisted revenue.
* If the purchase falls outside the attribution window, it is not included in assisted revenue for that Opportunity.
* If a generic or unrelated discount was used, the purchase is not classified as directly attributed.
* If no active Opportunity exists, the purchase proceeds normally without Opportunity attribution.

**Postconditions**

* The Opportunity is finalized as Converted.
* The historical owner at conversion is preserved for accountability and credit.
* Assisted and directly attributed revenue are classified conservatively without double counting.


## Empathy Lens

Q: Who is the primary user?\nA: The primary user is an institute counsellor or sales staff member responsible for helping prospective students make purchase decisions. Institute owners and sales managers are secondary users who configure Signals, coordinate staff, and review outcomes.

Q: What are they trying to achieve in their own words?\nA: “I want to know which students need help now, understand what is holding them back, contact them without duplicating another staff member’s work, and help them complete the right purchase.”

Q: What is frustrating or broken today?\nA: Testpress does not currently surface purchase-related behaviour or provide an in-product sales conversation workflow. Staff must manually discover payment failures or interested students, coordinate through informal channels, and use external tools to communicate and track follow-up.

Q: What user behavior is this feature trying to influence?\nA: It encourages staff to respond quickly to actionable student moments, take clear ownership, diagnose the actual purchase obstacle, schedule follow-up when appropriate, and close each Opportunity with a meaningful outcome.

Q: What happens today without this feature?\nA: Payment difficulties, checkout abandonment, repeated product interest, and pre-purchase questions may go unnoticed. Students may receive late, repeated, or no assistance, while institutes cannot reliably track ownership, outcomes, or revenue assisted by staff intervention.

Q: Why does this matter to the user emotionally?\nA: Staff feel responsible when an interested student fails to enroll because help was unavailable or delayed. Clear ownership and an actionable queue reduce uncertainty about whether someone else has already responded or whether a student has been forgotten.

Q: What anxiety, urgency, or motivation exists?\nA: Purchase intent and payment-recovery opportunities can decay quickly. A payment failure from five minutes ago feels urgent, while an unanswered student question creates concern that the institute may appear unresponsive or lose the student to another provider.

Q: What measurable outcomes will prove THIS specific configuration is working?\nA: For a specific Signal template, the institute should see how many events qualified, how many Opportunities surfaced, how many received timely staff action, how many students replied, and how many same-product purchases followed within the attribution window.

Q: What exact per-instance metrics will the user look at?\nA: Each Signal-template detail should show eligible events, Signals created, Opportunities created or updated, invalid outcomes, median first-contact time, student reply rate, conversion count, assisted revenue, and directly attributed revenue.

Q: How will the user distinguish working versus not working?\nA: The configuration is working when qualifying student behaviour consistently creates explainable Signals that lead to timely intervention and measurable responses or purchases. It is not working when expected qualifying activity occurs but no Signal or Opportunity is created.

Q: How will the user distinguish misconfigured versus ineffective?\nA: It is likely misconfigured when events fail threshold checks unexpectedly, eligible products are excluded, Signals are duplicated, or many surfaced Opportunities are marked invalid. It is ineffective when detection works correctly but students rarely reply or convert after staff action.

Q: How will outcomes be attributed to THIS configuration?\nA: Each Opportunity should retain the Signal template and exact conditions that caused it to surface. Assisted revenue requires a qualifying Signal, a meaningful staff interaction before purchase, and a same-product purchase within the configured attribution window.

Q: What comparisons will the user expect?\nA: Users will compare eligible events versus Signals created, Signals versus staff-contacted Opportunities, contacted versus uncontacted Opportunities, response times, invalid rates, conversion rates, and revenue outcomes across Signal templates, products, owners, and time periods.

Q: What exact business questions should the UI answer?\nA: The UI should answer: “Why did this Opportunity surface?”, “Who owns it?”, “Who must act next?”, “Was the student contacted in time?”, “What blocked the purchase?”, “Did the student buy?”, and “Was the revenue assisted or directly attributed?”

Q: Where exactly in the product does the user see this information?\nA: Immediate work appears by default in the Attention Inbox. Opportunity-specific evidence appears in the Opportunity panel beside the persistent conversation, while template-level outcomes appear on the Signal-template detail page and management results appear in Boost Insights.

Q: How quickly can the user determine if it is working?\nA: A counsellor should understand an individual Opportunity within seconds of opening it. An administrator should be able to judge a Signal template’s detection quality and outcome performance from its detail page without manually combining separate reports.

Q: What confusion or bad decisions happen if this visibility is missing?\nA: Staff may contact the same student twice, overlook urgent payment problems, assume a rule is ineffective when it is actually misconfigured, offer discounts without identifying a price concern, or credit revenue to an intervention that may not have influenced the purchase.

Q: Based on these outcomes, what decisions will the user take?\nA: Staff will decide whether to contact the student, wait for a reply, schedule follow-up, involve a collaborator, transfer ownership, address a specific objection, consider an eligible offer, close the Opportunity, or mark it invalid.

Q: What specific parts of the configuration will they want to adjust?\nA: In V1, administrators may enable or disable supported predefined Signal templates where permitted by Testpress. The qualifying criteria, thresholds, intent, urgency, explanation logic, deduplication rules, and attribution rules are centrally defined and maintained by Testpress and are not editable by institute administrators.

Q: What could go wrong from the user’s perspective?\nA: The system could miss genuine moments, surface too many weak or duplicate Opportunities, assign incorrect product context, expose internal information to students, allow conflicting replies, transfer historical ownership incorrectly, or overstate revenue impact.

Q: What fears or unintended outcomes might they worry about?\nA: Institutes may worry about appearing intrusive, overwhelming students with messages, training staff to offer discounts too quickly, exposing purchase behaviour to unauthorized users, creating competition between staff, or using misleading revenue claims.

Q: What happens after the first successful use?\nA: After resolving or converting an Opportunity, staff can reuse the same persistent student conversation for future products while retaining the earlier Opportunity’s Signals, ownership history, actions, outcome, and revenue classification.

Q: How will the user want to scale, repeat, or evolve this?\nA: Institutes will want to refine Signal thresholds using invalid and conversion data, standardize follow-up practices, compare owner performance, identify common purchase obstacles, and later add Campaigns, Automations, and AI-assisted summaries or next-best-action recommendations.


\
## Functional Requirements


  1. The system must provide an **Attention Inbox** for authorized institute staff to review actionable student–product Opportunities.
  2. The system must restrict access to Signals, Opportunities, conversations, messages, internal notes, ownership information, outcomes, and revenue data based on institute-level staff permissions.
  3. The system must ensure that staff can access only the Signals, Opportunities, conversations, and related records belonging to their institute.
  4. The system must record supported authenticated student activities that may indicate purchase consideration, purchase friction, or a request for enrollment assistance.
  5. The system must provide Testpress-defined Signal templates for supported meaningful moments.
  6. Initial Signal templates must include repeated product interest, pre-purchase enquiry, checkout abandonment, and payment failure.
  7. A Signal template must define the meaningful event being detected, its qualifying criteria, intent classification, urgency, Opportunity effect, Attention Inbox presentation, explanation format, suggested action, urgency-decay behavior, and deduplication rules.
  8. Signal templates must represent detection and handling blueprints and must not be treated as message templates.
  9. Testpress must define and centrally maintain the underlying logic for every Signal template.
 10. Institute administrators must not be allowed to modify a Signal template’s qualifying criteria, thresholds, intent classification, urgency rules, explanation logic, suggested action, urgency-decay behavior, or deduplication rules in the initial version.
 11. Where permitted by Testpress, an authorized institute administrator must be able to enable or disable an individual Signal template for the institute.
 12. Signal-template enablement changes must apply only to future qualifying activity and must not trigger retrospective evaluation of historical activity.
 13. Disabling a Signal template must not delete previously generated Signals or alter existing Opportunities.
 14. The system must evaluate recorded student activity only against Signal templates enabled for the institute.
 15. The system must create a Signal only when the activity satisfies the Testpress-defined qualifying criteria for an enabled Signal template.
 16. The system must not surface raw or non-qualifying behavioural events directly in the Attention Inbox.
 17. The system must retain sufficient event data to determine whether a Signal template’s qualifying conditions were satisfied.
 18. The system must prevent duplicate Signals from being created from the same qualifying event or event sequence according to the template’s deduplication rules.
 19. The system must store every Signal as a separate immutable record.
 20. A Signal’s type, qualifying event, occurrence time, intent classification, urgency at creation, related student, related product, and triggering template must not be overwritten after creation.
 21. Corrections to inaccurate Signal data must be recorded without replacing or silently changing the original Signal evidence.
 22. Each Signal must identify the institute, student, product, Signal template, qualifying activity, relevant event timestamps, intent level, urgency, and creation time.
 23. Each Signal must clearly explain why it surfaced using specific qualifying activity and relevant timestamps.
 24. A Signal explanation must use concrete descriptions such as “Payment failed 6 minutes ago” or “Viewed this product four times in five days.”
 25. The system must not require staff to interpret an unexplained score to understand why a Signal surfaced.
 26. The system may maintain internal scores for future use, but such scores must not replace the visible explanation of the qualifying activity.
 27. The system must maintain intent and urgency as separate concepts.
 28. Intent must represent how strongly the Signal suggests purchase consideration.
 29. Urgency must represent how useful or time-sensitive staff intervention is at the current moment.
 30. The system must allow an Opportunity’s current urgency to decrease over time according to Testpress-defined rules without modifying the original Signal.
 31. The system must preserve the original Signal urgency and timestamps for historical analysis.
 32. The system must maintain separate Opportunities for each institute–student–product combination.
 33. The system must allow only one active Opportunity for the same institute, student, and product.
 34. The system must create a new Opportunity when an actionable Signal occurs and no active Opportunity exists for the same institute, student, and product.
 35. The system must attach additional relevant Signals for the same product to the existing active Opportunity.
 36. Additional Signals must not create duplicate active Opportunities for the same institute, student, and product.
 37. The system must allow a new Opportunity for the same product after the previous Opportunity has reached a final outcome and the student later demonstrates renewed purchase intent.
 38. A new Opportunity created after a previous buying cycle must remain historically distinct from the earlier Opportunity.
 39. Each Opportunity must retain its institute, student, product, contributing Signals, current intent, current urgency, primary reason, lifecycle state, awaiting state, owner, objections, follow-up details, outcome, timestamps, related actions, and revenue classification.
 40. The system must update an active Opportunity’s summary, primary reason, current intent, current urgency, and latest activity when stronger or more recent Signals occur.
 41. Updating an Opportunity must not change the type or historical details of its contributing Signals.
 42. The Opportunity’s primary reason must reflect the most relevant current reason for staff attention.
 43. A stronger or more urgent Signal must be able to replace a weaker Signal as the Opportunity’s primary reason without deleting the earlier Signal.
 44. The system must retain all Signals associated with an Opportunity in chronological order.
 45. The system must display each active Opportunity separately by product, including when one student has active Opportunities for multiple products.
 46. The system must show the student, product, primary reason, current intent, current urgency, owner, awaiting state, and latest relevant activity for each Attention Inbox item.
 47. The Attention Inbox must organize Opportunities around unresolved student situations rather than displaying students as Warm Leads or Hot Leads.
 48. The system must use understandable Attention Inbox labels such as **Needs help now**, **Ready to decide**, and **Considering** where defined by the relevant Signal template.
 49. The system must visibly emphasize recency for time-sensitive Opportunities using relative time descriptions.
 50. The Attention Inbox must prioritize Opportunities that are urgent and waiting for institute action.
 51. The system must allow authorized staff to filter Opportunities by owner, awaiting state, product, Signal type, urgency, Attention Inbox label, and lifecycle state.
 52. The system must allow authorized staff to access the full explanation and supporting Signals for an Opportunity from the Attention Inbox.
 53. The system must support awaiting states including **No conversation yet**, **Awaiting your response**, **Awaiting student response**, and **Follow-up scheduled**.
 54. The awaiting state must identify who is expected to act next.
 55. Successfully contacting a student must not by itself close an Opportunity.
 56. Waiting on the student, waiting on the institute, follow-up scheduled, and conversation resolved must not be treated as final Opportunity outcomes.
 57. The system must maintain one persistent sales conversation for each institute–student relationship.
 58. The system must reuse the same persistent conversation for all current and future purchase-related discussions between the institute and student.
 59. The system must not create a separate conversation because another product becomes relevant.
 60. The system must not create a separate conversation because a new Opportunity is created.
 61. The system must allow multiple product-specific Opportunities to share the same persistent institute–student conversation.
 62. The system must display the student’s active Opportunities alongside the shared conversation in the staff interface.
 63. Staff must be able to select an Opportunity and view its product, Signals, intent, urgency, objection, actions, follow-up, and outcome without leaving the shared conversation.
 64. The conversation must retain context when discussions move between products.
 65. The system must allow staff to add a product-specific Opportunity through an explicit **Track as opportunity** action when another product becomes meaningfully relevant.
 66. A casual product mention in a conversation must not automatically create an Opportunity.
 67. The system must allow a message to relate to one Opportunity, multiple Opportunities, or no specific Opportunity.
 68. The system must not require every message to be assigned to a product or Opportunity.
 69. Where a message is linked to an Opportunity, the system must retain that relationship for staff context and outcome analysis.
 70. The system must allow authenticated students to view and participate only in their own persistent conversation with the institute.
 71. The system must allow students and permitted staff members to send and receive messages within the persistent conversation.
 72. The system must retain the complete message history of the persistent conversation.
 73. The system must support loading earlier messages when the conversation history exceeds the initial display limit.
 74. The student must not be forced to switch conversations when asking about another product, comparing products, receiving a different recommendation, or entering a later buying cycle.
 75. The system must show message timestamps and sending, delivered, and failed states where available in the local timezone.
 76. Messages sent while the recipient is offline must remain available when the recipient next accesses Testpress.
 77. A failed staff message must not be counted as successful contact.
 78. Student-facing purchase-assistance entry points must use assistance-oriented language.
 79. Student-facing language must not disclose that Testpress tracked repeated views, checkout abandonment, Signal classifications, intent, or urgency.
 80. The system must prevent students from viewing Signal details, Opportunity classifications, ownership information, transfer history, internal notes, staff-only actions, revenue data, or internal timeline markers.
 81. Every persistent institute–student sales conversation must have no more than one active **Conversation Owner**.
 82. The Conversation Owner must also be treated as the **Student Sales Owner**.
 83. The Conversation Owner must be responsible for purchase-related communication across all active product Opportunities for that student.
 84. Opening or viewing a conversation must not automatically assign ownership.
 85. The system must clearly show when a conversation is unassigned.
 86. An authorized staff member must be able to explicitly claim an unassigned conversation.
 87. Claiming ownership must require a deliberate staff action.
 88. When ownership is claimed, all active Opportunities for the student must be assigned to the Conversation Owner.
 89. Every new Opportunity must inherit the current Conversation Owner where one exists.
 90. All active Opportunities belonging to the same institute–student relationship must have the same owner as the persistent conversation.
 91. The system must display the current Conversation Owner before a permitted staff member sends or coordinates a response.
 92. The system must prevent conflicting ownership claims.
 93. If two staff members attempt to claim an unassigned conversation, the system must accept only one successful claim and show the resulting owner to the other staff member.
 94. The system must restrict student-facing replies according to ownership, collaboration permissions, and institute access rules.
 95. Staff who are not the Conversation Owner must not independently send student-facing replies unless they have explicit permission to participate.
 96. Sending a permitted response as a collaborator must not automatically change ownership.
 97. The system must allow authorized staff to add collaborators without transferring the student relationship.
 98. A collaborator must be able to view permitted conversation and Opportunity context.
 99. A collaborator and conversation owner must be able to add internal notes where permitted.
100. Internal notes must be clearly distinguishable from student-facing messages.
101. Internal notes must never be displayed to the student.
102. Adding, removing, or participating as a collaborator must not alter Opportunity ownership or ownership credit.
103. The system must distinguish collaboration actions from ownership transfers in the user interface and activity history.
104. The system must allow an authorized user to explicitly transfer the persistent conversation to another authorized staff member.
105. Ownership transfer must require selection of the new owner and entry of a transfer reason.
106. The system must validate that the selected new owner has permission to own the conversation.
107. A successful transfer must make the selected staff member the new Conversation Owner and Student Sales Owner.
108. A successful transfer must assign all currently active Opportunities for the student to the new Conversation Owner.
109. Opportunities created after the transfer must inherit the new Conversation Owner.
110. The persistent conversation must continue without interruption or duplication after ownership transfer.
111. Finalized Opportunities must not transfer when conversation ownership changes.
112. Converted, closed, lost, expired, dismissed, or invalid Opportunities must retain their historical owner.
113. Each ownership transfer must record the previous owner, new owner, actor, reason, and timestamp.
114. Each Opportunity must preserve the owner at Opportunity creation.
115. Each Opportunity must preserve the owner at first successful staff contact.
116. Each active Opportunity must identify its current owner.
117. Each finalized Opportunity must preserve the owner at conversion or closure.
118. The system must retain complete ownership-transfer history for audit and reporting.
119. Initial conversion credit must be assigned to the staff member who owned the Opportunity at conversion.
120. Historical ownership and conversion credit must not be rewritten when the student relationship is later transferred.
121. The system must allow the Conversation Owner or another permitted staff member to send assistance-oriented student-facing messages from the persistent conversation.
122. The staff message composer must provide a product-context selector containing the student's active Opportunities and a **No product / General conversation** option.
123. When staff open the conversation using **Open chat** from an Opportunity, that Opportunity must be selected as the default product context.
124. Staff must be able to change the selected product context to another active Opportunity before sending the message.
125. Sending a message with a selected product context must explicitly associate the message with that Opportunity.
126. A message sent with **No product / General conversation** must not be treated as intervention for any Opportunity.
127. A successfully delivered staff message associated with an Opportunity must record staff contact against that Opportunity and may update its awaiting state to **Waiting on student** where a student response is expected.
128. The system must not infer Opportunity association from message text or automatically treat a conversation message as intervention for every active Opportunity.
129. Staff must be able to correct the Opportunity association of a previously sent staff message.
130. Every correction to message Opportunity context must preserve the previous context, new context, actor, and timestamp.
131. A product-context correction made after the relevant purchase must not retroactively change whether the purchase qualified as assisted revenue.
132. The system must allow student messages that cannot be confidently associated with an Opportunity to remain unassigned without forced product classification.
133. Authorized staff may associate an otherwise unassigned student message with an active Opportunity where useful for conversation context, but such association must not itself count as staff intervention.
134. The system must allow the Conversation Owner to schedule a follow-up for an active Opportunity.
135. Scheduling a follow-up must require a future date and time.
136. Scheduling a follow-up must require a reason.
137. A scheduled Opportunity must remain active.
138. A scheduled Opportunity must leave the immediate action queue until the follow-up becomes due, unless new activity requires earlier attention.
139. When the follow-up becomes due, the Opportunity must return to the Attention Inbox as **Waiting on institute**.
140. The system must allow an authorized staff member to reschedule or cancel a pending follow-up.
141. A relevant student response received before the follow-up date must return the Opportunity to the Attention Inbox.
142. A successful same-product purchase before the follow-up date must cancel the pending follow-up and convert the Opportunity.
143. The system must retain the follow-up date, reason, creator, changes, and completion status.
144. The system must allow authorized staff to record the apparent purchase obstacle or objection for an Opportunity.
145. Supported objection categories must include **Needs information**, **Payment problem**, **Price concern**, **Parent approval**, **Comparing products**, **Timing**, and **Unknown**.
146. Updating an objection must retain the previous objection history rather than silently replacing it.
147. The system must not present Sales Offers as the default response to every Opportunity.
148. The system should encourage staff to identify the apparent purchase obstacle before presenting an eligible Sales Offer action.
149. An authorized institute administrator must be able to configure whether Sales Offers are available for an individual product.
150. For each eligible product, the administrator must be able to define one or more exact Sales Offer options.
151. Each Sales Offer option must define a fixed discount type, discount value, and validity period.
152. Sales staff must not be able to modify the administrator-defined discount value or validity period.
153. Sales staff must not receive general permission to create arbitrary user-specific discounts merely because they are permitted to issue Sales Offers.
154. The **Send offer** action must be available only when the currently selected product context has an active Opportunity and an eligible Sales Offer configuration.
155. A Sales Offer must be restricted to the same institute, student, product, and Opportunity from which it was issued.
156. The system may use the existing user-specific discount infrastructure internally to implement the offer, but the salesperson must interact only with the constrained Sales Offer workflow.
157. The validity period must begin when the Sales Offer is issued and must be enforced by the purchase and discount system.
158. Only one active Sales Offer should normally exist for the same Opportunity at a time. Replacing an active offer must explicitly cancel or replace the previous offer.
159. The system must retain Sales Offer creation, successful delivery, expiry, cancellation, replacement, and usage history.
160. A Sales Offer must not be marked as successfully delivered when the associated student-facing message fails or is not sent.
161. For V1, a Sales Offer must not stack with another incompatible user-specific or product discount unless the existing purchase system explicitly supports the combination.
162. The system must allow an active Opportunity to be finalized as **Converted**, **Closed with non-purchase outcome**, or **Invalid / Not an opportunity**.
163. The system must not provide a generic dismissal action without a structured outcome.
164. Closing a genuine non-purchase Opportunity must require an outcome reason.
165. Supported non-purchase reasons must include **Too expensive**, **Chose another provider**, **Product not suitable**, **Parent declined**, **Will purchase in a later intake**, **Existing customer or already purchased elsewhere**, **Non-sales enquiry**, **Spam or abuse**, **Student explicitly not interested**, **Could not contact**, **No response**, and **Other**.
166. Selecting **Other** as an outcome reason must require explanatory text.
167. An Opportunity must remain active when a future purchase decision has been deferred and a follow-up remains appropriate.
168. A delayed decision must be represented through **Follow-up scheduled** rather than being incorrectly closed as lost.
169. The system must allow authorized staff to mark an Opportunity as **Invalid / Not an opportunity**.
170. Marking an Opportunity invalid must require an invalidation reason.
171. Supported invalidation reasons must include internal or test account, duplicate event, product already owned, accidental checkout, incorrect product mapping, bot or suspicious activity, staff-created test purchase, and Other.
172. Invalid Opportunities must remain separate from genuine non-conversion outcomes in reports.
173. The system must remove converted, closed, and invalid Opportunities from the active Attention Inbox.
174. The persistent institute–student conversation must remain available after an Opportunity is finalized.
175. Finalizing one product Opportunity must not close the shared conversation or other active Opportunities for the student.
176. The system must allow an authorized user to reopen a finalized Opportunity with a required reason.
177. Reopening must preserve the previous outcome, historical owner, timestamps, and state-change history.
178. A reopened Opportunity must inherit the current Conversation Owner because it becomes active again.
179. The ownership history must continue to preserve the staff member who owned the Opportunity at its previous finalization.
180. The system must automatically convert an active Opportunity when the student completes a successful purchase of the same product.
181. Conversion must record the purchase reference, purchase value, conversion time, and owner at conversion.
182. Conversion of one Opportunity must not automatically convert another product Opportunity belonging to the same student.
183. The system must retain converted Opportunities as historical records.
184. The system must cancel pending follow-up actions for an Opportunity when that Opportunity converts.
185. The system must create a staff-visible conversation timeline marker when an Opportunity converts.
186. The system must classify a purchase as assisted revenue only when:
     * a qualifying Signal contributed to the Opportunity;
     * at least one successfully delivered staff response was explicitly associated with that same Opportunity before purchase;
     * the student purchased the same product;
     * and the purchase occurred within the applicable attribution window.
187. A staff response associated with another Opportunity must not qualify the purchased Opportunity as assisted.
188. A message sent with **No product / General conversation** must not qualify any Opportunity as assisted.
189. An internal note, Opportunity view, ownership claim, ownership transfer, or other staff-only action must not by itself qualify as a staff intervention for assisted revenue.
190. Failed or unsent student-facing messages must not qualify as staff intervention.
191. Product-context changes made after the purchase must not retroactively change the assisted-revenue classification recorded at purchase time.
192. A purchase outside the applicable attribution window must not count as assisted revenue for the Opportunity.
193. The system must classify revenue as directly attributed only when the student completes the same-product purchase using the exact Sales Offer issued through that Opportunity.
194. A generic discount, institute-wide discount, unrelated discount, or discount not issued through that Opportunity must not qualify the revenue as directly attributed.
195. Directly attributed revenue must remain a subset of assisted revenue and must not be added again as separate revenue.
196. The system must not add directly attributed revenue to assisted revenue as a separate additional amount.
197. Revenue messaging must use conservative language such as **assisted revenue** and **directly attributed revenue**.
198. The system must not describe assisted revenue as revenue generated solely by Testpress Signals.
199. Each Opportunity must show its Signal time, first successful staff-contact time, latest interaction, current awaiting state, follow-up details, objection, outcome, purchase value, assisted-revenue status, and directly attributed-revenue status.
200. The system must show the exact Signals and qualifying activity associated with each converted or closed Opportunity.
201. The system must provide per-template outcome metrics for each Signal template.
202. Per-template metrics must include qualifying Signals, Opportunities created, Opportunities updated, invalidation rate, first-contact time, student reply rate, conversion count, assisted revenue, and directly attributed revenue.
203. The system must allow an authorized administrator to distinguish a Signal template that is unused from one that is producing invalid or ineffective Opportunities.
204. The system must show when no underlying activity qualified for a Signal template during the selected period.
205. The system must show the proportion of a template’s Opportunities marked Invalid / Not an opportunity.
206. The system must allow comparisons between Signal templates, products, owners, and selected time periods.
207. The system must allow comparison of contacted and uncontacted Opportunities for the same Signal template.
208. The system must allow comparison of Opportunities handled within and outside relevant response-time bands.
209. The system must preserve the Signal template version or rule definition responsible for every generated Signal.
210. Changes made centrally by Testpress to a Signal template must not rewrite the rule definition associated with historical Signals.
211. The staff conversation timeline must include system-generated markers for Opportunity creation, product context addition, ownership assignment, ownership transfer, follow-up scheduling, conversion, closure, reopening, and invalidation.
212. Each timeline marker must identify the related product where applicable.
213. Each timeline marker must identify the responsible staff member or system action, timestamp, and reason where applicable.
214. Staff-only timeline markers must not be displayed to the student.
215. The system must record the actor and timestamp for Signal-template enablement changes, ownership claims, ownership transfers, collaborator changes, internal notes, follow-up changes, objection changes, discount sharing, Opportunity finalization, and reopening.
216. The system must preserve historical state and ownership changes for audit and performance reporting.
217. The system must provide a safe access-denied state without revealing restricted student, Signal, Opportunity, conversation, ownership, or revenue information.


## Staff Response Product Context and Opportunity Attribution

Because one institute–student conversation may contain multiple active product Opportunities, the system must know which Opportunity a staff response was intended to address. Conversation-level activity alone must not be treated as intervention for every active Opportunity.

### Product Context While Replying

On the staff conversation interface, the message composer must include a **product context selector** indicating which active Opportunity the response relates to.

The selector should behave like a compact selector in the message composer, similar to ChatGPT's Instant / Medium / High selector.

When staff open the conversation using **Open chat** from an Opportunity:

* that Opportunity's product must be selected automatically as the default product context;
* the selected product must remain clearly visible before the message is sent;
* staff may change the selection to another active Opportunity for the same student;
* staff may select **No product / General conversation** when the response does not relate to a specific Opportunity.

Selecting a product context must not create a new Opportunity. Only products having an active Opportunity should appear in this selector.

### Message–Opportunity Association

When the staff response is successfully sent, the selected product context must be stored as an explicit relationship between the message and that product's Opportunity.

For example:

**Active Opportunities**

* NEET Course
* Test Series

Staff opens chat from the NEET Course Opportunity.

The composer defaults to:

**Responding about: NEET Course**

If the staff sends a message without changing it, that message is associated with the NEET Course Opportunity.

A message sent with **No product / General conversation** must not count as intervention for any Opportunity.

### Editing Product Context

Staff must be able to correct the product context of a message they previously sent.

Changes to message product context must:

* preserve an audit history containing the previous context, new context, actor, and timestamp;
* never modify the actual message content or delivery history;
* not allow a post-purchase context change to retroactively make an Opportunity qualify as staff-assisted.

The attribution decision must use the product context that existed before the purchase occurred.

### Determining Whether Staff Helped

When a student purchases a product, the system first identifies the active Opportunity for the same institute, student, and product.

The Opportunity may be considered **staff-assisted** only when at least one successfully delivered staff response:

* was explicitly associated with that Opportunity's product,
* was sent before the purchase,
* and satisfies the configured attribution-window requirements.

A staff response associated with another product, or with no product context, must not qualify.

For example:

* Student has active Opportunities for **NEET Course** and **Test Series**.
* Staff sends a response with **NEET Course** selected.
* Student later purchases **NEET Course**.
* The NEET Course Opportunity is converted and may qualify as staff-assisted.

If the student instead purchases **Test Series**, the NEET Course response must not be treated as intervention for the Test Series Opportunity.

### Why This Is Important

A persistent conversation can contain discussions about several products. Without explicit product context, the system cannot deterministically know which Opportunity a staff response was intended to influence.

Storing the product context at the time of the response provides structured evidence connecting:

**Opportunity → Staff intervention → Same-product purchase**

This prevents unrelated conversation activity from being credited for a purchase and makes assisted-revenue reporting more conservative and explainable.


\
## Sales Offers From Opportunity Conversations

Sales staff may need to offer a limited discount while helping a student complete a purchase. However, sales staff must not receive general permission to create arbitrary user-specific discounts across the institute.

Instead, institute administrators must define **Sales Offer options** for individual products. Sales staff may issue only these pre-authorized offers from an active Opportunity conversation.

### Product-Level Sales Offer Configuration

For each eligible product, an authorized institute administrator may configure whether sales staff are allowed to send Sales Offers.

The administrator must define one or more exact offer options.

Each offer option must specify:

* discount type: percentage or fixed amount;
* discount value;
* validity period after the offer is issued.

For example:

| Offer | Validity |
|-------|----------|
| 3% off | 24 hours |
| 5% off | 4 hours  |
| ₹500 off | 2 hours  |

Sales staff must not be able to modify the configured discount amount or validity period.

If no Sales Offer options are configured for a product, sales staff must not be able to issue a discount for that product.

### Sending an Offer From the Conversation

When the currently selected product context has an active Opportunity and Sales Offers are enabled for that product, the staff conversation interface may provide a **Send offer** action.

The salesperson selects one of the administrator-configured offers.

For example:

**Send offer → 5% off · valid for 4 hours**

The system then creates a student-specific discount using the existing user-specific discount infrastructure where applicable.

The generated offer must be restricted to:

* the current institute;
* the selected student;
* the selected product;
* the related Opportunity;
* the selected administrator-defined offer terms.

The salesperson must not receive access to the general user-specific discount administration interface merely because they can send Sales Offers.

### Product and Opportunity Context

A Sales Offer must always belong to a specific active Opportunity.

If the student has active Opportunities for multiple products, the offer must apply only to the product currently selected in the staff response product-context selector.

For example:

* NEET Course Opportunity is selected.
* Staff chooses **5% off · valid for 4 hours**.
* The resulting offer applies only to the NEET Course.
* It must not apply to another active Opportunity such as Test Series.

Changing conversation product context must not change previously created Sales Offers.

### Offer Validity

The validity period must begin when the offer is successfully issued.

For example, an offer configured as **5% off for 4 hours** and issued at 2:00 PM must expire at 6:00 PM.

Expiry must be enforced by the purchase and discount system and must not rely only on the wording of the staff message.

After expiry, the discount must no longer be automatically applied or accepted for the purchase.

### Offer Delivery

Creating an offer and successfully communicating it to the student must be treated as separate events.

The system should retain whether an offer was:

* created;
* successfully sent to the student;
* expired unused;
* used in a successful purchase;
* cancelled or replaced.

A failed or unsent staff message must not record the offer as successfully delivered.

### Active Offer Rules

Only one active Sales Offer should normally exist for the same Opportunity at a time.

If another offer needs to be issued while one is active, the system must explicitly replace or cancel the previous offer rather than silently maintaining multiple competing offers.

All offer creation, replacement, cancellation, expiry, and usage must remain available in the Opportunity history.

### Discount Stacking

Sales Offers must follow the institute's supported discount-combination rules.

For V1, Sales Offers should not be combined with another user-specific discount or incompatible product discount unless the existing purchase system explicitly supports that combination.

The purchase system must determine the applicable discount before completing the transaction.

### Revenue Attribution

A successfully delivered Sales Offer is a meaningful staff intervention for its related Opportunity.

If the student later purchases the same product within the applicable attribution rules, the Opportunity may qualify as **assisted revenue**.

If the student completes the purchase using the exact student-specific Sales Offer issued through that Opportunity, the purchase may additionally qualify as **directly attributed revenue**.

Directly attributed revenue must remain a subset of assisted revenue and must not be added again as separate additional revenue.

Receiving an offer without using it must not by itself qualify the purchase as directly attributed revenue.

### Audit and Reporting

For every issued Sales Offer, the system must retain:

* Opportunity;
* product;
* student;
* selected offer definition;
* discount amount or percentage;
* issue time;
* expiry time;
* salesperson who issued it;
* successful delivery status;
* replacement or cancellation history;
* resulting purchase, where applicable;
* whether the offer was actually used.

This history must be available for authorized staff reporting and must not be editable through normal sales workflows.

### Why This Is Important

Sales staff need limited flexibility to resolve genuine price objections and encourage timely purchase, but unrestricted discount permissions create financial and operational risk.

Administrator-defined Sales Offers allow the institute to decide in advance:

* which products may be discounted by sales staff;
* exactly which offers may be given;
* and how long each offer remains valid.

This allows counsellors to act quickly inside the Opportunity conversation while keeping discount policy, financial control, auditability, and revenue attribution under institute control.


\
## Future Consideration — Sales Incentives

Sales incentives are **not part of Testpress Signals V1** and are outside the scope of this PRD.

In a future version, institutes may optionally configure institute-level or product-level incentives for sales staff based on eligible conversions or attributed revenue. The existing Opportunity ownership, owner-at-conversion, and revenue-attribution records should be preserved so they can support such incentive calculations later.

Any future incentive feature should define its own eligibility, calculation, refund/cancellation handling, ownership-credit, and payout rules separately from V1.


## Recommended Testpress Signal Templates for V1

Testpress Signals V1 should begin with a small set of centrally managed Signal templates that represent clear purchase intent or purchase friction.

Each template should define:

* triggering activity;
* qualifying criteria;
* intent;
* urgency;
* Attention Inbox label;
* explanation format;
* suggested action;
* deduplication behavior;
* urgency decay;
* and attribution window.

The exact thresholds below are recommended starting defaults and may be adjusted centrally by Testpress after observing real usage.


---

### 1. Payment Failure

**Purpose:** Surface students who clearly attempted to purchase but could not complete payment.

**Qualifying activity**

Create a Signal when:

* an authenticated student attempts payment for a product;
* the payment attempt fails;
* the student does not subsequently complete the same-product purchase immediately.

**Intent:** High

**Initial urgency:** Critical / Very High

**Attention Inbox label:** **Needs help now**

**Example explanation**

> Payment failed for NEET Course 6 minutes ago.

**Suggested action**

> Contact the student quickly and check whether they need help completing payment.

**Deduplication**

Repeated failures from the same checkout/payment flow should not create separate Signals continuously.

Additional failures may update the existing Opportunity with newer evidence.

**Urgency decay**

Very high immediately after failure and should decay quickly with time.

**Recommended attribution window**

24 hours.

**Why include in V1**

This is likely the strongest Signal because the student has already demonstrated clear purchase intent.


---

### 2. Checkout Abandonment

**Purpose:** Surface students who started the purchase process but stopped before completing payment.

**Qualifying activity**

Create a Signal when:

* the authenticated student enters checkout for a product;
* no successful purchase follows;
* no active payment flow remains;
* and a defined waiting period has elapsed.

Recommended initial waiting period:

> 30 minutes after the last checkout activity.

Do not create abandonment immediately when checkout is opened.

**Intent:** High

**Initial urgency:** High

**Attention Inbox label:** **Ready to decide**

**Example explanation**

> Started checkout for NEET Course 45 minutes ago but did not complete the purchase.

**Suggested action**

> Check whether the student has a question or encountered difficulty completing enrollment.

**Deduplication**

Multiple visits to the same incomplete checkout during the same buying session should produce one Signal.

A later genuinely separate buying cycle may produce another Signal if no active Opportunity remains.

**Urgency decay**

High for the first few hours and gradually decreases afterward.

**Recommended attribution window**

48 hours.

**Why include in V1**

Checkout initiation is a strong indication that the student moved beyond passive browsing toward purchase.


---

### 3. Pre-Purchase Enquiry

**Purpose:** Surface students who explicitly ask the institute for help before buying.

**Qualifying activity**

Create a Signal when an authenticated student uses a purchase-assistance entry point associated with a product, such as:

* **Questions before enrolling**
* **Need help choosing**
* **Having trouble completing payment**

The enquiry must carry explicit product context.

**Intent:** High

**Initial urgency:** High

**Attention Inbox label:** **Needs response**

**Example explanation**

> Asked a question about NEET Course 8 minutes ago.

Where appropriate, the specific enquiry entry point may also be shown:

> Requested help before enrolling in NEET Course 8 minutes ago.

**Suggested action**

> Review the student's message and respond to their question.

**Deduplication**

The same submitted enquiry should create only one Signal.

Further student messages should continue in the same conversation and update the active Opportunity rather than creating a new Signal for every message.

**Urgency decay**

High while the student is awaiting an institute response.

**Recommended attribution window**

7 days.

**Why include in V1**

Unlike inferred behavioural Signals, this represents explicit student intent to engage with the institute before purchase.


---

### 4. Repeated Product Interest

**Purpose:** Surface students showing sustained interest in a product without entering checkout.

This should be the most conservative V1 Signal because repeated viewing is weaker evidence than checkout or payment activity.

**Qualifying activity**

Recommended initial rule:

Create a Signal when an authenticated student:

* views the same product at least **4 times**;
* across at least **2 separate sessions**;
* within **5 days**;
* has not already purchased the product;
* and has not already generated a stronger active Signal for the same Opportunity recently.

**Intent:** Medium

**Initial urgency:** Medium

**Attention Inbox label:** **Considering**

**Example explanation**

> Viewed NEET Course 4 times across 3 sessions in the last 5 days.

**Suggested action**

> Review the student's recent activity and consider whether a helpful, non-intrusive outreach is appropriate.

**Deduplication**

Do not generate another repeated-interest Signal every time the student crosses the threshold again.

Recommended cooldown:

> One repeated-interest Signal per product Opportunity within 7 days unless materially stronger activity occurs.

A checkout, payment failure, or explicit enquiry should supersede this as the Opportunity's primary reason.

**Urgency decay**

Medium and relatively slow compared with payment or checkout Signals.

**Recommended attribution window**

7 days.

**Why include in V1**

It allows Signals to identify prospective students before checkout while remaining conservative enough to avoid surfacing every casual product viewer.


---

### Suggested Signal Strength Order

When multiple Signals belong to the same active Opportunity, the stronger or more immediate Signal should generally become the Opportunity's primary reason.

Recommended order:

```text
Payment Failure
    ↓
Checkout Abandonment
    ↓
Pre-Purchase Enquiry
    ↓
Repeated Product Interest
```

This ordering is only for selecting the Opportunity's current primary reason. Earlier Signals must remain preserved in the Opportunity history.

A recent explicit enquiry may still take priority operationally when the student is waiting for a response.


---

### Recommended V1 Scope

V1 should initially support only:


1. **Payment Failure**
2. **Checkout Abandonment**
3. **Pre-Purchase Enquiry**
4. **Repeated Product Interest**

Avoid adding weaker behavioural Signals such as:

* single product views;
* generic login frequency;
* time spent on a page;
* browsing several unrelated products;
* course-content activity;
* inactivity;
* generic search behavior.

These are more likely to create noise and should be considered only after V1 data shows that the initial Signals are useful and manageable.


---

### Recommended Starting Principle

V1 should optimize for:

> **Fewer Signals with clear reasons and strong purchase relevance rather than maximum lead coverage.**

A missed weak Opportunity is preferable to an Attention Inbox filled with low-confidence behavioural alerts that sales staff stop trusting.


## Tasks

### Data Model and Foundations

### PR 1 — Signal Template Registry

- [ ] Define the Testpress-managed hard-coded registry for supported Signal templates.
- [ ] Add initial templates for repeated product interest, pre-purchase enquiry, checkout abandonment, payment failure.
- [ ] Store each template’s qualifying criteria, unique key, intent, urgency, inbox label, explanation pattern, suggested action, urgency-decay behaviour, deduplication rules, and version.
- [ ] Prevent institute administrators from modifying template definitions.
- [ ] Add validation for incomplete or conflicting template definitions.
- [ ] Add unit tests for registry loading, template validation, and version preservation.

### PR 2 — Institute Signal Enablement

- [ ] Create an institute-level model for enabling or disabling supported Signal templates.
- [ ] Ensure enablement changes affect only future activity evaluation.
- [ ] Preserve existing Signals and Opportunities when a template is disabled.
- [ ] Add tenant-scoped constraints and indexes.
- [ ] Add migrations and model tests.
- [ ] Add audit fields for actor and timestamp.

### PR 3 — Student Activity Event Model

- [ ] Create an immutable model for supported student activity events.
- [ ] Store institute, student, product, event type, occurrence time, source reference, and relevant event metadata.
- [ ] Add fields required to correlate repeated events and purchase flows.
- [ ] Add deduplication identifiers for repeated delivery of the same event.
- [ ] Add indexes for template evaluation by institute, student, product, type, and time.
- [ ] Add migrations and model tests.

### PR 4 — Signal Data Model

- [ ] Create an immutable Signal model linked to its institute, student, product, activity evidence, template, and template version.
- [ ] Store intent at creation, urgency at creation, qualifying details, explanation data, and relevant timestamps.
- [ ] Prevent existing Signal evidence and classifications from being silently overwritten.
- [ ] Support corrective records without replacing the original Signal.
- [ ] Add deduplication constraints according to template-generated keys.
- [ ] Add migrations and tests for immutability, deduplication, and tenant isolation.

### PR 5 — Opportunity Data Model

- [ ] Create an Opportunity model scoped to institute, student, and product.
- [ ] Add lifecycle state, awaiting state, primary reason, current intent, current urgency, latest activity, objection, follow-up, and outcome fields.
- [ ] Enforce one active Opportunity per institute–student–product combination.
- [ ] Allow multiple historical Opportunity episodes for the same combination.
- [ ] Add fields for conversion, purchase value, revenue classification, and historical timestamps.
- [ ] Add indexes for Attention Inbox filtering and ordering.
- [ ] Add migrations and model tests.

### PR 6 — Signal–Opportunity Relationships

- [ ] Link multiple immutable Signals to one Opportunity.
- [ ] Preserve chronological ordering of Signals.
- [ ] Store which Signal currently drives the Opportunity’s primary reason.
- [ ] Prevent Signals from being linked across institutes or unrelated students and products.
- [ ] Support historical inspection of all contributing Signals.
- [ ] Add model validation and relationship tests.

### PR 7 — Conversation and Message Models

- [ ] Create one persistent sales conversation model per institute–student relationship.
- [ ] Enforce uniqueness for the institute–student conversation.
- [ ] Create message records for student-facing messages and internal notes.
- [ ] Store sender, message type, timestamps, delivery state, and failure details.
- [ ] Allow messages to link to zero, one, or multiple Opportunities.
- [ ] Prevent internal notes from being treated as student-facing messages.
- [ ] Add migrations, indexes, and model tests.

### PR 8 — Ownership and Collaboration Models

- [ ] Add Conversation Owner field to the persistent conversation.
- [ ] Add Opportunity ownership snapshots for creation, first contact, current ownership, conversion, and closure.
- [ ] Create ownership-transfer history records.
- [ ] Create conversation collaborator records with permission metadata.
- [ ] Ensure finalized Opportunities retain their historical owners.
- [ ] Add constraints preventing cross-institute ownership or collaboration.
- [ ] Add migrations and model tests.

### PR 9 — Opportunity History and Timeline Models

- [ ] Create immutable history records for Opportunity state, awaiting state, objection, follow-up, outcome, and reopening changes.
- [ ] Create staff-visible conversation timeline-marker records.
- [ ] Support markers for Opportunity creation, product context, ownership, transfers, follow-ups, conversion, closure, reopening, and invalidation.
- [ ] Store product, actor, reason, and timestamp where applicable.
- [ ] Ensure staff-only markers cannot be exposed through student-facing queries.
- [ ] Add migrations and model tests.

### Signal Detection and Opportunity Logic

### PR 10 — Activity Capture Integration

- [ ] Record repeated product-view activity for authenticated students.
- [ ] Record pre-purchase enquiries from eligible student entry points.
- [ ] Record checkout initiation and abandonment-related activity.
- [ ] Record payment failures with available payment-attempt context.
- [ ] Exclude unsupported, anonymous, internal, bot, test, or invalid activity where identifiable.
- [ ] Add tests for event capture, duplicate prevention, product mapping, and tenant isolation.

### PR 11 — Signal Evaluation Service

- [ ] Evaluate new activity against enabled Testpress-defined Signal templates.
- [ ] Apply centrally defined qualifying criteria and deduplication rules.
- [ ] Create Signals only when actionable criteria are satisfied.
- [ ] Preserve the exact template version used for evaluation.
- [ ] Avoid retrospective Signal creation after institute enablement changes.
- [ ] Add tests for every initial Signal template and non-qualifying activity.

### PR 12 — Signal Explanation Generation

- [ ] Generate clear explanations from qualifying activity and timestamps.
- [ ] Support template-defined relative-time and event-count descriptions.
- [ ] Ensure explanations remain understandable without displaying an internal score.
- [ ] Preserve explanation inputs for historical rendering.
- [ ] Handle missing or partial activity metadata safely.
- [ ] Add tests for each template’s explanation output.

### PR 13 — Opportunity Creation and Signal Grouping

- [ ] Create an Opportunity when a Signal has no matching active institute–student–product Opportunity.
- [ ] Attach new Signals to an existing matching active Opportunity.
- [ ] Prevent duplicate active Opportunities during concurrent Signal creation.
- [ ] Create a new historical episode when renewed intent occurs after finalization.
- [ ] Inherit the current Conversation Owner when creating an Opportunity.
- [ ] Add tests for creation, grouping, concurrency, renewed intent, and ownership inheritance.

### PR 14 — Opportunity Summary and Priority Logic

- [ ] Calculate the Opportunity’s current intent, urgency, primary reason, and inbox label from contributing Signals.
- [ ] Allow stronger or more recent Signals to become the primary reason without modifying earlier Signals.
- [ ] Apply Testpress-defined urgency-decay behaviour.
- [ ] Preserve original Signal urgency for historical analysis.
- [ ] Prioritize urgent Opportunities waiting on institute action.
- [ ] Add tests for escalation, decay, primary-reason replacement, and ordering.

### PR 15 — Opportunity Lifecycle Service

- [ ] Centralize valid lifecycle and awaiting-state transitions.
- [ ] Support No conversation yet, Waiting on institute, Waiting on student, and Follow-up scheduled.
- [ ] Prevent workflow progress states from being treated as final outcomes.
- [ ] Support Converted, Closed with non-purchase outcome, and Invalid / Not an opportunity final states.
- [ ] Prevent invalid or conflicting transitions.
- [ ] Record actor, reason, timestamp, history, and timeline markers.
- [ ] Add comprehensive transition tests.

### Messaging and Student Experience

### PR 16 — Staff Conversation Interface Skeleton

- [ ] Create the staff conversation layout for the persistent institute–student thread.
- [ ] Display message history, owner, collaborators, and active Opportunities.
- [ ] Allow staff to select an Opportunity without leaving the conversation.
- [ ] Show staff-only internal notes and timeline markers distinctly.
- [ ] Add loading, empty, error, and access-denied states.
- [ ] Add responsive and accessibility support.
- [ ] Add UI tests.

### PR 17 — Staff Messaging and Opportunity Product Context

- [ ] Add permission-checked endpoints for retrieving and sending conversation messages.
- [ ] Enforce Conversation Owner and collaborator reply permissions.
- [ ] Add the product-context selector to the staff message composer.
- [ ] Default the selector to the Opportunity used to open the conversation through **Open chat**.
- [ ] Allow staff to select another active Opportunity or **No product / General conversation**.
- [ ] Persist the selected Opportunity as structured message context instead of inferring it from message text.
- [ ] Record successful staff contact only against the Opportunity explicitly associated with the delivered message.
- [ ] Allow staff to correct previously selected product context while preserving complete context-change history.
- [ ] Ensure post-purchase context changes cannot retroactively alter assisted-revenue attribution.
- [ ] Record message delivery and failure states and prevent failed messages from counting as successful contact.
- [ ] Update the relevant Opportunity awaiting state after successfully delivered messages where appropriate.
- [ ] Add tests for multiple active Opportunities, default selection, context switching, general messages, failed delivery, context corrections, and post-purchase attribution protection.

### PR 18 — Internal Notes and Collaboration

- [ ] Allow permitted staff to add internal notes to the conversation.
- [ ] Ensure internal notes are never returned by student-facing endpoints.
- [ ] Allow owners to add or remove collaborators.
- [ ] Preserve ownership when collaborators view, comment, or send a permitted response.
- [ ] Record collaborator changes in audit history.
- [ ] Add UI controls, validations, and tests.

### PR 19 — Student Purchase-Assistance Entry Points

- [ ] Add assistance-oriented entry points on eligible product, pricing, checkout, and payment-failure screens.
- [ ] Use labels such as Questions before enrolling and Having trouble completing payment.
- [ ] Avoid student-facing language that reveals monitored behaviour.
- [ ] Reuse the existing persistent institute–student conversation.
- [ ] Associate explicit product and enquiry context where available.
- [ ] Add validation, error handling, responsive behaviour, and UI tests.

### PR 20 — Student Conversation Interface

- [ ] Create a student-facing persistent conversation screen.
- [ ] Display student-facing messages with timestamps and delivery states.
- [ ] Support loading earlier messages.
- [ ] Allow the student to continue discussions across multiple products in the same thread.
- [ ] Exclude Signals, Opportunity states, ownership, internal notes, timeline markers, and revenue data.
- [ ] Enforce conversation ownership by authenticated student identity.
- [ ] Add mobile, accessibility, security, and UI tests.

### PR 21 — Message Polling and Unread State

- [ ] Add polling for new messages while a conversation is open.
- [ ] Support incremental retrieval without duplicating visible messages.
- [ ] Track unread messages separately for staff and students.
- [ ] Update read state when the relevant user views the conversation.
- [ ] Handle temporary polling failures without losing messages.
- [ ] Add performance, idempotency, and integration tests.

### Ownership and Staff Coordination

### PR 22 — Claim Conversation Ownership

- [ ] Add an explicit action to claim an unassigned conversation.
- [ ] Prevent opening or viewing from assigning ownership.
- [ ] Assign all active Opportunities to the staff member who successfully claims the conversation.
- [ ] Prevent conflicting claims during concurrent requests.
- [ ] Show the resulting owner to staff whose claim fails.
- [ ] Record ownership history and timeline markers.
- [ ] Add UI, concurrency, permission, and domain tests.

### PR 23 — Transfer Conversation Ownership

- [ ] Add an explicit ownership-transfer action requiring a new owner and reason.
- [ ] Validate that the recipient is authorized.
- [ ] Transfer the persistent conversation and all active Opportunities.
- [ ] Exclude finalized Opportunities from transfer.
- [ ] Ensure future Opportunities inherit the new owner.
- [ ] Preserve historical owners and conversion credit.
- [ ] Record previous owner, new owner, actor, reason, and timestamp.
- [ ] Add UI, domain, and integration tests.

### PR 24 — Ownership Reporting Snapshots

- [ ] Capture owner at Opportunity creation.
- [ ] Capture owner at first successfully delivered staff contact.
- [ ] Capture owner at conversion or closure.
- [ ] Retain current owner and full transfer history.
- [ ] Assign initial conversion credit to the owner at conversion.
- [ ] Prevent later transfers from rewriting historical credit.
- [ ] Add tests for claim, transfer, reopening, closure, and conversion scenarios.

### Attention Inbox and Opportunity Workspace

### PR 25 — Attention Inbox UI

- [ ] Create the Attention Inbox page for authorized staff.
- [ ] Display student, product, primary reason, intent, urgency, owner, awaiting state, and relative activity time.
- [ ] Use understandable labels such as Needs help now, Ready to decide, and Considering.
- [ ] Visually prioritize urgent Opportunities waiting on institute action.
- [ ] Add filters for owner, awaiting state, product, Signal type, urgency, label, and lifecycle state.
- [ ] Add pagination, loading, empty, error, and access-denied states.
- [ ] Add responsive, accessibility, and UI tests.

### PR 26 — Attention Inbox Query and API Integration

- [ ] Add tenant-scoped queries for active actionable Opportunities.
- [ ] Apply priority ordering based on urgency, awaiting state, and recency.
- [ ] Add filtering, ordering, and pagination support.
- [ ] Return supporting Signal explanations without exposing raw internal scoring.
- [ ] Integrate the Attention Inbox UI with the domain and data layers.
- [ ] Add query-performance, API, permission, and integration tests.

### PR 27 — Opportunity Detail Workspace

- [ ] Display all contributing Signals in chronological order.
- [ ] Show current intent, urgency, primary reason, objection, actions, awaiting state, follow-up, and outcome.
- [ ] Show why the Opportunity surfaced with exact qualifying activity and timestamps.
- [ ] Show ownership snapshots and transfer history to authorized staff.
- [ ] Provide actions for messaging, follow-up, objection capture, closure, invalidation, and reopening.
- [ ] Keep the persistent conversation visible or directly accessible.
- [ ] Add UI and integration tests.

### PR 28 — Track Product as Opportunity

- [ ] Add the explicit Track as opportunity action in the staff conversation.
- [ ] Require selection of a relevant product.
- [ ] Reuse an existing active Opportunity for the product when one exists.
- [ ] Create a new Opportunity only when no active matching Opportunity exists.
- [ ] Prevent casual product mentions from automatically creating Opportunities.
- [ ] Add a product-context timeline marker.
- [ ] Add validation, permission, deduplication, and UI tests.

### Follow-Up, Objections, and Outcomes

### PR 29 — Follow-Up Scheduling

- [ ] Allow the Conversation Owner to schedule a future follow-up with a required reason.
- [ ] Keep scheduled Opportunities active while removing them from the immediate queue.
- [ ] Return due Opportunities to the Attention Inbox as Waiting on institute.
- [ ] Allow authorized staff to reschedule or cancel follow-ups.
- [ ] Return an Opportunity early when relevant student activity occurs.
- [ ] Cancel pending follow-ups after same-product conversion.
- [ ] Record complete follow-up history.
- [ ] Add domain, scheduling, UI, and integration tests.

### PR 30 — Objection Tracking

- [ ] Add supported objection categories to Opportunities.
- [ ] Allow authorized staff to record and update the apparent objection.
- [ ] Preserve previous objection history.
- [ ] Show the current objection in the Opportunity workspace.
- [ ] Require obstacle identification before presenting eligible discount actions.
- [ ] Add validation, audit, UI, and domain tests.

### PR 31 — Structured Opportunity Closure

- [ ] Add closure with a required non-purchase outcome reason.
- [ ] Add all supported non-purchase reason options.
- [ ] Require explanatory text when Other is selected.
- [ ] Prevent a generic dismissal without an outcome.
- [ ] Warn staff to schedule follow-up instead when the decision is merely delayed.
- [ ] Remove finalized Opportunities from the active Attention Inbox.
- [ ] Preserve the persistent conversation and other active Opportunities.
- [ ] Add UI, validation, history, and lifecycle tests.

### PR 32 — Invalid Opportunity Handling

- [ ] Add Invalid / Not an opportunity as a distinct final outcome.
- [ ] Require a supported invalidation reason.
- [ ] Preserve invalid outcomes separately from genuine non-conversions.
- [ ] Add invalidation timeline and audit records.
- [ ] Remove invalid Opportunities from the active Attention Inbox.
- [ ] Add reporting fields for Signal-quality evaluation.
- [ ] Add UI, domain, and reporting tests.

### PR 33 — Opportunity Reopening

- [ ] Allow authorized staff to reopen a finalized Opportunity with a required reason.
- [ ] Preserve previous outcome, owner, timestamps, and state history.
- [ ] Assign the reopened Opportunity to the current Conversation Owner.
- [ ] Preserve the historical owner at previous closure or conversion.
- [ ] Prevent duplicate active Opportunities for the same product.
- [ ] Add timeline markers and audit history.
- [ ] Add lifecycle, ownership, validation, and UI tests.

### Discounts and Conversion

### PR 34 — Product Sales Offer Configuration and Issuance

- [ ] Add product-level configuration for enabling Sales Offers.
- [ ] Allow authorized institute administrators to define exact offer options containing discount type, discount value, and validity period.
- [ ] Prevent sales staff from modifying administrator-defined offer terms.
- [ ] Add **Send offer** to the staff conversation when the selected Opportunity product has eligible offers.
- [ ] Allow the salesperson to select only from the administrator-defined offers for that product.
- [ ] Create the underlying student-specific discount using the existing discount infrastructure where appropriate without granting the salesperson general discount-management permission.
- [ ] Restrict each generated offer to the same institute, student, product, and Opportunity.
- [ ] Enforce the configured expiry at the discount and purchase layers.
- [ ] Allow only one active Sales Offer per Opportunity and explicitly handle replacement or cancellation.
- [ ] Record creation, delivery, expiry, cancellation, replacement, and usage history.
- [ ] Do not mark an offer as delivered when its associated student-facing message fails.
- [ ] Enforce V1 discount-stacking restrictions.
- [ ] Add permission, configuration, expiry, replacement, delivery-failure, product-isolation, and integration tests.

### PR 35 — Purchase Conversion Integration

- [ ] Detect successful purchases for products with active Opportunities.
- [ ] Convert only the matching institute–student–product Opportunity.
- [ ] Record purchase reference, purchase value, conversion time, and owner at conversion.
- [ ] Leave unrelated product Opportunities active.
- [ ] Cancel pending follow-ups for the converted Opportunity.
- [ ] Add a conversion timeline marker.
- [ ] Preserve the converted Opportunity as a historical record.
- [ ] Add idempotency, repeated-callback, and integration tests.

### PR 36 — Assisted Revenue Classification

- [ ] Define the Testpress-managed attribution window.
- [ ] Treat a successfully delivered staff response as qualifying intervention only when its recorded product context explicitly associates it with the purchased Opportunity.
- [ ] Require the qualifying staff response to occur before the purchase.
- [ ] Exclude messages associated with another Opportunity.
- [ ] Exclude **No product / General conversation** messages.
- [ ] Exclude internal notes, Opportunity views, ownership actions, and other staff-only activity from intervention qualification.
- [ ] Exclude unsent or failed staff messages.
- [ ] Exclude purchases outside the attribution window.
- [ ] Exclude unrelated product purchases.
- [ ] Freeze the attribution result at purchase time so later message-context corrections cannot retroactively create assisted revenue.
- [ ] Store assisted-revenue qualification and its supporting message, Opportunity, product, and timing evidence.
- [ ] Add multi-product, boundary, timing, context-edit, failed-delivery, and attribution tests.

### PR 37 — Directly Attributed Revenue

- [ ] Detect use of the exact Sales Offer issued through the same Opportunity.
- [ ] Verify that the Sales Offer belongs to the same institute, student, product, and Opportunity.
- [ ] Verify that the offer was valid when the purchase was completed.
- [ ] Exclude generic, institute-wide, unrelated, expired, or externally created discounts.
- [ ] Store directly attributed revenue as a subset of assisted revenue.
- [ ] Preserve the Sales Offer used as attribution evidence.
- [ ] Prevent double counting in totals.
- [ ] Add attribution, expiry, product-isolation, and reporting tests.

### Configuration and Reporting

### PR 38 — Signal Template Settings UI

- [ ] Create an administrator settings page listing Testpress-defined Signal templates.
- [ ] Show each template’s purpose, current status, intent, urgency, and example explanation.
- [ ] Allow only supported enable or disable actions.
- [ ] Prevent editing of detection logic, thresholds, classifications, decay, or deduplication rules.
- [ ] Explain that template rules are centrally maintained by Testpress.
- [ ] Record the actor and timestamp for enablement changes.
- [ ] Add access-control and UI tests.

### PR 39 — Opportunity Outcome Reporting

- [ ] Add reports for converted, non-purchase, and invalid Opportunities.
- [ ] Break down non-purchase outcomes by reason.
- [ ] Keep invalid Opportunities separate from genuine lost Opportunities.
- [ ] Support filtering by product, owner, Signal template, and time period.
- [ ] Show purchase value, assisted revenue, and directly attributed revenue.
- [ ] Use conservative revenue terminology.
- [ ] Add query, permission, export, and reporting tests.

### PR 40 — Signal Template Performance Reporting

- [ ] Show qualifying Signals, Opportunities created, Opportunities updated, and invalidation rate per template.
- [ ] Show first-contact time, reply rate, conversions, assisted revenue, and directly attributed revenue.
- [ ] Distinguish templates with no qualifying activity from templates with poor downstream outcomes.
- [ ] Compare contacted and uncontacted Opportunities.
- [ ] Compare Opportunities handled within and outside relevant response-time bands.
- [ ] Preserve historical template-version attribution.
- [ ] Add reporting and aggregation tests.

### PR 41 — Ownership and Staff Performance Reporting

- [ ] Report Opportunity counts and outcomes by owner.
- [ ] Use ownership snapshots rather than only the current Conversation Owner.
- [ ] Credit conversion initially to the owner at conversion.
- [ ] Show first-contact time, response activity, conversions, and revenue by owner.
- [ ] Preserve finalized records after later ownership transfers.
- [ ] Add permission and reporting tests.

### Permissions, Security, and Audit

### PR 42 — Signals Permissions

- [ ] Add permissions for viewing Signals and Opportunities.
- [ ] Add permissions for owning conversations, replying, collaborating, transferring ownership, managing outcomes, sharing discounts, and viewing reports.
- [ ] Enforce permissions in navigation, views, APIs, and domain services.
- [ ] Add safe access-denied states.
- [ ] Add granted, revoked, unauthorized, and cross-tenant tests.

### PR 43 — Audit Trail and Activity Review

- [ ] Record actor and timestamp for all required administrative and staff actions.
- [ ] Provide an authorized staff view of Opportunity and ownership history.
- [ ] Preserve previous values for lifecycle, awaiting state, objection, follow-up, and outcome changes.
- [ ] Prevent audit records from being edited through normal product actions.
- [ ] Exclude restricted audit information from student interfaces.
- [ ] Add audit integrity and permission tests.

### PR 44 — Tenant Isolation and Security Review

- [ ] Verify tenant scoping for Signals, Opportunities, conversations, messages, discounts, ownership, and reports.
- [ ] Verify student ownership checks on all student conversation operations.
- [ ] Verify that internal notes and timeline markers never reach student endpoints.
- [ ] Test direct-object-reference and parameter-tampering scenarios.
- [ ] Test revoked access and cross-institute deep links.
- [ ] Test reply, ownership-transfer, and collaboration permission bypass attempts.
- [ ] Document identified risks and resolutions.

### Final Integration and Rollout

### PR 45 — End-to-End Signal Workflows

- [ ] Add end-to-end coverage for each initial Signal template.
- [ ] Verify Signal creation, explanation, Opportunity grouping, inbox visibility, and ownership inheritance.
- [ ] Verify stronger Signals update Opportunity priority without changing historical Signals.
- [ ] Verify duplicate-event and concurrent-processing behaviour.
- [ ] Verify disabled templates do not evaluate future activity.

### PR 46 — End-to-End Conversation and Ownership Workflows

- [ ] Verify one persistent conversation across multiple product Opportunities.
- [ ] Verify ownership claim, collaboration, transfer, and historical ownership preservation.
- [ ] Verify permitted and blocked student-facing replies.
- [ ] Verify student and staff polling, unread states, internal notes, and timeline visibility.
- [ ] Verify conversation continuity after Opportunity finalization and ownership transfer.

### PR 47 — End-to-End Outcome and Revenue Workflows

- [ ] Verify follow-up scheduling and Attention Inbox return behaviour.
- [ ] Verify objection capture, structured closure, invalidation, and reopening.
- [ ] Verify same-product conversion and unrelated-product exclusion.
- [ ] Verify assisted and directly attributed revenue classification.
- [ ] Verify ownership credit at conversion.
- [ ] Verify reporting totals do not double count attributed revenue.
- [ ] Verify a staff response linked to Product A does not assist a purchase of Product B.
- [ ] Verify **No product / General conversation** messages do not qualify any purchase as assisted.
- [ ] Verify opening chat from an Opportunity preselects the correct product context.
- [ ] Verify changing message product context before purchase affects the correct Opportunity.
- [ ] Verify changing message product context after purchase does not retroactively change attribution.
- [ ] Verify only administrator-defined Sales Offers can be issued by sales staff.
- [ ] Verify Sales Offer expiry is enforced during purchase.
- [ ] Verify use of the exact Opportunity Sales Offer qualifies the purchase as directly attributed.

### PR 48 — Feature Enablement and Operational Readiness

- [ ] Add institute-level feature enablement for Testpress Signals.
- [ ] Add safe defaults for initial Signal-template enablement.
- [ ] Add operational visibility for failed event processing, Signal evaluation, message delivery, polling, and conversion matching.
- [ ] Add data-reconciliation tools for missing conversation, ownership, Opportunity, and purchase mappings.
- [ ] Add rollout, rollback, monitoring, and support documentation.
- [ ] Prepare a POC verification checklist covering the complete Signal-to-outcome workflow.


## Revised Timeline Predictor

| Task | Estimated Duration (hrs) | Dependencies | Notes |
|------|-------------------------:|--------------|-------|
| Models and migrations | 4                        | Existing domain models understood | Signal templates, events, Signals, Opportunities, conversations, messages, ownership, history, and constraints. |
| Signal detection and Opportunity logic | 5                        | Models       | Initial predefined templates, deduplication, explanations, Opportunity grouping, urgency, and lifecycle services. |
| Conversation and messaging workflow | 4                        | Models       | Persistent conversation, staff/student messaging, internal notes, message polling, and Opportunity associations. |
| Ownership and staff coordination | 3                        | Conversation and Opportunity models | Claiming, transfer of all active Opportunities, collaborators, owner snapshots, and timeline records. |
| Attention Inbox and Opportunity workspace | 4                        | Signal and Opportunity domain logic | Tailwind UI, HTMX filtering/actions, Signal explanations, conversation panel, and active product contexts. |
| Follow-up, objections, and outcomes | 3                        | Opportunity lifecycle | Follow-up scheduling, awaiting states, objections, structured closure, invalidation, and reopening. |
| Conversion, discount, and revenue attribution | 3                        | Purchases and discounts | Same-product conversion, user-specific discounts, assisted revenue, and attributed-revenue subset. |
| Permissions, settings, and basic reporting | 2\.5                     | Main workflows | Template enablement, permission enforcement, basic outcome and revenue summaries. |
| Integration testing and fixes | 3\.5                     | All preceding work | Core end-to-end workflows, tenant isolation checks, regression fixes, and cleanup. |

### Roll-up Summary

| Measure | Estimate |
|---------|---------:|
| Total engineering hours | **32 hours** |
| Delivery time at 8 hours/day | **4 working days** |
| Aggressive target | **3 working days** |
| Safer MVP target | **4 working days** |

### Approximate Delivery Time

A practical sequence would be:

| Day | Scope |
|-----|-------|
| **Day 1** | Models, migrations, Signal registry, activity capture, and Signal generation |
| **Day 2** | Opportunity logic, persistent conversations, messaging, ownership, and transfer |
| **Day 3** | Attention Inbox, Opportunity workspace, follow-ups, objections, and outcomes |
| **Day 4** | Conversion, attribution, settings, basic reporting, integration tests, and fixes |

A three-day completion is possible when:

* Codex understands the existing codebase quickly,
* existing models require no restructuring,
* payment and purchase events are already easy to hook into,
* generated migrations and constraints work cleanly,
* and the UI does not require several visual-review iterations.

Four days is the more credible target because AI-generated code still needs careful review around the difficult invariants:

* one active Opportunity per student and product,
* one persistent conversation per institute and student,
* atomic ownership transfer across all active Opportunities,
* finalized ownership preservation,
* Signal immutability and deduplication,
* student/staff privacy boundaries,
* and conservative revenue attribution.

The earlier **5½-week estimate should not be used** for this Codex-led implementation. A revised estimate of **24–32 hours, or 3–4 working days**, better matches your intended workflow.


\
## Reference Django Model Design

This model design is intended as implementation guidance rather than a mandatory schema. Developers should reuse existing Testpress models for products, purchases, discounts, staff users, and institute users wherever appropriate.

The messaging models are intentionally kept **generic** so the persistent institute–student conversation can later support non-sales features. Signals-specific concepts are layered on top separately.


---

### 1. Generic Messaging Models

`Conversation`

One persistent 1-1 conversation between an institute and a student.

It contains no sales-specific fields such as Opportunity, sales owner, Signal, or product.

```python
class Conversation(models.Model):
    institute = models.ForeignKey(
        Institute,
        related_name="conversations",
        on_delete=models.CASCADE,
    )
    student = models.ForeignKey(
        User,
        related_name="institute_conversations",
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["institute", "student"],
                name="unique_institute_student_conversation",
            )
        ]
```

This can later be reused by sales assistance, support, onboarding, or other institute–student messaging features.


---

`ConversationMessage`

Stores actual participant-visible messages.

Internal sales notes and Opportunity timeline events should **not** be stored as normal conversation messages because they must never be exposed to students.

```python
class ConversationMessage(models.Model):
    class SenderType(models.TextChoices):
        STUDENT = "student", "Student"
        STAFF = "staff", "Staff"
        SYSTEM = "system", "System"

    conversation = models.ForeignKey(
        Conversation,
        related_name="messages",
        on_delete=models.CASCADE,
    )

    sender_type = models.CharField(
        max_length=20,
        choices=SenderType.choices,
    )

    student_sender = models.ForeignKey(
        User,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    staff_sender = models.ForeignKey(
        StaffUser,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    body = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    delivered_at = models.DateTimeField(null=True, blank=True)
    failed_at = models.DateTimeField(null=True, blank=True)
```

Domain validation should guarantee that the appropriate sender FK is populated for the selected `sender_type`.


---

`ConversationParticipantState`

Stores participant-specific read/unread state without putting it on the conversation itself.

```python
class ConversationParticipantState(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name="participant_states",
        on_delete=models.CASCADE,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    last_read_message = models.ForeignKey(
        ConversationMessage,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    last_read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["conversation", "user"],
                name="unique_conversation_participant_state",
            )
        ]
```

This supports unread counts and future per-participant messaging metadata.


---

`MessagingConfiguration`

Institute-level configuration belonging to the generic messaging system.

```python
class MessagingConfiguration(models.Model):
    institute = models.OneToOneField(
        Institute,
        related_name="messaging_configuration",
        on_delete=models.CASCADE,
    )

    welcome_message = models.TextField(blank=True)
```

Keep Signals-specific settings out of this model.


---

### 2. Sales Conversation Extension

`SalesConversation`

Adds sales-specific state to an existing generic `Conversation`.

```python
class SalesConversation(models.Model):
    conversation = models.OneToOneField(
        Conversation,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    current_owner = models.ForeignKey(
        StaffUser,
        null=True,
        blank=True,
        related_name="owned_sales_conversations",
        on_delete=models.PROTECT,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

This is where the **Conversation Owner / Student Sales Owner** belongs.

Do not put `current_owner` directly on `Conversation`; a future support workflow may have a completely different ownership model.


---

`SalesConversationCollaborator`

Records staff who may assist the owner without becoming responsible for the student relationship.

```python
class SalesConversationCollaborator(models.Model):
    sales_conversation = models.ForeignKey(
        SalesConversation,
        related_name="collaborators",
        on_delete=models.CASCADE,
    )

    staff = models.ForeignKey(
        StaffUser,
        on_delete=models.PROTECT,
    )

    can_reply = models.BooleanField(default=False)

    added_by = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["sales_conversation", "staff"],
                name="unique_sales_conversation_collaborator",
            )
        ]
```


---

`SalesConversationOwnershipTransfer`

Immutable history of explicit ownership transfers.

```python
class SalesConversationOwnershipTransfer(models.Model):
    sales_conversation = models.ForeignKey(
        SalesConversation,
        related_name="ownership_transfers",
        on_delete=models.CASCADE,
    )

    previous_owner = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    new_owner = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    transferred_by = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

The domain service should update `SalesConversation.current_owner` and all active Opportunities in one transaction.


---

### 3. Signal Detection Models

`InstituteSignalTemplateSetting`

Stores whether an institute has enabled a Testpress-defined Signal template.

The Signal definitions themselves should remain application-controlled/versioned definitions rather than institute-editable database configuration.

```python
class InstituteSignalTemplateSetting(models.Model):
    institute = models.ForeignKey(
        Institute,
        related_name="signal_template_settings",
        on_delete=models.CASCADE,
    )

    template_key = models.CharField(max_length=100)
    enabled = models.BooleanField(default=True)

    updated_by = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["institute", "template_key"],
                name="unique_institute_signal_template_setting",
            )
        ]
```


---

`StudentActivityEvent`

Immutable raw activity used to evaluate Signal rules.

```python
class StudentActivityEvent(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    event_type = models.CharField(max_length=100)
    occurred_at = models.DateTimeField()

    source_reference = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    deduplication_key = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    metadata = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
```

Examples include product view, checkout started, payment failed and pre-purchase enquiry.


---

`Signal`

An immutable meaningful moment produced after activity satisfies a Testpress-defined Signal rule.

```python
class Signal(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    template_key = models.CharField(max_length=100)
    template_version = models.PositiveIntegerField()

    intent = models.CharField(max_length=30)
    urgency_at_creation = models.CharField(max_length=30)

    explanation_data = models.JSONField(default=dict)
    qualifying_data = models.JSONField(default=dict)

    occurred_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    deduplication_key = models.CharField(
        max_length=255,
        unique=True,
    )
```

`template_key + template_version` identifies exactly which centrally maintained rule created the Signal.

The original Signal should never be rewritten when Opportunity urgency changes later.


---

`SignalEvidence`

Links a Signal to the activity events that caused it.

```python
class SignalEvidence(models.Model):
    signal = models.ForeignKey(
        Signal,
        related_name="evidence",
        on_delete=models.CASCADE,
    )

    activity_event = models.ForeignKey(
        StudentActivityEvent,
        related_name="+",
        on_delete=models.PROTECT,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["signal", "activity_event"],
                name="unique_signal_activity_evidence",
            )
        ]
```

This is useful for Signals such as “Viewed product four times in five days,” where multiple events form one Signal.


---

### 4. Opportunity Models

`Opportunity`

Represents one buying cycle for one student and one product.

```python
class Opportunity(models.Model):
    class LifecycleState(models.TextChoices):
        ACTIVE = "active", "Active"
        CONVERTED = "converted", "Converted"
        CLOSED = "closed", "Closed"
        INVALID = "invalid", "Invalid"

    class AwaitingState(models.TextChoices):
        NO_CONVERSATION = "no_conversation", "No conversation yet"
        INSTITUTE = "institute", "Awaiting your response"
        STUDENT = "student", "Awaiting student response"
        FOLLOW_UP = "follow_up", "Follow-up scheduled"

    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)

    sales_conversation = models.ForeignKey(
        SalesConversation,
        related_name="opportunities",
        on_delete=models.PROTECT,
    )

    lifecycle_state = models.CharField(
        max_length=20,
        choices=LifecycleState.choices,
        default=LifecycleState.ACTIVE,
    )

    awaiting_state = models.CharField(
        max_length=30,
        choices=AwaitingState.choices,
        default=AwaitingState.NO_CONVERSATION,
    )

    current_owner = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="sales_opportunities",
        on_delete=models.PROTECT,
    )

    owner_at_creation = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    owner_at_first_contact = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    current_intent = models.CharField(max_length=30)
    current_urgency = models.CharField(max_length=30)

    primary_signal = models.ForeignKey(
        Signal,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    first_contact_at = models.DateTimeField(null=True, blank=True)
    latest_activity_at = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

A database constraint should enforce **one active Opportunity per institute + student + product**, while allowing historical Opportunities for later buying cycles.

`current_owner` intentionally exists even though `SalesConversation` also has an owner because finalized Opportunities must retain their historical ownership.


---

`OpportunitySignal`

Explicitly connects all contributing Signals to the Opportunity.

```python
class OpportunitySignal(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="opportunity_signals",
        on_delete=models.CASCADE,
    )

    signal = models.OneToOneField(
        Signal,
        related_name="opportunity_link",
        on_delete=models.PROTECT,
    )

    attached_at = models.DateTimeField(auto_now_add=True)
```

The Opportunity can change its `primary_signal`, while every earlier Signal remains preserved.


---

### 5. Message Product Context

`OpportunityMessageContext`

Connects conversation messages to Opportunities without polluting the generic messaging model.

```python
class OpportunityMessageContext(models.Model):
    message = models.ForeignKey(
        ConversationMessage,
        related_name="opportunity_contexts",
        on_delete=models.CASCADE,
    )

    opportunity = models.ForeignKey(
        Opportunity,
        related_name="message_contexts",
        on_delete=models.PROTECT,
    )

    assigned_by = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    assigned_at = models.DateTimeField(auto_now_add=True)

    removed_at = models.DateTimeField(null=True, blank=True)
    removed_by = models.ForeignKey(
        StaffUser,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )
```

A currently valid relationship is one where:

```python
removed_at IS NULL
```

Changing a message from Product A to Product B should:


1. close the Product A context by setting `removed_at`;
2. create a new Product B context row.

It should **not overwrite the original relationship**.

This gives an audit trail automatically.

A **No product / General conversation** message simply has no active `OpportunityMessageContext`.

Although V1's selector chooses one Opportunity, this structure can support multiple Opportunity associations later without changing the generic message model.

Attribution must evaluate the context that existed **at purchase time**, not whatever the current context happens to be later.


---

### 6. Internal Sales Notes and Timeline

`SalesConversationNote`

Private staff collaboration notes.

```python
class SalesConversationNote(models.Model):
    sales_conversation = models.ForeignKey(
        SalesConversation,
        related_name="internal_notes",
        on_delete=models.CASCADE,
    )

    opportunity = models.ForeignKey(
        Opportunity,
        null=True,
        blank=True,
        related_name="internal_notes",
        on_delete=models.PROTECT,
    )

    author = models.ForeignKey(
        StaffUser,
        on_delete=models.PROTECT,
    )

    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
```

Keeping this separate from `ConversationMessage` significantly reduces the chance of accidentally exposing an internal note through student-facing message APIs.


---

`OpportunityActivity`

Immutable audit/timeline record of important Opportunity changes.

```python
class OpportunityActivity(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="activities",
        on_delete=models.CASCADE,
    )

    activity_type = models.CharField(max_length=50)

    actor = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    metadata = models.JSONField(default=dict)

    created_at = models.DateTimeField(auto_now_add=True)
```

Examples:

* opportunity created;
* ownership claimed;
* ownership transferred;
* follow-up scheduled;
* objection changed;
* message product context corrected;
* Opportunity closed;
* reopened;
* invalidated;
* converted.

Use structured columns on the domain models for current state; use this model for immutable history, not as the only source of current state.


---

### 7. Follow-Up and Objection Models

`OpportunityFollowUp`

Stores scheduled follow-ups and their history.

```python
class OpportunityFollowUp(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="follow_ups",
        on_delete=models.CASCADE,
    )

    scheduled_for = models.DateTimeField()
    reason = models.TextField()

    created_by = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    cancelled_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
```

Rescheduling should preserve the previous history instead of silently changing the original record.


---

`OpportunityObjection`

Stores objection history rather than only the latest value.

```python
class OpportunityObjection(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="objections",
        on_delete=models.CASCADE,
    )

    category = models.CharField(max_length=50)
    note = models.TextField(blank=True)

    recorded_by = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    created_at = models.DateTimeField(auto_now_add=True)
```

The latest record represents the current apparent obstacle while previous records remain available historically.


---

### 8. Opportunity Outcome and Conversion

`OpportunityOutcome`

Stores structured finalization of non-converted Opportunities.

```python
class OpportunityOutcome(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="outcomes",
        on_delete=models.CASCADE,
    )

    outcome_type = models.CharField(max_length=30)
    reason = models.CharField(max_length=100)
    explanation = models.TextField(blank=True)

    recorded_by = models.ForeignKey(
        StaffUser,
        related_name="+",
        on_delete=models.PROTECT,
    )

    created_at = models.DateTimeField(auto_now_add=True)
```

This supports Closed, Invalid, reopening, and retention of earlier outcomes.

Do not overwrite an old outcome when an Opportunity is reopened.


---

`OpportunityConversion`

Immutable snapshot of what was known when the student purchased.

```python
class OpportunityConversion(models.Model):
    opportunity = models.OneToOneField(
        Opportunity,
        related_name="conversion",
        on_delete=models.PROTECT,
    )

    purchase = models.OneToOneField(
        Purchase,
        related_name="signals_conversion",
        on_delete=models.PROTECT,
    )

    purchase_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    converted_at = models.DateTimeField()

    owner_at_conversion = models.ForeignKey(
        StaffUser,
        null=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    assisted = models.BooleanField(default=False)

    assisting_message = models.ForeignKey(
        ConversationMessage,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    directly_attributed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
```

This model is important because attribution must be **frozen at purchase time**.

Later editing of message product context must not rewrite this conversion snapshot.


---

### 9. Product Sales Offer Configuration

`ProductSalesOfferConfiguration`

Enables Sales Offers for one institute product.

```python
class ProductSalesOfferConfiguration(models.Model):
    institute = models.ForeignKey(
        Institute,
        related_name="sales_offer_configurations",
        on_delete=models.CASCADE,
    )

    product = models.ForeignKey(
        Product,
        related_name="sales_offer_configurations",
        on_delete=models.CASCADE,
    )

    enabled = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["institute", "product"],
                name="unique_product_sales_offer_configuration",
            )
        ]
```

This does **not** grant general discount-management permission.


---

`ProductSalesOfferOption`

One administrator-approved offer a salesperson may choose.

```python
class ProductSalesOfferOption(models.Model):
    class DiscountType(models.TextChoices):
        PERCENTAGE = "percentage", "Percentage"
        FIXED = "fixed", "Fixed amount"

    configuration = models.ForeignKey(
        ProductSalesOfferConfiguration,
        related_name="options",
        on_delete=models.CASCADE,
    )

    discount_type = models.CharField(
        max_length=20,
        choices=DiscountType.choices,
    )

    discount_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    validity_duration = models.DurationField()

    active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
```

Examples:

* 3% / 24 hours;
* 5% / 4 hours;
* ₹500 / 2 hours.

Sales staff choose an option; they do not enter their own discount value or expiry.


---

### 10. Issued Sales Offers

`OpportunitySalesOffer`

Represents an actual offer issued by a salesperson to one student for one Opportunity.

```python
class OpportunitySalesOffer(models.Model):
    opportunity = models.ForeignKey(
        Opportunity,
        related_name="sales_offers",
        on_delete=models.PROTECT,
    )

    option = models.ForeignKey(
        ProductSalesOfferOption,
        related_name="+",
        on_delete=models.PROTECT,
    )

    issued_by = models.ForeignKey(
        StaffUser,
        related_name="issued_sales_offers",
        on_delete=models.PROTECT,
    )

    # Snapshot the terms so later admin edits do not rewrite history.
    discount_type = models.CharField(max_length=20)
    discount_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    issued_at = models.DateTimeField()
    expires_at = models.DateTimeField()

    discount = models.ForeignKey(
        UserSpecificDiscount,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    delivery_message = models.ForeignKey(
        ConversationMessage,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    delivered_at = models.DateTimeField(null=True, blank=True)

    cancelled_at = models.DateTimeField(null=True, blank=True)

    used_purchase = models.ForeignKey(
        Purchase,
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.PROTECT,
    )

    created_at = models.DateTimeField(auto_now_add=True)
```

The system should enforce only one active Sales Offer per Opportunity at a time.

The option's terms are copied onto the issued record so changing the administrator configuration later cannot rewrite a historical offer.

If `used_purchase` is the same-product conversion purchase, this provides strong evidence for **directly attributed revenue**.


---

### Relationship Summary

The important relationships are:

```text
Institute + Student
        │
        ▼
Conversation                         ← generic messaging
        │
        ├── ConversationMessage
        └── ConversationParticipantState
        │
        ▼
SalesConversation                    ← Signals-specific extension
        │
        ├── current owner
        ├── collaborators
        ├── ownership transfers
        │
        └── Opportunity ───────── Product
                │
                ├── OpportunitySignal ── Signal ── SignalEvidence
                │                               │
                │                               └── StudentActivityEvent
                │
                ├── OpportunityMessageContext ── ConversationMessage
                │
                ├── OpportunityFollowUp
                ├── OpportunityObjection
                ├── OpportunityOutcome
                ├── OpportunityActivity
                ├── OpportunitySalesOffer
                │
                └── OpportunityConversion ── Purchase
```

### Important Design Rules


 1. **Keep** `**Conversation**` **generic.** Do not add product, Opportunity, sales owner, Signal or sales lifecycle fields to it.
 2. **Keep normal student-visible messages generic.** Sales-specific product context should be represented through `OpportunityMessageContext`.
 3. **Keep internal notes separate from messages.** This creates a stronger privacy boundary and reduces accidental student exposure.
 4. **Signals remain immutable.** Opportunity fields such as urgency and primary reason may change without rewriting contributing Signals.
 5. **Opportunity is the buying-cycle record.** A later buying cycle for the same student/product gets a new Opportunity rather than reopening historical data indefinitely.
 6. **SalesConversation owns the current student relationship.** Active Opportunities inherit this owner; finalized Opportunities preserve historical ownership.
 7. **Do not overwrite message product context.** Close the previous `OpportunityMessageContext` and append another so attribution can reconstruct what was true at purchase time.
 8. **Freeze conversion attribution.** `OpportunityConversion` stores the assisted/directly-attributed result and its evidence when the purchase happens.
 9. **Snapshot Sales Offer terms when issued.** Later administrator configuration changes must not alter historical offers.
10. **Use domain services and transactions for invariants.** Model `save()` methods should not silently perform Opportunity conversion, ownership transfer, Signal creation, attribution, or Sales Offer issuance.


\
## Reference Domain Workflow Pseudocode

The following pseudocode documents the expected **business rules, ordering, and invariants** for the most important Testpress Signals workflows.

It is not intended to prescribe exact Python class names, service names, or ORM syntax. Developers should adapt the implementation to existing Testpress conventions while preserving the behavior described here.

Domain workflows involving concurrency or multiple related records should run inside appropriate database transactions and use locking where necessary.


---

### 1. Evaluate Activity and Create a Signal

```text
on_student_activity(activity):

    validate:
        activity belongs to an institute
        activity belongs to an authenticated student
        activity maps to an eligible product
        activity is not a known duplicate/test/internal event

    persist immutable StudentActivityEvent

    enabled_templates =
        get enabled Signal templates
        for activity.institute
        relevant to activity.event_type

    for each template:

        qualifying_events =
            load required activity history
            for same institute + student + product

        if template conditions are not satisfied:
            continue

        deduplication_key =
            template.build_deduplication_key(qualifying_events)

        if Signal already exists with deduplication_key:
            continue

        create immutable Signal with:
            institute
            student
            product
            template key
            template version
            intent at creation
            urgency at creation
            qualifying details
            explanation inputs
            occurrence time
            deduplication key

        attach all qualifying StudentActivityEvents as SignalEvidence

        pass Signal to Opportunity creation/update workflow
```

Important rules:

* Raw activity does not automatically become a Signal.
* Signal definitions are Testpress-controlled.
* Historical Signal evidence must not be rewritten later.
* Duplicate delivery of the same qualifying activity must not create duplicate Signals.


---

### 2. Create or Update an Opportunity From a Signal

```text
attach_signal_to_opportunity(signal):

    begin transaction

    active_opportunity =
        find and lock active Opportunity for:
            signal.institute
            signal.student
            signal.product

    if active_opportunity does not exist:

        conversation =
            get or create generic Conversation
            for institute + student

        sales_conversation =
            get or create SalesConversation
            for conversation

        opportunity =
            create Opportunity with:
                institute = signal.institute
                student = signal.student
                product = signal.product
                sales_conversation = sales_conversation
                current_owner = sales_conversation.current_owner
                owner_at_creation = sales_conversation.current_owner
                lifecycle_state = ACTIVE
                primary_signal = signal
                current_intent = signal.intent
                current_urgency = signal.urgency
                latest_activity_at = signal.occurred_at

        append Opportunity creation activity

    else:

        opportunity = active_opportunity

    attach Signal to opportunity if not already attached

    recalculate:
        current intent
        current urgency
        primary Signal
        primary reason
        inbox label
        latest relevant activity

    save Opportunity current summary

    commit transaction
```

Important rules:

* Only one active Opportunity may exist for the same institute + student + product.
* Later buying cycles may create new historical Opportunities only after the previous one is finalized.
* New Opportunities inherit the current Sales Conversation Owner.
* Adding a stronger Signal may change the Opportunity's current summary but must not modify earlier Signals.


---

### 3. Claim Sales Conversation Ownership

```text
claim_sales_conversation(sales_conversation, staff):

    begin transaction

    lock sales_conversation

    validate:
        staff has permission to own sales conversations
        sales_conversation.current_owner is empty

    if already owned:
        reject claim and return current owner

    sales_conversation.current_owner = staff
    save sales_conversation

    active_opportunities =
        lock all active Opportunities
        belonging to sales_conversation

    for each opportunity:
        opportunity.current_owner = staff

        if opportunity.owner_at_creation is empty:
            do not overwrite it unless this claim occurred
            as part of the original Opportunity creation flow

        save opportunity

    append ownership history / timeline activity

    commit transaction
```

Important rules:

* Viewing a conversation must never claim it.
* Concurrent claims must result in exactly one successful owner.
* Ownership applies to all active Opportunities for the student.
* Finalized Opportunities must not be changed.


---

### 4. Transfer Sales Conversation Ownership

```text
transfer_sales_conversation(
    sales_conversation,
    new_owner,
    transferred_by,
    reason
):

    begin transaction

    lock sales_conversation

    validate:
        transferred_by can transfer ownership
        new_owner can own sales conversations
        new_owner belongs to same institute
        reason is present

    previous_owner = sales_conversation.current_owner

    sales_conversation.current_owner = new_owner
    save sales_conversation

    active_opportunities =
        lock all active Opportunities
        belonging to sales_conversation

    for each active opportunity:
        opportunity.current_owner = new_owner
        save opportunity

    create immutable ownership transfer record:
        previous_owner
        new_owner
        transferred_by
        reason
        timestamp

    append staff-only timeline activity

    commit transaction
```

Important rules:

* Transfer all active Opportunities atomically.
* Never rewrite `owner_at_creation`, `owner_at_first_contact`, or historical owners.
* Converted, closed, invalid, and other finalized Opportunities remain unchanged.


---

### 5. Send a Staff Message With Product Context

```text
send_staff_message(
    sales_conversation,
    staff,
    body,
    selected_opportunity = null
):

    validate:
        staff may reply in this sales conversation
        body is valid

    if selected_opportunity is not null:
        validate:
            opportunity is active
            opportunity belongs to same sales conversation
            opportunity belongs to same institute and student

    create ConversationMessage:
        sender = staff
        body = body
        delivery state = pending

    attempt message delivery

    if delivery fails:
        mark message failed
        do not record successful Opportunity contact
        do not update awaiting state
        return failure

    mark message delivered

    if selected_opportunity is null:
        # No product / General conversation
        return success

    create active OpportunityMessageContext:
        message
        selected_opportunity
        assigned_by = staff
        assigned_at = now

    if selected_opportunity.first_contact_at is empty:
        selected_opportunity.first_contact_at = delivered_at
        selected_opportunity.owner_at_first_contact =
            selected_opportunity.current_owner

    if this response expects a student reply:
        selected_opportunity.awaiting_state =
            AWAITING_STUDENT_RESPONSE

    save selected_opportunity

    return success
```

Important rules:

* Opportunity association comes from the explicit product-context selector.
* Do not inspect the message text to guess the product.
* A General conversation message has no Opportunity context and does not count toward assisted attribution.
* Failed messages do not count as contact.


---

### 6. Correct the Product Context of a Staff Message

```text
change_message_product_context(
    message,
    new_opportunity,
    staff
):

    validate:
        staff may edit product context
        message is a staff message
        new_opportunity, if present:
            is active
            belongs to same sales conversation
            belongs to same institute/student

    current_context =
        active OpportunityMessageContext for message

    if current_context already equals new_opportunity:
        return without changes

    if current_context exists:
        set:
            removed_at = now
            removed_by = staff
        save current_context

    if new_opportunity exists:
        create new OpportunityMessageContext:
            message
            new_opportunity
            assigned_by = staff
            assigned_at = now

    append context-change audit activity

    do not rewrite any existing OpportunityConversion attribution snapshot
```

Important rules:

* Never overwrite the historical association.
* `No product / General conversation` is represented by no active Opportunity context.
* A correction after purchase may correct historical conversation context but must not manufacture assisted revenue retrospectively.


---

### 7. Receive a Student Message

```text
receive_student_message(conversation, student, body):

    validate:
        conversation belongs to student
        conversation belongs to student's institute context

    create delivered ConversationMessage from student

    active_opportunities =
        get active Opportunities for conversation

    if message is explicitly associated with an Opportunity
       through a known product-specific entry point:

        associate message with that Opportunity for context

        opportunity.awaiting_state = AWAITING_INSTITUTE_RESPONSE
        save opportunity

    else:
        leave message unassigned

        do not automatically update every active Opportunity

    persist message normally
```

Important rules:

* Student messages do not require product classification.
* Do not guess an Opportunity based on message text.
* An authorized staff member may associate an unassigned student message later for context.
* Associating a student message does not itself count as staff intervention.


---

### 8. Schedule or Reschedule a Follow-Up

```text
schedule_follow_up(opportunity, staff, scheduled_for, reason):

    validate:
        opportunity is active
        staff may manage opportunity
        scheduled_for is in future
        reason is present

    if an active follow-up exists:
        close/cancel previous follow-up record
        preserving its history

    create OpportunityFollowUp:
        opportunity
        scheduled_for
        reason
        created_by = staff

    opportunity.awaiting_state = FOLLOW_UP_SCHEDULED
    save opportunity

    append follow-up activity
```

When the follow-up becomes due:

```text
process_due_follow_up(follow_up):

    if follow_up is cancelled or completed:
        return

    if opportunity is no longer active:
        return

    mark follow_up completed/due as appropriate

    opportunity.awaiting_state = AWAITING_INSTITUTE_RESPONSE
    save opportunity

    return opportunity to Attention Inbox
```

If a same-product purchase occurs before the follow-up, the pending follow-up must be cancelled.


---

### 9. Record an Opportunity Objection

```text
record_objection(opportunity, staff, category, note):

    validate:
        opportunity is active
        staff may manage opportunity
        category is supported

    create new OpportunityObjection:
        opportunity
        category
        note
        recorded_by = staff
        created_at = now

    do not overwrite earlier objection records

    append objection-change activity
```

The newest objection represents the current apparent purchase obstacle.


---

### 10. Close an Opportunity Without Purchase

```text
close_opportunity(opportunity, staff, reason, explanation):

    begin transaction

    lock opportunity

    validate:
        opportunity is active
        staff may finalize opportunity
        reason is a supported non-purchase reason
        explanation exists when reason == OTHER

    if decision is merely delayed and follow-up is appropriate:
        reject closure and direct workflow toward follow-up

    create immutable OpportunityOutcome

    opportunity.lifecycle_state = CLOSED
    opportunity.awaiting_state = null/final
    preserve current owner as owner at closure
    save opportunity

    cancel pending follow-ups

    append closure activity

    commit transaction
```


---

### 11. Mark an Opportunity Invalid

```text
invalidate_opportunity(opportunity, staff, reason):

    begin transaction

    lock opportunity

    validate:
        opportunity is active
        reason is a supported invalidation reason
        staff may finalize opportunity

    create immutable OpportunityOutcome:
        outcome_type = INVALID
        reason = reason

    opportunity.lifecycle_state = INVALID
    preserve historical ownership
    save opportunity

    cancel pending follow-ups

    append invalidation activity

    commit transaction
```

Invalid Opportunities must remain separate from genuine non-conversions in reporting.


---

### 12. Reopen an Opportunity

```text
reopen_opportunity(opportunity, staff, reason):

    begin transaction

    lock opportunity

    validate:
        opportunity is finalized
        staff may reopen
        reason is present

    existing_active =
        find active Opportunity
        for same institute + student + product

    if existing_active exists and existing_active != opportunity:
        reject reopening to preserve one-active-opportunity invariant

    preserve previous outcome and historical ownership records

    opportunity.lifecycle_state = ACTIVE
    opportunity.current_owner =
        opportunity.sales_conversation.current_owner

    recalculate current awaiting state as appropriate

    save opportunity

    append reopening activity with reason

    commit transaction
```


---

### 13. Configure Product Sales Offers

```text
configure_sales_offer_options(
    institute,
    product,
    admin,
    options
):

    validate:
        admin may manage product Sales Offer configuration
        product belongs to institute
        every option has:
            supported discount type
            valid positive discount value
            valid positive duration

    save ProductSalesOfferConfiguration

    add/update/deactivate ProductSalesOfferOption records

    do not modify already-issued OpportunitySalesOffer snapshots
```

Important rule:

Changing an offer option later affects future offers only.


---

### 14. Issue a Sales Offer From an Opportunity

```text
issue_sales_offer(
    opportunity,
    staff,
    offer_option
):

    begin transaction

    lock opportunity

    validate:
        opportunity is active
        staff may reply/manage opportunity
        offer_option is active
        offer_option belongs to configuration
            for opportunity.product
        Sales Offers are enabled for product

    active_offer =
        find active unexpired OpportunitySalesOffer
        for opportunity

    if active_offer exists:
        explicitly cancel/replace active_offer

    snapshot:
        discount_type = offer_option.discount_type
        discount_value = offer_option.discount_value
        expires_at = now + offer_option.validity_duration

    create underlying student-specific discount:
        institute = opportunity.institute
        student = opportunity.student
        product = opportunity.product
        expiry = expires_at
        terms from snapshot

    create OpportunitySalesOffer with:
        opportunity
        offer option reference
        snapshotted terms
        issued_by
        issued_at
        expires_at
        underlying discount

    send student-facing offer message
        with product context = opportunity

    if message delivery succeeds:
        sales_offer.delivery_message = message
        sales_offer.delivered_at = message.delivered_at
        save sales_offer

    else:
        do not mark offer delivered

    commit transaction
```

Important rules:

* Sales staff may choose only administrator-defined options.
* They cannot enter arbitrary discount values or validity.
* Offer is always tied to the same student + product + Opportunity.
* Expiry must be enforced by the discount/purchase system, not just message text.
* Only one active offer should normally exist for an Opportunity.


---

### 15. Process Successful Purchase and Convert Opportunity

```text
on_successful_purchase(purchase):

    begin transaction

    active_opportunity =
        find and lock active Opportunity for:
            purchase.institute
            purchase.student
            purchase.product

    if active_opportunity does not exist:
        commit
        return

    opportunity = active_opportunity

    opportunity.lifecycle_state = CONVERTED

    owner_at_conversion = opportunity.current_owner

    qualifying_message =
        find successfully delivered STAFF ConversationMessage where:
            an OpportunityMessageContext linked it
                to this exact opportunity
            that context was active at the time of purchase
            message was delivered before purchase
            delivery occurred within attribution window

    assisted = qualifying_message exists

    used_sales_offer =
        find OpportunitySalesOffer where:
            offer belongs to this exact opportunity
            offer belongs to same product/student
            offer was actually used by this purchase
            offer was valid at purchase time

    directly_attributed =
        assisted AND used_sales_offer exists

    create immutable OpportunityConversion snapshot:
        opportunity
        purchase
        purchase value
        converted_at
        owner_at_conversion
        assisted
        qualifying assisting message, if any
        directly_attributed
        supporting Sales Offer, if any

    cancel all pending follow-ups

    save opportunity

    append conversion timeline activity

    commit transaction
```

Important rules:

* **The same-product purchase converts the Opportunity whether or not staff helped.**
* Staff intervention determines assisted attribution, not conversion itself.
* A Product A staff response must never assist a Product B purchase.
* A General conversation message does not count.
* Direct attribution requires the exact Opportunity Sales Offer to be used.
* Attribution is snapshotted when the purchase is processed and must not be recalculated merely because message context is edited later.


---

### 16. Determine Assisted Revenue

Conceptually:

```text
is_assisted(opportunity, purchase):

    return exists successfully delivered staff message where:

        message was delivered before purchase

        AND message was explicitly associated
            with opportunity at purchase time

        AND purchase.product == opportunity.product

        AND purchase occurred within attribution window
```

The following must not count:

```text
message linked to another product Opportunity
General / No product message
failed message
unsent message
internal note
Opportunity view
ownership claim
ownership transfer
follow-up creation alone
student message
post-purchase context edit
```


---

### 17. Determine Directly Attributed Revenue

Conceptually:

```text
is_directly_attributed(opportunity, purchase):

    if opportunity conversion is not assisted:
        return false

    return exists OpportunitySalesOffer where:

        sales_offer.opportunity == opportunity

        AND sales_offer was actually used by purchase

        AND sales_offer product == purchase.product

        AND sales_offer student == purchase.student

        AND sales_offer was valid at purchase time
```

Directly attributed revenue is always a subset of assisted revenue.


---

### 18. Attention Inbox Eligibility

```text
should_show_in_attention_inbox(opportunity):

    if opportunity.lifecycle_state != ACTIVE:
        return false

    if opportunity.awaiting_state == FOLLOW_UP_SCHEDULED
       and follow-up is not yet due:
        return false

    return true
```

Priority ordering should favor:

```text
1. Opportunities awaiting institute response
2. Higher current urgency
3. More recent relevant activity
```

The exact ordering implementation may follow existing query/service conventions.


---

### 19. Core Transactional Invariants

The implementation must protect the following operations against concurrency:

```text
Signal deduplication
one active Opportunity per institute + student + product
conversation ownership claim
conversation ownership transfer
Opportunity reopening
Sales Offer replacement
purchase conversion
conversion attribution snapshot creation
```

Where appropriate, use:

```text
database uniqueness constraints
transaction.atomic()
select_for_update()
idempotency / deduplication keys
```

Do not rely only on application-level `exists()` checks for invariants that can race.


## Coding Agent Prompt

You are a senior Django engineer implementing **Testpress Signals V1** as specified in:

`docs/testpress_signals_prd.md`

The PRD is the source of truth for this implementation.

Read the **entire PRD before writing any code**, including:

* product requirements and use cases;
* Functional Requirements;
* Staff Response Product Context and Opportunity Attribution;
* Sales Offers;
* V1 Signal Templates;
* Reference Django Model Design;
* Reference Domain Workflow Pseudocode;
* Tasks and PR breakdown;
* scope exclusions and future considerations.

Do not implement the feature from the Tasks section alone.


---

### 1. Interpret the PRD correctly

Use the PRD sections with the following priority:


1. explicit V1 scope and Functional Requirements;
2. specific domain sections describing a workflow;
3. Reference Domain Workflow Pseudocode;
4. Reference Django Model Design;
5. Tasks / PR checklist.

If task wording conflicts with a more specific product requirement, follow the product requirement.

Do not silently resolve a material contradiction. Record the conflict and the implementation decision.

Minor implementation details not specified by the PRD may be resolved using existing Testpress conventions.

Do not invent new product behavior.


---

### 2. Inspect the existing codebase first

Before implementation:


1. inspect the relevant Django apps and architecture;
2. identify existing models and services for institutes, students, staff, products, purchases/orders, payments, discounts, permissions and audit history;
3. identify existing frontend patterns, Tailwind components, HTMX conventions, forms and class-based views;
4. identify existing testing factories, fixtures and helpers;
5. identify existing purchase/payment events that can be reused for Signal activity capture and conversion detection;
6. identify any existing abstractions that should be extended rather than duplicated.

Prefer reuse of mature existing functionality where it satisfies the PRD.

Do not create duplicate Product, Purchase, Staff, discount or equivalent domain concepts merely to match the reference model names.


---

### 3. Treat the model design as architectural guidance

Study the **Reference Django Model Design** before creating migrations.

The exact classes and fields may be adapted to the existing codebase, but preserve the important domain boundaries and historical-data strategy described there.

In particular:

* keep reusable institute–student messaging independent from Signals-specific sales behavior;
* do not move sales ownership, Opportunity lifecycle, Signal data, product context or attribution into the generic messaging layer merely for convenience;
* preserve append-only or historical records where the PRD requires auditability;
* preserve immutable evidence and purchase-time attribution snapshots.

If the existing architecture requires materially different model relationships, document the reason before proceeding.


---

### 4. Follow the workflow pseudocode

Treat the **Reference Domain Workflow Pseudocode** as the behavioral reference for ordering and invariants.

You may choose different service/function/class names, but the resulting behavior must remain equivalent.

Pay particular attention to workflows involving:

* Signal creation and deduplication;
* active Opportunity creation;
* ownership claim and transfer;
* staff-message product context;
* context corrections;
* follow-up scheduling;
* Opportunity closure/reopening;
* Sales Offer issuance;
* purchase conversion;
* assisted and directly attributed revenue.

Do not replace deterministic rules with heuristics or message-text inference.


---

### 5. Implementation structure

Implement the feature in independently reviewable phases.

Before coding, produce a concise implementation plan mapping the PRD's task groups to the actual existing modules you intend to modify.

A reasonable sequence is:


 1. data models, constraints and migrations;
 2. Signal template definitions and activity capture;
 3. Signal evaluation and Opportunity domain logic;
 4. generic conversations and messaging;
 5. sales-conversation ownership and collaboration;
 6. staff and student conversation interfaces;
 7. Attention Inbox and Opportunity workspace;
 8. follow-ups, objections and outcomes;
 9. Sales Offers;
10. purchase conversion and revenue attribution;
11. reporting, settings, permissions and audit behavior;
12. integration and end-to-end verification.

Adapt the grouping when the existing codebase makes another split cleaner.

Each phase must:

* be independently reviewable;
* include tests;
* leave the application working;
* end in a separate Git commit.

Do not squash the phase commits.


---

### 6. Initial models commit

The first implementation commit containing the new domain foundation should contain only:

* models;
* constraints and indexes;
* migrations;
* model-level validation where appropriate;
* admin registration where useful;
* model tests.

Do not include Signal detection, Opportunity transitions, messaging workflows, ownership transfer, Sales Offer issuance or attribution logic in the initial models commit.

Keep behavioral logic in explicit domain services.


---

### 7. Domain-service rules

Views, templates and model `save()` methods must not contain the core business workflows.

Use focused domain services for operations described in the PRD and pseudocode.

Use explicit transactions and database locking for workflows where concurrency can violate an invariant.

Prefer database constraints for invariants that the database can reliably enforce.

Do not use Django signals for core business workflows when an explicit service call provides clearer ordering and error handling.

Domain services must enforce tenant scope and permission assumptions even when UI controls already restrict access.


---

### 8. Messaging architecture

Use the reusable conversation architecture described in the PRD.

Do not build the generic conversation system specifically around Testpress Signals.

Student-visible messages, staff-only notes, Opportunity context and sales timeline/audit information must retain the privacy boundaries described in the PRD.

Product/Opportunity context must remain structured data.

Do not infer Opportunity association by parsing message content.

Do not expose staff-only metadata through student serializers, views, templates, HTMX responses or polling endpoints.


---

### 9. Django and frontend implementation

Follow established Testpress patterns first.

Prefer:

* class-based views where they produce simpler maintainable code;
* Django forms for submitted input;
* thin views;
* focused selectors/query services;
* reusable template partials;
* Tailwind CSS already present in the project;
* HTMX for local workflow updates where specified by the PRD.

Do not introduce another frontend framework.

Do not introduce WebSockets for V1.

Conversation polling must be incremental and must not reload the complete conversation on every poll.

Provide non-HTMX behavior where reasonably practical.


---

### 10. Permissions and tenant isolation

Treat permissions and institute isolation as domain requirements, not presentation concerns.

Enforce access in:

* selectors;
* views;
* forms;
* HTMX endpoints;
* domain services;
* reporting queries.

Never depend only on hiding UI controls.

Test cross-institute IDs, deep links and manipulated request parameters.

Student-facing endpoints must verify ownership of the requested conversation.


---

### 11. Signal templates

Implement only the V1 templates defined in the **Recommended Testpress Signal Templates for V1** section.

Do not add additional behavioral Signals.

The template definitions must remain Testpress-controlled and versioned as described in the PRD.

Institute configuration should expose only the controls permitted by the PRD.

Keep intent and urgency separate.

Do not replace explainable Signal reasons with a generic lead score.


---

### 12. Sales Offers

Implement Sales Offers according to the dedicated PRD section and model/workflow references.

Reuse the existing user-specific discount infrastructure internally where suitable, but do not broaden salesperson discount permissions.

Preserve the distinction between:

* administrator-defined offer options;
* an offer issued to a specific Opportunity;
* successful communication of the offer;
* offer usage during purchase;
* direct revenue attribution.

Historical issued-offer terms must not change when configuration changes later.


---

### 13. Conversion and attribution

Treat Opportunity conversion and staff attribution as separate concerns exactly as defined in the PRD.

A matching successful product purchase determines conversion.

Assisted/direct attribution must be evaluated separately using the explicit evidence defined by the PRD and the workflow pseudocode.

Store the attribution evidence needed to explain the result later.

Do not recalculate historical attribution merely because mutable conversation or configuration state later changes.


---

### 14. Tests

Use the project's existing test style, factories and fixtures.

Every implementation phase must include tests for its own behavior.

Prioritize tests around domain invariants and rejected states rather than only happy-path UI coverage.

At minimum, ensure coverage of:

* database constraints;
* tenant isolation;
* permissions;
* Signal qualification and deduplication;
* immutable historical evidence;
* active Opportunity uniqueness and concurrency;
* renewed buying cycles;
* persistent conversation reuse;
* ownership claim races;
* atomic ownership transfer;
* finalized ownership preservation;
* message product context and corrections;
* failed message delivery;
* internal-note privacy;
* follow-up lifecycle;
* objections and structured outcomes;
* reopening;
* Sales Offer restrictions and expiry;
* same-product conversion;
* multi-product attribution boundaries;
* assisted/direct attribution;
* post-purchase context changes;
* student data isolation;
* HTMX validation responses;
* end-to-end workflows for every V1 Signal template.

Also test rejected and invalid transitions.

Use query-count assertions where the existing test suite supports them for important list/detail screens.


---

### 15. Query and performance expectations

Avoid N+1 queries in:

* Attention Inbox;
* conversation workspace;
* Opportunity details;
* message history;
* Signal history;
* ownership history;
* reporting views.

Add appropriate indexes based on actual query patterns.

Paginate large collections.

Do not retrieve full message, Signal or audit histories when the screen needs only a recent subset.


---

### 16. Scope control

Implement only Testpress Signals V1.

Do not introduce speculative functionality for:

* Sales Incentives;
* Campaigns;
* Automations;
* AI recommendations;
* external chat providers;
* WebSockets;
* generic CRM functionality not required by this PRD.

Future-consideration sections exist only to avoid architectural dead ends; they are not implementation requirements.


---

### 17. Git requirements

Create a separate commit after every completed phase.

Before each commit:


1. run the relevant new tests;
2. run affected existing tests;
3. verify migrations where applicable;
4. inspect the diff for unrelated changes.

Use descriptive commit messages.

Do not commit knowingly failing or partially implemented phases.

Do not rewrite or squash the commits unless explicitly instructed.


---

### 18. Completion review

Before finishing the implementation:


 1. run migrations from a clean database state;
 2. run all new tests;
 3. run all relevant existing test suites;
 4. verify the complete Signal → Opportunity → Conversation → Outcome → Purchase workflow;
 5. verify all four V1 Signal templates end-to-end;
 6. verify tenant isolation and student privacy;
 7. verify concurrency-sensitive invariants;
 8. verify each implementation phase exists as a separate Git commit;
 9. compare the completed implementation against the Functional Requirements;
10. produce a concise requirement-to-code mapping by major requirement group;
11. list anything deferred, partially implemented, or unsupported;
12. list any deviation from the Reference Django Model Design and explain why;
13. confirm that out-of-scope future functionality was not introduced.

Do not report the feature complete while known PRD requirements remain silently unimplemented.