import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import rootReducer from "../reducers/index";

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
    applyMiddleware(...middleware, routerMiddleware(history)),
);

export function configureStore() {
    const store = createStore(rootReducer(history), composedEnhancers);

    return store;
}