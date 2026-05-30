## Purpose

This document defines approved page structures to ensure UI consistency across similar screens. AI and developers must follow these patterns when composing pages.

Pages with similar intent must follow similar layout, spacing, and interaction structure.

AI must reuse these patterns before creating new layouts.


---

## Standard Page Structure

All pages should follow this order where applicable:


1. Page Header
2. Primary Actions / Filters
3. Main Content
4. Secondary Content
5. Footer Actions (if applicable)


---

# List Page Pattern

## Purpose

Used for displaying collections of records, users, content, reports, or entities.

### Structure

Page Header ↓ Filters / Search / Actions ↓ Stats (Optional) ↓ Table / List Content ↓ Pagination

### Rules

* Search and filters must appear before data.
* Primary actions must appear near page header.
* Tables must remain visually dominant.
* Empty states must replace empty tables.
* Bulk actions should remain contextual.

### Common Use Cases

* User Management
* Courses List
* Reports
* Orders
* Content Library


---

# Detail Page Pattern

## Purpose

Used for viewing detailed information about a single entity.

### Structure

Page Header ↓ Summary / Overview Card ↓ Tabs or Sections ↓ Related Content ↓ Secondary Actions

### Rules

* Important information must appear first.
* Related information must be grouped logically.
* Tabs should be used only when content is large.

### Common Use Cases

* User Detail
* Course Detail
* Subscription Detail
* Content Detail


---

# Form Page Pattern

## Purpose

Used for create, edit, or configuration workflows.

### Structure

Page Header ↓ Supporting Description (Optional) ↓ Form Sections ↓ Validation / Help Text ↓ Primary & Secondary Actions

### Rules

* Forms must maintain consistent vertical spacing.
* Related fields must remain grouped.
* Save action must remain visually prominent.
* Destructive actions must remain separated.

### Common Use Cases

* Create User
* Settings
* Profile Edit
* Content Upload


---

# Analytics Page Pattern

## Purpose

Used for dashboards, metrics, reporting, and performance insights.

### Structure

Page Header ↓ Filters / Date Range ↓ Metric Cards ↓ Charts / Trends ↓ Detailed Table / Breakdown

### Rules

* High-level insights must appear first.
* Detailed breakdown should follow summary metrics.
* Filters must remain easily discoverable.
* Charts must never appear before summary metrics.

### Common Use Cases

* Revenue Analytics
* Student Performance
* Subscription Insights
* Content Engagement


---

# Dashboard Page Pattern

## Purpose

Used for overview and quick-access experiences.

### Structure

Page Header ↓ Key Metrics ↓ Important Sections / Quick Actions ↓ Recent Activity / Insights

### Rules

* Most important information must appear above the fold.
* Dashboard should prioritize scanning speed.
* Avoid excessive content density.

### Common Use Cases

* Admin Dashboard
* Student Dashboard
* OTT Dashboard


---

# Settings Page Pattern

## Purpose

Used for configurations and preference management.

### Structure

Page Header ↓ Settings Navigation / Categories ↓ Grouped Setting Sections ↓ Save Actions

### Rules

* Related settings must remain grouped.
* Forms should not feel overwhelming.
* Save behavior must remain predictable.

### Common Use Cases

* Organization Settings
* Player Preferences
* Theme Settings


---

# Authentication Page Pattern

## Purpose

Used for login, registration, password reset, and account access.

### Structure

Branding / Context ↓ Title & Description ↓ Authentication Form ↓ Alternative Actions ↓ Help / Support

### Rules

* Minimize distractions.
* Keep forms short and focused.
* Primary action must remain clear.

### Common Use Cases

* Login
* Register
* Forgot Password
* OTP Verification


---

# Modal Pattern

## Purpose

Used for focused interruption workflows.

### Structure

Title ↓ Description / Context ↓ Form or Content ↓ Primary & Secondary Actions

### Rules

* Use only for focused actions.
* Avoid long-scroll modals.
* Do not stack multiple modals.


---

# Empty State Pattern

## Purpose

Used when content does not exist.

### Structure

Illustration / Icon ↓ Clear Message ↓ Short Description ↓ Primary Action

### Rules

* Explain what is missing.
* Explain what user can do next.
* Avoid dead-end messaging.


---

## Pattern Reuse Rules

AI and developers must:

* Reuse approved page patterns.
* Maintain consistent section ordering.
* Avoid inventing new layouts unnecessarily.
* Keep similar pages visually familiar.

If a page does not fit an existing pattern:

Return:

> New page pattern required

