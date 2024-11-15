from flask import jsonify
from pymongo import DESCENDING
from app.db import get_database


class UserProfile:
    def __init__(self):
        database = get_database()
        self.collection = database["profiles"]

    def getUserProfiles(self):
        try:
            user_profiles = list(self.collection.find({}, {"_id": 0}))
            if len(user_profiles) == 0:
                return user_profiles
            return user_profiles
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def viewProfile(self, profile):
        user_profile = self.collection.find_one({"profile_name": profile}, {"_id": 0})
        if not user_profile:
            return None
        return user_profile

    def searchProfile(self, query):
        profile = self.collection.find_one(
            {"profile_name": {"$regex": f"{query}", "$options": "i"}}, {"_id": 0}
        )
        if profile is None:
            return None
        return profile

    def createProfile(self, profile_name):
        try:
            profile_data = {
                "profile_name": profile_name,
                "permissions": [],
                "status": "Active",
            }

            self.collection.insert_one(profile_data)
            return True
        except Exception as e:
            print(f"Unexpected error occurred: {str(e)}")
            return False

    def updateProfile(self, profile, permissions, status):
        try:
            self.collection.update_one(
                {"profile_name": profile},
                {
                    "$set": {
                        "permissions": permissions,
                        "status": status,
                    }
                },
            )
            return True
        except Exception as e:
            print(f"Unexpected error has occurred: {str(e)}")
            return False

    def suspendProfile(self, profile):
        userProfile = self.collection.find_one({"profile_name": profile}, {"_id": 0})
        current_status = userProfile["status"]
        if current_status == "Suspended":
            return False
        else:
            try:
                self.collection.update_one(
                    {"profile_name": profile}, {"$set": {"status": "Suspended"}}
                )
                return True
            except Exception as e:
                print(f"Unexpected error has occurred: {str(e)}")
                return False
