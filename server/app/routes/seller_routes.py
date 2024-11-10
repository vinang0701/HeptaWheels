from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin

seller = Blueprint("seller", __name__)


# Test
@seller.route("/seller")
def hi():
    return "Hello! Seller"
