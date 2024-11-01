from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin

admin = Blueprint("admin", __name__)

# Test
@admin.route("/admin")
def hi():
    return "Hello!"

