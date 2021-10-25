import { atom } from "recoil"
import { getCurrentUserInfo } from "../apis/authApi"

const userState = atom({
  key: "userID", // unique ID(다른 atom/selectors 와 구별하기 위함)
  default: getCurrentUserInfo(), // default value (=initial value)
})

export default userState
