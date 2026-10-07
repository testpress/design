import re

def move_buttons_to_top(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Add header actions to the top
    old_header = """      {{ page_header(
        title="Add score",
        description="Define a score that students will receive from this exam."
      ) }}"""

    new_header = """      {% set header_actions %}
        {{ button(text="Cancel", variant="secondary", href=('/testpress/scaled_score_configuration/' | url)) }}
        {{ button(text="Save score", variant="primary", extra_attrs=":disabled='!hasValidMapping() || scoreName.trim() === \"\"'") }}
      {% endset %}

      {{ page_header(
        title="Add score",
        description="Define a score that students will receive from this exam.",
        actions=header_actions
      ) }}"""

    if old_header in content:
        content = content.replace(old_header, new_header)

    # 2. Remove footer buttons
    footer_buttons = """            <!-- Footer Save Actions -->
            <div class="pt-5 border-t border-gray-200 dark:border-neutral-700 flex justify-end gap-x-3">
              {{ button(text="Cancel", variant="secondary") }}
              {{ button(text="Save score", variant="primary", extra_attrs=":disabled='!hasValidMapping() || scoreName.trim() === \"\"'") }}
            </div>"""

    if footer_buttons in content:
        content = content.replace(footer_buttons, "")

    with open(file_path, "w") as f:
        f.write(content)

move_buttons_to_top("src/testpress/scaled_score_configuration/add_score.html")
