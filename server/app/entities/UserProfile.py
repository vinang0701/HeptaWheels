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

    def viewProfile(self, profile_name):
        user_profile = self.collection.find_one(
            {"profile_name": profile_name}, {"_id": 0}
        )
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

    def updateUserProfile(
        self, currentProfile_name, profile_name, permissions, profile_status
    ):
        # Check if profile name changed
        # If changed, update all user accounts that

        try:
            self.collection.update_one(
                {"profile_name": currentProfile_name},
                {
                    "$set": {
                        "profile_name": profile_name,
                        "permissions": permissions,
                        "status": profile_status,
                    }
                },
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")

    def suspendProfile(self, profile_name):
        # Get profile to check for status
        # Check status - if status is inactive,
        # return False to user to show that
        # profile is already suspended
        profile = self.getUserProfile(profile_name)

        current_status = profile["status"]
        if current_status == "Suspended":
            return False
        else:
            try:
                self.collection.update_one(
                    {"profile_name": profile_name}, {"$set": {"status": "Suspended"}}
                )
                return True
            except Exception as e:
                raise RuntimeError(f"Unexpected error has occurred: {str(e)}")
