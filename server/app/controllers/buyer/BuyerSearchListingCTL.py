"""
This is a controller class that controls the flow of
logic for buyer to search specified car listing
based on given query
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.buyer_routes import buyer


class BuyerSearchListingCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def searchListing(self, query):
        try:
            listings = self.carListing_entity.buyerSearchListing(query)
            if not listings:
                return []
            else:
                return listings
        except Exception as e:
            raise e


@buyer.route("/api/buyer/listings/search", methods=["POST"])
def searchListing():
    # Data to get from front end in json
    data = request.json
    query = data["query"]
    if query != "":
        try:
            buyerSearchListingCTL = BuyerSearchListingCTL()
            listings = buyerSearchListingCTL.searchListing(query)

            if listings:
                return (
                    jsonify(listings),
                    200,
                )
            else:
                return (
                    jsonify([]),
                    400,
                )
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
