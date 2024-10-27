from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin
from controllers.AdminController import AdminController
from entities.UserAccount import UserAccount
from db import get_database

admin = Blueprint("admin", __name__)

# Init objects required
database = get_database()
user_account_entity = UserAccount(database)
admin_controller = AdminController(user_account_entity)

# Test
@admin.route("/admin")
def hi():
    return "Hello!"

# Method to get all users from admin controller
@admin.route("/api/users", methods=['GET'])
@cross_origin()
def getAllUsers():
    users = admin_controller.getAllUsers()
    return jsonify({"Status": "success", "users": users})

@admin.route("/api/users", methods=['PUT'])
@cross_origin()
def createUser():
    user_data = request.get_json()
    print(user_data)
    user_email = user_data['email']
    user_pwd = user_data['password']
    user_role = user_data['role']
    return admin_controller.createUser(user_email, user_pwd, user_role)


