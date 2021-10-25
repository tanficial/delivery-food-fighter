import axios from "axios";

const apiPath = process.env.REACT_APP_BACKEND_URL + "/api/geodata";

export const geodataListRequest = async () => {
    const response = await axios.get(`${apiPath}/list`);
    return response.data;
}

export const storesGraphByIdRequest = async (id) => {
    const response = await axios.get(`${apiPath}/graph/stores/${id}`);
    return response.data
}

// 전국
export const orderGraphByIdRequest = async (id) => {
    const response = await axios.get(`${apiPath}/graph/order-per-time/${id}`);
    return response.data
}