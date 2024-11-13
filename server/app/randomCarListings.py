import json
import random
import string

toyotaModels = ["Corolla Altis", "Sienta", "Camry", "Alphard"]
bmwModels = ["i7", "iX", "i5", "XM"]
mazdaModels = ["CX-4", "CX-5", "CX-8", "Roadster"]


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
print(json_data)
