from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin

buyer = Blueprint("buyer", __name__)

# Test
@buyer.route("/buyer")
def hi():
    return "Buyer!"