from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from db import get_database  # Import the function to get the database
from routes import all_blueprints
from controllers.admin import *
from controllers.buyer import *
from controllers.agent import *

# init Flask app
app = Flask("__name__")
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})

# Register Blueprints
# app.register_blueprint(admin)
# app.register_blueprint(login_routes)
# Register all Blueprints from routes
for blueprint in all_blueprints:
    app.register_blueprint(blueprint)


@app.route("/")
def home():
    return "hi! help"


@app.route("/test-db-connection")
def test_db_connection():
    database = get_database()
    try:
        # Attempt to list collections
        collections = database.list_collection_names()
        return jsonify({"status": "Connected", "collections": collections}), 200
    except Exception as e:
        return jsonify({"status": "Connection Failed", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8080)
