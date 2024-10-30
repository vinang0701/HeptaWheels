from flask import jsonify, request
from flask_cors import cross_origin
from entities.UserProfile import UserProfile
from db import get_database
from routes.admin_routes import admin

class UpdateUserProfileController():
    def __init__(self):
        self.userProfile_entity = UserProfile()
    
    def updateUserProfile(self, currentProfile_name, profile_name, status):
        try:
            isUpdated = self.userProfile_entity.updateUserProfile(currentProfile_name, profile_name, status)
            if(isUpdated):
                return True
        except Exception as e:
            raise e

@admin.route("/api/profiles/<string:currentProfile_name>", methods=["PUT"])
def updateUserProfile(currentProfile_name):
    data = request.json
    updateUPController = UpdateUserProfileController()
    profile_name = data["profile_name"]
    profile_status = data["status"]
    try:
        isUpdated = updateUPController.updateUserProfile(currentProfile_name, profile_name, profile_status)
        if(isUpdated):
            return jsonify({"status": "success", "message": "User profile successfully updated!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": "User profile cannot be updated.", "error message": str(e)}), 500
