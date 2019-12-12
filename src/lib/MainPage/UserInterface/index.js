import React, { Fragment } from "react";
import { Card, Col, Row } from 'antd'
import ChartsOne from "./ChartsOne"
import ChartsTwo from "./ChartsTwo"
import ChartsThree from "./ChartsThree"
import {CHARTSLISTVALUE} from "@api/UserInterface"
class UserInterface extends React.Component {
    constructor(){
        super()
        this.state={
            totleCheckingTimes:'0',
            totleJCSJZL:'0',
            totleSFSJZL:'0',
            totlebili:'0'
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ background: '#ECECEC', padding: '20px 30px 15px' }}>
                    <Row gutter={16} >
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card title="检核次数" bordered={false} hoverable={true}>
                                {this.state.totleCheckingTimes}
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card title="失范总数" bordered={false} hoverable={true}>
                                {this.state.totleSFSJZL}
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card title="检核数据总量" bordered={false} hoverable={true}>
                               {this.state.totleJCSJZL}
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }}>
                            <Card title="数据质量" bordered={false} hoverable={true}>
                                {this.state.totlebili}
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div style={{ background: '#ECECEC', padding: '5px 30px 15px' }}>
                    <Row gutter={16} >
                        <Col span={6} style={{ textAlign: 'center' }} onClick={this.DataCardOne.bind(this)}>
                            <Card bordered={false} hoverable={true}>
                                数据检核
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }} onClick={this.DataCardTwo.bind(this)}>
                            <Card bordered={false} hoverable={true}>
                                检核报告
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }} onClick={this.DataCardThree.bind(this)}>
                            <Card bordered={false} hoverable={true}>
                                数据管理
                            </Card>
                        </Col>
                        <Col span={6} style={{ textAlign: 'center' }} onClick={this.DataCardFour.bind(this)}>
                            <Card bordered={false} hoverable={true}>
                                规则管理
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '20px 30px 0px 10px', display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '500px' }}>
                        <ChartsOne ></ChartsOne>
                    </div>
                    <div style={{ width: '500px' }}>
                        <ChartsTwo ></ChartsTwo>
                    </div>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '5px 30px 20px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '5px 30px 20px', width: '1000px' }}>
                        <ChartsThree></ChartsThree>
                    </div>
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        this.HandlerValue()
    }
    async HandlerValue(){
        let data = await CHARTSLISTVALUE()
        if(data.data){
            this.setState({
                totleCheckingTimes:data.data[0].totleCheckingTimes,
                totleJCSJZL:data.data[0].totleJCSJZL,
                totleSFSJZL:data.data[0].totleSFSJZL,
                totlebili:data.data[0].totlebili
            })
        }
        
    }
    // 数据检核
    DataCardOne() {
        // this.props.history.push("/DataChecking/FileManagement")
        this.props.history.push("/UserChoice")
    }
    // 检核报告
    DataCardTwo() {
        this.props.history.push("/DataChecking/Supervise")
    }
    DataCardThree() {
        console.log("跳转到数据管理")
    }
    // 规则管理
    DataCardFour() {
        this.props.history.push("/XTGLPage/Home")
    }
}
export default UserInterface