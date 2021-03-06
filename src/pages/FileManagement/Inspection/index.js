import React,{Fragment} from "react";
import { Table } from 'antd';

class Inspection extends React.Component{
    constructor(){
        super()
        this.state={
            columns : [
                {
                  title: '错误信息',
                  dataIndex: 'Name',
                  width: 150,
                }
              ],
              data:[]
        }
    }
    render(){
        return(
            <Fragment>
               
               <Table columns={this.state.columns} dataSource={this.state.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
 
            </Fragment>
        )
    }
    componentDidMount(){
        console.log(this.props,"Inspection")
        let arr = []       


        for(var i = 0 ; i<this.props.val.length ; i++){
          let Name ={}
          let Obj = this.props.val[i]
          let splitIndex = Obj.split("|")
          let str=""
          for(var j = 0 ; j<splitIndex.length ; j++){
              if(j==0){
                  str+=splitIndex[j]
                  continue;
              }
              let indexTS = splitIndex[j].split(".txt")
              str+="、"+indexTS[1]
          }
          Name.Name=str
          arr.push(Name)
        }
          this.setState({
              data:arr
          },()=>{
            console.log(this.state.data)
          })
    }
}
export default Inspection