import React, { Fragment } from "react";
import { Form, Table, Radio } from "antd"
import QueryFunction from "./queryFunction"
import { conditionApi, JHKSLBZS ,JHCHLIST} from "@api"
import {SJJHZYX} from "@api/ClassfyList"
import connect from "./connect"
@connect
@Form.create()
class classfyList extends React.Component {
    constructor() {
        super()
        this.state = {
            FromListValue: [],
            data: [
            ],
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
            selectedRowKeys:[],
            SJJHZYX:[]//重要性的数组
        }
    }
    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const {  selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: '选择',
                dataIndex: 'operation',
                key: 'Choice',
                width: "70px",
                align:'center',
                ellipsis: true,
                filters: [{ text: '全选', value: '1' }, { text: '取消', value: '0' }],
                filterMultiple: false,
                filteredValue: filteredInfo.address || null,
                onFilter: this.TagsHandlerFilter.bind(this),
                render: (text, record) => (
                    <span>
                        <Radio checked={record.bool} onClick={this.RadioClick.bind(this, record)}></Radio>
                    </span>
                ),
            },
            {
                title: '规则号',
                dataIndex: 'ruleSeq',
                key: 'ruleSeq',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'ruleSeq' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '规则描述',
                dataIndex: 'ruleDesc',
                key: 'ruleDesc',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'ruleDesc' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '中文表名',
                dataIndex: 'srcTabNameCn',
                key: 'srcTabNameCn',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'srcTabNameCn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '英文表名',
                dataIndex: 'srcTabNameEn',
                key: 'srcTabNameEn',
                align:'center',
                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'srcTabNameEn' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '目标字段',
                dataIndex: 'dataFieldCode',
                key: 'dataFieldCode',
                align:'center',

                filteredValue: filteredInfo.address || null,
                sortOrder: sortedInfo.columnKey === 'dataFieldCode' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '重要性',
                dataIndex: 'ruleType',
                key: 'ruleType',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'ruleType' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '标准类型',
                dataIndex: 'standardType',
                key: 'standardType',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'standardType' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: '版本',
                dataIndex: 'gzVersion',
                key: 'gzVersion',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'gzVersion' && sortedInfo.order,
                ellipsis: true,
            }
        ];
        return (
            <Fragment>
                <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-数据检核
                </div>
                <div style={{padding:'10px'}}>
                    <QueryFunction
                        queryfunction={this.QueryFromList.bind(this)}
                        rewviewFromList={this.RewviewFromList.bind(this)}
                        queryFromBool={this.QueryFromListBool.bind(this)}
                        ResetClick={this.ResetClick.bind(this)}
                        NewDataList={this.NewDataList.bind(this)}
                        ZYXValue={this.state.SJJHZYX}
                    ></QueryFunction>

                    <Table columns={columns}
                        dataSource={this.state.data}
                        onChange={this.handleChange.bind(this)}
                        style={{ backgroundColor: '#fff' }}
                        // rowSelection={rowSelection}
                    >
                    </Table>
                </div>
            </Fragment>
        )
    }
    // 重置按钮-重新获取数据
    NewDataList(){
        this.HandlerValue()
    }
    componentDidMount() {
        this.HandlerValue()
    }
    async HandlerValue() {
        let val = {}
        let data = await JHKSLBZS(val)
        console.log(data, "data")
        for (var i = 0; i < data.data.length; i++) {
            data.data[i].bool = true
        }
        this.setState({
            data: data.data,
            currPage: data.data.currPage,
            totalCount: data.data.totalCount
        })
        // 获取重要性
        let ZYX = await SJJHZYX()
        console.log(ZYX,"ZYX")
        this.setState({
            SJJHZYX:ZYX.data
        })

    }
    // 重置按钮
    ResetClick(){
        this.HandlerValue()
    }
    // 触发了检核数据的操作
    QueryFromListBool(val) {
        console.log(val,"检核")
        let BoolArray = []
        let BoolLength = []
        let FromList = []
        let FromListBool = this.state.data
        for (var i = 0; i < FromListBool.length; i++) {
            if (FromListBool[i].bool == true) {
                BoolArray.push(FromListBool[i].id)
                FromList.push(FromListBool[i])
            }
        }
        console.log(BoolArray, "BoolArray")
        this.props.handleAsyncList(BoolArray, FromList)

    }
    // 规则级别筛选
    TagsHandlerFilter(record, text) {
        let Array = this.state.data
        let arr = this.state.arrId
        for (var i = 0; i < Array.length; i++) {
            if (record == 1) {
                Array[i].bool = true
                arr.push(Array[i].id)
            } else if (record == 0) {
                Array[i].bool = false
            }
        }
        this.setState({
            data: Array,
            arrId: arr
        })
    }
    // 标准类型筛选
    TypeHandlerFilter(text, record) {
        console.log(record, "标准类型")
    }
    // 版本筛选
    StandardHandlerFilter(text, record) {
        console.log("版本筛选", record)
    }
    // 是否自有
    HaveHandlerFilter(text, record) {
        console.log(record, "是否自有")
    }
    // 规则类型筛选
    LevelHandlerFilter(text, record) {
        console.log(record, "规则类型筛选")
    }

    // 筛选传过来的数据
    async FromListValue(val) {
        let data = await conditionApi(val)
        console.log(data)
    }
    // 按钮
    RadioClick(record) {
        console.log(record, "record")
        let recordBool = record.bool
        let bool = recordBool = !recordBool
        console.log(bool, "99")
        let array = this.state.data;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id == record.id) {
                array[i].bool = bool
            }
        }
        this.setState({
            data: array
        }, () => {
            console.log(this.state.data, "999999")
        })

    }
    handleChange = (pagination, filters, sorter) => {

    };
    // 查询按钮
    async QueryFromList(val) {
        console.log(val,"898989")
        let QueryFromListValue = await JHCHLIST(val)
        console.log(QueryFromListValue,"QueryFromListValue")
        this.setState({
            data:QueryFromListValue.data
        })
    }
    RewviewFromList(val) {

    }
}
export default classfyList