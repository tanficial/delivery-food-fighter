"""
geodata api
지역에 관련된 정보를 제공
"""
from flask import Blueprint, jsonify
from delivery_app.services.address import get_addresses, get_address
import pandas as pd
import json

bp = Blueprint("geodata", __name__)


@bp.route("/list", methods=["GET"])
def geo_list():
    """
    GET /api/geodata/list
    모든 지역에 관한 기본 데이터 반환(id, 이름, 좌표)
    input:
    output: list({id, location1, location2, latitude, longitude}, ...)
        id : key
        location1 : 시도 이름
        location2 : 시군구 이름
        latitude: 위도
        logitude: 경도
    """
    result = []
    geodata = get_addresses()
    for data in geodata:
        result.append(
            {
                "id": data.id,
                "location1": data.location1,
                "location2": data.location2,
                "latitude": data.latitude,
                "longitude": data.longitude,
            }
        )
    return jsonify(data=result)


@bp.route("/graph/order-per-time/<int:geo_id>", methods=["GET"])
def get_order_graph(geo_id):
    """
    id에 해당하는 지역의 데이터, 시간-지역별 주문량 그래프와 설명을 반환
    GET /api/geodata/graph/order-per-time/<id>
    input: id
    output: {
        id,
        location1,
        location2,
        latitude,
        longitude,
        graph,
        description,
        raw_data (각 지역별 데이터를 json으로 반환)
    }
    """
    geoid_region_dict = {1 : "전국", 2 : "서울", 3 : "부산", 4 : "대구",
                        5 : "인천", 6 : "광주", 7 : "대전", 8 : "울산",
                        9 : "세종", 10 : "경기", 11 : "강원", 12 : "충북",
                        13 : "충남", 14 : "전북", 15 : "전남", 16 : "경북",
                        17 : "경남", 18 : "제주"}

    # front 단에서 데이터 시각화에 필요한 데이터를 미리 전처리
        # 1. geo id에 따른 지역을 해당 csv파일에서 쿼리후 json으로 넘겨줌
        # 2. for문 이용하여 front에서 필요한 데이터 형식대로 재전처리
        # 3. 전처리된 데이터를 json 형식으로 변환
    region_corona_df = pd.read_csv("static/data/korea_store_df.csv")
    main_df = region_corona_df[(region_corona_df['지역'] == geoid_region_dict[geo_id])]
    main_df = main_df.reset_index()
    
    corona_data = [] 
    ord_count_data = []
    

    for index in range(len(main_df)):
        date = main_df['Unnamed: 0'].loc[index]
        corona = main_df['확진자수'].loc[index]
        order = main_df['주문건수'].loc[index]
        corona_data.append({"x" : str(date), "y" : int(corona)})
        ord_count_data.append({"x" : str(date), "y" : int(order)})


    corona_json = json.dumps(corona_data, ensure_ascii = False)
    ord_count_json = json.dumps(ord_count_data, ensure_ascii = False)
    
    # 주소 데이터를 불러옴
    address = get_address(geo_id)

    # front에 넘겨줄 데이터
    result = {
        "id": address.id,
        "location1": address.location1,
        "location2": address.location2,
        "latitude": address.latitude,
        "longitude": address.longitude,
        "description": address.description1,
        "corona_data" : corona_json,
        "ord_count_data" : ord_count_json 
    }

    return jsonify(data=result)


@bp.route("/graph/stores/<int:geo_id>", methods=["GET"])
def get_store_graph(geo_id):
    """
    id에 해당하는 지역의 데이터, 배달상점분포 그래프와 설명을 반환
    GET /api/geodata/graph/order-per-time/<id>
    input: id
    output: {
        id,
        location1,
        location2,
        latitude,
        longitude,
        graph,
        description
    }
    """
    address = get_address(geo_id)
    result = {
        "id": address.id,
        "location1": address.location1,
        "location2": address.location2,
        "latitude": address.latitude,
        "longitude": address.longitude,
        "graph": address.graph2,
        "description": address.description2,
    }

    return jsonify(data=result)
