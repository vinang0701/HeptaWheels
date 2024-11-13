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
        if not listings:
            return []
        return listings


@buyer.route("/api/buyer/wishlist", methods=["GET"])
def viewShortlist():
    buyerID = int(request.args.get("buyerID"))
    viewShortlistCTL = ViewShortlistCTL()
    try:
        listings = viewShortlistCTL.viewShortlist(buyerID)
        if not listings:
            return (
                jsonify(listings),
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
