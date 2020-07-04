import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, message } from 'antd';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from '../../../actions/auth.action';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    onFinish = values => {
        const userData = {
            email: values.username,
            password: values.password,
        };

        this.props.loginUser(userData);

        message.success('Bạn đã đăng nhập thành công!');
        
        setTimeout(() => {
            window.location.reload(true);
        }, 1000)
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <label style={{ fontWeight: 'bold', fontSize: 24, marginTop: 100 }}>{"Đăng Nhập"}</label>

                <Form
                    {...layout}
                    name="basic"
                    style={{ marginTop: 100 }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={(v) => this.onFinish(v)}
                    onFinishFailed={(err) => this.onFinishFailed(err)}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Password bạn chưa nhập!',
                            },
                        ]}>
                        <Input.Password
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.erros,
});

export default withRouter(
    connect(
        mapStateToProps,
        { loginUser },
        undefined,
        { pure: false },
    )(Login),
);

