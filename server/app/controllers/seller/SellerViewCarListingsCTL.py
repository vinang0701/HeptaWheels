"""
This is a controller class that controls the flow of
logic for seller to view all car listings
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.seller_routes import seller


class SellerViewCarListingsCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def viewCarListings(self, sellerID):
        try:
            listings = self.carListing_entity.sellerViewCarListings(sellerID)
            if not listings:
                return None
            return listings
        except Exception as e:
            raise e


# Get sellerID from json http request
@seller.route("/api/seller/listings", methods=["GET"])
def viewCarListings():
    sellerID = int(request.args.get("sellerID"))

    sellerViewCarListingsCTL = SellerViewCarListingsCTL()
    if sellerID:
        try:
            listings = sellerViewCarListingsCTL.viewCarListings(sellerID)
            if not listings:
                return (
                    jsonify(
                        {
                            "status": "error",
                            "message": "No listing found...",
                            "listings": listings,
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
