import axios from "axios"
import jwt from "jwt-decode"

const apiPath = process.env.REACT_APP_BACKEND_URL + "/api/auth"

axios.interceptors.request.use(
    async (config) => {
        const token = config.headers.Authorization
        const splitedUrl = config.url.split('/')
        const endpoint = splitedUrl[splitedUrl.length - 1]
        if (endpoint !== 'refresh' && token) {
            const response = await refreshTokenRequest(token)
            const new_token = response.data.access_token
            config.headers.Authorization = `Bearer ${new_token}`
            return config
        }
        return config
    }
)

export const isTokenExpired = (token) => {
    const decoded = jwt(token)
    return Date.now() >= decoded.exp * 1000
}

export const signinRequest = async (email, password) => {
    try {
        const response = await axios.post(`${apiPath}/signin`, { email, password })
        const token = response.data.access_token
        window.localStorage.setItem("token", token)
        return response
    } catch (error) {
        throw error
    }
}

export const signupRequest = async (email, password, name) => {
    const response = await axios.post(`${apiPath}/signup`, { email, password, name })
    return response
}

export const signoutRequest = async () => {
    const config = {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
    }
    const token = window.localStorage.getItem("token")
    if (!token) return
    const id = jwt(token).sub
    try {
        const response = await axios.post(`${apiPath}/signout`, { id }, config)
        window.localStorage.removeItem("token")
        return response
    } catch (error) {
        throw error
    }
}

export const refreshTokenRequest = async (token) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
    }
    try {
        const decoded = jwt(token)
        const id = decoded.sub
        const response = await axios.post(`${apiPath}/refresh`, { id }, config)
        const new_token = response.data.access_token
        window.localStorage.setItem("token", new_token)
        return response
    } catch (error) {
        window.localStorage.removeItem("token")
        throw error
    }
}

export const getCurrentUserInfo = () => {
    const token = window.localStorage.getItem("token")
    if (!token) return

    const user = jwt(token)
    const result = {
        id: user.sub,
        email: user.email,
        name: user.name
    }
    return result
}
