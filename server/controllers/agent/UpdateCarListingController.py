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

class UpdateCarListingController:
    def __init__(self):
            self.listing_entity = Listing()

    def updateListing(self, listingID, carMake, carModel, price):
        
        try:
            isUpdated = self.listing_entity.updateListing(listingID, carMake, carModel, price)
            if(isUpdated):
                return True
            else:
                print("hello")
                return False
        except Exception as e:
            print(e)

@agent.route("/api/agent/<int:listingID>", methods=['PUT'])
def updateListing(listingID):
    # Data to get from front end in json
    data = request.json

    carMake = data['carMake']
    carModel = data['carModel']
    price = data['price']

    try:
        updateCarListingController = CreateCarListingController()
        updateSuccess = updateCarListingController.updateListing(listingID, carMake, carModel, price)

        if updateSuccess:
            return jsonify({"status": "success", 
                            "message": "Car listing updated successfully",
                            "updateSuccess": updateSuccess}), 200
        else:
            return jsonify({"status": "error", 
                            "message": "Car listing update unsuccessful",
                            "updateSuccess": updateSuccess}), 400
    except Exception as e:
        return jsonify({"status": "error", 
                            "message": str(e)}), 500