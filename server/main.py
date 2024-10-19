from flask import Flask, jsonify
from flask_cors import CORS

app = Flask("__name__")
cors = CORS(app, origins='*')

@app.route("/api/listings", methods=['GET'])
def listings():
    return jsonify(
        {
            "listings": [
                'listing1',
                'listing2',
                'listing3',
                'listing4'
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)