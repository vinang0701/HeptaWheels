"""
This is a controller class that controls the flow of
logic for seller to view all car listings
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.PreferredListings import PreferredListings
from app.db import get_database
from app.routes.seller_routes import seller


class TrackShortlistCTL:
    def __init__(self):
        self.preferredListings_entity = PreferredListings()

    def viewShortlistNumber(self, listingID):
        try:
            numOfShortlists = self.preferredListings_entity.viewShortlistNumber(
                listingID
            )
            if not numOfShortlists:
                return []
            return numOfShortlists
        except Exception as e:
            raise e


# Get sellerID from json http request
@seller.route("/api/seller/listings/views", methods=["GET"])
def viewShortlistNumber():
    listingID = int(request.args.get("listingID"))

    trackShortlistCTL = TrackShortlistCTL()
    if listingID:
        try:
            numOfShortlists = trackShortlistCTL.viewShortlistNumber(listingID)
            if not numOfShortlists:
                return (
                    jsonify([]),
                    200,
                )
            else:
                return (
                    jsonify(numOfShortlists),
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
