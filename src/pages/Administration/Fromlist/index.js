import React, { Fragment } from "react";
import { Select, Input,Button  } from 'antd';
const { Option } = Select;
class Fromlist extends React.Component {
    constructor(){
        super()
        this.state={
            Change:"",
            User:"",
            Name:"",
            department:"",
            Email:"",
            Telephone:""
        }
    }
    render() {
        return (
            <Fragment>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>角色</span>
                    <Select defaultValue="lucy" style={{ width: 400, height: 45 }} onChange={this.handleChange.bind(this)}>
                        <Option value="jack" style={{ width: '400px', height: '45px' }}>Jack</Option>
                        <Option value="lucy" style={{ width: '400px', height: '45px' }}>Lucy</Option>
                    </Select>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>账号</span>
                    <Input type="text" 
                    required="required"
                    style={{ width: '400px', height: '45px' }} 
                    onChange={this.UserInput.bind(this)}/>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>姓名</span>
                    <Input type="text" 
                    style={{ width: '400px', height: '45px' }} 
                    onChange={this.UserNameInput.bind(this)}/>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>部门</span>
                    <Input type="text" 
                    style={{ width: '400px', height: '45px' }} 
                    onChange={this.departmentInput.bind(this)}/>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>邮箱</span>
                    <Input type="text" 
                    style={{ width: '400px', height: '45px' }} 
                    onChange={this.EmailInput.bind(this)}/>
                </label>
                <br></br>
                <label style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} >
                    <span>电话</span>
                    <Input type="text" 
                    style={{ width: '400px', height: '45px' }} 
                    onChange={this.TelephoneInput.bind(this)}/>
                </label>
                <br></br>
                <div>
                <Button type="primary" onClick={this.DetermineClick.bind(this)}>确定</Button>
                <Button style={{marginLeft:'20px'}} onClick={this.CancelClick.bind(this)}>取消</Button>
                </div>
            </Fragment>
        )
    }
    // select
    handleChange(value) {
        console.log(`selected ${value}`)
        this.setState({
            Change:value
        })
    }
    // 取消按钮
    CancelClick(){
        this.props.CancelClick()
    }
    // 确定
    DetermineClick(){
        let FromData = {}
            FromData.Change=this.state.Change
            FromData.User=this.state.User
            FromData.Name=this.state.Name
            FromData.department=this.state.department
            FromData.Email=this.state.Email
            FromData.Telephone=this.state.Telephone
        this.props.DetermineClick(FromData)
    }
    // 账号
    UserInput(e){
        this.setState({
            User:e.target.value
        })
    }
    // 姓名
    UserNameInput(e){
        this.setState({
            Name:e.target.value
        })
    }
    // 部门
    departmentInput(e){
        this.setState({
            department:e.target.value
        })
    }
    // 邮箱
    EmailInput(e){
        this.setState({
            Email:e.target.value
        })
    }
    // 电话
    TelephoneInput(e){
        this.setState({
            Telephone:e.target.value
        })
    }
}
export default Fromlist