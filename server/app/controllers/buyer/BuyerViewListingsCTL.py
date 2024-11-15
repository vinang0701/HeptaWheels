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

    def retrieveCarListings(self):
        listings = self.carListing_entity.retrieveCarListings()
        return listings


@buyer.route("/api/buyer/listings", methods=["GET"])
def retrieveCarListings():
    buyerViewListingCTL = BuyerViewListingsCTL()
    try:
        listings = buyerViewListingCTL.retrieveCarListings()
        return (
            jsonify(listings),
            200,
        )
    except Exception as e:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": str(e),
                }
            ),
            500,
        )
