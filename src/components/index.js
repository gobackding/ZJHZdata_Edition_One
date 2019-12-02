import Loading from "@common/Loading";
import reactLoadable from "react-loadable";

const Exhibition = reactLoadable({
    loader:()=>import("./HomeChildren/Exhibition"),
    loading:Loading
})
const Import = reactLoadable({
    loader:()=>import("./HomeChildren/Import"),
    loading:Loading
})
const LowerHair = reactLoadable({
    loader:()=>import("./HomeChildren/LowerHair"),
    loading:Loading
})
const GenerateReport = reactLoadable({
    loader:()=>import("./SBAdministration/GenerateReport"),
    loading:Loading
})
export {
    Exhibition,Import,LowerHair,GenerateReport
}