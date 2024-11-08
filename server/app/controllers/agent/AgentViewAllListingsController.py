"""
This is a controller class that controls the flow
of logic for used car agent to view all listings
that belongs to specific used car agent via agentID.
It will return an array of listings 
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.Listing import Listing
from app.db import get_database
from app.routes.agent_routes import agent


class AgentViewAllListingsController:
    def __init__(self):
        self.listing_entity = Listing()

    def fetchAllListings(self, agentID):
        try:
            listings = self.listing_entity.fetchAllListings(agentID)
            if not listings:
                return []
            return listings
        except Exception as e:
            raise e


# Get agentID from json http request
@agent.route("/api/agent/listings", methods=["GET"])
def fetchAllListings():
    agentID = int(request.args.get("agentID"))

    agentViewAllListingsController = AgentViewAllListingsController()
    listings = agentViewAllListingsController.fetchAllListings(agentID)
    if agentID:
        try:
            agentViewAllListingsController = AgentViewAllListingsController()
            listings = agentViewAllListingsController.fetchAllListings(agentID)

            if len(listings) == 0:
                return (
                    jsonify(
                        {
                            "status": "error",
                            "message": "No listing found...",
                            "listings": listings,
                        }
                    ),
                    400,
                )
            else:
                return (
                    jsonify(
                        {
                            "status": "success",
                            "message": "Listings found!",
                            "listings": listings,
                        }
                    ),
                    200,
                )
        except Exception as e:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": str(e),
                    }
                ),
                500,
            )
