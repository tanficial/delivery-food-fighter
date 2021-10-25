import { useState, useCallback } from "react"
import DropBox from "./DropBox"
import styled from "styled-components"
import { updatePostRequest, wholeBoardRequest } from "../apis/boardApi"
import postValueCheck from "../utils/postValueCheck"
import { ButtonBox, FileBox, MyTextField, MyButton } from "../styles/addPostContainer"

// 컬러 속성을 지정하여 파일 선택창에서 원하지 않는 텍스트는 안보이도록 함
const Input = styled.div`
  color: transparent;
  max-width: 8vw;
  position: sticky;
`

// location1: 시도 이름
// location2: 시군구 이름
// food: 음식 종류
// post: 글 내용
// image: 이미지 url
// user: 작성자

const EditPost = ({ handleClose, postData, updatePost, setCurrentUser }) => {
  const { location1, location2, food, post, image, id } = postData
  const [inputValue, setInputValue] = useState({
    location1: location1,
    location2: location2,
    food: food,
  })
  const [inputText, setInputText] = useState(post)
  const [inputImg, setInputImg] = useState(image)

  const handleSelectChange = useCallback(
    value => {
      const { location1, location2, food } = value
      setInputValue({ ...inputValue, location1, location2, food })
    },
    [inputValue],
  )

  const handleTextChange = useCallback(
    e => {
      setInputText(e.target.value)
    },
    [inputText],
  )

  const handleImgChange = useCallback(
    e => {
      const img = e.target.files[0]
      setInputImg(img)
    },
    [inputImg],
  )

  const clickSubmit = useCallback(() => {
    const check = postValueCheck(inputValue, inputText, inputImg)

    if (!check) return

    const formData = new FormData()
    formData.append("image", inputImg)
    formData.append("location1", inputValue.location1)
    formData.append("location2", inputValue.location2)
    formData.append("food", inputValue.food)
    formData.append("post", inputText)

    updatePostRequest({ formData, id })
      .then(data => {
      })
      .then(() => {
        wholeBoardRequest().then(data => {
          const posts = data.posts.sort((a, b) => {
            return a.id > b.id ? -1 : 1
          })
          updatePost(posts)
        })
      })
      .catch(error => {
        if (error.response.data.msg === "Token has expired") {
          alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요")
          setCurrentUser(null)
        }
        if (error.response.data.message === "다시 로그인 해주세요") {
          alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요")
          setCurrentUser(null)
        }
      })
      .finally(() => {
        handleClose()
      })
  }, [inputValue, inputText, inputImg])

  const clickCancel = useCallback(() => {
    handleClose()
  }, [])

  return (
    <>
      <DropBox
        onChange={handleSelectChange}
        defaultValue={{ location1: location1, location2: location2, food: food }}
      />
      <FileBox>
        <div>
          <Input>
            <input
              name="img"
              type="file"
              id="img"
              title="Choose a img please"
              accept="image/jpg,image/jpeg,image/png"
              onChange={handleImgChange}
            />
          </Input>
          <Img src={postData.image} alt="new" />
        </div>
      </FileBox>
      <MyTextField
        name="text"
        id="text"
        multiline
        rows={3}
        placeholder="내용을 입력해주세요"
        value={inputText}
        onChange={handleTextChange}
        required
        variant="standard"
        sx={{ height: "100%" }}
      />
      <ButtonBox>
        <MyButton onClick={clickCancel} variant="outlined">
          취소
        </MyButton>
        <MyButton onClick={clickSubmit} variant="outlined">
          수정
        </MyButton>
      </ButtonBox>
    </>
  )
}

export default EditPost

const Img = styled.img`
  width: 100%;
  height: 20%;
`
