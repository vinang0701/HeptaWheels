from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class ViewUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def viewProfiles(self):
        try:
            user_profiles = self.userProfile_entity.getUserProfiles()
            if len(user_profiles) == 0:
                return None
            return user_profiles
        except Exception as e:
            # raise RuntimeError(f"Unexpected error occurred: {str(e)}")
            return e

    # Remember to include changing to lower case for checking
    def viewProfile(self, profile_name):
        user_profile = self.userProfile_entity.viewProfile(profile_name)
        return user_profile


# Remember to include changing to lower case for checking
@admin.route("/api/profiles/<string:profile_name>", methods=["GET"])
def viewProfile(profile_name):
    viewUPController = ViewUserProfileCTL()
    user_profile = viewUPController.viewProfile(profile_name)
    if user_profile is None:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "No user profile found",
                    "user_profile": None,
                }
            ),
            404,
        )
    else:
        return (
            jsonify(
                {
                    "status": "success",
                    "message": "User profile found!",
                    "user_profile": user_profile,
                }
            ),
            200,
        )

@admin.route("/api/profiles", methods=["GET"])
def viewProfiles():
    viewUPController = ViewUserProfileCTL()
    user_profiles = viewUPController.viewProfiles()
    if user_profiles is None:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "No user profile found",
                    "user_profiles": None,
                }
            ),
            404,
        )
    else:
        return (
            jsonify(
                {
                    "status": "success",
                    "message": "User profiles found!",
                    "user_profiles": user_profiles,
                }
            ),
            200,
        )