"""
This is a controller class that controls the flow
of logic for used car agent updating specified car listing.
It will call the Listing entity to update specifed listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.Listing import Listing
from app.db import get_database
from app.routes.agent_routes import agent


class UpdateCarListingController:
    def __init__(self):
        self.listing_entity = Listing()

    # Update car listing function
    # Find by listingID/sellerID, then update
    # carMake, carModel, price, status, image
    def updateListing(self, listingID, carMake, carModel, price, status, image):

        try:
            isUpdated = self.listing_entity.updateListing(
                listingID, carMake, carModel, status, price, image
            )
            if isUpdated:
                return True
            else:
                return False
        except Exception as e:
            raise e


@agent.route("/api/agent/listings/<int:listingID>", methods=["PUT"])
def updateListing(listingID):
    # Data to get from front end in json
    data = request.json

    carMake = data["carMake"]
    carModel = data["carModel"]
    price = data["price"]
    status = data["status"]
    image = data["image"]

    try:
        updateCarListingController = UpdateCarListingController()
        updateSuccess = updateCarListingController.updateListing(
            listingID, carMake, carModel, status, price, image
        )

        if updateSuccess:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Car listing updated successfully",
                        "updateSuccess": updateSuccess,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Car listing update unsuccessful",
                        "updateSuccess": updateSuccess,
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
