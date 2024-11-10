"""
Listing Entity to handle data regarding car listings
<<Entity>>
RateReview
- agentID : int
- reviwerID : int
- rating : int
- review : string
"""

from flask import jsonify
from pymongo import DESCENDING
from app.db import get_database


class RateReview:
    def __init__(self):
        database = get_database()
        self.collection = database["ratereview"]

    # Buyer create review
    def buyerSubmitFeedback(self, agentID, userEmail, userProfile, rating, review):
        lastRateReview = self.collection.find_one(sort=[("agentID", DESCENDING)])
        nextRateReviewID = (lastRateReview["agentID"] + 1) if lastRateReview else 1
        try:
            self.collection.insert_one(
                {
                    "listingID": nextRateReviewID,
                    "agentID": agentID,
                    "userEmail": userEmail,
                    "userProfile": userProfile,
                    "rating": rating,
                    "review": review,
                }
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    # Buyer create review
    def sellerSubmitFeedback(self, agentID, userEmail, userProfile, rating, review):
        lastRateReview = self.collection.find_one(sort=[("agentID", DESCENDING)])
        nextRateReviewID = (lastRateReview["agentID"] + 1) if lastRateReview else 1
        try:
            self.collection.insert_one(
                {
                    "listingID": nextRateReviewID,
                    "agentID": agentID,
                    "userEmail": userEmail,
                    "userProfile": userProfile,
                    "rating": rating,
                    "review": review,
                }
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    # Agent View Ratings and Reviews
    def viewRatingsReviews(self, agentID):
        try:
            rateReviews = list(self.collection.find({}, {"_id": 0}))
            if not rateReviews:
                return None
            return rateReviews
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")
