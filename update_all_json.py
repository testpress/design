import json

file_path = '/home/karthik/workspace/design/src/_data/my_opportunities.json'
with open(file_path, 'r') as f:
    data = json.load(f)

for item in data:
    # Skip OPP-1000 since we just perfectly crafted it
    if item['id'] == 'OPP-1000':
        continue
        
    messages = []
    
    latest_activity = item.get('latest_activity', '')
    
    # If the activity implies the staff sent a message
    if latest_activity == 'You replied' or item.get('your_reply'):
        if item.get('student_reply'):
            messages.append({
                'type': 'student',
                'name': item.get('student_name'),
                'avatar': item.get('avatar'),
                'text': item.get('student_reply', 'I have some questions about this.'),
                'time': 'Earlier'
            })
        messages.append({
            'type': 'staff',
            'name': item.get('owner', 'Priya Sharma'),
            'avatar': 'https://randomuser.me/api/portraits/women/44.jpg',
            'text': item.get('your_reply', 'I have sent you the details.'),
            'time': item.get('activity_time', 'Just now'),
            'read': True
        })
        
    # If the activity implies the student sent a message
    elif latest_activity == 'Student replied' or latest_activity == 'Pre-purchase enquiry' or item.get('student_reply'):
        
        # Add a mock staff message first to make it a conversation, if appropriate
        if latest_activity == 'Student replied':
             messages.append({
                'type': 'staff',
                'name': item.get('owner', 'Priya Sharma'),
                'avatar': 'https://randomuser.me/api/portraits/women/44.jpg',
                'text': f"Hi {item.get('student_name')}, I noticed you were looking at {item.get('product')}. Can I help you with anything?",
                'time': 'Earlier',
                'read': True
            })
            
        messages.append({
            'type': 'student',
            'name': item.get('student_name'),
            'avatar': item.get('avatar'),
            'text': item.get('student_reply', 'I have some questions about this.'),
            'time': item.get('activity_time', 'Just now')
        })
        
    # Replace the item's messages
    item['messages'] = messages
    
    # Generate active products if missing
    if 'active_products' not in item:
        item['active_products'] = [item.get('product', 'General Product')]

with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)
print('JSON updated.')
