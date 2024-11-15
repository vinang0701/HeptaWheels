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
        todayDate = datetime().today()
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
        end_date = datetime.today()  # Assuming today is the end date
        start_date = end_date - timedelta(days=7)
        print(start_date)

        pipeline = [
            {
                "$match": {
                    "dateCreated": {"$gte": start_date, "$lte": end_date},
                    "listingID": listingID,
                }
            },
            {
                "$group": {
                    "_id": {
                        "$dateToString": {"format": "%d-%m-%Y", "date": "$dateCreated"}
                    },
                    "count": {"$sum": 1},
                }
            },
            {"$sort": {"_id": 1}},  # Sort by date in ascending order
        ]

        # Execute the aggregation query "%Y-%m-%d"
        numOfShortlists = list(self.collection.aggregate(pipeline))

        return numOfShortlists
