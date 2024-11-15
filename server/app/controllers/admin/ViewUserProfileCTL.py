from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class ViewUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    # Remember to include changing to lower case for checking
    def viewProfile(self, profile):
        user_profile = self.userProfile_entity.viewProfile(profile)
        return user_profile


# Remember to include changing to lower case for checking
@admin.route("/api/profiles/<string:profile>", methods=["GET"])
def viewProfile(profile):
    viewUPController = ViewUserProfileCTL()
    user_profile = viewUPController.viewProfile(profile)
    try:
        return (
            jsonify(user_profile),
            200,
        )
    except Exception as e:
        return jsonify({"status": "error", "message": "str(e)"}), 500
