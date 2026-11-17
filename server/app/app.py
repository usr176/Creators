from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

from app.config import Config
from app.extensions import db, migrate

#db models
from app.models.user import User

# routes
from app.routes.home import home
from app.routes.auth import auth


def create_app():

    # configure flask app
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    # configure secret key for sessions
    app.secret_key = Config.SECRET_KEY

    # session expiry
    app.permanent_session_lifetime = timedelta(days=2)

    CORS(app,
         origins=[
             "https://kraft-hub.vercel.app",
             "http://localhost:5173",
             
         ],
         supports_credentials=True
        )

    app.config.update(
        SESSION_COOKIE_SAMESITE="None",
        SESSION_COOKIE_SECURE=True
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