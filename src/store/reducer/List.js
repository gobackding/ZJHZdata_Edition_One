import { handleActions } from "redux-actions"

const defaultValue = {
    FromListStatus: JSON.parse(sessionStorage.getItem("FromListStatus")) || [],
    commodities: [],
    FromListError: JSON.parse(sessionStorage.getItem("FromListError")) || [],
    FromListTrue: JSON.parse(sessionStorage.getItem("FromListTrue")) || []
}
export default handleActions({
    check_up_from_list: (state, action) => {
        
        let FromList = JSON.parse(JSON.stringify(state))
        console.log(action.payload, "action")
        let ActionList = action.payload[0]
        FromList.FromListError = (action.payload[1].error[0]).split(",")

        FromList.FromListTrue = (action.payload[1].true[0]).split(",")
        let trueList = (FromList.FromListTrue).sort(function (a, b) {
            return a - b
        })
        console.log(trueList, "trueList")
        console.log(FromList.FromListTrue, "FromList.FromListTrue")
        console.log(action.payload[0], "ActionList")
        for(var k = 0 ; k<ActionList.length ; k++){
            ActionList[k].statusType = "执行失败"
        }
        for (var i = 0; i < ActionList.length; i++) {
            for (var j = 0; j < trueList.length; j++) {
                if (ActionList[i].id == trueList[j]) {
                    
                    ActionList[i].statusType = "执行成功"
                } 
            }
        }
        FromList.FromListStatus = ActionList




        sessionStorage.setItem("FromListError", JSON.stringify(FromList.FromListError))
        sessionStorage.setItem("FromListTrue", JSON.stringify(FromList.FromListTrue))
        sessionStorage.setItem("FromListStatus", JSON.stringify(action.payload[0]))

        console.log(FromList.FromListStatus, "nini")
        return FromList
    }
}, defaultValue)