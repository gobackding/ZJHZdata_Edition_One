import React, { Fragment } from "react";
import { Form, Input, Button, Select, Calendar, Alert, Modal } from "antd"
import moment from 'moment';
import connect from "./connect"
import { QueryFunctionStyle } from "./styled"
const { Search } = Input


const { Option } = Select
@connect
@Form.create()
class queryFunction extends React.Component {
    constructor() {
        super()
        this.state = {
            Time: "",
            value: "",
            selectedValue: moment('2017-01-25'),
            visible: false,
            ruleSeq: "",
            ruleType: "",
            level: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            diySql: "",
            ruleDesc: ""
        }
    }
    render() {
        console.log(this.props,"87878")
        return (
            <Fragment>
                <div >
                    <Form >
                        <Input type="text"
                            placeholder="请输入规则号"
                            onChange={this.ruleSeqValue.bind(this)}
                            value={this.state.ruleSeq}
                            style={{ width: '140px', display: 'inline-block', }} />
                        
                        <Select style={{ width: 140 }}
                            onChange={this.LevelhandleChange.bind(this)}
                            defaultValue='请选择类型'
                            style={{ width: '140px', display: 'inline-block', margin: '0 10px', }}
                        >
                            
                            {
                                this.props.ZYXValue.map((item,index)=>{
                                    return <Option value={item} key={index}>{item}</Option>
                                })
                            }
                        </Select>


                        <Input type="text" placeholder="请填写中文表名"
                            onChange={this.srcTabNameCnValue.bind(this)}
                            value={this.state.srcTabNameCn}
                            style={{ width: '140px', display: 'inline-block', margin: '0 10px', }} />

                        <Input type="text" placeholder="请输入英文表名"
                            onChange={this.srcTabNameEnValue.bind(this)}
                            value={this.state.srcTabNameEn}
                            style={{ width: '140px', display: 'inline-block', margin: '0 10px', }} />

                        <Input type="text" placeholder="查询SQL"
                            onChange={this.diySqlValue.bind(this)}
                            value={this.state.diySql}
                            style={{ width: '140px', display: 'inline-block', margin: '0 10px', }} />

                        <Input type="text" placeholder="请填写规则描述"
                            onChange={this.ruleDescValue.bind(this)}
                            value={this.state.ruleDesc}
                            style={{ width: '140px', display: 'inline-block', margin: '0 10px', }} />


                        <QueryFunctionStyle >
                            <Form.Item>
                                <Button block type="primary"
                                    onClick={this.classfyListFilter.bind(this)}
                                    style={{ width: '75px', margin: '0 10px' }}
                                >查询</Button>

                            </Form.Item>
                            <div >
                                <Button block type="primary" style={{ width: '75px', margin: '0 10px' }}
                                    onClick={this.ResetClick.bind(this)}
                                >重置</Button>
                                <Button block type="primary"
                                    style={{ width: '75px', margin: '0 10px' }}
                                    onClick={this.ReviewFromList.bind(this)}
                                >检核</Button>
                                <Search
                                    placeholder={this.state.Time}
                                    onSearch={this.SearchValue.bind(this)}
                                    style={{ width: 200 }}

                                />
                            </div>
                        </QueryFunctionStyle>
                    </Form>
                </div>
                <Modal
                    title="时间"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div>
                    <Calendar 
                        onPanelChange={this.onPanelChange.bind(this)}
                        fullscreen={false}
                        onSelect={this.onSelect.bind(this)}
                         />
                        
                    </div>
                </Modal>
            </Fragment>
        )
    }
    // 重置按钮
    ResetClick() {
        this.setState({
            ruleSeq: "",
            ruleType: "",
            level: "",
            srcTabNameCn: "",
            srcTabNameEn: "",
            diySql: "",
            ruleDesc: ""
        })
        this.props.NewDataList()
    }
    // 请输入规则号
    ruleSeqValue(e) {
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 中文表名
    srcTabNameCnValue(e) {
        this.setState({
            srcTabNameCn: e.target.value
        })
    }
    // 英文表名
    srcTabNameEnValue(e) {
        this.setState({
            srcTabNameEn: e.target.value
        })
    }
    // 查询数据库
    diySqlValue(e) {
        this.setState({
            diySql: e.target.value
        })
    }
    // 请填写规则描述
    ruleDescValue(e) {
        this.setState({
            ruleDesc: e.target.value
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    onSelect = value => {
        console.log(value, "999999")

        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())

        console.log(resDate)
        this.setState({
            Time: resDate,
            value: resDate,
        },()=>{
            this.handleOk()
        });
    };

    onPanelChange = value => {
        console.log(value, "8888")
        const d = new Date(value._d)
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        console.log(resDate, "777")
        this.setState({ 
            value: resDate 
        });
    };
    componentDidMount() {
        this.TimeLocal()
    }
    // 获取本地日期
    TimeLocal() {
        let TimeData = new Date()
        let resDate = TimeData.getFullYear() + '-' + this.p((TimeData.getMonth() + 1)) + '-' + this.p(TimeData.getDate())
        console.log(resDate, "处理过的本地日期")
        this.setState({
            Time: resDate,
            value: TimeData
        })
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 点击搜索
    SearchValue(value) {
        console.log(value)
        this.setState({
            visible: true
        })
    }
    // 点击查询按钮获取数据
    classfyListFilter() {
        let arr = {}
        arr.ruleSeq = this.state.ruleSeq
        arr.ruleType = this.state.ruleType
        // arr.level = this.state.level
        arr.srcTabNameCn = this.state.srcTabNameCn
        arr.srcTabNameEn = this.state.srcTabNameEn
        arr.diySql = this.state.diySql
        arr.ruleDesc = this.state.ruleDesc
        // arr.ruleImp = this.state.ruleImp
        console.log(arr)
        // e.preventDefault()
        // this.props.form.validateFields(async (err, values) => {
        this.props.queryfunction(arr)

        // })
    }
    // 点击检核检核数据
    ReviewFromList() {
        this.props.queryFromBool(this.state.Time)

    }
    // 重要性
    LevelhandleChange(value) {
        this.setState({
            ruleType: value
        })
    }
    // 请填写检核类型
    TypehandleChange(value) {
        this.setState({
            ruleType: value
        })
    }
}
export default queryFunction