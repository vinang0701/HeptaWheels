"""
Listing Entity to handle data regarding buyer shortlist
<<Entity>>
PreferredListings
- buyerID : int
- listingID : int
- datCreated : Date
"""

from app.db import get_database
from pymongo import DESCENDING


class PreferredListings:
    def __init__(self):
        database = get_database()
        self.collection = database["PreferredListings"]

    def saveCarListing(self, buyerID, listingID):
        try:
            self.collection.insert_one({"buyerID": buyerID, "listingID": listingID})
            return True
        except Exception as e:
            return False

    def viewShortlist(self, buyerID):
        listings = list(self.collection.find({"buyerID": buyerID}, {"_id": 0}))
        if not listings:
            return []
        return listings
