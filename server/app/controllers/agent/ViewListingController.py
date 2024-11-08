"""
This is a controller class that controls the flow
of logic for used car agent to view a specific listing
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.Listing import Listing
from app.db import get_database
from app.routes.agent_routes import agent


class ViewListingController:
    def __init__(self):
        self.listing_entity = Listing()

    def fetchListingDetails(self, listingID):
        try:
            listing = self.listing_entity.fetchListingDetails(listingID)
            if listing is None:
                return None
            else:
                return listing
        except Exception as e:
            raise e


@agent.route("/api/agent/listings/details/<int:listingID>", methods=["GET"])
def fetchListingDetails(listingID):
    try:
        viewListingController = ViewListingController()
        listing = viewListingController.fetchListingDetails(listingID)
        if listing is None:
            return jsonify({"status": "error", "message": "Listing not found..."}), 400
        else:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Listing found!",
                        "listing": listing,
                    }
                ),
                200,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
