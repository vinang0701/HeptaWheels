# Entity class to fetch user account data

# Needs a validateUser(email, password) function
# ignore above

from flask import jsonify
from pymongo import DESCENDING
from db import get_database


class UserAccount:
    def __init__(self):
        database = get_database()
        self.collection = database["users"]

    def find_user_by_email(self, email):
        """
        Fetch a user by their email from MongoDB.
        """
        try:
            user = self.collection.find_one({"email": email}, {"_id": 0})
            if user is None:
                return None
            return user
        except Exception as e:
            raise RuntimeError(f"An unexpected error as occured: {str(e)}")

    def getAllUsers(self):
        """
        Fetch all users from MongoDB.
        """
        try:
            users = list(self.collection.find({}, {"_id": 0}).sort("userID", 1))
            if users is None:
                return None
            return users
        except Exception as e:
            raise RuntimeError(f"An unexpected error as occured: {str(e)}")

    def validateUser(self, email, pwd):
        user = self.find_user_by_email(email)
        if user is None:
            return None
        else:
            if pwd == user["password"]:
                print(user)
                return user
            else:
                return None

        return None

    def createUser(self, email, pwd, role):
        # Check if user already exists
        # checkDuplUser = self.find_user_by_email(email)
        last_user = self.collection.find_one(sort=[("userID", DESCENDING)])
        next_user_id = (last_user["userID"] + 1) if last_user else 1
        try:
            self.collection.insert_one(
                {
                    "userID": next_user_id,
                    "email": email,
                    "password": pwd,
                    "status": "Active",
                    "role": role,
                }
            )
            return True
        except Exception as e:
            return False
            # return jsonify({"status": "error", "message": str(e)}), 500
        """
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
                return jsonify({"status": "success", "message": "User added successfully"}), 200
            except Exception as e:
                return jsonify({"status": "error", "message": str(e)}), 500
        """

    def suspend(self, email):
        try:
            user = self.find_user_by_email(email)
            if user is None:
                raise ValueError("User not found!")
                return False

            self.collection.update_one(
                {"email": email}, {"$set": {"status": "Inactive"}}
            )
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")

    def updateUserAccount(self, currentEmail, email, pwd, status, role):
        try:
            self.collection.update_one(
                {"email": currentEmail},
                {
                    "$set": {
                        "email": email,
                        "password": pwd,
                        "status": status,
                        "role": role,
                    }
                },
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")