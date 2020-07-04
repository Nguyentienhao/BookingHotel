import React, { Component } from 'react';
import {Button, Layout, message} from 'antd';
import { logoutUser } from '../../../actions/auth.action';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Content } = Layout;

class SignOut extends React.Component {
    constructor(props) {
        super(props);
    }

    onclickLogoutUser = () => {
        this.props.logoutUser(this.props.history);
        message.success('Bạn đã đăng xuất thành công!');

        setTimeout(() => {
            window.location.reload(true);
        }, 1000)
        
    }
    render() {
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px', marginTop: 100 }}>
                    <Button 
                        onClick={this.onclickLogoutUser}
                    >
                        {"Đăng xuất"}
                    </Button>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.erros,
});

export default withRouter(
    connect(
        mapStateToProps,
        { logoutUser },
        undefined,
        { pure: false },
    )(SignOut),
);