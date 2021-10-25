"""
config 파일
기본으로 개발환경에서 sqlite
production 환경에서 환경변수 이용해서 mysql 사용하도록 해놈
"""
import os


BASE_DIR = os.path.dirname(__file__)
SQLALCHEMY_TRACK_MODIFICATIONS = False
DB_NAME = "delivery"
SQLALCHEMY_DATABASE_URI = "sqlite:///{}".format(os.path.join(BASE_DIR, f"{DB_NAME}.db"))
SECRET_KEY = "dev"
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")

if os.environ.get("FLASK_ENV") == "production":
    DB_HOST = os.environ.get("DB_HOST")
    USER = os.environ.get("DB_USER")
    PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{USER}:{PASSWORD}@{DB_HOST}/{DB_NAME}?charset=utf8mb4"
    )
