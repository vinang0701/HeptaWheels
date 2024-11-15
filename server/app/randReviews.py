import json
from random import randint, choice


def generate_reviews():
    reviews = []
    used_combinations = set()  # Track unique (agentID, userEmail) pairs
    agent_ids = range(26, 51)  # Agent IDs from 26 to 50
    user_profiles = ["Buyer", "Seller"]  # Possible user profiles

    # Generate unique (agentID, userEmail) pairs
    for agent_id in agent_ids:
        for i in range(4):  # Each agent gets 4 unique reviews
            while True:
                user_email = f"{choice(['buyer', 'seller'])}{randint(2, 100)}@gmail.com"
                if (agent_id, user_email) not in used_combinations:
                    used_combinations.add((agent_id, user_email))
                    break

            # Create the review
            reviews.append(
                {
                    "listingID": randint(1, 100),  # Random listingID
                    "agentID": agent_id,
                    "userEmail": user_email,
                    "userProfile": choice(user_profiles),
                    "rating": randint(1, 5),  # Random rating from 1 to 5
                    "review": choice(
                        [
                            "Excellent service!",
                            "Very responsive and helpful.",
                            "Good agent, highly recommend.",
                            "Not very helpful.",
                            "Provided adequate information.",
                        ]
                    ),
                }
            )

    return reviews


# Generate 100 unique reviews
mock_reviews = generate_reviews()

# Write reviews to a JSON file
with open("agent_reviews.json", "w") as f:
    json.dump(mock_reviews, f, indent=4)

print("Reviews generated and saved to agent_reviews.json")
