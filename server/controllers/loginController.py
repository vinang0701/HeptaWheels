# Controller class to control the flow of traffic to
# send to UserAccount entity to fetch data

from flask import jsonify

class LoginController:
    def __init__(self, user_entity):
        self.user_entity = user_entity

    def validateUser(self, email, pwd):
        """
        Process login logic: Call User Entity to fetch user from DB and verify the password.
        """

        user = self.user_entity.validateUser(email, pwd)

        # Ignore this: Need a function to return UserAccount object for front end

        #For now just these statements
        if user is None:
            return jsonify({"status": "error", "message": "Invalid password"}), 401
        else:
            return user
        
