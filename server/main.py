from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from pymongo import MongoClient
import configparser

# Importing controller and entity
from controllers.loginController import LoginController
from entities.userAccount import UserAccount

app = Flask("__name__")
cors = CORS(app, origins='*')

# Load the MongoDB URI from the config file
config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))

uri = "mongodb+srv://vinang0701:hy2k4BqFWQAg1fmI@cluster0.seh9s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)
database = client["heptawheels"]
# collection = database["user"]

# Initialize Entity and Controller
userAccount = UserAccount(database)
loginController = LoginController(userAccount)

@app.route('/')
def index():
    return "Hi!"

@app.route("/api/login", methods=['POST'])
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
        "username": user['username']
    }

    return jsonify({"status": "success", "message": "Login successful!", "user_data": user_data}), 200

    

if __name__ == "__main__":
    app.run(debug=True, port=8080)
    