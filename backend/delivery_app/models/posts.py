from datetime import datetime

from delivery_app.db_connect import db


class Posts(db.Model):
    """
    id: 글 id
    location1: 시도 이름
    location2: 시군구 이름
    category: 글 카테고리
    food: 음식 종류
    post: 글 내용
    image: 이미지 url
    hit: 조회수
    like: 좋아요 수
    user_id: 작성자 id(왜래키)
    timestamp: 작성일
    """

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    location1 = db.Column(db.String(32), nullable=False)
    location2 = db.Column(db.String(32), nullable=False)
    food = db.Column(db.String(64), nullable=False)
    post = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(1024), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    hit = db.Column(db.Integer, nullable=False)
    like = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    def __init__(self, location1, location2, post, food, image, user_id):
        self.location1 = location1
        self.location2 = location2
        self.food = food
        self.post = post
        self.image = image
        self.user_id = user_id
        self.hit = 0
        self.like = 0
        self.timestamp = datetime.now()

    def to_dict(self):
        return {
            "id": self.id,
            "location1": self.location1,
            "location2": self.location2,
            "food": self.food,
            "post": self.post,
            "image": self.image,
            "user_id": self.user_id,
            "hit": self.hit,
            "like": self.like,
            "timestamp": self.timestamp,
        }
