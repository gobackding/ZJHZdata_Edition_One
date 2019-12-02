import React, { Fragment } from "react";
import { Table, Button, Divider, Form, Input, Modal, Select } from 'antd';
import { AdministrationStyle } from "./styled"
import Fromlist from "./Fromlist"
@Form.create()
class Administration extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    id: 1,
                    user: "zhangsan",
                    userName: "张三",
                    department: "销售部",
                    role: "管理",
                    email: "122552521@qq.com",
                    Telephone: 13345253149,
                    CreationTime: "2019-08-23"
                }
            ],
            selectedRowKeys: [],
            loading: false,
            filteredInfo: null,
            sortedInfo: null,
            keyWord: "",
            TableName: "",
            User: "",
            UserName: "",
            Email: "",
            Telephone: "",
            visible: false,
            confirmLoading: false
        }
    }
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('点击前面的选框 ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                id: 1,
                title: '账号',
                dataIndex: 'user',
                align: 'center',
            },
            {
                id: 2,
                title: '姓名',
                dataIndex: 'userName',
                align: 'center',
            },
            {
                id: 3,
                title: '部门',
                dataIndex: 'department',
                align: 'center',
            }, {
                id: 4,
                title: '角色',
                dataIndex: 'role',
                align: 'center',
            },
            {
                id: 5,
                title: '邮箱',
                dataIndex: 'email',
                align: 'center',
                width: '150px'
            },
            {
                id: 6,
                title: '电话号码',
                dataIndex: 'Telephone',
                align: 'center',
            },
            {
                id: 7,
                title: '创建时间',
                dataIndex: 'CreationTime',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                key: 'operation',
                width: "150px",
                ellipsis: true,
                render: (text, record) => {
                    return <span>
                        <a onClick={this.EditHandlerValue.bind(this, text, record)}>编辑</ a>
                        <Divider type="vertical" />
                        <a onClick={this.AbolishHandlerValue.bind(this, record)}>查看</ a>
                        <Divider type="vertical" />
                        <a onClick={this.DeleteHandlerValue.bind(this, record)}>删除</ a>
                    </span>

                },
            }
        ];

        return (
            <Fragment >
                <AdministrationStyle className="AdministrationStyle">
                    <div style={{ height: '40px', backgroundColor: '#fff', lineHeight: '40px', paddingLeft: 10, fontSize: '14px', color: '#333' }}>
                        当前位置：首页-系统管理
                    </div>
                    <div style={{ marginBottom: '12px', padding: '10px' }}>
                        <Input placeholder="请输入账号" value={this.state.User} style={{ width: 150, marginLeft: '12px' }} onChange={this.UserInput.bind(this)} />
                        <Input placeholder="请输入姓名" value={this.state.UserName} style={{ width: 150, marginLeft: '12px' }} onChange={this.UserNameInput.bind(this)} />
                        <Input placeholder="请输入邮箱" value={this.state.Email} style={{ width: 150, marginLeft: '12px' }} onChange={this.EmailInput.bind(this)} />
                        <Input placeholder="请输入电话" value={this.state.Telephone} style={{ width: 150, marginLeft: '12px' }} onChange={this.TelephoneInput.bind(this)} />
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.InspectClick.bind(this)}>查询</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.RestClick.bind(this)}>重置</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.NewlyAdded.bind(this)}>新增</Button>
                        <Button type="primary" style={{ margin: ' 0 6px' }} onClick={this.DeleteClick.bind(this)}>删除</Button>
                    </div>

                    <div style={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
                        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} onChange={this.onChange.bind(this)} />
                    </div>

                    <div >
                        <Modal
                            title="新增用户"
                            visible={this.state.visible}
                            onOk={this.handleOk.bind(this)}
                            confirmLoading={this.state.confirmLoading}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <Fromlist
                                CancelClick={this.CancelClick.bind(this)}
                                DetermineClick={this.DetermineClick.bind(this)}
                            ></Fromlist>
                        </Modal>
                    </div>
                </AdministrationStyle>
            </Fragment>
        )
    }
    // 取消关闭弹窗
    CancelClick() {
        this.setState({
            visible: false
        })
    }
    // q确定关闭
    DetermineClick(val) {
        console.log(val)
        this.setState({
            visible: false
        })
    }
    // 点击确定关闭弹窗
    handleOk() {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel() {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    //   请输入账号
    UserInput(e) {
        this.setState({
            User: e.target.value
        })
    }
    // 请输入姓名
    UserNameInput(e) {
        this.setState({
            UserName: e.target.value
        })
    }
    // 请输入邮箱
    EmailInput(e) {
        this.setState({
            Email: e.target.value
        })
    }
    // 请输入电话号码
    TelephoneInput(e) {
        this.setState({
            Telephone: e.target.value
        })
    }


    // 查询
    InspectClick() {
        let FromInformation = {}
        FromInformation.User = this.state.User
        FromInformation.UserName = this.state.UserName
        FromInformation.Email = this.state.Email
        FromInformation.Telephone = this.state.Telephone
        console.log(FromInformation, "查询")
    }
    // 重置
    RestClick() {
        this.setState({
            User: "",
            UserName: "",
            Email: "",
            Telephone: ""
        })
    }
    // 删除
    DeleteClick() {
        console.log(111)
        console.log(this.state.selectedRowKeys)
    }
    // 新增
    NewlyAdded() {
        this.setState({
            visible: true
        })
    }

    // 加载按钮
    RadioClickLoading(val) {
        let FromBool = val.LoadingBool
        // eslint-disable-next-line no-unused-expressions
        FromBool = !FromBool
        console.log(FromBool)
        let FromListId = val.id
        let FromList = this.state.data
        for (var i = 0; i < FromList.length; i++) {
            if (FromListId == FromList[i].id) {
                FromList[i].LoadingBool = FromBool
            }
        }
        this.setState({
            data: FromList
        })
    }
    // 编辑按钮
    EditHandlerValue() {
    }
    // 查看按钮
    AbolishHandlerValue() {

    }
    // 删除
    DeleteHandlerValue(val) {
        console.log(val)
    }
    // 表名筛选
    TableNameFilter(value, record) {
        console.log(value)

    }
    // DataLoadingFilter 数据加载按钮全选
    DataLoadingFilter(value, record) {

        let FromList = this.state.data
        if (value == "全选") {
            for (var i = 0; i < FromList.length; i++) {
                FromList[i].LoadingBool = true
            }
        } else if (value == "取消") {
            for (var j = 0; j < FromList.length; j++) {
                FromList[j].LoadingBool = false
            }
        }
        this.setState({
            data: FromList
        })
    }
    // 文件检查按钮
    DocumentInspectionFilter(value, record) {
        let FromList = this.state.data
        if (value == "全选") {
            for (var i = 0; i < FromList.length; i++) {
                FromList[i].bool = true
            }
        } else if (value == "取消") {
            for (var j = 0; j < FromList.length; j++) {
                FromList[j].bool = false
            }
        }
        this.setState({
            data: FromList
        })
    }
    onChange(pagination, filters, sorter, extra) {

    }
    // 表单确定按钮
    handleLogin() {

    }

}
export default Administration