# Entity class to fetch user account data

# Needs a validateUser(email, password) function
#ignore above

from flask import jsonify

class UserAccount:
    def __init__(self, db):
        self.collection = db["users"]
    
    def find_user_by_email(self, email):
        """
        Fetch a user by their email from MongoDB.
        """
        user = self.collection.find_one({"email": email}, {"_id": 0})
        return user
    
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
