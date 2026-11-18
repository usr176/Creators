from datetime import datetime

from app.extensions import db


class Store(db.Model):

    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    name = db.Column(db.String(100), nullable=False)

    handle = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    bio = db.Column(db.Text)

    avatar_url = db.Column(db.String(500))

    banner_url = db.Column(db.String(500))

    university = db.Column(db.String(100))

    official = db.Column(
        db.Boolean,
        default=False
    )

    followers = db.Column(
        db.Integer,
        default=0
    )

    joined_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    owner = db.relationship(
        "User",
        back_populates="store"
    )

    products = db.relationship(
        "Product",
        back_populates="store",
        cascade="all, delete-orphan"
    )