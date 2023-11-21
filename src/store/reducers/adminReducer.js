import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    schedules: [],
}

const adminReducer = (state = initialState, action) => {
    let copyState; // Declare copyState outside the switch block

    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState = { ...state };
            copyState.isLoadingGender = true;

            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;

            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.genders = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState = { ...state };
            copyState.positions = action.data;

            return {
                ...copyState
            }
        case actionTypes.FETCH_POSITION_FAILED:
            copyState = { ...state };
            copyState.positions = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState = { ...state };
            copyState.roles = action.data;

            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_FAILED:
            copyState = { ...state };
            copyState.roles = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            copyState = { ...state };
            copyState.users = action.users;

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            copyState = { ...state };
            copyState.users = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            copyState = { ...state };
            copyState.topDoctors = action.dataDoctor;

            return {
                ...copyState
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            copyState = { ...state };
            copyState.topDoctors = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            copyState = { ...state };
            copyState.allDoctors = action.dataDr;

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            copyState = { ...state };
            copyState.allDoctors = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            copyState = { ...state };
            copyState.schedules = action.dataTime;

            return {
                ...copyState
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
            copyState = { ...state };
            copyState.schedules = [];

            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default adminReducer;
