import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "../constants";
import setAuthHeader from "../utils/setAuthHeader";

export const setCurrentUser = data => {
    return {
        type: SET_CURRENT_USER,
        payload: data,
    };
};

export const getCurrentUser = () => dispatch => {
    axios
        .get("http://localhost:8080/api/users")
        .then(res => dispatch(setCurrentUser(res.data)));
};

export const loginUser = userData => async dispatch => {
    await axios
        .post("http://localhost:8080/api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthHeader(token);
            dispatch(getCurrentUser());
        })
        .catch(err => {
            console.log('error', err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const registerUser = (userData, history) => dispatch => {
    console.log('userData', userData);

    axios
        .post("http://localhost:8080/api/users/register", userData)
        .then(res => history.push("/sign-in"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        );
};

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthHeader();
    history.push('/home')
    // dispatch(setCurrentUser());
};
