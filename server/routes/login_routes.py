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
loginController = LoginController(userAccount)


@login_routes.route("/api/login", methods=['POST'])
@cross_origin()
def login():
    """
    Handle login request by passing data to the login controller.
    """
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Check if email and password were provided
    if not email or not password:
        return jsonify({"status": "error", "message": "Missing email or password"}), 400
    
    # Delegate the login logic to the login controller
    user = loginController.validateUser(email, password)

    user_data = {
        "email": user['email'],
        "role": user['role'].lower()
    }

    return jsonify({"status": "success", "message": "Login successful!", "user_data": user_data}), 200

