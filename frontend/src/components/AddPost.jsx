import { useState, useCallback } from "react"
import DropBox from "./DropBox"
import { addBoardRequest } from "../apis/boardApi"
import postValueCheck from "../utils/postValueCheck"
import { ButtonBox, FileBox, MyTextField, MyButton } from "../styles/addPostContainer"
import updatePostList from "../utils/updatePostList"
import { Alert } from "@mui/material"

//recoil 관련 임포트
import { useRecoilValue } from "recoil"
import userState from "../recoil/user"

// location1: 시도 이름
// location2: 시군구 이름
// food: 음식 종류
// post: 글 내용
// image: 이미지 url
// user_id: 작성자 id

const AddPost = ({ handleClose, updatePost, currentUser, setCurrentUser }) => {
  const [inputValue, setInputValue] = useState({
    location1: null,
    location2: null,
    food: null,
  })
  const [inputText, setInputText] = useState(null)
  const [inputImg, setInputImg] = useState(null)

  // recoil에 저장되어있는 현재 유저 정보 불러오기
  const currUser = useRecoilValue(userState)

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
    if (currentUser == undefined) {
      formData.append("user_id", -1)
    }
    else {
      formData.append("user_id", currentUser.id)
    }


    addBoardRequest(formData)
      .then(data => {
      })
      .then(() => {
        updatePostList(updatePost)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        handleClose()
      })
  }, [inputValue, inputText, inputImg])

  const clickCancel = useCallback(() => {
    handleClose()
  }, [inputValue, inputText, inputImg])

  return (
    <>
      <DropBox onChange={handleSelectChange} />
      <FileBox>
        <input
          name="img"
          type="file"
          accept="image/jpg,image/jpeg,image/png"
          onChange={handleImgChange}
        />
      </FileBox>
      <MyTextField
        name="text"
        id="text"
        multiline
        rows={10}
        placeholder={`내용을 입력해주세요.`}
        value={inputText}
        onChange={handleTextChange}
        required
        variant="standard"
        sx={{ height: "100%" }}
      />
      {currentUser == undefined && (
        <Alert severity="warning">
          로그인이 되어있지 않으면 게시 후 글을 수정/삭제할 수 없습니다
        </Alert>
      )}
      <ButtonBox>
        <MyButton onClick={clickCancel} variant="outlined">
          취소
        </MyButton>
        <MyButton onClick={clickSubmit} variant="outlined">
          완료
        </MyButton>
      </ButtonBox>
    </>
  )
}

export default AddPost
