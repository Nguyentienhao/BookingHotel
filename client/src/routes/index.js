import React from "react";
import { Route } from "react-router-dom";
import Register from "../containers/Auth/Register";
import Login from "../containers/Auth/Login";
import Home from '../containers/Home';
import SignOut from '../containers/Auth/SignOut';

export const routes = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/sign-in",
        component: Login,
    },
    {
        path: "/sign-up",
        component: Register,
    },
    {
        path: "/sign-out",
        component: SignOut,
    }
];

function NestedRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component
                    onChangeRoute={route.onChangeRoute}
                    {...props}
                    routes={route.routes}
                />
            )}
        />
    );
}

export default NestedRoutes;
