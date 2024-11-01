from flask import Blueprint, Flask, jsonify, request
from flask_cors import CORS, cross_origin

agent = Blueprint("agent", __name__)

# Test
@agent.route("/agent")
def hi():
    return "Agent!"