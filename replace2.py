import re

file_path = 'src/testpress/message/includes/new_message.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

template = """                  <!-- Members Group -->
                  <template x-for="(member, index) in members" :key="member.id">
                    <div data-hs-combo-box-output-item='{"group": {"name": "members", "title": "Members"}}' :tabindex="index + 1">
                      <a class="group py-2 px-5 flex items-center gap-x-3 focus:outline-hidden hover:bg-gray-50 dark:hover:bg-neutral-800" href="#" @click.prevent="startNewChat(member.id, member.name, member.avatar, member.initials)">
                        <div class="shrink-0">
                          <template x-if="member.avatar">
                            <img class="shrink-0 size-8 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full" :src="member.avatar" alt="Avatar">
                          </template>
                          <template x-if="!member.avatar">
                            <span class="flex shrink-0 justify-center items-center size-8 text-xs font-medium uppercase text-white rounded-full" :class="getAvatarColor(member.id)" x-text="member.initials"></span>
                          </template>
                        </div>
                        <div class="grow truncate">
                          <p class="font-medium text-sm leading-4 text-gray-800 dark:text-neutral-200" :data-hs-combo-box-search-text="member.name" data-hs-combo-box-value x-text="member.name"></p>
                        </div>
                      </a>
                    </div>
                  </template>"""

# Find the start and end of the block to replace
start_idx = content.find('<!-- Members Group -->')
end_str = '                </div>\n              </div>\n            </div>\n            <!-- End List -->'
end_idx = content.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + template + '\n' + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")
else:
    print("Could not find start or end index.")
