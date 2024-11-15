from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class GetAllProfilesCTL:
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


@admin.route("/api/profiles", methods=["GET"])
def viewProfiles():
    viewUPController = GetAllProfilesCTL()
    user_profiles = viewUPController.viewProfiles()
    if not user_profiles:
        return (
            jsonify(None),
            404,
        )
    else:
        return (
            jsonify(user_profiles),
            200,
        )
