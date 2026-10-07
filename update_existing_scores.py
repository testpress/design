import re

def update_existing_scores_preview(file_path):
    with open(file_path, "r") as f:
        content = f.read()

    # 1. Update the preview loop HTML
    old_preview_loop = """                  <template x-for="scoreNameItem in selectedExistingScores" :key="scoreNameItem">
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
                  </template>"""

    new_preview_loop = """                  <template x-for="scoreNameItem in selectedExistingScores" :key="scoreNameItem">
                    <div class="flex justify-between items-center">
                      <div class="flex flex-col gap-y-1">
                        <span class="text-[10px] font-semibold text-gray-500 uppercase dark:text-neutral-500 truncate" :title="scoreNameItem" x-text="scoreNameItem"></span>
                        <span class="text-[10px] text-gray-400 dark:text-neutral-500" x-text="availableExistingScores.find(s => s.name === scoreNameItem).range"></span>
                      </div>
                      <div class="text-end">
                        <label class="text-sm text-gray-800 dark:text-neutral-200 flex items-center">
                          <span class="sr-only">Score:</span>
                          <input type="number" x-model="previewInputs[scoreNameItem]" class="w-20 px-2 py-1 text-sm font-semibold text-gray-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md focus:ring-emerald-500 focus:border-emerald-500" :placeholder="availableExistingScores.find(s => s.name === scoreNameItem).range.split(' ')[0]" :min="availableExistingScores.find(s => s.name === scoreNameItem).range.split(' ')[0]" :max="availableExistingScores.find(s => s.name === scoreNameItem).range.split(' ')[2]">
                        </label>
                      </div>
                    </div>
                  </template>"""

    if old_preview_loop in content:
        content = content.replace(old_preview_loop, new_preview_loop)

    # 2. Update the getExistingScoresCombinedPreview function to fallback to minimum range value
    old_calc = """    getExistingScoresCombinedPreview() {
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
    },"""

    new_calc = """    getExistingScoresCombinedPreview() {
      let total = 0;
      let count = 0;
      this.selectedExistingScores.forEach(sec => {
        let val = parseFloat(this.previewInputs[sec]);
        if (isNaN(val)) {
           const scoreObj = this.availableExistingScores.find(s => s.name === sec);
           if (scoreObj) {
              val = parseFloat(scoreObj.range.split(' ')[0]);
           }
        }
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
    },"""

    if old_calc in content:
        content = content.replace(old_calc, new_calc)

    with open(file_path, "w") as f:
        f.write(content)

update_existing_scores_preview("src/testpress/scaled_score_configuration/add_score.html")
update_existing_scores_preview("src/testpress/scaled_score_configuration/add_score_v2.html")
