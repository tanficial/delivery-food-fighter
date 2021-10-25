import axios from "axios"

const apiPath = process.env.REACT_APP_BACKEND_URL + "/api/board/"

export const addBoardRequest = async formData => {
  const response = await axios.post(`${apiPath}`, formData)

  return response.data
}

export const wholeBoardRequest = async () => {
  const response = await axios.get(`${apiPath}list`)
  return response.data
}

export const deletePostRequest = async id => {
  const config = {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
  }
  const response = await axios.delete(`${apiPath}${id}`, config)
  return response.data
}

export const updatePostRequest = async ({ formData, id }) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`
    },
  }
  const response = await axios.patch(`${apiPath}${id}`, formData, config)
  return response.data
}
