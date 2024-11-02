# Controller class to control the flow of traffic of
# admin suspending specified user account
from flask import jsonify
from flask_cors import cross_origin
from entities.UserAccount import UserAccount
from db import get_database
from routes.admin_routes import admin


class SuspendUserAccountController:
    def __init__(self):
        self.user_entity = UserAccount()

    def suspend(self, email):
        """
        Change user status to inactive
        Check user's status.
        if user status is inactive, return error/message
        to indicate status is already inactive
        else: change status from active to inactive
        """

        # First retrieve the specified user from email
        user = self.user_entity.find_user_by_email(email)

        # check if user is found
        if user is None:
            raise ValueError("User not found!")

        # check if status == "active"
        # call user_entity to change to inactive
        isSuspended = False
        if user["status"].lower() == "active":
            return self.user_entity.suspend(email)
        elif user["status"].lower() == "inactive":
            return False


@admin.route("/api/users/<string:email>/suspend", methods=["PUT"])
def suspendUserAccount(email):
    suspendUAController = SuspendUserAccountController()
    try:
        isSuspended = suspendUAController.suspend(email)
        if isSuspended:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "User has been suspended",
                        "isSuspended": isSuspended,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "User cannot be suspended",
                        "isSuspended": isSuspended,
                    }
                ),
                400,
            )
    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
