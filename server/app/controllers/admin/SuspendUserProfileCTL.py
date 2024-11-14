# Controller class to control the flow of traffic of
# admin suspending specified user account
from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class SuspendUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def suspendProfile(self, profile_name):
        """
        Change profile status to inactive
        Check profile's status.
        if profile status is inactive, return error/message
        to indicate status is already inactive
        else: change status from active to inactive
        """
        try:
            suspendSuccessful = self.userProfile_entity.suspendProfile(profile_name)

            # Check what is returned from UserProfile entity
            # If true, means user profile successfully suspended
            if suspendSuccessful:
                return True
            else:
                return False
        except Exception as e:
            raise e


@admin.route("/api/profiles/<string:profile_name>/suspend", methods=["PUT"])
def suspendProfile(profile_name):
    suspendUPController = SuspendUserProfileCTL()
    try:
        suspendSuccessful = suspendUPController.suspendProfile(profile_name)
        if suspendSuccessful:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Profile has been suspended",
                        "suspendSuccessful": suspendSuccessful,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Profile cannot be suspended",
                        "suspendSuccessful": suspendSuccessful,
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
