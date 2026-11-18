from flask import Blueprint
from flask import request
from flask import jsonify
from flask import session

from app.services.product_service import (
    create_product,
    get_products,
    delete_product
)

products = Blueprint(
    "products",
    __name__
)

@products.route("", methods=["POST"])
def upload_product():

    if "user" not in session:
        return jsonify({
            "success": False,
            "message": "Login required."
        }),401

    image = request.files["image"]

    product = create_product(

        session["user"]["id"],

        request.form,

        image
    )

    return jsonify({

        "success": True,

        "product": product.to_dict()

    })

@products.route("", methods=["GET"])
def all_products():

    products = get_products()

    return jsonify([

        p.to_dict()

        for p in products

    ])

@products.route("/<int:id>", methods=["DELETE"])
def remove(id):

    if "user" not in session:
        return jsonify({
            "success":False
        }),401

    success, message = delete_product(
        id,
        session["user"]["id"]
    )

    return jsonify({

        "success": success,

        "message": message

    })