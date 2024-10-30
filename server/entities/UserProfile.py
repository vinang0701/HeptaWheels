from flask import jsonify
from pymongo import DESCENDING
from db import get_database

class UserProfile:
    def __init__(self):
        database = get_database() 
        self.collection = database["profiles"]

    def getUserProfiles(self):
        try:
            user_profiles = list(self.collection.find({}, {"_id": 0}))
            if(len(user_profiles) == 0):
                return user_profiles
            return user_profiles
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")
        
    def getUserProfile(self, profile_name):
        user_profile = self.collection.find_one({"profile_name": profile_name}, {"_id": 0})
        return user_profile
    
    def createUserProfile(self, profile_name):
        try:
            profile_data = {
                "profile_name": profile_name,
                "status": "Active"
            }
            self.collection.insert_one(profile_data)
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error occurred: {str(e)}")
    
    def updateUserProfile(self, currentProfile_name, profile_name, profile_status):
        try:
            self.collection.update_one({"profile_name": currentProfile_name},
                                       {"$set": {
                                            "profile_name": profile_name,
                                            "status": profile_status
                                            }})
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")