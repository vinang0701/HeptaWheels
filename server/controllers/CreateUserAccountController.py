# Controller class to control the flow of traffic of
# admin tasks
from flask import jsonify, request
from flask_cors import cross_origin
from entities.UserAccount import UserAccount
from db import get_database
from routes.admin_routes import admin

class CreateUserAccountController:
    def __init__(self):
        self.user_account_entity = UserAccount()

    def createUser(self, email, pwd, role):
        isCreated = self.user_account_entity.createUser(email, pwd, role)
        if(isCreated is True):
            return True
        else:
            return False
        
@admin.route("/api/users", methods=['POST'])
def createUser():
    user_data = request.json
    email = user_data['email']
    pwd = user_data['password']
    role = user_data['role']
    createUAController = CreateUserAccountController()
    try:
        isCreated = createUAController.createUser(email, pwd, role)
        if(isCreated):
            return jsonify({"status": "success", "message": "User has been created!","isCreated": isCreated}), 201
        else:
            return jsonify({"status": "error", "message": "User is already created.","isCreated": isCreated}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500