"""
This is a controller class that controls the flow
of logic for buyer viewing all car listings.
It will call the Listing entity to get all listings.
"""

from flask import jsonify
from flask_cors import cross_origin
from entities.UserAccount import UserAccount
from db import get_database
from routes.buyer_routes import buyer