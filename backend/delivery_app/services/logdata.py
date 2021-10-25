from delivery_app.models.logdata import Logdata, db

def add_logdata(id):
    """
    log 이벤트 생성 시 logdata DB에 저장
    """
    try:
        new_logdata = Logdata(post_id = id)
        db.session.add(new_logdata)
        db.session.commit()
        return new_logdata
    except Exception:
        db.session.rollback()
        raise