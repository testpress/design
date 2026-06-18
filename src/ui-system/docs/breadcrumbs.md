# Breadcrumb Component Documentation

## Purpose

The Breadcrumb component is a navigation helper that visualizes a page's location within a hierarchical site structure. It is designed to scale gracefully across screen sizes, automatically transforming into an ergonomic back-navigation link on mobile devices.

## API & Parameter Reference

### Macro Definition

```njk
{% raw %}
{% from "components/breadcrumbs.html" import breadcrumb %}

{{ breadcrumb({
  items: [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Physics", href: "/courses/physics" },
    { label: "Resources", current: true }
  ],
  extra_classes: ""
}) }}
{% endraw %}
```

### Supported Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `array` | `[]` | List of breadcrumb item objects. Each item can contain `label`, `href`, and `current`. |
| `extra_classes` | `string` | `""` | Additional CSS utility classes to apply to the root `<nav>` element. |

### Item Object Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `""` | The text label for this step of the breadcrumb. |
| `href` | `string` | `""` | The URL/destination link. If omitted or `current` is true, the item is rendered as static text. |
| `current` | `boolean` | `false` | Sets the step as the current page (emphasized text, non-clickable, with `aria-current="page"`). |

---

## Responsive Behavior

### Desktop & Tablet (md and above)
Displays the complete sequence of breadcrumb links separated by chevron icons. Text items are automatically truncated to prevent overflow.

### Mobile (below md)
Collapses the entire hierarchy into a single **"Back"** navigation link pointing to the immediate parent page (the second-to-last item in the items array). It displays a left-pointing chevron icon alongside the label "Back".

---

## Design and Accessibility Standards

### Typography & Colors
* **Normal Items**: Muted styling (`text-gray-500 dark:text-neutral-500`) with hover transitions using the theme's primary color (`hover:text-primary-600 dark:hover:text-primary-500`).
* **Current Item**: Bold styling (`font-semibold text-gray-800 dark:text-neutral-200`) with no hover state.
* **Separators**: Centered gray chevrons (`text-gray-400 dark:text-neutral-600`).

### Accessibility (a11y)
* Renders inside a semantic `<nav>` wrapper.
* Set to `aria-label="Breadcrumb"`.
* Current page item has the standard `aria-current="page"` attribute.
* Clean focus ring configurations (`focus:outline-hidden focus:text-primary-600 dark:focus:text-primary-500`) supporting direct keyboard tab navigation.
