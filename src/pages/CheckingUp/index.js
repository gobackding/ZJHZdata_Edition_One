import React, { Fragment } from "react";
import { Form, Table, Button, Input, Progress } from "antd"
// import WebSocket from "ws"
import { conditionApi } from "@api"
import connect from "./connect.js"
import { JHTZCK, JHIDSH } from "@api"
import { JHZTCX, DJCKJG } from "@api/CheckingUp"
@connect
@Form.create()
class CheckingUp extends React.Component {
    constructor() {
        super()
        this.state = {
            FromListValue: [],
            data: [],
            sortedInfo: null,
            filteredInfo: null,
            currPage: 1,
            totalCount: 20,
            flag: false,
            arrId: [],
            visible: false,
            EditFromValue: {},
            NewlyAdded: false,
            visibleNew: false,
            ruleSeq: '',//规则号
            cid: '1',
            trueCount: 0,
            FromListStatus: [],//总数据
            Percentage: 0,//百分比
            ErrorValue: 0,//失败数
            TrueValue: 0,//成功数
        }
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
                key: 'ruleSeq',
                width: "120px",
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleSeq' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                key: 'ruleDesc',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'ruleDesc' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'srcTabNameCn',
                key: 'srcTabNameCn',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'srcTabNameCn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '英文表名',
                dataIndex: 'srcTabNameEn',
                key: 'srcTabNameEn',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'srcTabNameEn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '目标字段',
                dataIndex: 'dataFieldCode',
                key: 'dataFieldCode',
                align: 'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'dataFieldCode' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '执行状态',
                dataIndex: 'statusType',
                key: 'statusType',
                align: 'center',
                sortOrder: sortedInfo.columnKey === 'statusType' && sortedInfo.order,
                ellipsis: true,
            }


        ];

        return (

            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核状态
                </div>
                <div style={{ padding: '10px' }}>
                    <div>
                        <Button type="primary" onClick={this.BackHistory.bind(this)} style={{ marginRight: '10px' }}>返回</Button>
                        <Button type="primary" onClick={this.StatusSeeClick.bind(this)} style={{ margin: '0 0 6px 0' }}>查看结果</Button>
                        <div style={{ float: 'right' }}>
                            <Input placeholder="请输入规则号"
                                style={{ width: '140px', margin: '0 10px' }}
                                onChange={this.RuleSeqInput.bind(this)} />
                            <Button type="primary" onClick={this.QueryInputValue.bind(this)}>查询</Button>
                        </div>
                    </div>
                    <div style={{ margin: '10px 0' }} className="jindu">
                        <div style={{ float: 'left' }}>
                            <Progress percent={this.state.Percentage} status="active" style={{ width: '600px' }} />
                        </div>
                        <div style={{ float: 'right' }}>
                            <span> 失败总数：{this.state.ErrorValue}</span>
                            <span> 成功总数：{this.state.TrueValue}</span>
                        </div>
                    </div>
                    <Table columns={columns}
                        dataSource={this.state.FromListStatus}
                        onChange={this.handleChange.bind(this)}
                        style={{ backgroundColor: '#fff' }
                        }
                    >
                    </Table>
                </div>

            </Fragment>
        )
    }
    //    查看结果
    async StatusSeeClick() {
        // let TrueFromList = []
        // let FromListStatus = this.state.FromListStatus
        // for (var i = 0; i < FromListStatus.length; i++) {
        //     if (FromListStatus[i].statusType == "执行成功") {
        //         TrueFromList.push(FromListStatus[i].ruleSeq)
        //     }
        // }
        // console.log(TrueFromList)
        // let FromData = await DJCKJG(TrueFromList)
        // console.log(FromData)

        // if (FromData.msg == "成功") {

        //     this.props.CheckingHistory(FromData.data)
        this.props.history.push("/DataChecking/Historical")
        // }


    }
    componentDidMount() {
        this.forceUpdate()
        // this.webScoketUrl()
        // this.HandlerValue()
        let FromListStatus = JSON.parse(localStorage.getItem('FromListStatus'))
        this.setState({
            FromListStatus: FromListStatus
        })
        this.setState({
            Percentage: JSON.parse(localStorage.getItem('Percentage')),
            ErrorValue: JSON.parse(localStorage.getItem('ErrorValue')),
            TrueValue: JSON.parse(localStorage.getItem('TrueValue'))
        })
        let ReviewId = JSON.parse(localStorage.getItem('review'))
        if (ReviewId == 1) {
            this.setState({
                Percentage: 0,
                ErrorValue: 0,
                TrueValue: 0
            }, () => {
                let localPercentage = JSON.parse(localStorage.getItem('Percentage'))
                let FromListStatusBool = FromListStatus.every(function (item, index, array) {
                    return item.statusType != '正在执行'
                })
                if (FromListStatusBool) {
                    localStorage.setItem('review', JSON.stringify(0))
                }
                this.setIntervalValue(localPercentage)
            })
        }
    }
    setIntervalValue(val) {
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

                let Proportion = JSON.parse(localStorage.getItem('Percentage'))
                let StorageError = JSON.parse(localStorage.getItem('ErrorValue'))
                let StorageTrue = JSON.parse(localStorage.getItem('TrueValue'))
                _this.setState({
                    FromListStatus: FromListStatus,
                    Percentage: Proportion,
                    ErrorValue: StorageError,
                    TrueValue: StorageTrue
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
    HandlerValue() {
        console.log(1)
    }
    webScoketUrl() {
        var wsServer = "ws://172.16.10.61:8098/review/checkin?ids=1&checkTime=20111116";//服务器连接
        var websocket = new WebSocket(wsServer); //创建WebSocket对象
        // websocket.send("hello");//向服务器发送消息
        alert(websocket.readyState);//查看websocket当前状态
        websocket.onopen = function (evt) {
            //已经建立连接
        };
        websocket.onclose = function (evt) {
            //已经关闭连接
        };
        websocket.onmessage = function (evt) {
            //收到服务器消息，使用evt.data提取
        };
        websocket.onerror = function (evt) {
            //产生异常
        };
    }
    handleChange = (pagination, filters, sorter) => {

    };

    async QueryFromList(val) {
        let QueryFromListValue = await conditionApi(val)
        console.log(QueryFromListValue)
    }
    RewviewFromList(val) {

    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    // 输入查询
    RuleSeqInput(e) {
        if (e.target.value == "") {
            this.setState({
                FromListStatus: JSON.parse(localStorage.getItem('FromListStatus'))
            })
        }
        this.setState({
            ruleSeq: e.target.value
        })
    }
    // 查询按钮
    async QueryInputValue() {
        console.log()
        let data = await JHZTCX(this.state.ruleSeq)
        let FromListStatus = data.data
        console.log(data, "data")
        if (FromListStatus[0].cg == 1) {
            FromListStatus[0].statusType = "执行成功"
        } else if (data.data[0].cg == 2) {
            FromListStatus[0].statusType = "执行失败"
        }
        console.log(Array, "11111")
        this.setState({
            FromListStatus: FromListStatus
        })
    }
    // 返回上一页
    BackHistory() {
        console.log(this)
        this.props.history.push('/DataChecking/ClassfyList')
    }
}

export default CheckingUp