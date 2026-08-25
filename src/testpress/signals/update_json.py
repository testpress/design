import json
import random

filepath = '/home/karthik/workspace/design/src/_data/opportunities.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# The user explicitly asked for Meena Sharma (payment failed) and Karthik R (checkout abandoned)
data[1]["student_name"] = "Meena Sharma"
data[1]["latest_activity"] = "Payment failed"
data[1]["activity_time"] = "15 min ago"
data[1]["product"] = "NEET Premium - ₹25,000"
data[1]["state"] = "no-conversation-yet"

data[2]["student_name"] = "Karthik R"
data[2]["latest_activity"] = "Checkout abandoned"
data[2]["activity_time"] = "30 min ago"
data[2]["state"] = "no-conversation-yet"

states = [
    "no-conversation-yet",
    "awaiting-your-response",
    "awaiting-student-response",
    "follow-up-scheduled"
]

for i, item in enumerate(data):
    if "state" not in item:
        # Assign a random state or based on activity
        if item["latest_activity"] == "Student replied":
            item["state"] = "awaiting-your-response"
        elif item["latest_activity"] == "Pre-purchase enquiry":
            item["state"] = "awaiting-your-response"
        elif "scheduled" in item["latest_activity"].lower():
            item["state"] = "follow-up-scheduled"
        elif "failed" in item["latest_activity"].lower() or "abandoned" in item["latest_activity"].lower():
            item["state"] = "no-conversation-yet"
        else:
            item["state"] = random.choice(states)

with open(filepath, 'w') as f:
    json.dump(data, f, indent=2)

print("Updated opportunities.json")
