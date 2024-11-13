"""
This is a controller class that controls the flow of
logic for buyer to shortlist a car listing
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.PreferredListings import PreferredListings
from app.db import get_database
from app.routes.buyer_routes import buyer


class BuyerShortlistCTL:
    def __init__(self):
        self.preferredListing_entity = PreferredListings()

    def saveCarListing(self, buyerID, listingID):
        isShortlisted = self.preferredListing_entity.saveCarListing(buyerID, listingID)
        if not isShortlisted:
            return False
        return isShortlisted


@buyer.route("/api/buyer/wishlist", methods=["POST"])
def saveCarListing():
    # Data to get from front end in json
    data = request.json
    buyerID = data["buyerID"]
    listingID = data["listingID"]

    buyerShortlistCTL = BuyerShortlistCTL()
    isShortlisted = buyerShortlistCTL.saveCarListing(buyerID, listingID)
    if isShortlisted:
        return jsonify(isShortlisted)
    else:
        return jsonify(isShortlisted)
