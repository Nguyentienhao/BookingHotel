// libary
import React from 'react';
import "antd/dist/antd.css";
import { Layout, Card, Row, Col, } from 'antd';

const { Meta } = Card;

const { Content } = Layout;

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCard = () => {
        return (
            <Card
                hoverable
                style={{ width: 200, }}
                cover={<img alt="example" style={{ height: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Pylos Hotel" description="lfakjsdlkjfldkj" />
                <div style={{ paddingTop: 10 }}>0387237923</div>
                <button style={{ marginTop: 5 }}>Đặt Phòng</button>
            </Card>
        )
    }

    render() {
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px', marginTop: 100 }}>
                    <div style={{ minHeight: 280, background: 'white' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                {this.renderCard()}
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Home;