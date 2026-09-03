import json
import random

path = './src/_data/my_opportunities.json'
with open(path, 'r') as f:
    data = json.load(f)

for item in data:
    student_name = item.get('student_name', 'Student')
    product = item.get('product', '').split(' - ')[0]
    owner = item.get('owner', 'Agent')
    
    # We will build a new messages array
    new_messages = []
    
    # 1. System: Opp created
    new_messages.append({
        "type": "system",
        "title": "Opportunity created",
        "text": product,
        "time": "Today, 10:00 AM",
        "icon": "target"
    })
    
    # 2. System: Ownership
    new_messages.append({
        "type": "system",
        "title": "Ownership assigned",
        "text": owner,
        "time": "Today, 10:15 AM",
        "icon": "user-check"
    })
    
    # 3. Staff: Initial outreach
    new_messages.append({
        "type": "staff",
        "name": owner,
        "avatar": "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        "text": f"Hi {student_name}, I noticed you were looking at the {product}. Can I help you with anything?",
        "time": "Today, 10:20 AM"
    })
    
    # 4. Student: Existing student_reply or generic
    student_reply = item.get('student_reply')
    if not student_reply or student_reply == '—':
        student_reply = f"Yes, I wanted to know more about the course fees and schedule."
        
    new_messages.append({
        "type": "student",
        "name": student_name,
        "avatar": item.get('avatar', "https://randomuser.me/api/portraits/lego/1.jpg"),
        "text": student_reply,
        "time": "Today, 11:30 AM"
    })
    
    # 5. Note: Internal note
    new_messages.append({
        "type": "note",
        "name": owner,
        "avatar": "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        "text": f"{student_name} seems highly interested but is comparing options. Will follow up tomorrow with a discount code if no action taken.",
        "time": "Today, 11:45 AM"
    })
    
    # 6. Staff: Follow up response
    new_messages.append({
        "type": "staff",
        "name": owner,
        "avatar": "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        "text": f"Sure! The {product} is perfectly designed to help you prepare. Let me know if you'd like a quick call to walk through the curriculum.",
        "time": "Today, 12:00 PM"
    })
    
    item['messages'] = new_messages

with open(path, 'w') as f:
    json.dump(data, f, indent=2)

print('Enriched messages in JSON successfully.')
