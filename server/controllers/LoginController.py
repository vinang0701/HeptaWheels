# Controller class to control the flow of traffic to
# send to UserAccount entity to fetch data

from flask import jsonify
from entities import UserAccount
from db import get_database


class LoginController:
    def __init__(self):
        self.user_entity = UserAccount()

    def validateUser(self, email, pwd):
        """
        Process login logic: Call User Entity to fetch user from DB and verify the password.
        """

        user = self.user_entity.validateUser(email, pwd)

        if user is None:
            return None
        else:
            return user
