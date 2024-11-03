"""
This is a controller class that controls the flow
of logic for used car agent creating new car listing.
It will call the Listing entity to create new listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from entities.Listing import Listing
from db import get_database
from routes.agent_routes import agent


class CreateCarListingController:
    def __init__(self):
        self.listing_entity = Listing()

    def postList(
        self,
        agentID,
        sellerID,
        carMake,
        carModel,
        price,
        status,
        image,
    ):
        try:
            listSuccess = self.listing_entity.postList(
                agentID,
                sellerID,
                carMake,
                carModel,
                price,
                status,
                image,
            )
            if listSuccess:
                return True
            else:
                return False
        except Exception as e:
            raise e


@agent.route("/api/agent/listings", methods=["POST"])
def postList():
    # Data to get from front end in json
    data = request.json

    agentID = data["agentID"]
    sellerID = data["sellerID"]
    carMake = data["carMake"]
    carModel = data["carModel"]
    price = data["price"]
    status = data["status"]
    image = data["image"]
    try:
        createCLController = CreateCarListingController()
        listSuccess = createCLController.postList(
            agentID,
            sellerID,
            carMake,
            carModel,
            price,
            status,
            image,
        )
        if listSuccess:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Car listing created successfully",
                        "listSuccess": listSuccess,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Car listing created unsuccessful",
                        "listSuccess": listSuccess,
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500