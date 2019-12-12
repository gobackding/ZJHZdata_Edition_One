import {connect} from "react-redux";
import {CHECKING_UP} from "@actions/Queryfunction"
const mapStateToProps = (state)=>({
    DetailTime:state.List.DetailTime
})

const mapDisPathToProps = (dispatch)=>({
     handleAsyncList(){
        console.log(111)
    }
})

export default connect(mapStateToProps,mapDisPathToProps)