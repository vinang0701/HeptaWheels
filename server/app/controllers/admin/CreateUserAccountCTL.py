# Controller class to control the flow of traffic of
# admin tasks
from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.UserAccount import UserAccount
from app.db import get_database
from app.routes.admin_routes import admin


class CreateUserAccountCTL:
    def __init__(self):
        self.user_account_entity = UserAccount()

    def createAcc(self, email, pwd, role):
        isCreated = self.user_account_entity.createAcc(email, pwd, role)
        if isCreated is True:
            return True
        else:
            return False


@admin.route("/api/users", methods=["POST"])
def createAcc():
    user_data = request.json
    email = user_data["email"]
    pwd = user_data["password"]
    role = user_data["role"]
    createUAController = CreateUserAccountCTL()

    try:
        isCreated = createUAController.createAcc(email, pwd, role)
        if isCreated:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "User has been created!",
                        "isCreated": isCreated,
                    }
                ),
                201,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "User is already created.",
                        "isCreated": isCreated,
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
