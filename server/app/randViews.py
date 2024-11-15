import random
from datetime import datetime, timedelta
import json

# Initialize a list to store the new views
new_views = []

# Starting date
start_date = datetime(2024, 11, 13)

# Generate 20 unique views
for i in range(100):
    # Generate a unique buyerID by picking a number in a certain range
    buyer_id = random.randint(
        77, 100
    )  # Assuming buyerID is in the range 100-200 for uniqueness

    # Generate a date within 7 days from the start date
    date_offset = timedelta(days=random.randint(0, 7))
    view_date = start_date + date_offset

    # Convert the date to the required format
    view_date_formatted = view_date.strftime("%Y-%m-%dT00:00:00.000Z")

    # Add the new view entry to the list
    new_views.append({"buyerID": buyer_id, "date": {"$date": view_date_formatted}})

# Output the new views as JSON for easy use
print(json.dumps(new_views, indent=2))
