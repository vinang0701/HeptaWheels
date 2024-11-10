"""
This is a controller class that controls the flow
of logic for used car agent to view a specific listing
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.agent_routes import agent


class ViewCarListingController:
    def __init__(self):
        self.carListing_entity = CarListing()

    def fetchListingDetails(self, listingID):
        try:
            listing = self.carListing_entity.fetchListingDetails(listingID)
            if listing is None:
                return None
            else:
                return listing
        except Exception as e:
            raise e


@agent.route("/api/agent/listings/details/<int:listingID>", methods=["GET"])
def fetchListingDetails(listingID):
    try:
        viewCarListingController = ViewCarListingController()
        listing = viewCarListingController.fetchListingDetails(listingID)
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
