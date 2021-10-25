from datetime import datetime

from delivery_app.db_connect import db


class Logdata(db.Model):
    """
    id: id
    post_id: 게시글 id
    timestamp: 로그 시간
    """

    __tablename__ = "logdata"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    def __init__(self, post_id):
        self.post_id = post_id
        self.timestamp = datetime.now()

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "timestamp": self.timestamp,
        }
