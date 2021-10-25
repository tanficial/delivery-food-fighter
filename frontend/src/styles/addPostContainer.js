import styled from "styled-components"
import { Button, TextField } from "@mui/material"

export const ImgTextWrapper = styled.div`
  overflow: auto;
`

export const FileBox = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
`
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`
export const MyTextField = styled(TextField)`
  width: 100%;
`

export const MyButton = styled(Button)`
  width: 49%;
  > Button {
    margin-left: 4px;
  }
`
