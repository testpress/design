def fix_divs(file_path):
    with open(file_path, "r") as f:
        lines = f.readlines()

    # The issue is between lines 473 and the modal call
    # We want to keep up to line 473: `            </div>` (which closes `x-show="scoreBasis === 'sections' && selectedSections.length > 0"`)
    # And we just want one `          </div>` to close `p-5 sm:p-7 space-y-8`
    # Then the modal should follow.
    
    # Let's find the exact lines
    for i in range(len(lines)):
        if "<!-- Score Mapping Help Modal -->" in lines[i]:
            modal_idx = i
            break
            
    # Trace backwards from modal_idx to find the end of `x-show`
    # It should be the `</div>` that is indented by 12 spaces.
    end_xshow_idx = -1
    for i in range(modal_idx - 1, 0, -1):
        if "            </div>" in lines[i]:
            end_xshow_idx = i
            break
            
    if end_xshow_idx != -1:
        # We replace everything between end_xshow_idx and modal_idx
        # with just `          </div>\n\n`
        new_lines = lines[:end_xshow_idx + 1] + ["          </div>\n\n"] + lines[modal_idx:]
        with open(file_path, "w") as f:
            f.writelines(new_lines)
        print(f"Fixed divs between {end_xshow_idx} and {modal_idx}")
    else:
        print("Could not find end of x-show")

fix_divs("src/testpress/scaled_score_configuration/add_score.html")
