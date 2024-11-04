from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from app.factory import create_app
from app.routes import all_blueprints
from app.controllers import *
# from db import get_database
# from controllers.admin import *
# from controllers.buyer import *
# from controllers.agent import *
# from controllers.login import *


# init Flask app
app = app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
    

# cors = CORS(app)

# @app.route("/")
# def home():
#     return "hi! help"


# @app.route("/test-db-connection")
# def test_db_connection():
#     database = get_database()
#     try:
#         # Attempt to list collections
#         collections = database.list_collection_names()
#         return jsonify({"status": "Connected", "collections": collections}), 200
#     except Exception as e:
#         return jsonify({"status": "Connection Failed", "error": str(e)}), 500



