import { useState, useCallback } from "react"
import { addBoardRequest } from "../apis/boardApi"
import postValueCheck from "../utils/postValueCheck"
import { ButtonBox, MyButton } from "../styles/addPostContainer"
import updatePostList from "../utils/updatePostList"

import { CardHeader, CardMedia, CardContent, Typography } from "@mui/material"

// location1: 시도 이름
// location2: 시군구 이름
// food: 음식 종류
// post: 글 내용
// image: 이미지 url
// user: 작성자

const DetailPost = ({ postData }) => {
  const [item, setItem] = useState(postData)
  const { id, user, location1, location2, food, image, post } = postData

  return (
    <>
      <CardMedia component="img" width="100%" image={image} alt={id} />
      <CardContent>
        <Typography variant="body" color="text.secondary">
          {post}
        </Typography>
      </CardContent>
    </>
  )
}

export default DetailPost
