from flask import Blueprint, request, jsonify, session
from app.services.auth_service import register_user, login_user

auth = Blueprint(
    "auth",
    __name__
)

@auth.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    success, msg = register_user(
        name, email, password
    )

    return jsonify({
        "success": success,
        "message": msg
    })

@auth.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    success, user, message = login_user(
        email, password
    )

    if success:
        session.permanent = True

        session["user"] = {
            "name": user["name"],
            "email": user["email"]
        }

    return jsonify({
        "success": success,
        "user": user,
        "message": message
    })

@auth.route("/logout", methods=["POST"])
def logout():

    session.pop("user", None)

    return jsonify({
        "success": True
    })

@auth.route("/me", methods=["GET"])
def me():

    if "user" not in session:
        return jsonify({
            "logged_in": False
        })

    return jsonify({
        "logged_in": True,
        "user": session["user"]
    })