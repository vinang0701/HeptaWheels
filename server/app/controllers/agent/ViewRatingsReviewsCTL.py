"""
This is a controller class that controls the flow
of logic for used car agent to view all ratings
and reviews that belongs to specific used car agent via agentID.
It will return an array of rateReviews 
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.RateReview import RateReview
from app.db import get_database
from app.routes.agent_routes import agent


class ViewRatingsReviewsCTL:
    def __init__(self):
        self.rateReview_entity = RateReview()

    def viewRatingsReviews(self, agentID):
        try:
            rateReviews = self.rateReview_entity.viewRatingsReviews(agentID)
            if not rateReviews:
                return []
            return rateReviews
        except Exception as e:
            raise e


# Get agentID from json http request
@agent.route("/api/agent/ratereview", methods=["GET"])
def viewRatingsReviews():
    agentID = int(request.args.get("agentID"))

    viewRatingsReviewsCTL = ViewRatingsReviewsCTL()
    if agentID:
        try:
            rateReviews = viewRatingsReviewsCTL.viewRatingsReviews(agentID)
            if not rateReviews:
                return (
                    jsonify(
                        {
                            "status": "error",
                            "message": "No ratings found...",
                            "rateReviews": rateReviews,
                        }
                    ),
                    400,
                )
            else:
                return (
                    jsonify(
                        {
                            "status": "success",
                            "message": "Ratings and reviews found!",
                            "rateReviews": rateReviews,
                        }
                    ),
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
