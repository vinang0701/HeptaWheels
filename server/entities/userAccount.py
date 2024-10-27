# Entity class to fetch user account data

# Needs a validateUser(email, password) function
#ignore above

from flask import jsonify
from pymongo import DESCENDING

class UserAccount:
    

    def __init__(self, db):
        self.collection = db["users"]
    
    def find_user_by_email(self, email):
        """
        Fetch a user by their email from MongoDB.
        """
        user = self.collection.find_one({"email": email}, {"_id": 0})
        return user

    def getAllUsers(self):
        """
        Fetch all users from MongoDB.
        """
        users = list(self.collection.find({}, {"_id":0}))
        return users
    
    def validateUser(self, email, pwd):
        user = self.find_user_by_email(email)
        if not user:
            return jsonify({"status": "error", "message": "User not found"}), 404
        else:
            if pwd == user['password']:
                print(user)
                return user
            else:
                return None

        return False

    def createUser(self, email, pwd, role):
        # Check if user already exists
        checkDuplUser = self.find_user_by_email(email)
        last_user = self.collection.find_one(sort=[("userID", DESCENDING)])
        next_user_id = (last_user["userID"] + 1) if last_user else 1
        if (checkDuplUser is not None):
            return jsonify({"status": "error", "message": "User already exists"}), 500
        else:
            # If does not exist, insert new user
            try:
                self.collection.insert_one({
                    "userID": next_user_id,
                    "email": email,
                    "password": pwd,
                    "status": "Active",
                    "role": role
                })
                print("Scuba")
                return jsonify({"status": "success", "message": "User added successfully"}), 200
            except Exception as e:
                return jsonify({"status": "error", "message": str(e)}), 500