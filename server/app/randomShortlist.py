import json
from datetime import datetime, timedelta
import random


def random_date(start_date, end_date):
    """Generate a random datetime between start_date and end_date."""
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_date = start_date + timedelta(days=random_days)
    return random_date  # Return the datetime object


# Function to generate unique records
def generate_records():
    records = []
    used_combinations = set()  # Track used (buyerID, listingID) pairs
    buyer_ids = range(76, 101)  # Buyer IDs from 76 to 100
    start_date = datetime(2024, 11, 8)
    end_date = datetime(2024, 11, 15)

    # Loop through buyer IDs to create unique compound pairs
    for buyer_id in buyer_ids:
        listing_id = 1
        for _ in range(10):  # Each buyer gets 10 unique listings
            # Ensure the (buyerID, listingID) pair is unique
            while (buyer_id, listing_id) in used_combinations:
                listing_id += 1  # Increment listingID until unique
            used_combinations.add((buyer_id, listing_id))  # Mark pair as used

            date_created = random_date(start_date, end_date)
            records.append(
                {
                    "buyerID": buyer_id,
                    "listingID": listing_id,
                    "dateCreated": date_created.isoformat(),  # Convert to ISO string
                }
            )
            listing_id += 1  # Increment listingID for the next listing

    return records


# Generate 100 records
mock_records = generate_records()

# Write records to a JSON file
with open("buyer_listing_records.json", "w") as f:
    json.dump(mock_records, f, indent=4)

print("Records generated and saved to buyer_listing_records.json")
