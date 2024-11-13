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
        try:
            listings = self.carListing_entity.retrieveCarListings()
            if not listings:
                return []
            return listings
        except Exception as e:
            raise e


@buyer.route("/api/buyer/listings", methods=["GET"])
def retrieveCarListings():
    buyerViewListingCTL = BuyerViewListingsCTL()
    try:
        listings = buyerViewListingCTL.retrieveCarListings()
        if len(listings) == 0:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "No listing found...",
                        "listings": listings,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Listings found!",
                        "listings": listings,
                    }
                ),
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
