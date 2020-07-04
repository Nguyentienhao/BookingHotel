import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { history, configureStore } from "./store";
import { logoutUser, getCurrentUser } from "./actions/auth.action";
import setAuthHeader from "./utils/setAuthHeader";
import NestedRoutes, { routes } from "./routes";

import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";

const { Header, Footer } = Layout;

const store = configureStore();

if (window.localStorage.getItem("jwtToken")) {
    const currentTime = Date.now() / 1000;
    const decode = jwt_decode(window.localStorage.getItem("jwtToken"));

    if (currentTime > decode.exp) {
        store.dispatch(logoutUser());
    } else {
        setAuthHeader(window.localStorage.getItem("jwtToken"));
        store.dispatch(getCurrentUser());
    }
}

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Router>
                    <React.Fragment>
                        <Header style={{ position: 'fixed', zIndex: 1, width: "100%" }}>
                            {
                                window.localStorage.getItem('jwtToken') ? (
                                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                                        <Menu.Item key="1" >
                                            <Link to="/home">Trang chủ</Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link to="/sign-out">
                                                Đăng xuất
                                            </Link>
                                        </Menu.Item>
                                    </Menu>
                                ) : (
                                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                                            <Menu.Item key="1" >
                                                <Link to="/home">Trang chủ</Link>
                                            </Menu.Item>
                                            <Menu.Item key="2" >
                                                <Link to="/sign-up">Đăng ký</Link>
                                            </Menu.Item>
                                            <Menu.Item key="3" >
                                                <Link to="/sign-in">Đăng Nhập</Link>
                                            </Menu.Item>
                                        </Menu>
                                    )
                            }

                        </Header>
                        <Switch>
                            {routes.map((route, i) => (
                                <NestedRoutes exact={route.exact} key={i} {...route} />
                            ))}
                        </Switch>
                        <Footer style={{ textAlign: "center" }}>
                            Hotel Booking
                        </Footer>
                    </React.Fragment>
                </Router>
            </ConnectedRouter >
        </Provider >
    );
}

export default App;