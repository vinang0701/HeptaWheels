"""
This is a controller class that controls the flow of
logic for seller to view all car listings
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.seller_routes import seller


class SellerTrackViewsCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def getNumOfView(self, listingID):
        try:
            numOfViews = self.carListing_entity.getNumOfView(listingID)
            if not numOfViews:
                return []
            return numOfViews
        except Exception as e:
            raise e


# Get sellerID from json http request
@seller.route("/api/seller/listings/views", methods=["GET"])
def getNumOfView():
    listingID = int(request.args.get("listingID"))

    sellerTrackViewsCTL = SellerTrackViewsCTL()
    if listingID:
        try:
            numOfViews = sellerTrackViewsCTL.getNumOfView(listingID)
            if not numOfViews:
                return (
                    jsonify([]),
                    200,
                )
            else:
                return (
                    jsonify(numOfViews),
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
