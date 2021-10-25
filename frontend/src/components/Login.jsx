import { useState, useCallback } from "react"
import jwt from "jwt-decode"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"

import { useRecoilState } from "recoil"
import menuID from "../recoil/atom"

import { emailValidation } from "../utils/validation"
import { signinRequest, getCurrentUserInfo } from "../apis/authApi"
import ErrorToast from "./ErrorToast"

const LoginModal = ({ open, setOpen, setCurrentUser }) => {
  const [value, setValue] = useRecoilState(menuID)
  const [emailValid, setEmailValid] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState(false)

  const handleSnackClose = useCallback(() => {
    setSnackOpen(false)
  }, [])

  const handleEmailChange = useCallback(event => {
    const value = event.target.value
    const isValid = emailValidation(value)
    setEmailValid(isValid)
  }, [])

  const handleSigninSubmit = useCallback(
    event => {
      event.preventDefault()
      if (emailValid) {
        const email = event.target.email.value
        const password = event.target.password.value
        signinRequest(email, password)
          .then(response => {
            setCurrentUser(getCurrentUserInfo())
            setOpen(false)
            setValue("home")
          })
          .catch(error => {
            setSnackMessage(error.response.data.message)
            setSnackOpen(true)
          })
      }
    },
    [emailValid],
  )

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleSignup = useCallback(() => {
    setOpen(false)
    setValue("signup")
  }, [value])

  return (
    <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <DialogContent>
        <DialogContentText>이메일과 비밀번호를 입력해주세요.</DialogContentText>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "80%",
          }}
          onSubmit={handleSigninSubmit}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              error={!emailValid}
              onChange={handleEmailChange}
              helperText={!emailValid && "올바른 이메일 형식이 아닙니다"}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
            <br />
            <Button type="submit">로그인</Button>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button onClick={handleSignup}>회원가입</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
      <ErrorToast open={snackOpen} handleClose={handleSnackClose} message={snackMessage} />
    </Dialog>
  )
}

export default LoginModal
