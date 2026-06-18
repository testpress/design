# Date Picker Component Documentation

## Purpose

The Date Picker component is a highly flexible scheduling and availability selection component. It is built using Alpine.js and Tailwind CSS, supporting everything from single date selection to date range with time selections in both inline and popover dropdown configurations.

## API & Parameter Reference

### Macro Definition

```njk
{% raw %}
{% from "components/date-picker.html" import date_picker %}

{{ date_picker(
  label="Publish Date",
  name="publish_date",
  id="publish_date",
  placeholder="Select date",
  required=false,
  disabled=false,
  readonly=false,
  single=true,
  datetime=false,
  range=false,
  range_datetime=false,
  inline=false,
  min_date="",
  max_date="",
  show_time=false,
  show_clear=false,
  show_today=false,
  selected_value="",
  error_message=""
) }}
{% endraw %}
```

### Supported Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `""` | The label text displayed above the input element. |
| `name` | `string` | `""` | The name attribute for the native hidden form input. |
| `id` | `string` | `""` | Unique ID of the trigger input. Defaults to `name` if omitted. |
| `placeholder` | `string` | `"Select date"` | Text displayed inside the input when empty. |
| `required` | `boolean` | `false` | Marks the form field as required. |
| `disabled` | `boolean` | `false` | Disables date interaction and visually fades the component. |
| `readonly` | `boolean` | `false` | Prevents the user from opening the popover while remaining active. |
| `single` | `boolean` | `true` | Allows selecting a single date. |
| `datetime` | `boolean` | `false` | Enables selecting a single date along with hours/minutes. |
| `range` | `boolean` | `false` | Enables twin calendar panel range picker mode. |
| `range_datetime` | `boolean` | `false` | Enables twin calendar range selection along with independent start/end times. |
| `inline` | `boolean` | `false` | Bypasses input trigger and renders the calendar panel directly in-page. |
| `min_date` | `string` | `""` | Earliest selectable date constraint (ISO Format: `YYYY-MM-DD`). |
| `max_date` | `string` | `""` | Latest selectable date constraint (ISO Format: `YYYY-MM-DD`). |
| `show_time` | `boolean` | `false` | Forces display of time picker selectors. |
| `show_clear` | `boolean` | `false` | Displays a clear ("X") button next to the input for easy resets. |
| `show_today` | `boolean` | `false` | Displays a quick "Today" selection button. |
| `selected_value` | `string` | `""` | Preloaded select value. Format: `YYYY-MM-DD` or `YYYY-MM-DD → YYYY-MM-DD`. |
| `error_message` | `string` | `""` | Error message string displayed below the input. |

---

## Allowed Variants

### 1. Single Date Picker
Simple calendar popup or text trigger for selecting a single publish or birth date.

### 2. Date & Time Picker
Includes dropdown selection elements for Hours, Minutes, and AM/PM at the footer of the calendar grid.

### 3. Date Range Picker
Shows a linked twin-calendar panel (Left: current month; Right: next month). Highlighted range background indicators visually trace the selection path between starting and ending values.

### 4. Date Range with Time Picker
Linked twin-calendar display with independent start and end times at the bottom of each panel.

### 5. Inline Calendar
Renders the calendar picker directly in the DOM. Extremely useful for dashboard widgets or sidebars where scheduling is the primary page concern.

---

## Design and Accessibility Standards

### Colors & Styling
* **Selected Days**: Filled with primary theme color (`bg-primary-600 dark:bg-primary-500`) with high contrast text.
* **Range Highlight**: Soft background overlay highlight (`bg-gray-100 dark:bg-neutral-800`) spanning in-between days.
* **Today Marker**: Subtle outline highlighting the today date cell (`border border-primary-500 dark:border-primary-400`).

### Keyboard Accessibility
* Escape (`Esc`) key dismisses active popover menu.
* Native `<select>` month/year selection tags conform to default keyboard accessibility controls.
