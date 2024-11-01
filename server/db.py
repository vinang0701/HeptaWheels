from pymongo import MongoClient
from pymongo.server_api import ServerApi
import certifi
import os, configparser


def get_database():
    # Load the MongoDB URI from the config file
    config = configparser.ConfigParser()
    currentfolder = os.path.dirname(os.path.abspath(__file__))
    initfile = os.path.join(currentfolder, "sample_ini.init")
    config.read(initfile)

    # Get DB URI
    db_uri = config.get("prod", "DB_URI")
    # client = MongoClient(db_uri, tlsCAFile=certifi.where())
    client = MongoClient(db_uri)
    database = client["heptawheels"]

    return database
