from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from app.factory import create_app
from app.routes import all_blueprints
from app.controllers import *


# init Flask app
app = app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
    


