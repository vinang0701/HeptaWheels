from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from db import get_database  # Import the function to get the database
from routes.admin_routes import admin
from routes.login_routes import login_routes
from controllers.ViewUserAccountController import ViewUserAccountController
from controllers.SuspendUserAccountController import SuspendUserAccountController

# init Flask app
app = Flask("__name__")
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})

# Register Blueprints
app.register_blueprint(admin)
app.register_blueprint(login_routes)

# Get database from db.py
database = get_database()

@app.route("/")
def home():
    return "hi! help"

@app.route('/test-db-connection')
def test_db_connection():
    try:
        # Attempt to list collections
        collections = database.list_collection_names()
        return jsonify({"status": "Connected", "collections": collections}), 200
    except Exception as e:
        return jsonify({"status": "Connection Failed", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)
    