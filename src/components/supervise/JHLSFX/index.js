import React, { Fragment } from "react";
import { Table, Button, Modal, Input, Select, Pagination } from "antd"
import { ExcelDownload, SUPERVISORVUE, CHECKVALUEPAI } from "@api"
import { LSFXLIST, LSFXDQ, HQLCLIST, LSFXCHList, DCYBSCSL } from "@api/Supervise"
import EchartPie from "./Echart"
import ColumnChart from "./ColumnChart"
import Calendar from "./calendar"
import ReverseChecking from "./ReverseChecking"
const { Option } = Select;
const columns = [
    {
        title: '规则号',
        dataIndex: 'ruleSeq',
        align: 'center',
        width: '100px'
    },
    {
        title: '规则描述',
        dataIndex: 'ruleDesc',
        align: 'center',
    },
    {
        title: '中文表名',
        dataIndex: 'srcTabNameCn',
        align: 'center',
    },
    {
        title: '英文表名',
        dataIndex: 'srcTabNameEn',
        align: 'center',
    },
    // {
    //     title: '字段',
    //     dataIndex: 'dataFieldCode',
    //     align: 'center',
    //     width: '100px'
    // },
    {
        title: '失范总数',
        dataIndex: 'sfsjzl',
        align: 'center',
        width: '100px',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.sfsjzl - b.sfsjzl,
    },
    {
        title: '失范比例',
        dataIndex: 'sfsjbl',
        align: 'center',
        width: '100px',
        filterMultiple: false,
        sorter: (a, b) => {
            return parseInt(a.sfsjbl) - parseInt(b.sfsjbl)
        },
    },
    {
        title: '采集日期',
        dataIndex: 'cjrq',
        align: 'center',
        width: '100px'
    }
];


