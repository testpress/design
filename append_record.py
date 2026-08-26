import json

file_path = '/home/karthik/workspace/design/src/_data/unclaimed_opportunities.json'
with open(file_path, 'r') as f:
    data = json.load(f)

new_record = {
    "id": "OPP-1099",
    "student_name": "Suresh Menon",
    "student_email": "suresh.menon@example.com",
    "avatar": "https://randomuser.me/api/portraits/men/22.jpg",
    "product": "GATE CS Pack - ₹30K",
    "latest_activity": "Viewed product 6 times",
    "activity_time": "3 hours ago",
    "student_reply": "",
    "priority": "Medium",
    "timeline": [
        {
            "dateGroup": "Today",
            "events": [
                {
                    "signal": "Viewed product 6 times",
                    "time": "3 hours ago"
                }
            ]
        }
    ],
    "high_purchase_interest": True,
    "state": "no-conversation-yet"
}

data.append(new_record)

with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)
