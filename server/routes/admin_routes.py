from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin
from controllers.AdminController import AdminController
# from controllers.ViewUserAccountController import ViewUserAccountController
# from entities.UserAccount import UserAccount
# from db import get_database

admin = Blueprint("admin", __name__)

# Init objects required
    # database = get_database()
    # user_account_entity = UserAccount(database)
    # admin_controller = AdminController(user_account_entity)

# Test
@admin.route("/admin")
def hi():
    return "Hello!"







# @admin.route("/api/users", methods=['PUT'])
# @cross_origin()
# def createUser():
#     try:
#         user_data = request.get_json()
#         print(user_data)
#         user_email = user_data['email']
#         user_pwd = user_data['password']
#         user_role = user_data['role']
#         isCreated = admin_controller.createUser(user_email, user_pwd, user_role)
#         if(isCreated is True):
#             return jsonify({"status": "success", "message": "User has been created", "isCreated": isCreated}), 200
#         else:
#             return jsonify({"status": "error", "message": "User has been created", "isCreated": isCreated}), 500
#     except Exception as e:
#         return jsonify({"status": "error", "message": str(e)})

