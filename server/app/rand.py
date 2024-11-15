import json
import random
import faker
from datetime import datetime, timedelta

# Initialize Faker instance for generating random data
fake = faker.Faker()

# Lists of car models and brands
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
brands = ["Toyota", "BYD", "Audi"]


# Helper function to generate random ISODate format
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_date = start_date + timedelta(days=random_days)
    return random_date.isoformat()


# Function to generate mock data with 4 listings per seller
def generate_mock_data():
    mock_data = []
    seller_ids = range(51, 76)  # Seller IDs (from 51 to 75, inclusive)
    start_date = datetime(2024, 11, 8)
    end_date = datetime(2024, 11, 15)

    listing_id = 0  # Start listing IDs
    used_combinations = set()  # Set to track unique (agentID, carPlateNo) combinations

    # Iterate over each seller ID
    for seller_id in seller_ids:
        # Generate 4 listings for each seller
        for _ in range(4):
            # Generate a unique (agentID, carPlateNo) pair
            while True:
                agent_id = random.randint(26, 50)  # Random agentID
                car_plate_no = fake.bothify(
                    text="####", letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                )  # Random car plate number
                if (agent_id, car_plate_no) not in used_combinations:
                    used_combinations.add((agent_id, car_plate_no))
                    break

            price = random.randint(50000, 500000)  # Random price
            views = []
            seen_buyers = set()  # Set to track unique (buyerID, date) combinations

            # Generate views for the listing
            num_views = random.randint(5, 15)

            for _ in range(num_views):
                while True:
                    buyer_id = random.randint(76, 100)  # Random buyer ID
                    date = random_date(start_date, end_date)
                    # Ensure the combination of buyerID and date is unique
                    if (buyer_id, date) not in seen_buyers:
                        seen_buyers.add((buyer_id, date))
                        break
                views.append({"buyerID": buyer_id, "date": {"$date": date}})

            # Append listing to the mock data
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

            # Increment listing ID
            listing_id += 1

    return mock_data


# Generate the mock data
mock_data = generate_mock_data()

# Write the mock data to a JSON file
with open("mock_data.json", "w") as f:
    json.dump(mock_data, f, indent=4)

print("Mock data generated and saved to mock_data.json")
