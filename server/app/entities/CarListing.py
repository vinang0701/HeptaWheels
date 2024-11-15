"""
Listing Entity to handle data regarding car listings
<<Entity>>
Listing
- listingID : int
- agentID : int
- sellerID : int
- image : string
- carMake : string
- carModel : string
- price : int
- status : [Available, Unavailable, Pending, Sold]
"""

from app.db import get_database
from pymongo import DESCENDING
from datetime import datetime, timedelta


class CarListing:
    def __init__(self):
        database = get_database()
        self.collection = database["listings"]

    def createList(
        self,
        agentID,
        sellerID,
        carPlateNo,
        carMake,
        carModel,
        price,
        desc,
        status,
        image,
    ):

        last_listing = self.collection.find_one(sort=[("listingID", DESCENDING)])
        next_listing_id = (last_listing["listingID"] + 1) if last_listing else 1
        try:
            self.collection.insert_one(
                {
                    "listingID": next_listing_id,
                    "agentID": agentID,
                    "sellerID": sellerID,
                    "carPlateNo": carPlateNo,
                    "carMake": carMake,
                    "carModel": carModel,
                    "price": price,
                    "status": status,
                    "desc": desc,
                    "image": image,
                }
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def validateUpdate(
        self,
        listingID,
        sellerID,
        carPlateNo,
        carMake,
        carModel,
        price,
        status,
        desc,
        image,
    ):
        try:
            self.collection.update_one(
                {"listingID": listingID},
                {
                    "$set": {
                        "sellerID": sellerID,
                        "carPlateNo": carPlateNo,
                        "carMake": carMake,
                        "carModel": carModel,
                        "price": price,
                        "desc": desc,
                        "image": image,
                        "status": status,
                    }
                },
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")

    def findListing(self, listingID):
        listing = self.collection.find_one({"listingID": listingID}, {"_id": 0})
        return listing

    def fetchListingDetails(self, listingID):
        try:
            listing = self.collection.find_one({"listingID": listingID}, {"_id": 0})
            if listing is None:
                return None
            return listing
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def fetchAllListings(self, agentID):
        try:
            listings = list(
                self.collection.find({"agentID": agentID}, {"_id": 0}).sort(
                    "carMake", 1
                )
            )
            if not listings:
                return []
            return listings
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def deleteListing(self, listingID):
        listing = self.findListing(listingID)
        current_status = listing["status"]
        if current_status == "Unavailable":
            return False
        else:
            try:
                self.collection.update_one(
                    {"listingID": listingID},
                    {
                        "$set": {
                            "status": "Unavailable",
                        }
                    },
                )
                return True
            except Exception as e:
                raise RuntimeError(f"Unexpected error has occurred: {str(e)}")

    def searchListing(self, query):
        try:
            listings = list(
                self.collection.find(
                    {
                        "$or": [
                            {"carMake": {"$regex": f"{query}", "$options": "i"}},
                            {"carModel": {"$regex": f"{query}", "$options": "i"}},
                        ]
                    },
                    {"_id": 0},
                )
            )
            if not listings:
                return []
            return listings
        except Exception as e:
            print("An error occurred:", e)
            return []

    # Seller Functions

    def sellerRetrieveCarListings(self, sellerID):
        try:
            listings = list(
                self.collection.find({"sellerID": sellerID}, {"_id": 0}).sort(
                    [("status", 1), ("listingID", 1)]
                )
            )
            if not listings:
                return []
            return listings
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def getNumOfViews(self, listingID):
        end_date = datetime.today()  # Assuming today is the end date
        start_date = end_date - timedelta(days=7)
        pipeline = [
            {
                "$match": {
                    "listingID": listingID,  # Filter by listingID
                    "views.date": {"$gte": start_date, "$lte": end_date},
                }
            },
            {"$unwind": "$views"},  # Unwind the views array
            {"$match": {"views.date": {"$gte": start_date, "$lte": end_date}}},
            {
                "$group": {
                    "_id": {
                        "$dateToString": {"format": "%d-%m-%Y", "date": "$views.date"}
                    },
                    "count": {"$sum": 1},  # Count views per day
                }
            },
            {"$sort": {"_id": 1}},  # Sort by date
        ]

        numOfViews = list(self.collection.aggregate(pipeline))

        # Print the results
        # for numOfView in numOfViews:
        #     print(f"Date: {numOfViews['_id']}, Views: {numOfViews['count']}")
        return numOfViews

    # Buyer Functions

    # Function for buyer to get all listings
    def retrieveCarListings(self):
        try:
            # Need to filter the available only
            listings = list(self.collection.find({"status": "Available"}, {"_id": 0}))
            if not listings:
                return []
            return listings
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def viewListing(self, listingID):
        try:
            listing = self.collection.find_one({"listingID": listingID}, {"_id": 0})
            if not listing:
                return []
            return listing
        except Exception as e:
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def buyerSearchListing(self, query):
        try:
            # Need to filter the available only
            listings = list(
                self.collection.find(
                    {
                        "status": "Available",
                        "$or": [
                            {"carMake": {"$regex": f"{query}", "$options": "i"}},
                            {"carModel": {"$regex": f"{query}", "$options": "i"}},
                        ],
                    },
                    {"_id": 0},
                )
            )
            if not listings:
                return []
            return listings
        except Exception as e:
            print("An error occurred:", e)
            return []
