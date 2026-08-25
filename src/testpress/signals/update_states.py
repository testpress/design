import os
import glob

base_dir = '/home/karthik/workspace/design/src/testpress'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html') or file.endswith('.json'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                original_content = f.read()
            
            content = original_content
            # Text replacements
            content = content.replace('Waiting on institute', 'Awaiting your response')
            content = content.replace('waiting on institute', 'awaiting your response')
            content = content.replace('Waiting on student', 'Awaiting student response')
            content = content.replace('waiting on student', 'awaiting student response')
            
            # URL and path replacements
            content = content.replace('waiting-on-institute', 'awaiting-your-response')
            content = content.replace('waiting-on-student', 'awaiting-student-response')
            
            # Fix permalinks for no-conversation-yet specifically
            if 'no-conversation-yet' in filepath:
                content = content.replace('awaiting-your-response', 'no-conversation-yet')
                content = content.replace('Awaiting your response', 'No conversation yet')
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)

print("Done updating states in HTML files!")
