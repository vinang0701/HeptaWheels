"""
This is a controller class that controls the flow
of logic for buyer to view his shortlist
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.PreferredListings import PreferredListings
from app.db import get_database
from app.routes.buyer_routes import buyer


class ViewShortlistCTL:
    def __init__(self):
        self.preferredListing_entity = PreferredListings()

    def viewShortlist(self, buyerID):
        listings = self.preferredListing_entity.viewShortlist(buyerID)
        if listings is None:
            return None
        return listings


@buyer.route("/api/buyer/shortlist", methods=["GET"])
def viewShortlist():
    buyerID = int(request.args.get("buyerID"))
    viewShortlistCTL = ViewShortlistCTL()
    try:
        listing = viewShortlistCTL.viewShortlist(buyerID)
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
