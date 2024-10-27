import json
import random
import string

# Function to generate a random email
def generate_email(name):
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    return f"{name.lower()}{random.randint(1, 100)}@{random.choice(domains)}"

# Function to generate a random password
def generate_password(length=8):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for i in range(length))

# Generate 30 users
users = []
roles = ["User Admin", "Buyer", "Seller", "Agent"]
status = ["Active", "Inactive"]
for user_id in range(1, 41):
    name = f"user{user_id}"
    user = {
        "userID": user_id,
        "email": generate_email(name),
        "password": generate_password(),
        "status":  random.choice(status),
        "role": random.choice(roles)
    }
    users.append(user)

# Convert to JSON string
users_json = json.dumps(users, indent=4)
print(users_json)
