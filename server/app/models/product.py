from datetime import datetime

from app.extensions import db


class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    owner_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    price = db.Column(
        db.Float,
        nullable=False
    )

    stock = db.Column(
        db.Integer,
        default=1
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    image_url = db.Column(
        db.String(500)
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    owner = db.relationship(
        "User",
        backref="products"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "category": self.category,
            "image": self.image_url,
            "createdAt": self.created_at.isoformat(),

            "store": {
                "id": self.owner.id,
                "name": self.owner.name
            }
        }