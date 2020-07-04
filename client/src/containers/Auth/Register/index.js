import 'antd/dist/antd.css';
import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { registerUser } from "../../../actions/auth.action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 8,
            offset: 4,
        },
        sm: {
            span: 8,
            offset: 8,
        },
    },
};

const Register = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        const userData = {
            email: values.email,
            password: values.password,
            confirm_password: values.confirm,
            phone_number: values.phone,
        };

        props.registerUser(userData, props.history);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div
            style={{ textAlign: 'center' }}
        >
            <label style={{ fontWeight: 'bold', fontSize: 24, marginTop: 120 }}>{"Đăng ký"}</label>
            <Form
                {...formItemLayout}
                style={{ marginTop: 100 }}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email bạn nhập chưa chính xác!',
                        },
                        {
                            required: true,
                            message: 'Bắt buộc nhập Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Bắc buộc nhập password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Bắt buộc nhâp xác nhận password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('Password và xác nhận Password Không giống nhau!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                    ]}>
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }} />
                </Form.Item>

                <Form.Item
                    {...tailFormItemLayout}
                >
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = state => ({
    errors: state.errors,
});

export default withRouter(
    connect(
        mapStateToProps,
        { registerUser },
        undefined,
        { pure: false },
    )(Register),
);