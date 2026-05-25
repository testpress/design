# Limeread Design & Component Conversion Guidelines

This document outlines the context, workflow, and technical guidelines for the **Limeread** project. AI coding assistants should read this file before performing any modifications.

## 1. Project Context
- **Production Stack**: Limeread is built using **React** and **shadcn/ui** in production.
- **Design Repository (This Workspace)**: This repository is a static design representation (Eleventy + Tailwind v4 + Alpine.js + Preline UI).
- **Core Goal**: When the user provides a production React `shadcn/ui` component, the AI's task is to convert it to **pure raw HTML** using reusable components (or separate files) styled with Preline UI utility classes and our custom shadcn-equivalent theme tokens.

---

## 2. Component Reusability & Nunjucks Macros
To align with shadcn's atomic structure, we use reusable component files powered by Nunjucks macros:
- **Reuse First**: Always check `src/limeread/components/` (e.g., `button.html`, `input.html`) before creating styling markup for a basic element.
- **Extract New Components**: If a component or block is used repeatedly or serves as a core primitive (e.g., alert, modal, card, dropdown), extract it into a separate file under `src/limeread/components/` using Nunjucks macro declarations.
- **Example Usage**:
  {% raw %}
  ```html
  {% from "../components/button.html" import button %}
  {{ button(text="Submit", type="submit", variant="default") }}
  ```
  {% endraw %}

---

## 3. Script Structure & Alpine.js Components
- **Alpine.js Scripts**: Any new or reusable JavaScript logic (such as Alpine.js components/stores) must be created in the `src/limeread/scripts/` folder.
- **Inclusion**: Include these scripts inside the `{% raw %}{% block extra_scripts %}{% endraw %}` block of the page/template that needs them.

---

## 4. Design & Styling Constraints (No Custom Styling)
- **Strict Styling Restrictions**: The AI must **never** design or introduce custom styling/classes on its own.
- **Use Existing Theme**: Only use classes and colors already present/configured in the existing system.
- **Fallback**: If a class or design rule is missing from the existing system, the AI must halt and ask the user how to proceed instead of guessing or introducing ad-hoc style/design custom rules.

---

## 5. Tailwind v4 & Design Tokens System
The style sheet in `src/limeread/themes/theme.css` integrates Tailwind v4 and exposes custom design tokens mimicking **shadcn/ui** variable structures:
- **Background & Body**: Use `bg-background` and `text-foreground`.
- **Primary Color**: Emerald (Light: Emerald 600, Dark: Emerald 500). Use `bg-primary` and `text-primary-foreground`.
- **Secondary**: Use `bg-secondary` and `text-secondary-foreground`.
- **Muted Elements**: Use `bg-muted` and `text-muted-foreground`.
- **Accents**: Use `bg-accent` and `text-accent-foreground`.
- **Destructive**: Use `bg-destructive` and `text-destructive-foreground`.
- **Cards & Popovers**: Use `bg-card` / `text-card-foreground` and `bg-popover` / `text-popover-foreground`.
- **Borders & Focus States**: Use `border-border`, `border-input`, and `focus-visible:ring-ring` focus ring utility classes.
- **Dark Mode**: Configured custom variant `dark` activated by applying the `.dark` class to any ancestor/root element.

---

## 6. Product Scopes & Design Requirements
The **Digital Ebook Lending Platform** distributes licensed ebooks to members and tracks usage transparency for publishers.

### A. Core User Portals & UI Layouts
1. **Admin Portal**:
   - **Ebook Management**: List, upload, edit, archive, and assign ebooks.
   - **License Configuration**: Interfaces to configure concurrent reader limits, borrow limits, and validity duration.
   - **Visibility Control**: Set ebooks as publicly accessible or restricted to specific **Access Groups**.
   - **Monitoring**: Real-time waitlist queues and active/historical borrow records.
2. **Member Reader App**:
   - **Library/Catalog**: Search/filter by subject, access group, author, or title.
   - **Ebook Details**: View availability, join waitlist, and borrow action.
   - **Secure Reader**: Web-based protected reader interface with saved reading progress.
3. **Publisher Transparency Portal**:
   - **Dashboard**: Track usage metrics (total borrows, active readers, license utilization) for their own titles.

### B. Core Domain Definitions
- **Access Group**: Grouping used to restrict ebook visibility and borrowing.
- **License**: Rules for concurrent readers, borrow limits, and validity duration.
- **Waitlist**: FIFO queue for members when an ebook's license capacity is full.
- **Active Reader**: A member currently borrowing a book.
- **License Utilization**: The percentage of licensed slots currently borrowed.

---

## 7. Key Constraints & Guidelines
- **No Global Code Scanning**: Do not waste time scanning files outside the `src/limeread/` directory unless explicitly requested. This repository contains multiple separate projects.
- **Pure HTML / Eleventy**: Ensure all templates compile cleanly under the Eleventy static site generator setup. All Nunjucks syntax blocks must be escaped using raw tags if written in documentation.
- **Aesthetic Excellence**: Focus on responsive, modern SaaS layout aesthetics with dark/light mode compatibility, smooth transitions, and premium spacing.
