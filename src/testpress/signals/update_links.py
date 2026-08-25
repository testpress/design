import os
import glob
import re

base_dir = '/home/karthik/workspace/design/src/testpress/signals'

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                original_content = f.read()
            
            content = original_content
            
            # This covers {{ '/signals/opportunity-detail/awaiting-your-response/' | url }}
            # or {{ '/signals/opportunity-detail/awaiting-student-response/' | url }}
            # or {{ '/signals/opportunity-detail/follow-up-scheduled/' | url }}
            
            # We want to replace the hardcoded state with item.state (for njk loops).
            # Usually the loop variable is "item" or "row". Let's just use {{ '/signals/opportunity-detail/' ~ item.state ~ '/' | url }}
            
            # Be careful with single quotes
            pattern = r"\{\{\s*'/signals/opportunity-detail/[a-zA-Z0-9\-]+/'\s*\|\s*url\s*\}\}"
            replacement = r"{{ '/signals/opportunity-detail/' ~ item.state ~ '/' | url }}"
            
            # Since some loops might not use 'item', let's check if 'item' is the loop variable.
            # In Nunjucks it is typically 'for item in...'
            
            # Let's just replace if 'item in' is in the file
            if 'item in' in content or 'item.' in content:
                 content = re.sub(pattern, replacement, content)
            
            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)

print("Updated links to use item.state in HTML files")
