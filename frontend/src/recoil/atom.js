import { atom } from "recoil"

const menuID = atom({
  key: "menuID", // unique ID(다른 atom/selectors 와 구별하기 위함)
  default: "home", // default value (=initial value)
})

export default menuID
