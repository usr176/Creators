from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    FLASK_HOST = os.getenv("FLASK_HOST")
    FLASK_PORT = os.getenv("FLASK_PORT")

# routes
from routes.home import home
from routes.auth import auth

def create_app():

    # configure flask app
    app = Flask(__name__)

    # configure secret key for sessions
    app.secret_key = Config.SECRET_KEY

    # session expiry
    app.permanent_session_lifetime = timedelta(days=2)

    CORS(app,
         supports_credentials=True
        )

    app.register_blueprint(
        home,
        url_prefix = "/api"
    )

    #Authentication pages
    app.register_blueprint(
        auth,
        url_prefix="/api/auth"
    )
    
    return app


if __name__ == "__main__":
    app = create_app()

    app.run(
        host=Config.FLASK_HOST,
        port=Config.FLASK_PORT,
        debug=True)