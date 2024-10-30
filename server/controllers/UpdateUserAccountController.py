from flask import jsonify, request
from flask_cors import cross_origin
from entities.UserAccount import UserAccount
from db import get_database
from routes.admin_routes import admin

class UpdateUserAccountController():
    def __init__(self):
        self.user_entity = UserAccount()
    
    def updateUserAccount(self, currentEmail, email, pwd, status, role):
        try:
            isUpdated = self.user_entity.updateUserAccount(currentEmail, email, pwd, status, role)
            if(isUpdated):
                return True
        except Exception as e:
            raise e

@admin.route("/api/users/<string:email>", methods=["PUT"])
def updateUserAccount(email):
    data = request.json
    updateUAController = UpdateUserAccountController()
    user_email = data["email"]
    user_pwd = data["password"]
    user_status = data["status"]
    user_role = data["role"]
    try:
        isUpdated = updateUAController.updateUserAccount(email, user_email, user_pwd, 
                                                        user_status, user_role)
        if(isUpdated):
            return jsonify({"status": "success", "message": "User account successfully updated!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": "User account cannot be updated.", "error message": str(e)}), 500
