"""
This is a controller class that controls the flow
of logic for buyer viewing all car listings.
It will call the Listing entity to get all listings.
"""

from flask import jsonify
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.buyer_routes import buyer


class BuyerViewListingsCTL:
    def __init__(self):
        self.carListing_entity = CarListing()
