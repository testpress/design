import re

with open('src/tpsentinel/layout/sidebar.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract the organization switcher
org_switcher_match = re.search(r'(<!-- Organization Switcher Component -->.*?)</div>\s*<div class="lg:hidden shrink-0 ms-2">', content, re.DOTALL)
if not org_switcher_match:
    print("Org switcher not found")
    exit(1)
org_switcher_html = org_switcher_match.group(1).strip()
org_switcher_html = org_switcher_html + "\n      </div>"

# 2. Replace header with new logo
header_replacement = """    <!-- Sidebar Header -->
    <header class="h-11.5 ps-5 pe-2 lg:ps-8 flex items-center justify-between pt-3 pb-2">
      <!-- Logo -->
      <a class="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden text-gray-800 dark:text-neutral-300" href="/" aria-label="Sentinel">
        <img src="https://static.tpsentinel.com/app/img/logo.png" alt="Sentinel" class="w-auto h-8 dark:hidden">
        <img src="https://static.tpsentinel.com/app/img/logo-dark.png" alt="Sentinel" class="w-auto h-8 hidden dark:block">
      </a>
      <!-- End Logo -->
      
      <div class="lg:hidden shrink-0 ms-2">
        <!-- Sidebar Close -->
        <button type="button" class="w-6 h-7 inline-flex justify-center items-center text-sm rounded-md cursor-pointer border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-hidden dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300" x-on:click="sidebarOpen = false" aria-label="Close sidebar">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="7 8 3 12 7 16" /><line x1="21" x2="11" y1="12" y2="12" /><line x1="21" x2="11" y1="6" y2="6" /><line x1="21" x2="11" y1="18" y2="18" /></svg>
        </button>
        <!-- End Sidebar Close -->
      </div>
    </header>"""

content = re.sub(r'<!-- Sidebar Header -->.*?</header>', header_replacement, content, flags=re.DOTALL)

# 3. Create the footer with the organization switcher
footer_html = f"""    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-neutral-700 px-2 lg:px-5 py-4 mt-auto">
      {org_switcher_html}
    </footer>"""

# 4. Remove the old bottom list (Reports, Background jobs, Documentation)
bottom_list_match = re.search(r'<ul class="mt-auto flex flex-col gap-y-1\.5 px-2 lg:px-5 pb-4 pt-4 border-t border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">.*?</ul>', content, re.DOTALL)
old_bottom_list = bottom_list_match.group(0)

# 5. Build the new Apps section
new_apps_html = """
          <!-- Divider -->
          <li class="pt-5 px-5 lg:px-8 mt-5 border-t border-gray-200 dark:border-neutral-700 first:border-transparent first:pt-0">
            <span class="block text-xs uppercase text-gray-500 dark:text-neutral-400">
              Apps
            </span>
          </li>
          <!-- End Divider -->

          <!-- Link -->
          <li class="px-2 lg:px-5">
            <a class="flex items-center gap-x-2 py-1.5 px-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700" href="#">
              <span class="flex justify-center items-center size-6 bg-blue-600 dark:bg-blue-500 text-white rounded-md">
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </span>
              Reports
            </a>
          </li>
          <!-- End Link -->

          <!-- Link -->
          <li class="px-2 lg:px-5">
            <a class="flex items-center gap-x-2 py-1.5 px-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700" href="#">
              <span class="flex justify-center items-center size-6 bg-blue-600 dark:bg-blue-500 text-white rounded-md">
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              <span class="truncate">Background Jobs</span>
              <span class="ms-auto inline-flex items-center gap-1.5 py-px px-1.5 rounded-lg text-[10px] leading-4 font-medium bg-white border border-gray-200 text-gray-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 whitespace-nowrap shrink-0">3</span>
            </a>
          </li>
          <!-- End Link -->

          <!-- Link -->
          <li class="px-2 lg:px-5">
            <a class="flex items-center gap-x-2 py-1.5 px-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700" href="#">
              <span class="flex justify-center items-center size-6 bg-blue-600 dark:bg-blue-500 text-white rounded-md">
                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </span>
              Documentation
            </a>
          </li>
          <!-- End Link -->
"""

content = content.replace(old_bottom_list, footer_html)

# Now, add the new_apps_html to the end of the main nav list
content = content.replace('</ul>\n      </nav>', new_apps_html + '        </ul>\n      </nav>')

with open('src/tpsentinel/layout/sidebar.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("done")
