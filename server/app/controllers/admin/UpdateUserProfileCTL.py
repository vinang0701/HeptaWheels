from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class UpdateUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def updateProfile(self, profile, permissions, status):
        isUpdated = self.userProfile_entity.updateProfile(profile, permissions, status)
        if isUpdated:
            return True
        else:
            return False


@admin.route("/api/profiles/<string:profile>", methods=["PUT"])
def updateProfile(profile):
    data = request.json
    updateUserProfileCTL = UpdateUserProfileCTL()
    # User Profile data fields
    permissions = data["permissions"]
    profile_status = data["status"]
    try:
        isUpdated = updateUserProfileCTL.updateProfile(
            profile, permissions, profile_status
        )
        if isUpdated:
            return (
                jsonify(True),
                200,
            )
        else:
            return (jsonify(False), 200)
    except Exception as e:
        return (
            jsonify({"status": "error", "message": str(e)}),
            500,
        )
