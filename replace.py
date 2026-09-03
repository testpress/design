import sys

file_path = 'src/testpress/message/includes/new_message.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if '<!-- Members Group -->' in line:
        new_lines.append(line)
        new_lines.append('                  <template x-for="(member, index) in members" :key="member.id">\n')
        new_lines.append('                    <div data-hs-combo-box-output-item=\'{"group": {"name": "members", "title": "Members"}}\' :tabindex="index + 1">\n')
        new_lines.append('                      <a class="group py-2 px-5 flex items-center gap-x-3 focus:outline-hidden hover:bg-gray-50 dark:hover:bg-neutral-800" href="#" @click.prevent="startNewChat(member.id, member.name, member.avatar, member.initials)">\n')
        new_lines.append('                        <div class="shrink-0">\n')
        new_lines.append('                          <template x-if="member.avatar">\n')
        new_lines.append('                            <img class="shrink-0 size-8 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full" :src="member.avatar" alt="Avatar">\n')
        new_lines.append('                          </template>\n')
        new_lines.append('                          <template x-if="!member.avatar">\n')
        new_lines.append('                            <span class="flex shrink-0 justify-center items-center size-8 text-xs font-medium uppercase text-white rounded-full" :class="getAvatarColor(member.id)" x-text="member.initials"></span>\n')
        new_lines.append('                          </template>\n')
        new_lines.append('                        </div>\n')
        new_lines.append('                        <div class="grow truncate">\n')
        new_lines.append('                          <p class="font-medium text-sm leading-4 text-gray-800 dark:text-neutral-200" :data-hs-combo-box-search-text="member.name" data-hs-combo-box-value x-text="member.name"></p>\n')
        new_lines.append('                        </div>\n')
        new_lines.append('                      </a>\n')
        new_lines.append('                    </div>\n')
        new_lines.append('                  </template>\n')
        new_lines.append('                </div>\n')
        skip = True
    elif skip and '</div>' in line and i == 260:
        skip = False
    elif not skip:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('Done!')
