# Controller class to control the flow of traffic of
# admin suspending specified user account
from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserAccount import UserAccount
from app.db import get_database
from app.routes.admin_routes import admin


class SuspendUserAccountCTL:
    def __init__(self):
        self.user_entity = UserAccount()

    def suspendAccount(self, email):
        """
        Change user status to inactive
        Check user's status.
        if user status is inactive, return error/message
        to indicate status is already inactive
        else: change status from active to inactive
        """
        try:
            isSuspended = self.user_entity.suspendAccount(email)

            # Check what is returned from UserAccount entity
            # If true, means user account successfully suspended

            if isSuspended:
                return True
            else:
                return False
        except Exception as e:
            raise e


@admin.route("/api/users/<string:email>/suspend", methods=["PUT"])
def suspendAccount(email):
    suspendUAController = SuspendUserAccountCTL()
    try:
        isSuspended = suspendUAController.suspendAccount(email)
        if isSuspended:
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
