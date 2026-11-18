from app.extensions import db
from app.models.product import Product

from app.services.cloudinary_service import upload_image


def create_product(user_id, form, image):

    image_url = upload_image(image, folder="products")

    product = Product(

        owner_id=user_id,

        title=form["title"],

        description=form["description"],

        price=float(form["price"]),

        stock=int(form["stock"]),

        category=form["category"],

        image_url=image_url
    )

    db.session.add(product)
    db.session.commit()

    return product


def get_products():

    return Product.query.order_by(
        Product.created_at.desc()
    ).all()


def delete_product(product_id, user_id):

    product = Product.query.get(product_id)

    if product is None:
        return False, "Product not found."

    if product.owner_id != user_id:
        return False, "Unauthorized."

    db.session.delete(product)
    db.session.commit()

    return True, "Deleted."