import { MyChip } from "../styles/postContainer"

const DetailPostHeader = ({ user_name, location1, location2, food }) => {
  return (
    <>
      <div>{user_name ? user_name : "익명"}</div>
      <div>
        <MyChip variant="outlined" size="small" label={`${location1}/${location2}`} />
        <MyChip variant="outlined" size="small" label={food} />
      </div>
    </>
  )
}

export default DetailPostHeader
