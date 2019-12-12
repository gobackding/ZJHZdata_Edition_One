import React,{Fragment} from "react";
import GenerateReport from "@components/SBAdministration/GenerateReport"
import SubmitReport from "@components/SBAdministration/SubmitReport"
import { SCSBButton } from "@api/SHGL.js"

class SBAdministration extends React.Component{
    constructor() {
        super()
        this.state = {
            GenerateReportBool: true,
            SubmitReportBool: false
        }
    }
    render(){
        return(
            <Fragment>
                {
                    this.state.GenerateReportBool ? <GenerateReport SubmissionSB={this.SubmissionSB.bind(this)} /> : ""
                }
                {
                    this.state.SubmitReportBool ? <SubmitReport /> : ""
                }

            </Fragment>
        )
    }
    async SubmissionSB(lc) {
        console.log(lc)
        let SBValue = {}
        let FromListStatus = JSON.parse(localStorage.getItem("FromListStatus"))

        SBValue.lc = lc
        SBValue.Time = '20161116'
        SBValue.FromListStatus = FromListStatus
        let SCSBButtonValue = await SCSBButton(SBValue)
        console.log(SCSBButtonValue, "SCSBButtonValue")
        console.log(111)
        if (SCSBButtonValue.msg == "成功") {
            this.setState({
                GenerateReportBool: false,
                SubmitReportBool: true
            })
        }
    }
}
export default SBAdministration