import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (InputId) => {
    return axios.get(`/api/get-all-users?id=${InputId}`);
}

const createNewUserService = (data) => {
    console.log('check create user data: ', data)
    return axios.post('/api/create-new-users', data);
}

const deleteUserService = (userId) => {
    //return axios.delete('/api/delete-users', { id: userId })
    return axios.delete('/api/delete-users', {

        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-users', inputData);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
}