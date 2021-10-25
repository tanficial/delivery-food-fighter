"""
delivery_app 생성 및 실행
"""
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from delivery_app import config
from delivery_app.db_connect import db
from delivery_app.apis import geodata_api, board_api, auth_api, logdata_api


def create_app():
    """
    flask 객체를 만들어 반환
    input:
    output: app
    """
    app = Flask(__name__, static_url_path="/statics")
    CORS(app, supports_credentials=True)
    app.config["JSON_AS_ASCII"] = False

    app.config["JWT_SECRET_KEY"] = config.JWT_SECRET_KEY
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=14)

    jwt = JWTManager(app)

    app.config.from_object(config)
    db.init_app(app)
    Migrate().init_app(app, db)

    app.register_blueprint(geodata_api.bp, url_prefix="/api/geodata")
    app.register_blueprint(board_api.bp, url_prefix="/api/board")
    app.register_blueprint(auth_api.bp, url_prefix="/api/auth")
    app.register_blueprint(logdata_api.bp, url_prefix="/api/logdata")

    @app.route("/")
    def landing():
        return "Hello DeliveryApp"

    return app


application = create_app()

if __name__ == "__main__":
    HOST = "0.0.0.0"
    PORT = 5000
    application.run(host=HOST, port=PORT, debug=True)
