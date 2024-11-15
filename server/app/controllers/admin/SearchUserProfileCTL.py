# Controller class to control the flow of traffic of
# admin viewing individual user account
from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class SearchUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def searchProfile(self, query):
        profile = self.userProfile_entity.searchProfile(query)
        if profile is None:
            return None
        return profile


@admin.route("/api/profiles/search", methods=["POST"])
def searchProfile():
    data = request.json
    query = data["query"]
    searchUserProfileCTL = SearchUserProfileCTL()
    try:
        profile = searchUserProfileCTL.searchProfile(query)
        if not profile:
            return (
                jsonify(None),
                200,
            )
        return (
            jsonify(profile),
            200,
        )
    except Exception as e:
        return (
            jsonify({"status": "error", "message": "An unexpected error occurred."}),
            500,
        )
