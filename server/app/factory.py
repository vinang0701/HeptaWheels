from flask import Flask
from flask_cors import CORS
from .db import get_database  # Import your database connection function
from .routes import all_blueprints

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})

    for blueprint in all_blueprints:
        app.register_blueprint(blueprint)

    # Automatically connect to the database when the app is created
    database = get_database()

    @app.route("/")
    def home():
        return "hi! help"

    @app.route("/test-db-connection")
    def test_db_connection():
        try:
            # Attempt to list collections
            collections = database.list_collection_names()
            return {"status": "Connected", "collections": collections}, 200
        except Exception as e:
            return {"status": "Connection Failed", "error": str(e)}, 500

    return app
