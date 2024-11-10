"""
This is a controller class that controls the flow
of logic for buyer viewing a specific car listing.
It will call the Listing entity to get the specifed listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.RateReview import RateReview
from app.db import get_database
from app.routes.buyer_routes import buyer


class BuyerRateReviewCTL:
    def __init__(self):
        self.rateReview_entity = RateReview()

    def buyerSubmitFeedback(self, agentID, userEmail, userProfile, rating, review):
        try:
            feedbackSubmitted = self.rateReview_entity.buyerSubmitFeedback(
                agentID, userEmail, userProfile, rating, review
            )
            return feedbackSubmitted
        except Exception as e:
            raise e


@buyer.route("/api/buyer/ratereview", methods=["POST"])
def buyerSubmitFeedback():
    data = request.json
    agentID = data["agentID"]
    userEmail = data["userEmail"]
    userProfile = data["userProfile"]
    rating = data["rating"]
    review = data["review"]

    buyerRateReviewCTL = BuyerRateReviewCTL()
    try:
        feedbackSubmitted = buyerRateReviewCTL.buyerSubmitFeedback(
            agentID, userEmail, userProfile, rating, review
        )
        if feedbackSubmitted is True:
            return (
                jsonify(
                    {
                        "status": "success",
                        "message": "Feedback submitted successfully",
                        "feedbackSubmitted": feedbackSubmitted,
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
