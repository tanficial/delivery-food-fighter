import { useState, useEffect, useRef } from "react"
import StyledDialog from "../styles/dialog"
import { DialogContent, DialogContentText, DialogActions, DialogTitle, Button } from "@mui/material"
import { Thumnail } from "../styles/postContainer"
import DetailPost from "./DetailPost"
import { MyButton } from "../styles/addPostContainer"
import DetailPostHeader from "./DetailPostHeader"

const DetailDialog = ({ postData }) => {
  const { id, user_name, location1, location2, food, image, post } = postData
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const detailRef = useRef(null)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = detailRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleClose = e => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div>
      <Thumnail url={image} onClick={handleClickOpen} />
      <StyledDialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="post-title"
        aria-describedby="post-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <DetailPostHeader user_name={user_name} location1={location1} location2={location2} food={food} />
        </DialogTitle>
        <DialogContent dividers="paper">
          <DialogContentText id="post-description" ref={detailRef} tabIndex={-1} child>
            <DetailPost postData={postData} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <MyButton onClick={handleClose} variant="outlined">
            닫기
          </MyButton>
        </DialogActions>
      </StyledDialog>
    </div>
  )
}

export default DetailDialog
