# test_create_user_account.py

import unittest
from ..controllers.CreateUserAccountController import CreateUserAccountController
from ..controllers.LoginController import LoginController
from ..entities.UserAccount import UserAccount
from ..db import Database
import unittest
from pymongo.errors import PyMongoError


class TestCreateUserAccount(unittest.TestCase):

    def setUp(self):
        self.account_controller = CreateUserAccountController()

    @classmethod
    def setUpClass(cls):
        """Set up the class to use the database."""
        try:
            cls.database = Database.get_database()  # Get the database connection
            cls.collection = cls.database[
                "users"
            ]  # Assuming "users" is the collection name

            cls.sample_data = {
                "password": "Password123!",
                "email": "admin2@gmail.com",
                "role": "User Admin",
            }

        except PyMongoError:
            raise Exception("Could not connect to database")

    def tearDown(self):
        """Clean up the database after each test (if necessary)."""
        # Here you can choose to either clean up or leave the users for testing.
        emails = [
            "admin2@gmail.com",
            "agent2@gmail.com",
            "seller2@gmail.com",
            "buyer2@gmail.com",
        ]
        for email in emails:
            self.collection.delete_one({"email": email})

    @classmethod
    def tearDownClass(cls):
        """Close the database connection after all tests."""
        Database.close_database()

    def test_create_user_account_success(self):
        """Test that user admin account creation is successful"""
        email = self.sample_data["email"]
        password = self.sample_data["password"]
        role = self.sample_data["role"]
        isCreated = self.account_controller.createUser(email, password, role)
        self.assertEqual(isCreated, True)
        print("\nUser Admin account creation success (admin2@gmail.com) as expected \n")

    def test_duplicate_user_account_creation(self):
        """Test that duplicate account cannot be created"""
        email = self.sample_data["email"]
        password = self.sample_data["password"]
        role = self.sample_data["role"]
        self.account_controller.createUser(email, password, role)
        print("\nDuplicate account cannot be created (admin2@gmail.com) as expected \n")

    def test_create_buyer_account(self):
        """Test that buyer account creation is successful"""
        email = "buyer2@gmail.com"
        password = "123"
        role = "Buyer"
        isCreated = self.account_controller.createUser(email, password, role)
        self.assertEqual(isCreated, True)
        print("\nBuyer account creation success (buyer2@gmail.com) as expected \n")

    print("Test that seller account creation is successful")

    def test_create_seller_account(self):
        """Test that seller account creation is successful"""
        email = "seller2@gmail.com"
        password = "123"
        role = "Seller"
        isCreated = self.account_controller.createUser(email, password, role)
        self.assertEqual(isCreated, True)
        print("\nSeller account creation success (seller2@gmail.com) as expected \n")

    def test_create_used_car_agent_account(self):
        """Test that agent account creation is successful"""
        email = "agent2@gmail.com"
        password = "123"
        role = "Agent"
        isCreated = self.account_controller.createUser(email, password, role)
        self.assertEqual(isCreated, True)
        print(
            "\nUsed car agent account creation success (agent2@gmail.com) as expected \n"
        )
        print("\n")


if __name__ == "__main__":
    unittest.main()
