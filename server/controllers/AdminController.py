# Controller class to control the flow of traffic of
# admin tasks
from flask import jsonify
from entities.UserAccount import UserAccount


class AdminController:
    def __init__(self, user_account_entity):
        self.user_account_entity = user_account_entity


    def getAllUsers(self):
        try:
            users = self.user_account_entity.getAllUsers()
            return users
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    def createUser(self, email, pwd, role):
        try:
            return self.user_account_entity.createUser(email, pwd, role)
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500