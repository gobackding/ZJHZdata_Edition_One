import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Row, Col } from 'antd';
import renderTabBar from "@utils/renderTabBar"
import { layoutRoute } from "@router"
import { withRouter } from "react-router-dom"
import Cookies from "js-cookie";
import {LayoutStyled} from "./styled"

const { Header, Content, Footer, Sider } = Layout;

@withRouter
class LayoutComponent extends Component {
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    个人信息
              </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    修改密码
              </Menu.Item>
                <Menu.Item key="signout">
                    <Icon type="user" />
                    退出登录
              </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{ height: "100%" }}>
                {/* 左边边的内容区 */}
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: '64px'
                    }}
                >

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["/home"]}
                        onClick={this.handleTo.bind(this)}
                    >
                        {renderTabBar(layoutRoute)}
                    </Menu>
                </Sider>
                {/* 右边的内容区 */}
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#111B39', padding: 0, position: 'absolute', left: '0', right: '0', top: '0', height: '64px', zIndex: 5 }} >
                        <LayoutStyled>
                            
                        
                        </LayoutStyled>

                        <Row>
                            <Col span={2} offset={22}>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="#" style={{color:'#fff'}}>
                                        Hover me <Icon type="down" />
                                    </a>
                                </Dropdown>,
                            </Col>
                        </Row>

                    </Header>
                    <div style={{ height: '70px' }}></div>
                    <Content style={{ overflow: 'auto', height: "100%" }}>
                        <div style={{  background: '#f4f4f4' }}>
                            {this.props.children}
                        </div>
                    </Content>

                </Layout>
            </Layout>
        )
    }
    handleTo({ key }) {
        this.props.history.push(key);
    }
    handleMenuClick({ key }) {
        console.log(key)
        if (key === 'signout') {
            Cookies.remove("token");
            this.props.history.push("/login")
        }
    }
}
export default LayoutComponent;