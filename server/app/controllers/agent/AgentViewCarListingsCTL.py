"""
This is a controller class that controls the flow
of logic for used car agent to view all listings
that belongs to specific used car agent via agentID.
It will return an array of listings 
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.agent_routes import agent


class AgentViewCarListingsCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def fetchAllListings(self, agentID):
        listings = self.carListing_entity.fetchAllListings(agentID)
        if not listings:
            return []
        return listings


# Get agentID from json http request
@agent.route("/api/agent/listings", methods=["GET"])
def fetchAllListings():
    agentID = int(request.args.get("agentID"))

    agentViewAllCarListingsController = AgentViewCarListingsCTL()
    if agentID:
        try:
            listings = agentViewAllCarListingsController.fetchAllListings(agentID)
            if not listings:
                return (
                    jsonify([]),
                    400,
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
