import re

def fix_add_score_v2(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Close the x-show="scoreBasis === 'sections'" wrap
    # We need to insert `</div>` right before `        {% endcall %}` at the very end of the Main Panel block.
    # Let's search for the end of the Main Panel.
    main_panel_end = """          </div>
        {% endcall %}
      </div>
      
      <!-- Side Panel (Right Sticky) -->"""
    
    if "<!-- end of x-show=\"scoreBasis === 'sections'\" wrap -->" not in content:
        replacement = """          </div> <!-- end of x-show="scoreBasis === 'sections'" wrap -->
          </div>
        {% endcall %}
      </div>
      
      <!-- Side Panel (Right Sticky) -->"""
        content = content.replace(main_panel_end, replacement)

    # 2. Existing Scores Preview
    existing_scores_preview_html_v2 = """
            <!-- Existing Scores Preview -->
            <template x-if="scoreBasis === 'existing'">
              <div>
                <div class="p-5 space-y-4">
                  <template x-for="scoreNameItem in selectedExistingScores" :key="scoreNameItem">
                    <div class="flex justify-between items-center">
                      <div class="flex flex-col gap-y-1 w-full">
                        <span class="text-[10px] font-semibold text-gray-500 uppercase dark:text-neutral-500 truncate" :title="scoreNameItem" x-text="scoreNameItem"></span>
                        <span class="text-[10px] text-gray-400 dark:text-neutral-500" x-text="availableExistingScores.find(s => s.name === scoreNameItem).range"></span>
                        <label class="text-sm text-gray-800 dark:text-neutral-200 mt-1 flex items-center gap-2">
                          <span class="sr-only">Score:</span>
                          <input type="number" x-model="previewInputs[scoreNameItem]" class="w-20 px-2 py-1 text-sm font-semibold text-gray-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md focus:ring-emerald-500 focus:border-emerald-500" placeholder="0">
                        </label>
                      </div>
                    </div>
                  </template>
                </div>
                
                <div class="p-5 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50">
                  <div class="flex justify-between items-center">
                    <div class="flex flex-col gap-y-1">
                      <span class="text-[10px] font-semibold text-gray-500 uppercase dark:text-neutral-500" x-text="scoreName ? scoreName : 'Combined Score'"></span>
                      <span x-show="selectedExistingScores.length > 1" class="text-xs text-gray-500 dark:text-neutral-400" x-text="existingScoresCombineMethod === 'Average' ? '(Average)' : '(Sum)'"></span>
                    </div>
                    <div class="text-end">
                      <span class="block text-2xl font-bold text-emerald-600 dark:text-emerald-500" x-text="getExistingScoresCombinedPreview()"></span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
"""
    if "<!-- Existing Scores Preview -->" not in content:
        content = content.replace('            <!-- Content for one section or one combined score -->', existing_scores_preview_html_v2 + '\n            <!-- Content for one section or one combined score -->')

    # Update preview templates to be conditional on scoreBasis === 'sections'
    content = content.replace('x-if="selectedSections.length <= 1 || combineMethod === \'Create one scaled score\'"', 'x-if="scoreBasis === \'sections\' && (selectedSections.length <= 1 || combineMethod === \'Create one scaled score\')"')
    content = content.replace('x-if="selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"', 'x-if="scoreBasis === \'sections\' && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"')


    # 3. Existing Scores Picker Modal
    existing_picker_modal = """
    <!-- Existing Scores Picker Modal -->
    {% call modal(
        id="existing-picker",
        title="Select existing scores",
        size="md",
        show_cancel=true,
        confirm_text="Done"
    ) %}
      <div class="space-y-2">
        <template x-for="score in availableExistingScores" :key="score.name">
          <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors">
            <input type="checkbox" :value="score.name" x-model="selectedExistingScores" class="shrink-0 mt-0.5 border-gray-200 rounded text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
            <div class="flex flex-col ms-3 w-full">
              <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200" x-text="score.name"></span>
              <span class="block text-xs text-gray-500 dark:text-neutral-500" x-text="`Score range: ${score.range}`"></span>
            </div>
          </label>
        </template>
      </div>
    {% endcall %}
"""
    if "id=\"existing-picker\"" not in content:
        content = content.replace('{% endblock content %}', existing_picker_modal + '\n{% endblock content %}')

    with open(file_path, "w") as f:
        f.write(content)

fix_add_score_v2("src/testpress/scaled_score_configuration/add_score_v2.html")
