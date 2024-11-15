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
            print(f"Error during insertion: {str(e)}")
            return False

    # Seller create review
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
            print(f"Error during insertion: {str(e)}")
            return False

    # Agent View Ratings and Reviews
    def viewRatingsReviews(self, agentID):
        try:
            rateReviews = list(self.collection.find({"agentID": agentID}, {"_id": 0}))
            if not rateReviews:
                return []
            return rateReviews
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")
