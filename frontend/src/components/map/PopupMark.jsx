import { Popup } from "react-leaflet"

const PopupMark = ({ name, position }) => {
  const text = `여기는 ${name}!`
  return <Popup position={position}>{text}</Popup>
}

export default PopupMark
