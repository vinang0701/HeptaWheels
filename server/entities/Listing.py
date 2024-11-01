"""
Listing Entity to handle data regarding car listings
<<Entity>>
Listing
- agentID : int
- sellerID : int
- carMake : string
- carModel : string
- price : int
- year_left : int
- mileage : int
"""
from db import get_database
from pymongo import DESCENDING

class Listing:
    def __init__(self):
        database = get_database()
        self.collection = database['listings']

    def postList(self, carMake, carModel, price):
        last_listing = self.collection.find_one(sort=[("listingID", DESCENDING)])
        next_listing_id = (last_listing["listingID"] + 1) if last_listing else 1
        try:
            self.collection.insert_one(
                {
                    "listingID": next_listing_id,
                    "carMake": carMake,
                    "carModel": carModel,
                    "price": price,
                }
            )
            return True
        except Exception as e:
            print(str(e))
            raise RuntimeError(f"Unexpected error occured: {str(e)}")

    def updateListing(self, listingID, carMake, carModel, price):
        try:
            self.collection.update_one(
                {"listingID": listingID},
                {
                    "$set": {
                        "carMake": carMake,
                        "carModel": carModel,
                        "price": price
                    }
                },
            )
            return True
        except Exception as e:
            raise RuntimeError(f"Unexpected error has occurred: {str(e)}")

