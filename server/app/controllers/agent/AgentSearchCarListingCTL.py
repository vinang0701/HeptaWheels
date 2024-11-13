"""
This is a controller class that controls the flow of
logic for used car agent to search specified car listing
based on given query
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.CarListing import CarListing
from app.db import get_database
from app.routes.agent_routes import agent


class AgentSearchCarListingCTL:
    def __init__(self):
        self.carListing_entity = CarListing()

    def searchListing(self, query):
        try:
            listings = self.carListing_entity.searchListing(query)
            if not listings:
                return []
            else:
                return listings
        except Exception as e:
            raise e


@agent.route("/api/agent/listings/search", methods=["POST"])
def searchListing():
    # Data to get from front end in json
    if request.method == "OPTIONS":
        return jsonify({"status": "success", "message": "CORS Preflight succeed"}, 200)
    data = request.json
    query = data["query"]
    if query != "":
        try:
            agentSearchCarListingCTL = AgentSearchCarListingCTL()
            listings = agentSearchCarListingCTL.searchListing(query)

            if listings:
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
            else:
                return (
                    jsonify(
                        {
                            "status": "error",
                            "message": "No listings found",
                            "listings": [],
                        }
                    ),
                    400,
                )
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
