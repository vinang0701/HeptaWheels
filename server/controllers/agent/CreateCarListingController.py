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

class CreateCarListingController():
    def __init__(self):
        self.listing_entity = Listing()
    
    def postList(self, carMake, carModel, price):
        try:
            listSuccess = self.listing_entity.postList(carMake, carModel, price) 
            if(listSuccess):
                return True
            else:
                print("hello")
                return False
        except Exception as e:
            print(e) 

@agent.route("/api/agent", methods=['POST'])
def postList():
    # Data to get from front end in json
    data = request.json

    carMake = data['carMake']
    carModel = data['carModel']
    price = data['price']

    try:
        createCLController = CreateCarListingController()
        listSuccess = createCLController.postList(carMake, carModel, price)

        if listSuccess:
            return jsonify({"status": "success", 
                            "message": "Car listing created successfully",
                            "listSuccess": listSuccess}), 200
        else:
            return jsonify({"status": "error", 
                            "message": "Car listing created unsuccessful",
                            "listSuccess": listSuccess}), 400
    except Exception as e:
        return jsonify({"status": "error", 
                            "message": str(e)}), 500