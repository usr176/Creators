import os

class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")

    FLASK_HOST = os.getenv("FLASK_HOST")

    FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False