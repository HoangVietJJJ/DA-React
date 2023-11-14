import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
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
            copyState.isLoadingGender = false;

            return {
                ...copyState
            }
        case actionTypes.FETCH_POSITION_FAILED:
            copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.positions = [];

            return {
                ...copyState
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState = { ...state };
            copyState.roles = action.data;
            copyState.isLoadingGender = false;

            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_FAILED:
            copyState = { ...state };
            copyState.isLoadingGender = false;
            copyState.roles = [];

            return {
                ...copyState
            }

        default:
            return state;
    }
}

export default adminReducer;
