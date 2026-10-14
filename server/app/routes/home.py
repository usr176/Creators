from flask import Blueprint, jsonify

home = Blueprint(
    "home",
    __name__
)

@home.route("/status")
def status():
    return jsonify({
        "message": "Hello"
    })