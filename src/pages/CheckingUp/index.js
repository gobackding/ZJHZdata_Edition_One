import React, { Fragment } from "react";
import { Form, Table,Button } from "antd"

import { conditionApi, booksListApi, pagingListApi, DeteteValueApi } from "@api"
import connect from "./connect.js"
import {JHTZCK,SUPERVISORVUE} from "@api"
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
            visibleNew: false
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
                title: '执行状态',
                dataIndex: 'statusType',
                key: 'statusType',
                align:'center',
                sortOrder: sortedInfo.columnKey === 'statusType' && sortedInfo.order,
                ellipsis: true,
            }


        ];
        console.log(this.props.FromListStatus,"8888888")
        return (
            
            <Fragment>
            <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                    当前位置：首页-检核状态
                </div>
                <div style={{padding:'10px'}}>
                <Button type="primary" onClick={this.StatusSeeClick.bind(this)} style={{margin:'0 0 6px 0'}}>查看检核历史</Button>
                <Table columns={columns}
                    dataSource={this.props.FromListStatus}
                    onChange={this.handleChange.bind(this)}
                    style={{ backgroundColor: '#fff' }
                    }
                >
                </Table>
                </div>
                
            </Fragment>
        )
    }
//    查看状态
     async StatusSeeClick(){
        // this.props.history.push("/Supervise")
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let FromListStatus=JSON.parse(sessionStorage.getItem("FromListStatus"))
        
        let FromListValue = JSON.parse(JSON.stringify(FromListStatus))
        let str=""
        let Array = resDate.split("-")
        for(var i = 0 ; i<Array.length ; i++){
            str+=Array[i]
        }
        let arr ={}
        arr.Time=str
        arr.List = FromListValue
        console.log(arr,"arr")
        // JSON.stringify(FromListValue)
        let DataType = await JHTZCK(arr)
        console.log(DataType,"返回结果")
        console.log(this.props)
    //    if(DataType.msg=="成功"){
           this.props.history.push("/Supervise")
    //    }
        
    }
    componentDidMount(){
        this.forceUpdate()
       
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
}

export default CheckingUp