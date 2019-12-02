import React, { Fragment } from "react";
import { Form, Table, Radio, Button, Modal, Input, Select, Pagination } from "antd"
import { ExcelDownload, SUPERVISORVUE, CHECKVALUEPAI } from "@api"
import EchartPie from "./Echart"
import ColumnChart from "./ColumnChart"
import Calendar from "./calendar"
import ReverseChecking from "./ReverseChecking"
import { SCSHVALUE, FYLISTFROM, HQLCLIST, LCTIME } from "@api/SHGL.js"
const { Option } = Select;
const columns = [
    {
        title: '规则号',
        dataIndex: 'ruleSeq',
        align: 'center',
        width: '120px'
    },
    {
        title: '规则描述',
        dataIndex: 'ruleDesc',
        align: 'center',
        width: '250px'
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
    {
        title: '字段',
        dataIndex: 'dataFieldCode',
        align: 'center',
        width: '100px'
    },
    {
        title: '失范总数',
        dataIndex: 'sfsjzl',
        align: 'center',
        defaultSortOrder: 'descend',
        width: '100px',
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


class SBAdministration extends React.Component {
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
            SelectValue: "",
            calendarTime: "请选择时间",
            currPage: 1,
            totalCount: 10,
            SelectArray: [1, 2, 3, 4]
        }

    }
    render() {
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核结果历史查询
                </div>
                <div style={{ padding: '10px' }} className="SHLSFX">
                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button type="primary" onClick={this.DQClickhandler.bind(this)} style={{ margin: '0 6px 0 0 ' }}>当期</Button>
                            <Button type="primary" onClick={this.QBClickhandler.bind(this)} style={{ margin: '6px' }}>全部</Button>
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
                                    paddingLeft: '5px'
                                }} >
                                {this.state.calendarTime}
                            </div>
                            <Select defaultValue="请选择轮次" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                {
                                    this.state.SelectArray.map(item => {
                                        return <Option value={item} key={item}>{item}</Option>
                                    })
                                }
                            </Select>
                            <Button type="primary" style={{ margin: '6px' }} onClick={this.QueryData.bind(this)}>查询</Button>
                        </div>
                        <div>
                        <Button type="primary" onClick={this.DCExcel.bind(this)}>导出Excel</Button>
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
                    <div>
                        <Pagination showQuickJumper
                            style={{ margin: '5px 0 5px 0' }}
                            defaultCurrent={this.state.currPage} total={this.state.totalCount}
                            onChange={this.FYListFrom.bind(this)} />
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
                </div>

            </Fragment>
        )
    }
    // 轮次的下拉
    handleChange(value) {
        this.setState({
            SelectValue: value
        })
        console.log(`selected ${value}`);
    }
    // 分液器
    async FYListFrom(pageNumber) {
        let FYVALU = {}
        FYVALU.Time = '20191116'
        FYVALU.page = pageNumber
        let data = await FYLISTFROM(FYVALU)
        this.setState({
            data: data.data.page.list,
            currPage: data.data.page.currPage,
            totalCount: data.data.page.totalCount
        })
    }
    // 双击弹窗
    async thatsOk(record) {
        let ListValueApi = await CHECKVALUEPAI(record.ruleSeq)
        this.setState({
            ReverseChecking: true,
            EditListValue: ListValueApi.data
        })
    }
    componentDidMount() {
        this.HandlerValue()
    }
    p(s) {
        return s < 10 ? '0' + s : s
    }
    async HandlerValue() {
        let DQTime = {}
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let Array = resDate.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        DQTime.Time = '20191116'
        let data = await SCSHVALUE(DQTime)
        this.setState({
            data: data.data.page.list,
            currPage: data.data.page.currPage,
            totalCount: data.data.page.totalCount
        })
        console.log(data, "opopop")
    }
    // onChange
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    // 当期按钮
    DQClickhandler() {

    }
    // 日历按钮
    RLClickhandler() {
        this.setState({
            visible: true
        })
    }
    // 点击日期关闭弹窗
    async CanlerTime(val) {
        let FromArr = {}
        let Array = val.split("-")
        console.log(Array)
        let str = ""
        for (var i = 0; i < Array.length; i++) {
            str += Array[i]
        }
        FromArr.Time = str
        FromArr.sblc = ""
        console.log(FromArr, "FromArr")

        this.TimeLC(FromArr)
        this.setState({
            visible: false,
            calendarTime: FromArr.Time
        })
    }
    // 根据时间获取轮次
    async TimeLC(FromArr) {
        let TimeData = await HQLCLIST(FromArr)
        if (TimeData.msg == "成功") {
            console.log(11)
            this.setState({
                SelectArray: TimeData.data
            }, () => {
                console.log(this.state.SelectArray, "Select")
            })
        }
    }
    // 全部按钮
    QBClickhandler() {

    }
    // 生成上报
    SCSBClickhandler() {
        console.log(111)
        this.props.SubmissionSB(this.state.SelectValue)
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
    DCExcel() {
        window.URL.createObjectURL  = 'http://172.16.10.61:8098/check/export'
        // let Excel = await ExcelDownload()
        // console.log(Excel)
        // axios.get("http://192.168.101.254:8098/review/export").then((data)=>{
        //     console.log(data)
        // })

    }
    // 关闭数据反查弹框
    CloseClick() {
        this.setState({
            ReverseChecking: false
        })
    }
    // 点击查询，获取日历-轮次
    async QueryData() {
        let queryData = {}
        queryData.Time = this.state.calendarTime
        queryData.SelectValue = this.state.SelectValue
        let LCTime = await LCTIME(queryData)
        console.log(LCTime,"888888")
        this.setState({
            data: LCTime.data.page.list,
            currPage: LCTime.data.page.currPage,
            totalCount: LCTime.data.page.totalCount
        })
    }
}
export default SBAdministration