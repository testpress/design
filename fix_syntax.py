def fix_parse_error(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # The line causing issues has `scoreName.trim() === ""`
    # Let's replace it with `scoreName.trim().length === 0`
    content = content.replace(
        "scoreName.trim() === \"\"'",
        "scoreName.trim().length === 0'"
    )

    # And we also need to remove the old footer since our previous move script
    # failed to match the exact string due to escaping/indentation differences.
    footer_lines = [
        "            <!-- Footer Save Actions -->",
        "            <div class=\"pt-5 border-t border-gray-200 dark:border-neutral-700 flex justify-end gap-x-3\">",
        "              {{ button(text=\"Cancel\", variant=\"secondary\") }}",
        "              {{ button(text=\"Save score\", variant=\"primary\", extra_attrs=\":disabled='!hasValidMapping() || scoreName.trim().length === 0'\") }}",
        "            </div>"
    ]
    
    # We will just search for `<!-- Footer Save Actions -->` and remove the next 4 lines.
    lines = content.split('\n')
    new_lines = []
    skip = 0
    for line in lines:
        if skip > 0:
            skip -= 1
            continue
        if "<!-- Footer Save Actions -->" in line:
            skip = 4
            continue
        new_lines.append(line)

    with open(file_path, "w") as f:
        f.write('\n'.join(new_lines))

fix_parse_error("src/testpress/scaled_score_configuration/add_score.html")
