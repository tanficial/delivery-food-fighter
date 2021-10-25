"""
board api
게시판 관리 api
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from delivery_app.utils import boto3_client
from delivery_app.services.logdata import add_logdata
from delivery_app.services.board import (
    get_post,
    get_posts,
    add_post,
    delete_post,
    edit_post,
)

bp = Blueprint("board", __name__)


@bp.route("/<int:id>", methods=["GET"])
def get_board(id):
    l = add_logdata(id)
    result = get_post(id)
    if result is not None:
        return jsonify(result="success", post=result.to_dict())
    else:
        return jsonify(result="fail", message="존재하지 않는 게시글입니다."), 404


@bp.route("/list", methods=["GET"])
def get_boards():
    """
    DB에 저장되어 있는 모든 게시글 불러오기
    """
    result = get_posts()

    return jsonify(result="success", posts=result)


@bp.route("/", methods=["POST"])
def post_board():
    """
    입력받은 게시글 DB에 저장하기
    """
    location1 = request.form.get("location1")
    location2 = request.form.get("location2")
    food = request.form.get("food")
    post = request.form.get("post")
    user_id = request.form.get("user_id")
    image = request.files["image"]

    image_url = boto3_client.boto3_image_upload(image)
    try:
        new_post_id = add_post(
            location1=location1,
            location2=location2,
            food=food,
            post=post,
            user_id=user_id,
            image=image_url,
        )
    except Exception:
        boto3_client.boto3_image_delete(image_url)
        raise
    return jsonify(result="success", postId=new_post_id)


@bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_board(id):
    result = delete_post(id)
    if result is None:
        return jsonify(result="fail", message="존재하지 않는 게시글입니다."), 404

    return jsonify(result="success")


@bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def edit_board(id):
    location1 = request.form.get("location1")
    location2 = request.form.get("location2")
    food = request.form.get("food")
    post = request.form.get("post")
    image_url = request.form.get("image")
    is_image_changed = False

    origin_post = get_post(post_id=id)
    if origin_post is None:
        return jsonify(result="fail", message="존재하지 않는 게시글입니다."), 404

    origin_post_url = origin_post.image

    if image_url is None:
        image = request.files["image"]
        boto3_client.boto3_image_delete(origin_post_url)
        image_url = boto3_client.boto3_image_upload(image)
        is_image_changed = True

    try:
        result = edit_post(id, location1, location2, food, post, image_url)
        return jsonify(result="success", message="게시글이 수정되었습니다.", post_id=result), 200
    except Exception:
        if is_image_changed:
            boto3_client.boto3_image_delete(image_url)
            boto3_client.boto3_image_upload(origin_post_url)
        raise
