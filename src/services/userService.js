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

const saveBulkScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getDoctorScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointmentService = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointmentService = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const createNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-specialty`)
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
    saveBulkScheduleService,
    getDoctorScheduleByDateService,
    getExtraInforDoctorByIdService,
    getProfileDoctorByIdService,
    postPatientBookAppointmentService,
    postVerifyBookAppointmentService,
    createNewSpecialtyService,
    getAllSpecialtyService,
}