class JHLSFX extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    id: '1',
                    ruleSeq: 'John Brown',
                    ruleDesc: 32,
                    srcTabNameCn: '中国',
                    srcTabNameEn: 'Chinese',
                    dataFieldCode: 32,
                    sfsjzl: 50,
                    sfsjbl: "20%",
                    cjrq: 20120101
                }
            ],
            visible: false,
            ReverseChecking: false,
            EditListValue: [],
            Rotation: "",
            SelectValue: 1,
            calendarTime: "请选择时间",
            currPage: 1,
            totalCount: 10,
            SelectList: [],//轮次
            FYTime: "20191116",
            LC: 1,
            InputValueH: 1,
            DCTCBool: false,//样本导出
        }

    }
    render() {
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核结果历史分析
                </div>
                <div style={{ padding: '10px' }} className="supervisorTableFY">
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button type="primary"
                                onClick={this.DQClickhandler.bind(this)}
                                style={{ margin: '0 6px 0 0 ' }}>当期</Button>
                            <Button type="primary"
                                onClick={this.QBClickhandler.bind(this)}
                                style={{ margin: '6px' }}>全部</Button>
                            <div
                                onClick={this.RLClickhandler.bind(this)}
                                style={{
                                    width: '100px',
                                    height: '32px',
                                    border: 'solid 1px #d9d9d9',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                    display: 'inline-block',
                                    margin: '6px',
                                    color: '#666',
                                    lineHeight: '32px',
                                    paddingLeft: '5px',
                                    cursor: 'pointer'
                                }} >
                                {this.state.calendarTime}
                            </div>
                            <Select defaultValue="请选择轮次" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.SelectList.map((item, index) => {
                                        return <Option value={item} key={index}>{item}</Option>
                                    })
                                }
                            </Select>
                            <Button type="primary" style={{ margin: '6px' }} onClick={this.QueryData.bind(this)}>查询</Button>
                        </div>
                        <div>
                            <span>样本数量（行）</span>
                            <Input type="text" style={{ width: '120px' }} placeholder={this.state.data.length}
                                onChange={this.ChangeInputValue.bind(this)}
                            />
                            <Button type="primary" onClick={this.DCExcel.bind(this)} style={{ margin: '6px' }}>导出样本</Button>
                            <Button type="primary"
                                onClick={this.SCSBClickhandler.bind(this)}
                                style={{ margin: '6px' }}>生成上报</Button>
                        </div>
                    </div>
                    <Table columns={columns}
                        dataSource={this.state.data}
                        onChange={this.onChange.bind(this)}
                        onRow={record => {
                            let Value = record
                            return {
                                onDoubleClick: event => {
                                    this.thatsOk(Value)
                                }
                            }
                        }}
                        style={{ backgroundColor: '#fff', marginTop: '10px' }} />

                    <div style={{ marginTop: '10px' }}>
                        <Pagination showQuickJumper
                            defaultCurrent={this.state.currPage} total={this.state.totalCount}
                            onChange={this.SupervisorFY.bind(this)} />
                    </div>
                    <div style={{ backgroundColor: '#fff', marginTop: '10px', display: 'none', justifyContent: 'space-between' }}>
                        <div style={{ width: '480px', height: '380px', display: 'inline-block', margin: '10px' }}>
                            <ColumnChart />
                        </div>
                        <div style={{ width: '480px', height: '380px', display: 'inline-block', margin: '10px' }}>
                            <EchartPie></EchartPie>
                        </div>
                    </div>
                    <Modal
                        title="日历"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        className="Supervise"
                    >
                        <Calendar calendarTime={this.CanlerTime.bind(this)}></Calendar>
                    </Modal>
                    <Modal
                        title="数据反查"
                        visible={this.state.ReverseChecking}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        className="ReverseChecking"
                    >
                        <ReverseChecking
                            CloseClick={this.CloseClick.bind(this)}
                            val={this.state.EditListValue}
                        />

                    </Modal>
                    <Modal
                        title="样本导出"
                        visible={this.state.DCTCBool}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        className="ReverseChecking"
                    >
                        <p>您的样本已成功导出</p>
                        <div>
                            <Button type="primary" onClick={this.DCYBValue.bind(this)}>确定</Button>
                            <Button onClick={this.DCYBValue.bind(this)}>取消</Button>
                        </div>
                    </Modal>
                </div>
            </Fragment>
        )
    }
    // 样本导出
    DCYBValue(){
        this.setState({
            DCTCBool:false
        })
    }
    // 输出的行数
    ChangeInputValue(e) {
        this.setState({
            InputValueH: e.target.value
        })
    }
    // 分页器
    async SupervisorFY(pageNumber) {
        console.log(this.state.FYTime, ",,,,")
        let Time = this.state.FYTime
        let LC = this.state.SelectValue
        let val = {}
        val.Time = Time
        val.pageNumber = pageNumber
        val.LC = LC
        console.log(val, "val")
        console.log(pageNumber)
        let FYList = await LSFXLIST(val)
        console.log(FYList)
        this.setState({
            data: FYList.data.page.list,
            currPage: FYList.data.page.currPage,
            totalCount: FYList.data.page.totalCount
        })
    }
    // 轮次的下拉
    handleChange(value) {
        this.setState({
            SelectValue: value
        })
        console.log(`selected ${value}`);
    }

    // 双击弹窗
    async thatsOk(record) {
        console.log(record)
        let ListValueApi = await CHECKVALUEPAI(record.ruleSeq)
        console.log(ListValueApi, "双击-接口")
        this.setState({
            ReverseChecking: true,
            EditListValue: ListValueApi.data
        })
    }
    componentDidMount() {
        this.DQClickhandler()
    }
    async HandlerValue() {
        let FromArr = {}
        FromArr.Time = ""
        FromArr.sblc = ""
        console.log(FromArr, "FromArr")
        let data = await SUPERVISORVUE(FromArr)
        console.log(data, "返回")
        this.setState({
            data: data.data.page.list,
            currPage: data.data.page.currPage,
            totalCount: data.data.page.totalCount,

        })
        console.log(data, "opopop")
    }
    // onChange
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    // 当期按钮
    async DQClickhandler() {
        let Time = '20191116'
        let DAData = await LSFXDQ(Time)
        console.log(DAData)
        this.setState({
            data: DAData.data.page.list,
            currPage: DAData.data.page.currPage,
            totalCount: DAData.data.page.totalCount,
            FYTime: Time
        })
    }
    // 日历按钮
    RLClickhandler() {
        this.setState({
            visible: true
        })
    }
    // 点击日期关闭弹窗
    async CanlerTime(val) {
        let str = ""
        let Array = val.split("-")
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        let FromArr = {}
        FromArr.Time = str
        FromArr.sblc = ""
        let RQTime = await HQLCLIST(FromArr)
        let RQArray = RQTime.data.sort(function(a,b){
            return b-a
        })
        console.log(RQTime,"RQTime")
        console.log(FromArr, "FromArr")
        this.setState({
            visible: false,
            calendarTime: FromArr.Time,
            SelectList: RQArray
        })
    }
    // 全部按钮
    QBClickhandler() {
        this.setState({
            FYTime: ''
        }, () => {
            console.log(this.state.FYTime, "7777")
            this.HandlerValue()
        })
    }
    // 生成上报
    SCSBClickhandler() {
        this.props.HiddenDisplay()
    }
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 点击取消关闭弹窗
    handleCancel() {
        this.setState({
            visible: false,
            ReverseChecking: false
        })
    }
    // 导出excel表格
    async DCExcel() {
        let val = {}
        val.lc = this.state.SelectValue//轮次
        val.cjrq = this.state.calendarTime//时间
        val.hc = this.state.InputValueH//导出行
        console.log(val,"导出Excel")
        let data = await DCYBSCSL(val)
        console.log(data)
        
    }
    // 关闭数据反查弹框
    CloseClick() {
        this.setState({
            ReverseChecking: false,
            EditListValue:[]
        })
    }
    // 点击查询，获取日历-轮次
    async QueryData() {
        let queryData = {}
        queryData.Time = this.state.calendarTime
        queryData.SelectValue = this.state.SelectValue
        console.log(queryData, "queryData")
        let data = await LSFXCHList(queryData)
        console.log(data)
        this.setState({
            data: data.data.page.list,
            currPage: data.data.page.currPage,
            totalCount: data.data.page.totalCount
        })
    }
}
export default JHLSFX