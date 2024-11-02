"""
This is a controller class that controls the flow of
logic for used car agent to remove specified car listing
"""

from flask import jsonify, request
from flask_cors import cross_origin
from entities.Listing import Listing
from db import get_database
from routes.agent_routes import agent


class DeleteListingController:
    def __init__(self):
        self.listing_entity = Listing()

    # Delete car listing function
    # Find by listingID/sellerID, then update
    # status
    def removeListing(self, listingID):
        try:
            isRemoved = self.listing_entity.removeListing(listingID)
            if isRemoved:
                return True
            else:
                return False
        except Exception as e:
            raise e


@agent.route(
    "/api/agent/listings/<int:listingID>/delete", methods=["PUT"]
)
def removeListing(listingID):
    # Data to get from front end in json

    try:
        deleteListingController = DeleteListingController()
        removeSuccess = deleteListingController.removeListing(listingID)

        if removeSuccess:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Car listing deleted successfully",
                        "removeSuccess": removeSuccess,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Car listing is already deleted",
                        "removeSuccess": removeSuccess,
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
