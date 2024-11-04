from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin

login = Blueprint("login", __name__)

# Test
@login.route("/login")
def hi():
    return "Hello!"