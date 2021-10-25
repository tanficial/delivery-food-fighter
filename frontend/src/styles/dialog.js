import { Dialog } from "@mui/material"
import { styled } from "@mui/system"

const StyledDialog = styled(Dialog)`
  /* background-color: rgba(255, 255, 255); */
  > div {
    background-color: rgba(255, 255, 255, 0.5);
    /* width: 50%; */
    > div {
      width: 50%;
      min-width: 400px;
      height: 70%;
      min-height: 400px;
    }
  }
`

export default StyledDialog
