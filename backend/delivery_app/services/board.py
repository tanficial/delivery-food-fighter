from delivery_app.models.posts import Posts, db
from delivery_app.models.user import User


def get_post(post_id):
    """
    입력받은 id에 해당하는 게시글 조회 및 리턴
    input: post_id(int)
    output: Posts 객체 하나
    """
    _post = Posts.query.filter_by(id=post_id).one_or_none()
    _post.hit += 1
    db.session.add(_post)
    db.session.commit()
    return _post


def get_posts():
    """
    DB에 저장되어 있는 게시글 반환
    """
    result = []
    posts = Posts.query.all()

    for post in posts:
        p_dict = post.to_dict()
        if p_dict["user_id"] != -1:
            user = User.query.filter_by(id=p_dict["user_id"]).one_or_none()
            p_dict["user_name"] = user.name
        else:
            p_dict["user_name"] = None
        result.append(p_dict)
    return result


def add_post(location1, location2, food, post, image, user_id):
    """
    입력받은 게시글 저장 후 location1, location2, category에 해당하는 게시글 반환
    """
    try:
        new_post = Posts(
            location1=location1,
            location2=location2,
            food=food,
            post=post,
            image=image,
            user_id=user_id,
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.id
    except Exception:
        db.session.rollback()
        raise


def edit_post(post_id, location1, location2, food, post, image):
    """
    user를 제외한 수정된 데이터를 가져와 DB 값 수정(수정 범위 논의)
    """
    try:
        _post = Posts.query.filter_by(id=post_id).one_or_none()
        if _post is None:
            return None

        _post = Posts.query.filter_by(id=post_id).one_or_none()
        _post.location1 = location1
        _post.location2 = location2
        _post.food = food
        _post.post = post
        _post.image = image
        db.session.add(_post)
        db.session.commit()
        return _post.id

    except Exception:
        db.session.rollback()
        raise


def delete_post(post_id):
    try:
        _post = Posts.query.filter_by(id=post_id).one_or_none()
        if _post is None:
            return None

        db.session.delete(_post)
        db.session.commit()
        return _post.id
    except Exception:
        db.session.rollback()
        raise


def update_image(post_id, image_url):
    try:
        post = Posts.query.filter_by(id=post_id).one_or_none()
        if post is None:
            return None

        post.image = image_url
        db.session.add(post)
        db.session.commit()
        return post
    except Exception:
        db.session.rollback()
        raise
