import styled from "styled-components"
import { styled as styledMUI } from "@mui/material/styles"
import { Chip } from "@mui/material"
import { colors } from "./theme"

export const PaperBox = styled.div`
  width: 100%;
  position: relative;
`

export const PaperWrapper = styled.div`
  padding-bottom: 100%;
`

export const Thumnail = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  /* opacity: 0.5; */
  cursor: pointer;
`

export const ThumnailInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border: 1px solid ${colors.yellow100};
  opacity: 0;
  :hover {
    opacity: 1;
  }
`

export const InfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 0.5rem;
`

export const TextBox = styled.div`
  height: 35%;
  background-color: white;
  padding: 0.5rem;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const LikeBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: normal;
`

export const MyChip = styledMUI(Chip)`
  margin-right: 4px;
`
