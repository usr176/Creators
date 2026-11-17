from app.models.user import User
from app.extensions import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


def register_user(name, email, passw):

    # Check if user already exists
    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return False, "User already exists."


    # Create new user
    user = User(
        name=name,
        email=email,
        password_hash=generate_password_hash(passw)
    )


    db.session.add(user)
    db.session.commit()


    return True, "Registration Succesfull."



def login_user(email, passw):

    # Find user by email
    user = User.query.filter_by(
        email=email
    ).first()


    if not user:
        return False, None, "No such user exists."


    # Check password
    if not check_password_hash(
        user.password_hash,
        passw
    ):
        return False, None, "Incorrect Password"


    return True, {
        "name": user.name,
        "email": user.email
    }, "Login Succesfull."