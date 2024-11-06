from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class UpdateUserProfileController:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def updateUserProfile(self, currentProfile_name, profile_name, permissions, status):
        try:
            isUpdated = self.userProfile_entity.updateUserProfile(
                currentProfile_name, profile_name, permissions, status
            )
            if isUpdated:
                return True
        except Exception as e:
            raise e


@admin.route("/api/profiles/<string:currentProfile_name>", methods=["PUT"])
def updateUserProfile(currentProfile_name):
    data = request.json
    updateUPController = UpdateUserProfileController()
    # User Profile data fields
    profile_name = data["profile_name"]
    permissions = data["permissions"]
    profile_status = data["status"]
    # if request.method == "OPTIONS":
    #     # This is the preflight request
    #     return jsonify({"status": "CORS preflight successful"}), 200
    # Call controller
    try:
        isUpdated = updateUPController.updateUserProfile(
            currentProfile_name, profile_name, permissions, profile_status
        )
        if isUpdated:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "User profile successfully updated!",
                    }
                ),
                200,
            )
    except Exception as e:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "User profile cannot be updated.",
                    "error message": str(e),
                }
            ),
            500,
        )
