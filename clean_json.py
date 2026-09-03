import json
import re

path = './src/_data/my_opportunities.json'
with open(path, 'r') as f:
    data = json.load(f)

def strip_tags(text):
    if not text:
        return text
    return re.sub(r'<[^>]+>', '', text)

for item in data:
    if 'timeline' in item:
        student = item.get('student_name', '')
        product = item.get('product', '').split(' - ')[0]

        new_timeline = []
        for dg in item['timeline']:
            new_events = []
            for event in dg.get('events', []):
                title = strip_tags(event.get('title', ''))
                lower = title.lower()

                # Filter out conversation/replied
                if 'replied' in lower or 'conversation' in lower:
                    continue

                actor = None
                actor_url = None
                action = ''
                target = None
                target_url = None

                if 'payment failed' in lower:
                    actor = student
                    actor_url = f"/users/profile/{student}"
                    action = "payment failed for"
                    target = product
                    target_url = "#"
                elif 'scheduled a follow-up' in lower:
                    actor = "You"
                    # Extract the date part from title: "You scheduled a follow-up for X"
                    date_part = title.split('follow-up for ')[-1] if 'follow-up for ' in title else 'a future date'
                    action = f"scheduled a follow-up for {date_part}"
                elif 'abandoned checkout' in lower:
                    actor = student
                    actor_url = f"/users/profile/{student}"
                    action = "abandoned checkout for"
                    target = product
                    target_url = "#"
                elif 'meeting' in lower:
                    actor = "You"
                    action = "scheduled a meeting with"
                    target = student
                    target_url = f"/users/profile/{student}"
                elif 'claimed' in lower:
                    actor = "You"
                    action = "claimed this opportunity"
                elif 'showed repeated interest' in lower:
                    actor = student
                    actor_url = f"/users/profile/{student}"
                    action = "showed repeated interest in"
                    target = product
                    target_url = "#"
                else:
                    # Generic fallback
                    actor = None
                    action = title
                    target = None

                event['actor'] = actor
                event['actor_url'] = actor_url
                event['action'] = action
                event['target'] = target
                event['target_url'] = target_url

                # Clean up old fields
                if 'title' in event:
                    del event['title']
                if 'signal' in event:
                    del event['signal']
                
                # strip html from metadata
                meta = event.get('metadata', [])
                event['metadata'] = [strip_tags(m) for m in meta]

                new_events.append(event)
            
            if new_events:
                dg['events'] = new_events
                new_timeline.append(dg)
        
        item['timeline'] = new_timeline

with open(path, 'w') as f:
    json.dump(data, f, indent=2)

print('JSON successfully cleaned of HTML and formatted structurally.')
