from flask import jsonify
from flask_cors import cross_origin
from entities.UserProfile import UserProfile
from db import get_database
from routes.admin_routes import admin


class ViewUserProfileController:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def getUserProfiles(self):
        try:
            user_profiles = self.userProfile_entity.getUserProfiles()
            if len(user_profiles) == 0:
                return None
            return user_profiles
        except Exception as e:
            # raise RuntimeError(f"Unexpected error occurred: {str(e)}")
            return e

    # Remember to include changing to lower case for checking
    def getUserProfile(self, profile_name):
        user_profile = self.userProfile_entity.getUserProfile(profile_name)
        return user_profile


@admin.route("/api/profiles", methods=["GET"])
def getUserProfiles():
    viewUPController = ViewUserProfileController()
    user_profiles = viewUPController.getUserProfiles()
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


# Remember to include changing to lower case for checking
@admin.route("/api/profiles/<string:profile_name>", methods=["GET"])
def getUserProfile(profile_name):
    viewUPController = ViewUserProfileController()
    user_profile = viewUPController.getUserProfile(profile_name)
    if user_profile is None:
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
                    "message": "User profile found!",
                    "user_profile": user_profile,
                }
            ),
            200,
        )
