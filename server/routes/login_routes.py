from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin
# Importing controller and entity
from controllers.LoginController import LoginController
from entities.UserAccount import UserAccount
from db import get_database

login_routes = Blueprint("login_routes", __name__)

# Initialize Entity and Controller
database = get_database()
userAccount = UserAccount()
loginController = LoginController()


@login_routes.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    """
    Handle login request by passing data to the login controller.
    """
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    # Delegate the login logic to the login controller
    try:
        user = loginController.validateUser(email, password)

        if user is None:
            return jsonify({"status": "error", "message": "Email/password is wrong!", "user_data": None}),404
        else:
            user_data = {
                "email": user['email'],
                "role": user['role'].lower()
            }
            return jsonify({"status": "success", "message": "Login successful!", "user_data": user}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
