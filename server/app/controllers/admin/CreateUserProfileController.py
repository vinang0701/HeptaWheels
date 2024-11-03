from flask import jsonify, request
from flask_cors import cross_origin
from entities.UserProfile import UserProfile
from db import get_database
from routes.admin_routes import admin


class CreateUserProfileController:
    def __init__(self):
        self.userProfile_entity = UserProfile()

    def createUserProfile(self, profile_name):
        try:
            isCreated = self.userProfile_entity.createUserProfile(profile_name)
            if not isCreated:
                return False
            return isCreated
        except Exception as e:
            raise e


@admin.route("/api/profiles", methods=["POST"])
def createUserProfile():
    data = request.json
    profile_name = data["profile_name"]
    createUPController = CreateUserProfileController()
    try:
        isCreated = createUPController.createUserProfile(profile_name)
        if isCreated:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "User profile successfully created",
                        "isCreated": isCreated,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "User profile could not be created. Try again!",
                        "isCreated": isCreated,
                    }
                ),
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
