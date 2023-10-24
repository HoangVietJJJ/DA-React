import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (InputId) => {
    return axios.get(`/api/get-all-users?id=${InputId}`)
}

export { handleLoginApi, getAllUsers }