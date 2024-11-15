"""
This is a controller class that controls the flow
of logic for buyer viewing a specific car listing.
It will call the Listing entity to get the specifed listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.buyer_routes import buyer


class BuyerViewListingCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def viewListing(self, listingID, buyerID):
        try:
            listing = self.carListing_entity.viewListing(listingID, buyerID)
            if listing is None:
                return None
            return listing
        except Exception as e:
            raise e


@buyer.route("/api/buyer/listings/<int:listingID>", methods=["GET"])
def viewListing(listingID):
    buyerID = int(request.args.get("buyerID"))
    buyerViewListingCTL = BuyerViewListingCTL()
    try:
        listing = buyerViewListingCTL.viewListing(listingID, buyerID)
        if listing is None:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "No listing found...",
                        "listing": listing,
                    }
                ),
                400,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Listings found!",
                        "listing": listing,
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
