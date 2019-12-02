import {connect} from "react-redux";
import {CHECKING_UP} from "@actions/Queryfunction"
const mapStateToProps = (state)=>({
    FromListStatus:state.List.FromListStatus
})

const mapDisPathToProps = (dispatch)=>({
     handleAsyncList(){
        console.log(111)
    }
})

export default connect(mapStateToProps,mapDisPathToProps)