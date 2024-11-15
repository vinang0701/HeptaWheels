"""import json
import random
import string

toyotaModels = ["Corolla Altis", "Sienta", "Camry", "Alphard"]
bmwModels = ["i7", "iX", "i5", "XM"]
mazdaModels = ["CX-4", "CX-5", "CX-8", "Roadster"]
brand = ["Toyota", "BMW" "Mazda"]


def generate_listings():
    toyota_models = ["Corolla Altis", "Sienta", "Camry", "Alphard"]
    listings = []

    for i in range(11, 20):
        listing = {
            "agentID": random.randint(2, 9),
            "carMake": "Toyota",
            "carModel": random.choice(toyota_models),
            "carPlateNo": str(1000 + i),
            "desc": (
                "A compact car that comes as a sedan or hatchback, and is considered a good choice for economical transportation"
            ),
            "image": "http://localhost:5000/src/assets/toyota.jpg",
            "listingID": i + 1,
            "price": 100000,
            "sellerID": 1,
            "status": "Available",
        }
        listings.append(listing)

    return json.dumps(listings, indent=4)


# Generate the JSON string
json_data = generate_listings()
print(json_data)"""

import json
import random
import faker
from datetime import datetime, timedelta

# Initialize Faker instance for generating random data
fake = faker.Faker()

toyotaModels = ["Corolla Altis", "Sienta", "Camry", "Alphard"]
bmwModels = ["i7", "iX", "i5", "XM"]
mazdaModels = ["CX-4", "CX-5", "CX-8", "Roadster"]
models = [
    "Corolla Altis",
    "Sienta",
    "Camry",
    "Alphard",
    "i7",
    "iX",
    "i5",
    "XM",
    "CX-4",
    "CX-5",
    "CX-8",
    "Roadster",
]
brands = ["Toyota", "BMW" "Mazda"]


# Helper function to generate ISODate format
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_date = start_date + timedelta(days=random_days)
    return random_date.isoformat()


# Function to generate mock data
def generate_mock_data(num_records):
    start_date = datetime(2024, 11, 8)
    end_date = datetime(2024, 11, 15)
    mock_data = []

    for listing_id in range(27, num_records + 27):
        agent_id = random.randint(26, 50)  # Random agentID between 1 and 100
        seller_id = random.randint(51, 75)  # Random sellerID between 1 and 100
        car_plate_no = fake.bothify(
            text="####", letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        )  # Random car plate no.
        price = random.randint(50000, 500000)  # Random price between 50,000 and 500,000
        views = []

        # Generate unique views for this listing
        num_views = random.randint(
            5, 15
        )  # Each listing will have between 5 to 15 views
        seen_buyers = set()

        for _ in range(num_views):
            while True:
                buyer_id = random.randint(1, 100)  # Random buyerID between 1 and 100
                date = random_date(start_date, end_date)
                if (buyer_id, date) not in seen_buyers:
                    seen_buyers.add((buyer_id, date))
                    break
            views.append({"buyerID": buyer_id, "date": {"$date": date}})

        mock_data.append(
            {
                "listingID": listing_id,
                "agentID": agent_id,
                "sellerID": seller_id,
                "carPlateNo": car_plate_no,
                "carMake": random.choice(brands),
                "carModel": random.choice(models),
                "price": price,
                "desc": fake.text(max_nb_chars=200),
                "status": "Available",
                "image": "http://localhost:5000/src/assets/toyota.jpg",
                "views": views,
            }
        )

    return mock_data


# Generate 100 mock records
mock_data = generate_mock_data(5)

# Write to a JSON file
with open("mock_data.json", "w") as f:
    json.dump(mock_data, f, indent=4)

print("Mock data generated and saved to mock_data.json")
