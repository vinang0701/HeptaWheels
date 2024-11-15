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

    def searchListing(self, agentID, query):
        listings = self.carListing_entity.searchListing(agentID, query)
        if not listings:
            return []
        return listings


@agent.route("/api/agent/listings/search", methods=["POST"])
def searchListing():
    data = request.json
    agentID = int(data["agentID"])
    query = data["query"]

    if query != "":
        try:
            agentSearchCarListingCTL = AgentSearchCarListingCTL()
            listings = agentSearchCarListingCTL.searchListing(agentID, query)

            if listings:
                return (
                    jsonify(listings),
                    200,
                )
            else:
                return (
                    jsonify([]),
                    200,
                )
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
