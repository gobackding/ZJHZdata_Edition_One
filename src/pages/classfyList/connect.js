import {connect} from "react-redux";
import {CHECKING_UP} from "@actions/Queryfunction"
import {JHIDSH} from "@api"
const mapStateToProps = (state)=>({
    
})

const mapDisPathToProps = (dispatch)=>({
    async handleAsyncList(val){
        const d = new Date()
        const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
        let arr ={}
        arr.Time=resDate
        arr.List = arguments[0]
        let dataList = await JHIDSH(arr)
        let ErrorTrue = []
        ErrorTrue.push(arguments[1])
        ErrorTrue.push(dataList.data)
        console.log(dataList,"状态")
        dispatch(CHECKING_UP(ErrorTrue))
        if(dataList.msg=="成功"){
          console.log(this)
            this.history.push("/CheckingUp")
        }
        
    },
    p(s) {
        return s < 10 ? '0' + s : s
    }
})

export default connect(mapStateToProps,mapDisPathToProps)