"""
Address 모델에 접근하는 서비스들
현재 임시 데이터로 대체
"""
from delivery_app.models.address import db, Address


def get_addresses():
    """
    Address모델로부터 모든 address를 얻어 반환
    input:
    output: address list
    """
    result = Address.query.all()

    return result


def get_address(address_id):
    """
    입력받은 id에 해당하는 지역 데이터 1개 반환
    input: address_id
    output: {
        id,
        location1,
        location2,
        latitude,
        logitude,
        graph1,
        graph2,
        description1,
        description2
    }
    """
    result = Address.query.filter_by(id=address_id).one_or_none()

    return result
