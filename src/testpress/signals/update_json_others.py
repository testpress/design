import json
import os

data_dir = '/home/karthik/workspace/design/src/_data/'
files = ['needs_your_attention.json', 'followup_due_today.json', 'upcoming_follow_ups.json', 'recently_closed.json', 'unclaimed_opportunities.json', 'high_value_opportunities.json']

def get_state(item):
    activity = item.get('latest_activity', '').lower()
    if 'failed' in activity or 'abandoned' in activity:
        return 'no-conversation-yet'
    if 'replied' in activity or 'enquiry' in activity:
        return 'awaiting-your-response'
    if 'scheduled' in activity or 'follow-up' in activity or 'due' in activity:
        return 'follow-up-scheduled'
    return 'awaiting-student-response'

for file in files:
    filepath = os.path.join(data_dir, file)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            data = json.load(f)
        for item in data:
            if 'state' not in item:
                # Need to check where latest_activity is, some items might have it nested
                state = get_state(item)
                if file == 'recently_closed.json':
                    state = 'closed'
                item['state'] = state
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)

print("Updated other json files")
