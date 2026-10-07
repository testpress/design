with open("src/testpress/scaled_score_configuration/add_score.html", "r") as f:
    lines = f.readlines()

for i in range(len(lines)):
    if "<!-- Score Mapping Help Modal -->" in lines[i]:
        modal_idx = i
        break

start_replace = -1
for i in range(modal_idx - 1, 0, -1):
    if "Add row" in lines[i]:
        start_replace = i + 2 # After button and its div
        break

# We know lines around `start_replace` to `modal_idx` have the extra divs.
# The `Add row` button's div is closed, then `mt-4` div is closed, then `x-show` div is closed.
# So we need exactly THREE `</div>`s, and then ONE `</div>` to close `space-y-8`.
# Let's just output them cleanly.
new_lines = lines[:start_replace + 1] + [
    "              </div>\n",
    "            </div>\n",
    "          </div>\n\n"
] + lines[modal_idx:]

with open("src/testpress/scaled_score_configuration/add_score.html", "w") as f:
    f.writelines(new_lines)

print("Fixed divs.")
