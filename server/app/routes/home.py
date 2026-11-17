from flask import Blueprint, jsonify
from app.models.user import User

home = Blueprint(
    "home",
    __name__
)

@home.route("/status")
def status():
    return jsonify({
        "message": "Hello"
    })

@home.route("/test-db")
def test_db():

    users = User.query.all()

    return {
        "users": len(users)
    }

from flask import request, jsonify

from app.services.cloudinary_service import upload_image


@home.route("/upload-test", methods=["POST"])
def upload_test():

    image = request.files["image"]

    url = upload_image(image)


    return jsonify({
        "image_url": url
    })