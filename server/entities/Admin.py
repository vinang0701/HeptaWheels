from flask import jsonify

class Admin:
    def __init__(self, db):
        self.collection = db["users"]
    
    def getAllUser(self):
        users = self.collection.find()
        return users