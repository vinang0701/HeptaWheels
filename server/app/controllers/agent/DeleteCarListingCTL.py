"""
This is a controller class that controls the flow of
logic for used car agent to remove specified car listing
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.agent_routes import agent


class DeleteCarListingCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    # Delete car listing function
    # Find by listingID/sellerID, then update
    # status
    def deleteListing(self, listingID):
        isRemoved = self.carListing_entity.deleteListing(listingID)
        if isRemoved:
            return True
        else:
            return False


@agent.route("/api/agent/listings/<int:listingID>/delete", methods=["PUT"])
def deleteListing(listingID):
    # Data to get from front end in json

    try:
        deleteCarListingController = DeleteCarListingCTL()
        deleteSuccess = deleteCarListingController.deleteListing(listingID)

        if deleteSuccess:
            return (
                jsonify(True),
                200,
            )
        else:
            return (
                jsonify(False),
                200,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
