# Controller class to control the flow of traffic of
# admin viewing individual user account
from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserAccount import UserAccount
from app.db import get_database
from app.routes.admin_routes import admin


class SearchUserCTL:
    def __init__(self):
        self.user_entity = UserAccount()

    def searchUser(self, email):
        user = self.user_entity.find_user_by_email(email)
        if user is None:
            return None
        return user


@admin.route("/api/users/search", methods=["POST"])
def searchUser():
    data = request.json
    email = data["email"]
    searchUserCTL = SearchUserCTL()
    try:
        user = searchUserCTL.searchUser(email)
        if user is None:
            return (
                jsonify(None),
                400,
            )
        return (
            jsonify(user),
            200,
        )
    except Exception as e:
        return (
            jsonify({"status": "error", "message": "An unexpected error occurred."}),
            500,
        )
