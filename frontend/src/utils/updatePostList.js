import { wholeBoardRequest } from "../apis/boardApi"

const updatePostList = setPostList => {
  wholeBoardRequest().then(data => {
    const posts = data.posts.sort((a, b) => {
      // 최근 아이디 순으로 배열 정렬 후 게시
      return a.id > b.id ? -1 : 1
    })
    setPostList(posts)
  })
}

export default updatePostList
