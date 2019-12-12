import React, { Fragment } from "react";
import { Form, Input, Button, Select, Calendar, Alert, Modal, Progress } from "antd"
import moment from 'moment';
import connect from "./connect"
import { QueryFunctionStyle } from "./styled"
import { withRouter } from "react-router-dom"
import { JHTZCK, JHIDSH } from "@api"
const { Search } = Input


const { Option } = Select
@withRouter
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
            ruleDesc: "",
            Percentage: 0,
            loading: false,//加载  检核中
        }
    }
    render() {
        console.log(this.props, "87878")
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
                                this.props.ZYXValue.map((item, index) => {
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Item>
                                        <Button style={{ width: '75px', margin: '0 10px' }}
                                            type="primary"
                                            onClick={this.BackHistory.bind(this)}
                                        >返回</Button>
                                        <Button block type="primary"
                                            onClick={this.classfyListFilter.bind(this)}
                                            style={{ width: '75px', margin: '0 10px' }}
                                        >查询</Button>

                                    </Form.Item>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button block type="primary" style={{ width: '75px', margin: '0 10px' }}
                                            onClick={this.ResetClick.bind(this)}
                                        >重置</Button>
                                        <Button block type="primary"
                                            style={{ width: '75px', margin: '0 10px' }}
                                            onClick={this.ReviewFromList.bind(this)}
                                        >检核</Button>
                                        <div style={{ margin: '0 10px',position:'relative' }}>
                                            <Button type="primary"
                                                onClick={this.BackTypeClick.bind(this)}
                                               
                                            >当前检核状态</Button>
                                            
                                        </div>
                                        <Progress percent={this.state.Percentage} status="active" style={{ width: '288px' }} />
                                    </div>
                                </div>
                                <Search
                                    placeholder={this.state.Time}
                                    onSearch={this.SearchValue.bind(this)}
                                    style={{ width: 200, height: '34px' }}

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
        }, () => {
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
        let ReviewId = JSON.parse(localStorage.getItem('review'))
        let Percentage = JSON.parse(localStorage.getItem('Percentage'))
        this.setState({
            Percentage: Percentage,
        })
        if (ReviewId == 1) {
            this.setState({
                Percentage: Percentage,
                ErrorValue: 0,
                TrueValue: 0,
                loading:false
            }, () => {
                let localPercentage = JSON.parse(localStorage.getItem('Percentage'))
                this.setIntervalValue(localPercentage)
            })
        }else{
            this.setState({
                loading:true
            })
        }
    }
    // 时间戳的函数
    setIntervalValue(val) {
        console.log(val)
        let FromListLength = JSON.parse(localStorage.getItem('FromListLength'))
        let Summation = 0
        let t = 0;
        let FromListStatus = JSON.parse(localStorage.getItem('FromListStatus'))

        let _this = this
        let sum = 0
        let ErrorValue = JSON.parse(localStorage.getItem('ErrorValue'))
        let TrueValue = JSON.parse(localStorage.getItem('TrueValue'))
        let ArrayId = []
        for (var q = 0; q < FromListStatus.length; q++) {
            if (FromListStatus[q].statusType == '正在执行') {
                ArrayId.push(FromListStatus[q].id)
            }
        }
        console.log(ArrayId, 'Array')
        setInterval(async function () {
            let Array = []
            t = Summation
            let MathLength = parseInt(Math.random() * 100)
            Summation = Summation + MathLength
            // 清除一下定时器
            if (t > ArrayId.length) {
                clearInterval()
            }
            for (var i = 0; i < ArrayId.length; i++) {
                if (t > ArrayId.length) return
                if (t <= i && i < Summation) {
                    Array.push(ArrayId[i])
                }
            }
            let data = await JHIDSH(Array)
            console.log(data)
            if (data.data) {
                ErrorValue += data.data.errorCount
                TrueValue += data.data.trueCount
                sum += data.data.errorCount + data.data.trueCount
                // 使用随机数，往后端随机传id
                let Percentage = Math.ceil((sum / FromListLength) * 100) + val
                let Error = data.data.error[0].split(",")//失范的数组
                let True = data.data.true[0].split(",")//成功的数组
                for (var j = 0; j < FromListStatus.length; j++) {
                    for (var k = 0; k < Error.length; k++) {
                        if (FromListStatus[j].id == Error[k]) {
                            FromListStatus[j].statusType = '执行失败'
                        }
                    }
                }
                for (var N = 0; N < FromListStatus.length; N++) {
                    for (var M = 0; M < True.length; M++) {
                        if (FromListStatus[N].id == True[M]) {
                            FromListStatus[N].statusType = '执行成功'
                        }
                    }
                }
                localStorage.setItem('ErrorValue', JSON.stringify(ErrorValue))
                localStorage.setItem('TrueValue', JSON.stringify(TrueValue))
                localStorage.setItem('Percentage', JSON.stringify(Percentage))
                localStorage.setItem('FromListStatus', JSON.stringify(FromListStatus))
                _this.setState({
                    Percentage: Percentage,
                })
                let FromListStatusBool = FromListStatus.every(function (item, index, array) {
                    return item.statusType != '正在执行'
                })
                if (FromListStatusBool) {
                   
                    localStorage.setItem('review', JSON.stringify(0))
                }
            }
        }, 2000)
    }
    // 获取本地日期
    TimeLocal() {
        let TimeData = this.props.DetailTime
        let resDate = this.props.DetailTime
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
        localStorage.setItem('ErrorValue', JSON.stringify(0))
        localStorage.setItem('TrueValue', JSON.stringify(0))
        localStorage.setItem('Percentage', JSON.stringify(0))
        localStorage.setItem('FromListStatus', JSON.stringify(0))
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
    // BackTypeClick 跳转到当前检核状态
    BackTypeClick() {
        console.log(this)
        this.props.history.push('/DataChecking/CheckingUp')
    }
    // 返回上一页
    BackHistory() {
        this.props.history.push('/UserChoice')
    }
}
export default queryFunction