"""
This is a controller class that controls the flow
of logic for seller viewing a specific car listing.
It will call the Listing entity to get the specifed listing.
"""

from flask import jsonify, request
from flask_cors import cross_origin
from app.entities.RateReview import RateReview
from app.db import get_database
from app.routes.seller_routes import seller


class SellerRateReviewCTL:
    def __init__(self):
        self.rateReview_entity = RateReview()

    def sellerSubmitFeedback(self, agentID, userEmail, userProfile, rating, review):

        feedbackSubmitted = self.rateReview_entity.sellerSubmitFeedback(
            agentID, userEmail, userProfile, rating, review
        )
        if feedbackSubmitted:
            return True
        else:
            return False


@seller.route("/api/seller/ratereview", methods=["POST"])
def sellerSubmitFeedback():
    data = request.json
    agentID = data["agentID"]
    userEmail = data["userEmail"]
    userProfile = data["userProfile"]
    rating = data["rating"]
    review = data["review"]

    sellerRateReviewCTL = SellerRateReviewCTL()
    try:
        feedbackSubmitted = sellerRateReviewCTL.sellerSubmitFeedback(
            agentID, userEmail, userProfile, rating, review
        )
        if feedbackSubmitted is True:
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
        return (
            jsonify(
                {
                    "status": "error",
                    "message": str(e),
                }
            ),
            500,
        )
