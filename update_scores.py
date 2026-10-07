import re

def update_add_score(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Update x-data
    x_data_injection = """    scoreBasis: 'sections',
    availableExistingScores: [
      { name: 'Reading & Writing', range: '200 - 800' },
      { name: 'Mathematics', range: '200 - 800' },
      { name: 'Verbal Score', range: '100 - 400' }
    ],
    selectedExistingScores: [],
    existingScoresCombineMethod: 'Add',

    getExistingScoresCombinedPreview() {
      let total = 0;
      let count = 0;
      this.selectedExistingScores.forEach(sec => {
        let val = parseFloat(this.previewInputs[sec]);
        if (!isNaN(val)) {
          total += val;
          count++;
        }
      });
      if (count === 0) return '-';
      if (this.existingScoresCombineMethod === 'Average') {
        const avg = total / count;
        return Number.isInteger(avg) ? avg : avg.toFixed(1);
      }
      return total;
    },
"""
    if "scoreBasis:" not in content:
        content = re.sub(r'(scoreName: \'\',)', r'\1\n' + x_data_injection, content)

    # Update hasValidMapping
    if "if (this.scoreBasis === 'existing')" not in content:
        content = content.replace("hasValidMapping() {", "hasValidMapping() {\n      if (this.scoreBasis === 'existing') {\n        return this.selectedExistingScores.length > 0;\n      }")

    # 2. Add Score Basis Block (Card style)
    score_basis_html = """
            <!-- Score Basis Selection -->
            <div>
              <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                What should this score be based on?
              </p>
              <div class="grid sm:grid-cols-2 gap-3">
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': scoreBasis === 'sections'}">
                  <input type="radio" name="scoreBasis" value="sections" x-model="scoreBasis" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Exam sections or modules</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Create this score from the exam’s sections or modules.</span>
                  </div>
                </label>
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': scoreBasis === 'existing'}">
                  <input type="radio" name="scoreBasis" value="existing" x-model="scoreBasis" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Existing scores</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Create this score using scores that have already been configured.</span>
                  </div>
                </label>
              </div>
            </div>
"""
    existing_scores_html = """
            <!-- Existing Scores Selection -->
            <div x-show="scoreBasis === 'existing'" x-cloak x-transition>
              <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                Which scores contribute to this score?
              </p>
              <div class="grid sm:grid-cols-2 gap-3">
                <template x-for="score in availableExistingScores" :key="score.name">
                  <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="selectedExistingScores.includes(score.name) ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500' : ''">
                    <input type="checkbox" :value="score.name" x-model="selectedExistingScores" class="shrink-0 mt-0.5 border-gray-200 rounded text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                    <div class="flex flex-col ms-3">
                      <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200" x-text="score.name"></span>
                      <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5" x-text="`Score range: ${score.range}`"></span>
                    </div>
                  </label>
                </template>
              </div>
            </div>

            <!-- How should these scores be combined? -->
            <div x-show="scoreBasis === 'existing' && selectedExistingScores.length > 1" x-cloak x-transition>
              <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                How should these scores be combined?
              </p>
              <div class="grid sm:grid-cols-2 gap-3">
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': existingScoresCombineMethod === 'Add'}">
                  <input type="radio" name="existingScoresCombineMethod" value="Add" x-model="existingScoresCombineMethod" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Add</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Add the selected scores together.</span>
                  </div>
                </label>
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': existingScoresCombineMethod === 'Average'}">
                  <input type="radio" name="existingScoresCombineMethod" value="Average" x-model="existingScoresCombineMethod" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Average</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Calculate the average of the selected scores.</span>
                  </div>
                </label>
              </div>
            </div>
"""
    
    if "Score Basis Selection" not in content:
        content = content.replace('            <hr class="border-gray-200 dark:border-neutral-700">', '            <hr class="border-gray-200 dark:border-neutral-700">\n' + score_basis_html)
        content = content.replace('            <!-- Sections Selection -->', existing_scores_html + '\n            <!-- Sections Selection -->')
        content = content.replace('<!-- Sections Selection -->\n            <div>', '<!-- Sections Selection -->\n            <div x-show="scoreBasis === \'sections\'" x-cloak x-transition>')
        content = content.replace('<!-- Conversion Type Selection -->\n            <div x-show="selectedSections.length > 0"', '<!-- Conversion Type Selection -->\n            <div x-show="scoreBasis === \'sections\' && selectedSections.length > 0"')
        content = content.replace('<!-- Combine Method Selection -->\n            <div x-show="selectedSections.length > 1"', '<!-- Combine Method Selection -->\n            <div x-show="scoreBasis === \'sections\' && selectedSections.length > 1"')
        content = content.replace('<!-- How should the scaled scores be combined? -->\n            <div x-show="selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"', '<!-- How should the scaled scores be combined? -->\n            <div x-show="scoreBasis === \'sections\' && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"')
        content = content.replace('<!-- Set Score Mapping -->\n            <div x-show="selectedSections.length > 0"', '<!-- Set Score Mapping -->\n            <div x-show="scoreBasis === \'sections\' && selectedSections.length > 0"')

    # 3. Existing Scores Preview
    existing_scores_preview_html = """
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
    if "Existing Scores Preview" not in content:
        content = content.replace('            <!-- Content for one section or one combined score -->', existing_scores_preview_html + '\n            <!-- Content for one section or one combined score -->')
        content = content.replace('x-if="selectedSections.length <= 1 || combineMethod === \'Create one scaled score\'"', 'x-if="scoreBasis === \'sections\' && (selectedSections.length <= 1 || combineMethod === \'Create one scaled score\')"')
        content = content.replace('x-if="selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"', 'x-if="scoreBasis === \'sections\' && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"')

    with open(file_path, "w") as f:
        f.write(content)


def update_add_score_v2(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Update x-data
    x_data_injection = """    scoreBasis: 'sections',
    availableExistingScores: [
      { name: 'Reading & Writing', range: '200 - 800' },
      { name: 'Mathematics', range: '200 - 800' },
      { name: 'Verbal Score', range: '100 - 400' }
    ],
    selectedExistingScores: [],
    existingScoresCombineMethod: 'Add',

    getExistingScoresCombinedPreview() {
      let total = 0;
      let count = 0;
      this.selectedExistingScores.forEach(sec => {
        let val = parseFloat(this.previewInputs[sec]);
        if (!isNaN(val)) {
          total += val;
          count++;
        }
      });
      if (count === 0) return '-';
      if (this.existingScoresCombineMethod === 'Average') {
        const avg = total / count;
        return Number.isInteger(avg) ? avg : avg.toFixed(1);
      }
      return total;
    },
"""
    if "scoreBasis:" not in content:
        content = re.sub(r'(scoreName: \'\',)', r'\1\n' + x_data_injection, content)

    # Update hasValidMapping
    if "if (this.scoreBasis === 'existing')" not in content:
        content = content.replace("hasValidMapping() {", "hasValidMapping() {\n      if (this.scoreBasis === 'existing') {\n        return this.selectedExistingScores.length > 0;\n      }")

    score_basis_html_v2 = """
            <!-- Score Basis Selection -->
            <div>
              <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                What should this score be based on?
              </p>
              <div class="grid sm:grid-cols-2 gap-3">
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': scoreBasis === 'sections'}">
                  <input type="radio" name="scoreBasis" value="sections" x-model="scoreBasis" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Exam sections or modules</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Create this score from the exam’s sections or modules.</span>
                  </div>
                </label>
                <label class="flex p-3 w-full bg-white border border-gray-200 rounded-lg cursor-pointer focus-within:border-emerald-500 focus-within:ring-emerald-500 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors" :class="{'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500': scoreBasis === 'existing'}">
                  <input type="radio" name="scoreBasis" value="existing" x-model="scoreBasis" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-emerald-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-emerald-500 dark:checked:border-emerald-500 dark:focus:ring-offset-gray-800">
                  <div class="flex flex-col ms-3">
                    <span class="block text-sm font-medium text-gray-800 dark:text-neutral-200">Existing scores</span>
                    <span class="block text-xs text-gray-500 dark:text-neutral-500 mt-0.5">Create this score using scores that have already been configured.</span>
                  </div>
                </label>
              </div>
            </div>
"""
    existing_scores_html_v2 = """
            <!-- Existing Scores Selection -->
            <div x-show="scoreBasis === 'existing'" x-cloak x-transition>
              <div class="flex items-center justify-between">
                <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                  Which scores contribute to this score?
                </p>
              </div>
              <div class="relative">
                <button type="button" @click="$dispatch('open-modal-existing-picker')" class="w-full py-3 px-4 inline-flex justify-between items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <span x-text="selectedExistingScores.length === 0 ? 'Select existing scores' : selectedExistingScores.length + ' scores selected'"></span>
                  <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
              </div>
            </div>

            <!-- How should these scores be combined? -->
            <div x-show="scoreBasis === 'existing' && selectedExistingScores.length > 1" x-cloak x-transition>
              <div class="flex items-center justify-between">
                <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
                  How should these scores be combined?
                </p>
              </div>
              {% call dropdown(trigger="How should these scores be combined?", placement="bottom-start", extra_classes="w-full") %}
                <button @click="existingScoresCombineMethod = 'Add'" class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
                  <div class="flex flex-col text-left">
                    <span class="font-medium" :class="existingScoresCombineMethod === 'Add' ? 'text-emerald-600 dark:text-emerald-500' : ''">Add</span>
                    <span class="text-xs text-gray-500 dark:text-neutral-500">Add the selected scores together.</span>
                  </div>
                </button>
                <button @click="existingScoresCombineMethod = 'Average'" class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
                  <div class="flex flex-col text-left">
                    <span class="font-medium" :class="existingScoresCombineMethod === 'Average' ? 'text-emerald-600 dark:text-emerald-500' : ''">Average</span>
                    <span class="text-xs text-gray-500 dark:text-neutral-500">Calculate the average of the selected scores.</span>
                  </div>
                </button>
              {% endcall %}
              <!-- Override the trigger content -->
              <script>
                document.querySelectorAll('.hs-dropdown-toggle').forEach(btn => {
                  if(btn.innerText.includes('How should these scores be combined?')) {
                    btn.setAttribute('x-text', 'existingScoresCombineMethod');
                  }
                });
              </script>
            </div>
"""
    if "Score Basis Selection" not in content:
        content = content.replace('            <hr class="border-gray-200 dark:border-neutral-700">', '            <hr class="border-gray-200 dark:border-neutral-700">\n' + score_basis_html_v2)
        content = content.replace('            <!-- Sections Selection -->', existing_scores_html_v2 + '\n            <!-- Sections Selection -->')
        content = content.replace('<!-- Sections Selection -->\n            <div>', '<!-- Sections Selection -->\n            <div x-show="scoreBasis === \'sections\'" x-cloak x-transition>')
        content = content.replace('<!-- Conversion Type Selection -->\n            <div x-show="hasContinued && selectedSections.length > 0"', '<!-- Conversion Type Selection -->\n            <div x-show="scoreBasis === \'sections\' && hasContinued && selectedSections.length > 0"')
        content = content.replace('<!-- Combine Method Selection -->\n            <div x-show="hasContinued && selectedSections.length > 1"', '<!-- Combine Method Selection -->\n            <div x-show="scoreBasis === \'sections\' && hasContinued && selectedSections.length > 1"')
        content = content.replace('<!-- How should the scaled scores be combined? -->\n            <div x-show="hasContinued && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"', '<!-- How should the scaled scores be combined? -->\n            <div x-show="scoreBasis === \'sections\' && hasContinued && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"')
        content = content.replace('<!-- Set Score Mapping -->\n            <div x-show="hasContinued && selectedSections.length > 0"', '<!-- Set Score Mapping -->\n            <div x-show="scoreBasis === \'sections\' && hasContinued && selectedSections.length > 0"')

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
    if "Existing Scores Picker Modal" not in content:
        content = content.replace('          <!-- Score Mapping Help Modal -->', existing_picker_modal + '\n          <!-- Score Mapping Help Modal -->')

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
    if "Existing Scores Preview" not in content:
        content = content.replace('            <!-- Content for one section or one combined score -->', existing_scores_preview_html_v2 + '\n            <!-- Content for one section or one combined score -->')
        content = content.replace('x-if="selectedSections.length <= 1 || combineMethod === \'Create one scaled score\'"', 'x-if="scoreBasis === \'sections\' && (selectedSections.length <= 1 || combineMethod === \'Create one scaled score\')"')
        content = content.replace('x-if="selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"', 'x-if="scoreBasis === \'sections\' && selectedSections.length > 1 && combineMethod === \'Create separate scaled scores\'"')

    with open(file_path, "w") as f:
        f.write(content)

update_add_score("src/testpress/scaled_score_configuration/add_score.html")
update_add_score_v2("src/testpress/scaled_score_configuration/add_score_v2.html")
