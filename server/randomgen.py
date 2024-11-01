import json
import random
import string


# Function to generate a random email
def generate_email():
    names = ["bob", "james", "charles", "alice", "mary", "charlie"]
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    return f"{random.choice(names)}{random.randint(1, 100)}@{random.choice(domains)}"


# Function to generate a random password
# def generate_password(length=8):
#     characters = string.ascii_letters + string.digits + string.punctuation
#     return ''.join(random.choice(characters) for i in range(length))

# Generate x number of users without duplicate emails
users = []
unique_emails = set()
roles = ["User Admin", "Buyer", "Seller", "Agent"]
status = ["Active", "Inactive"]

for user_id in range(1, 41):
    while True:
        email = generate_email()
        if email not in unique_emails:  # Ensure email is unique
            unique_emails.add(email)
            break

    user = {
        "userID": user_id,
        "email": email,
        "password": "123",  # Random password
        "status": random.choice(status),
        "role": random.choice(roles),
    }
    users.append(user)

# Write the result to a JSON file
with open("users.json", "w") as json_file:
    json.dump(users, json_file, indent=4)

print("User data has been written to users.json")
