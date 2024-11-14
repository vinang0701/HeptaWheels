import json
import random
import string

"""
userID
1
email
"agent@gmail.com"
password
"123"
status
"Suspended"
role
"Agent"
"""

# Generate x number of users without duplicate emails
users = []
unique_emails = set()
roles = ["User Admin", "Buyer", "Seller", "Agent"]
status = ["Active", "Inactive"]


# Function to generate a random email
def generate_email():
    names = ["bob", "james", "charles", "alice", "mary", "charlie"]
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    return f"{random.choice(names)}{random.randint(1, 100)}@{random.choice(domains)}"


def lines_that_contain(string, fp):
    return [line for line in fp if string in line]


# Function to read every every and store it in unique_emails
# Open and read the users.json file
with open("users.json", "r") as file:
    userss = json.load(file)

    # Loop through each user and add their email to the unique_emails set
    for user in userss:
        unique_emails.add(user["email"])


for user_id in range(77, 101):
    while True:
        email = generate_email()
        if email not in unique_emails:  # Ensure email is unique
            unique_emails.add(email)
            break

    user = {
        "userID": int(user_id),
        "email": email,
        "password": "123",
        "status": "Active",
        "role": "Buyer",
    }
    users.append(user)

# Write the result to a JSON file
with open("users.json", "a") as json_file:
    json.dump(users, json_file, indent=4)

print("User data has been written to users.json")
