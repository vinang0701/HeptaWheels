"""
This is a controller class that controls the flow
of logic for used car agent updating specified car listing.
It will call the Listing entity to update specifed listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.agent_routes import agent


class UpdateCarListingCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    # Update car listing function
    # Find by listingID/sellerID, then update
    # carMake, carModel, price, status, image
    def validateUpdate(
        self,
        listingID,
        sellerID,
        carPlateNo,
        carMake,
        carModel,
        price,
        status,
        desc,
        image,
    ):

        try:
            isUpdated = self.carListing_entity.validateUpdate(
                listingID,
                sellerID,
                carPlateNo,
                carMake,
                carModel,
                price,
                status,
                desc,
                image,
            )
            if isUpdated:
                return True
            else:
                return False
        except Exception as e:
            raise e


@agent.route("/api/agent/listings/<int:listingID>", methods=["PUT"])
def validateUpdate(listingID):
    # Data to get from front end in json
    data = request.json
    sellerID = int(data["sellerID"])
    carPlateNo = data["carPlateNo"]
    carMake = data["carMake"]
    carModel = data["carModel"]
    price = data["price"]
    status = data["status"]
    desc = data["desc"]
    image = data["image"]

    try:
        updateCarListingController = UpdateCarListingCTL()
        updateSuccess = updateCarListingController.validateUpdate(
            listingID,
            sellerID,
            carPlateNo,
            carMake,
            carModel,
            price,
            status,
            desc,
            image,
        )

        if updateSuccess:
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
