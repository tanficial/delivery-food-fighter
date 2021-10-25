import { useState, useEffect, useRef } from "react"
import AddPost from "./AddPost"
import StyledDialog from "../styles/dialog"
import { styled } from "@mui/system"
import { Button, DialogContent, DialogContentText } from "@mui/material"

const PostDialog = ({ postList, updatePost, currentUser, setCurrentUser }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const postRef = useRef(null)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = postRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <AddButton variant="outlined" onClick={handleClickOpen}>
        +
      </AddButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="post-title"
        aria-describedby="post-description"
      >
        <DialogContent dividers="paper">
          <DialogContentText id="post-description" ref={postRef} tabIndex={-1} child>
            <AddPost
              ref={postRef}
              postList={postList}
              handleClose={handleClose}
              updatePost={updatePost}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </DialogContentText>
        </DialogContent>
      </StyledDialog>
    </div>
  )
}

export default PostDialog

const AddButton = styled(Button)`
  width: 100%;
  height: 100%;
`
