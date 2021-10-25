import Layout from "../components/layout/Layout"
import { NotMapBox } from "../styles/container"
import { useCallback, useEffect, useState } from "react"
import { wholeBoardRequest } from "../apis/boardApi"
import ImageCard from "../components/ImageCard"
import { ImageList } from "@mui/material"
import PostDialog from "../components/PostDialog"
import { getCurrentUserInfo } from "../apis/authApi"

//recoil 관련 임포트
import { useRecoilValue } from "recoil"
import userState from "../recoil/user"

const Board = () => {
  const [postList, setPostList] = useState(null)
  const [currentUser, setCurrentUser] = useState(getCurrentUserInfo())

  // recoil에 저장되어있는 유저 불러오기
  const currUser = useRecoilValue(userState)

  useEffect(() => {
    wholeBoardRequest().then(data => {
      const posts = data.posts.sort((a, b) => {
        // 최근 아이디 순으로 배열 정렬 후 게시
        return a.id > b.id ? -1 : 1
      })
      setPostList(posts)
    })
  }, [])

  const updatePost = useCallback(data => {
    setPostList(data)
  }, [])

  return (
    <Layout isMap={false} currentUser={currentUser} setCurrentUser={setCurrentUser} >
      <NotMapBox>
        <ImageList sx={{ width: "100%" }} cols={3}>
          <PostDialog postList={postList} updatePost={updatePost} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {postList && <ImageCard postList={postList} updatePost={updatePost} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        </ImageList>
      </NotMapBox>
    </Layout>
  )
}

export default Board
