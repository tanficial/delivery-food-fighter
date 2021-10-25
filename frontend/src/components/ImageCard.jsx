import { useState, useRef, useEffect, useCallback } from "react"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { styled } from "@mui/system"
import { deletePostRequest } from "../apis/boardApi"
import updatePostList from "../utils/updatePostList"
import EditDialog from "./EditDialog"
import DetailDialog from "./DetailDialog"
import { PaperWrapper } from "../styles/postContainer"

const ImageCard = ({ postList, updatePost, currentUser, setCurrentUser }) => {
  const [open, setOpen] = useState(false)
  const handlePostClick = useCallback(
    ({ e, id }) => {
      e.stopPropagation()
      const postData = postList.find(item => item.id === id)
      setOpen(true)
    },
    [postList],
  )

  const imageRef = useRef(null)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = imageRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleDeleteClick = ({ e, id }) => {
    e.stopPropagation()
    deletePostRequest(id)
      .then(data => {
      })
      .then(() => {
        updatePostList(updatePost)
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
  }

  const itemList = postList.map(item => {
    const { id, user_id, location1, location2, food, image, post } = item
    const getId = e => {
      return { e, id }
    }
    return (
      <>
        <ImageListItem key={id} onClick={e => handlePostClick(getId(e))}>
          <PaperWrapper>
            <DetailDialog postData={item} />
          </PaperWrapper>
          <MyImageListItemBar
            sx={{ alignItems: "flex-end" }}
            title={food}
            subtitle={`${location1}/${location2}`}
            actionIcon={

              ((currentUser != undefined) && (currentUser.id == user_id)) && (
                <div style={{ display: "flex" }}>
                  <EditDialog postData={item} updatePost={updatePost} setCurrentUser={setCurrentUser} />
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.65)" }}
                    aria-label={`delete ${id}`}
                    onClick={e => handleDeleteClick(getId(e))}
                  >
                    <DeleteIcon />
                    <div style={{ width: "100%", height: "100%" }} />
                  </IconButton>
                </div>)
            }
          />
        </ImageListItem>
      </>
    )
  })
  return itemList
}

export default ImageCard

const MyImageListItemBar = styled(ImageListItemBar)`
  opacity: 1;
  cursor: pointer;
  /*
  :hover {
    opacity: 1;
  }*/
`
