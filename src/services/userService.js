import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (InputId) => {
    return axios.get(`/api/get-all-users?id=${InputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-users', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-users', {

        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-users', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDoctorDetailsService = (inputDetail) => {
    return axios.post(`/api/save-doctors-info`, inputDetail)
}

const getDetailInforDoctorService = (id) => {
    return axios.get(`/api/get-details-doctor-by-id?id=${id}`)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDoctorDetailsService,
    getDetailInforDoctorService,
}