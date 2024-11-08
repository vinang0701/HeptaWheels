from flask import Flask
from flask_cors import CORS
from .factory import create_app as create_flask_app


# Factory function to create an app instance
def create_app():
    app = create_flask_app()
    return app
