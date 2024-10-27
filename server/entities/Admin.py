from flask import jsonify

class Admin:
    def __init__(self, db):
        self.collection = db["users"]
    
    def getAllUser():
        users = self.collection.find()
        return users