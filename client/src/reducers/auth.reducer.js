import { SET_CURRENT_USER } from "../constants";

const initialState = {
    isAuthenticated: false,
    users: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload).length !== 0,
                users: action.payload,
            };
        default:
            return state;
    }
}