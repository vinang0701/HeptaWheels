# Controller class to control the flow of traffic of
# admin viewing individual user account
from flask import jsonify
from flask_cors import cross_origin
from app.entities.UserAccount import UserAccount
from app.db import get_database
from app.routes.admin_routes import admin


class ViewUserAccountCTL:
    def __init__(self):
        self.user_entity = UserAccount()

    def viewUserAccount(self, email):
        user = self.user_entity.viewUserAccount(email)
        if user is None:
            return None
        return user

    # def getAllUsers(self):
    #     users = self.user_entity.getAllUsers()

    #     if users is None:
    #         return None
    #     return users


# Route to get specified user in url/<string:email>
# Used to call controller
@admin.route("/api/users/<string:email>", methods=["GET"])
def viewUserAccount(email):
    viewUAController = ViewUserAccountCTL()
    try:
        user = viewUAController.viewUserAccount(email)
        if user is None:
            return (
                jsonify(None),
                200,
            )
        else:
            return (
                jsonify(user),
                200,
            )
    except Exception as e:
        return (
            jsonify({"status": "error", "message": "An unexpected error occurred."}),
            500,
        )


# Method to get all users from admin controller
"""
@admin.route("/api/users", methods=["GET"])
@cross_origin()
def getAllUsers():
    try:
        viewUAController = ViewUserAccountCTL()
        users = viewUAController.getAllUsers()
        if users is None:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "No users found. Please create new users",
                        "users": None,
                    }
                ),
                404,
            )
        return jsonify(
            {"status": "success", "message": "All users retrieved!", "users": users}
        )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e), "users": None}), 500
"""
