from delivery_app.models.user import db, User


def get_user_by_email(email):
    result = User.query.filter_by(email=email).one_or_none()
    return result


def get_user_by_id(user_id):
    result = User.query.filter_by(id=user_id).one_or_none()
    return result


def insert_user(email, password, name):
    try:
        new_user = User(email=email, password=password, name=name)
        db.session.add(new_user)
        db.session.commit()
        return new_user.id
    except Exception:
        db.session.rollback()
        raise
