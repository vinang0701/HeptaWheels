# Controller class to control the flow of traffic of
# admin suspending specified user account
from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class SuspendProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def suspendProfile(self, profile):
        suspendSuccessful = self.userProfile_entity.suspendProfile(profile)
        if suspendSuccessful:
            return True
        else:
            return False


@admin.route("/api/profiles/<string:profile>/suspend", methods=["PUT"])
def suspendProfile(profile):
    suspendProfileCTL = SuspendProfileCTL()
    try:
        suspendSuccessful = suspendProfileCTL.suspendProfile(profile)
        if suspendSuccessful:
            return (
                jsonify(True),
                200,
            )
        else:
            return (
                jsonify(False),
                200,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
