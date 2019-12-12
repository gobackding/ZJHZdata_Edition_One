import http from "@utils/http";

// 检核状态查询
export const JHZTCX = (val)=>http.get("/api/review/querySeqAndCjrq",{
    ruleSeq:val,
    cjrq:'20191116'
})
// 点击查看结果 向后端发送规则号 -- 跳转页面
export const DJCKJG = (val) =>http.get("/api/review/jhjgls/checkTimes",{
    ruleSeqs:val
})