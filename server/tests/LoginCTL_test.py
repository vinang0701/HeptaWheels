import unittest
from pymongo.errors import PyMongoError
from ..controllers.LoginController import LoginController
from ..db import Database

class TestLoginController(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Set up the class to use the database."""
        try:
            cls.database = Database.get_database()  # Get the database connection
            cls.collection = cls.database["users"]  # Assuming "users" is the collection name

            # Create test users for each role if they don't already exist
            # Should be created since testing login not creating
            # cls.test_users = {
            #     "admin": {
            #         "userID": 111,
            #         "email": "admin@gmail.com",
            #         "password": "password123",
            #         "status": "Active",
            #         "role": "Admin"
            #     },
            #     "used_car_agent": {
            #         "userID": 114,
            #         "email": "agent1@gmail.com",
            #         "password": "password123",
            #         "status": "Active",
            #         "role": "Used Car Agent"
            #     },
            #     "buyer": {
            #         "userID": 112,
            #         "email": "buyer1@gmail.com",
            #         "password": "password123",
            #         "status": "Active",
            #         "role": "Buyer"
            #     },
            #     "seller": {
            #         "userID": 113,
            #         "email": "seller1@gmail.com",
            #         "password": "password123",
            #         "status": "Active",
            #         "role": "Seller"
            #     }
            # }

            # for user in cls.test_users.values():
            #     if cls.collection.count_documents({"email": user["email"]}) == 0:
            #         cls.collection.insert_one(user)

            # cls.test_users = {
            #     "admin": cls.collection.find_one({"email": "admin@gmail.com"}),
            #     "used_car_agent": cls.collection.find_one({"email": "agent1@gmail.com"}),
            #     "buyer": cls.collection.find_one({"email": "buyer1@gmail.com"}),
            #     "seller": cls.collection.find_one({"email": "seller1@gmail.com"})
            # }

            cls.test_users = {
                "admin": cls.collection.find_one({"role": "User Admin", "status": "Active"}),
                "used_car_agent": cls.collection.find_one({"role": "Agent", "status": "Active"}),
                "buyer": cls.collection.find_one({"role": "Buyer", "status": "Active"}),
                "seller": cls.collection.find_one({"role": "Seller", "status": "Active"}),
                "inactive_user": cls.collection.find_one({"status": "Inactive"}),
            }

            for role,user in cls.test_users.items():
                if user is None:
                    raise ValueError(f"No user found for role {role}")

        except PyMongoError:
            raise Exception("Could not connect to database")

    def setUp(self):
        """Create an instance of LoginController before each test."""
        self.login_controller = LoginController()

    def tearDown(self):
        """Clean up the database after each test (if necessary)."""
        # Here you can choose to either clean up or leave the users for testing.
        # for user in self.test_users.values():
        #     self.collection.delete_one({"email": user["email"]})
        pass

    @classmethod
    def tearDownClass(cls):
        """Close the database connection after all tests."""
        Database.close_database()

# Test login success
    def test_validateAdmin_success(self):
        """Test that the admin user can log in successfully with correct credentials."""
        result = self.login_controller.validateUser("admin@gmail.com", "123")
        self.assertEqual(result["email"], "admin@gmail.com")

    def test_validateAgent_success(self):
        """Test that the used car agent user can log in successfully with correct credentials."""
        result = self.login_controller.validateUser("agent1@gmail.com", "password123")
        self.assertEqual(result["email"], "agent1@gmail.com")

    def test_validateBuyer_success(self):
        """Test that the buyer user can log in successfully with correct credentials."""
        result = self.login_controller.validateUser("buyer1@gmail.com", "password123")
        self.assertEqual(result["email"], "buyer1@gmail.com")

    def test_validateSeller_success(self):
        """Test that the seller user can log in successfully with correct credentials."""
        result = self.login_controller.validateUser("seller1@gmail.com", "password123")
        self.assertEqual(result["email"], "seller1@gmail.com")

    def test_login_inactive_user(self):
        """Test that login fails for a user with 'Inactive' status."""
        result = self.login_controller.validateUser("james20@hotmail.com", "123")
        self.assertIsNone(result, "Expected login to fail but it succeeded")  # Expect login to fail due to inactive status
        print("\nLogin failed for inactive user: james20@hotmail.com")
        
    # def test_login_failure(self):
    #     """Test login failure for incorrect credentials for each user role."""
    #     for role, user in self.__class__.test_users.items():
    #         with self.subTest(role=role):
    #             result = self.login_controller.validateUser(user["email"], "wrong_password")
    #             self.assertIsNone(result)

#Test login unsuccessful 
    # def test_validateUser_failure(self):
    #     """Test that a login fails with incorrect credentials."""
    #     result = self.login_controller.validateUser("unknown@gmail.com", "password123")
    #     self.assertIsNone(result)

    def test_validateAdmin_failure(self):
        """Test that admin login fails with incorrect credentials."""
        result = self.login_controller.validateUser("admin@gmail.com", "password")
        self.assertIsNone(result)

    def test_validateAgent_failure(self):
        """Test that agent login fails with incorrect credentials."""
        result = self.login_controller.validateUser("agent1@gmail.com", "password")
        self.assertIsNone(result)

    def test_validateBuyer_failure(self):
        """Test that buyer login fails with incorrect credentials."""
        result = self.login_controller.validateUser("buyer1@gmail.com", "password")
        self.assertIsNone(result)

    def test_validateSeller_failure(self):
        """Test that seller login fails with incorrect credentials."""
        result = self.login_controller.validateUser("seller1@gmail.com", "password")
        self.assertIsNone(result)
        
# To run the tests
if __name__ == "__main__":
    unittest.main()
