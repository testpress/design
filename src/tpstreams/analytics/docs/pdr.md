# Problem Discovery Report

**Customer:** Chinmaya 

**Date of Interview:** August 10, 2026 

**Interviewer(s):** Support Team 

**Feature/Topic Discussed:** Asset-Level Video View Analytics (Monthly/Custom Date Range)

## 🔍 Understand the Context

**1. Product/Feature Context**

**What problem is the client facing?** 

Chinmaya has no self-service way to see how their *entire* video library performed in a given period. 

TPStreams already shows view analytics per video, but only one video at a time, on that video's own detail page. 

With 100+ videos, checking each one individually to build a monthly picture isn't practical. So they depend on the TPStreams team to manually compile and email an Excel report every month.

They previously used Vimeo, which let them see this aggregated, asset-by-asset breakdown directly — so for them, this is a capability regression from their old platform, not a new ask.

**Why do they need this data?** 

Two drivers:

* **Content strategy** — see which topics/videos perform well, which don't, and track performance changes over months, to decide what to make more of.
* **Storage-cost optimization** — spot videos with **consistently low or zero views over a period of several months** so they can be archived or deleted, **using storage size data** to calculate potential cost savings.

**How do they plan to use it?** 

Their intended monthly cycle:

> Get viewer data → identify high performers → plan future content → identify low/no-view assets → archive/delete → reduce storage cost

This repeats every month; it's an ongoing workflow, not a one-time analysis.

**2. Customer Background**

Content creators with a large video library on TPStreams, migrated from Vimeo. They need recurring, library-wide visibility into per-video performance, not just single-video lookups.

**Has this come up before?** 

Yes — recurring, roughly monthly or every alternate month, since migration.

## 📋 Interview Notes

*(Sourced via Support— no direct client meeting notes were available.)*

**1. Current Workflow**

* Client contacts Support asking for total video views for a given month.
* Support opens a ticket, hands it to Engineering.
* A developer manually queries the backend and generates the Excel/CSV.
* Support sends it to the client.
* Self-serve alternative today: open each video's detail page, note the view count, repeat per video — unworkable at their library size.

**2. Underlying Pain Point** 

This isn't just "give me an export button." 

The client is blocked from running their own content and storage-cleanup decisions each month because no self-serve, library-wide view exists in TPStreams — a capability they had on Vimeo.

**3. Impact**

* Client can't run their monthly workflow independently; gated on Support/Engineering turnaround.
* Engineering time lost to repetitive manual queries.
* Risk of errors in manual extraction.
* Scales badly as more large-library clients join.

**4. Expectations / Requirements**

**Must-haves**

* Date range selector (monthly preset + custom range)
* **Library-wide aggregated view** *—* a single page/table showing performance data for **all assets** (each row = one video), rather than an account-level total number only. Currently, TPStreams only shows per-video analytics on individual detail pages, requiring manual navigation to each asset to compile a monthly picture — which is unworkable for libraries with 100+ videos."
* Self-service — no monthly contact with TPStreams needed
* CSV export as the minimum acceptable deliverable, even without a full dashboard
* Columns matching client's sample file: Asset UUID, Title, Total Views (for selected period)

**Nice-to-haves (Value-Add Features):**

* Additional metrics (unique viewers, average watch time, completion rate)

 **For Storage-Cost Optimization:**

* **Asset Storage Size (MB/GB)** displayed in table & export, allowing users to calculate storage savings.
* **"Zero/Low-View Assets" Quick Filter** to instantly isolate assets ready for archiving/deletion without manually sifting through the table.
* **Last Viewed Date** to distinguish abandoned assets from newly uploaded ones.
* **Direct Archiving Action** link/button from the table to take immediate action on unused assets.

**For Content Strategy & Engagement:**

* **Top & Bottom Performer Summaries** (e.g., Quick visual cards highlighting Top 5 Most Viewed vs. Top 5 Lowest Viewed).
* **Additional Engagement Metrics** (unique viewers, average watch time, completion rate).
* **Filter by Folder / Category** to analyze content performance at the topic/series level.
* **Scheduled monthly auto-email reports** delivering the monthly summary directly to stakeholders.

  

**5. Constraints**

* No hard technical/budget constraints mentioned.
* Data volume for large clients could be significant problem
* This complements existing per-video analytics; it doesn't replace them.

## 💡 Key Insights

**Main problem:** 

Chinmaya has no self-serve, library-wide view analytics — only per-video pages that don't scale. This blocks their independent monthly content and storage-cleanup workflow and creates recurring manual load on Support/Engineering.

**Why it matters:** 

They had this exact capability on Vimeo before migrating, so they experience its absence as a regression, not a stretch request. The underlying need — aggregated, asset-level performance visibility — is also broadly useful for any customer with a large library, not unique to Chinmaya.

**Proposed solution:**

 A self-serve, asset-level video analytics report — date-range selectable, exportable to CSV/Excel — supporting the workflow: identify high/low performers → plan content → archive unused assets → cut storage cost.

## ✅ After the Call

**Summary:** 

Chinmaya needs aggregated, self-serve, asset-level view analytics across their library — a capability they had on Vimeo and lost after migrating — to run their monthly content-strategy and storage-optimization workflow without depending on manual reports from TPStreams. CSV export is the minimum viable fix.