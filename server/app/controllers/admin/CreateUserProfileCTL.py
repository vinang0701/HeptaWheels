from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserProfile import UserProfile
from app.db import get_database
from app.routes.admin_routes import admin


class CreateUserProfileCTL:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def createProfile(self, profile_name):
        try:
            isCreated = self.userProfile_entity.createProfile(profile_name)
            if not isCreated:
                return False
            return isCreated
        except Exception as e:
            raise e


@admin.route("/api/profiles", methods=["POST"])
def createProfile():
    data = request.json
    profile_name = data["profile_name"]

    createUPController = CreateUserProfileCTL()

    try:
        isCreated = createUPController.createProfile(profile_name)
        if isCreated:
            return (
                jsonify(True),
                200,
            )
        else:
            return (
                jsonify(False),
                400,
            )
    except Exception as e:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": str(e),
                    "isCreated": False,
                }
            ),
            500,
        )
