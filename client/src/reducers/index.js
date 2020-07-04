import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import errorReducer from "./error.reducer";
import authReducer from "./auth.reducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    errors: errorReducer,
    auth: authReducer,
  });