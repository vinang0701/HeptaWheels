"""
Listing Entity to handle data regarding buyer shortlist
<<Entity>>
PreferredListings
- buyerID : int
- listingID : int
- dateCreated : Date
"""

from app.db import get_database
from pymongo import DESCENDING
from datetime import datetime, timedelta


class PreferredListings:
    def __init__(self):
        database = get_database()
        self.collection = database["PreferredListings"]

    def saveCarListing(self, buyerID, listingID):
        todayDate = datetime()
        try:
            self.collection.insert_one(
                {"buyerID": buyerID, "listingID": listingID, "dateCreated": todayDate}
            )
            return True
        except Exception as e:
            return False

    def viewShortlist(self, buyerID):
        listings = list(self.collection.find({"buyerID": buyerID}, {"_id": 0}))
        if not listings:
            return []
        return listings

    # Seller
    def viewShortlistNumber(self, listingID):
        end_date = datetime()  # Assuming today is the end date
        start_date = end_date - timedelta(days=7)
        pipeline = [
            {
                "$match": {
                    "listingID": listingID,  # Filter by listingID
                    "shortlists.date": {"$gte": start_date, "$lte": end_date},
                }
            },
            {"$unwind": "$numOfShortlists"},  # Unwind the views array
            {"$match": {"shortlists.date": {"$gte": start_date, "$lte": end_date}}},
            {
                "$group": {
                    "_id": {
                        "$dateToString": {
                            "format": "%d-%m-%Y",
                            "date": "$numOfShortlists.date",
                        }
                    },
                    "count": {"$sum": 1},  # Count views per day
                }
            },
            {"$sort": {"_id": 1}},  # Sort by date
        ]

        # Execute the aggregation query "%Y-%m-%d"
        numOfShortlists = list(self.collection.aggregate(pipeline))

        return numOfShortlists
