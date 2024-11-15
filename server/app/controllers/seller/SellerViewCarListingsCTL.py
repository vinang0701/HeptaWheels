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

    def sellerRetrieveCarListings(self, sellerID):
        listings = self.carListing_entity.sellerRetrieveCarListings(sellerID)
        if not listings:
            return []
        return listings


# Get sellerID from json http request
@seller.route("/api/seller/listings", methods=["GET"])
def sellerRetrieveCarListings():
    sellerID = int(request.args.get("sellerID"))

    sellerViewCarListingsCTL = SellerViewCarListingsCTL()
    if sellerID:
        try:
            listings = sellerViewCarListingsCTL.sellerRetrieveCarListings(sellerID)
            if not listings:
                return (
                    jsonify([]),
                    200,
                )
            else:
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
