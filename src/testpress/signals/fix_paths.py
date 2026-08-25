import os
import glob

base_dir = '/home/karthik/workspace/design/src/testpress/signals/opportunity-detail'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            content = content.replace('../../../ui-system', '../../../../ui-system')
            content = content.replace('permalink: "/opportunity/', 'permalink: "/signals/opportunity-detail/')
            
            with open(filepath, 'w') as f:
                f.write(content)
print("Done fixing paths and permalinks!")
