import http from "@utils/http";

// 历史分析页面的-分页器
export const LSFXLIST = (val)=>http.get("/api/review/dataCheckList",{
    'page':val.pageNumber,
    'cjrq':val.Time,
    "lc":val.LC
})
// 检核结果历史分析，当前
export const LSFXDQ = (val)=>http.get("/api/review/dataCheckList",{
    'cjrq':val
})

// 发送时间-获取轮次
export const HQLCLIST = (val) =>http.get("/api/review/check/lc",{
    'cjrq':val.Time
})

// 检核结果历史分析--查询
export const LSFXCHList = (val)=>http.get("/api/review/dataCheckList",{
    'cjrq':val.Time,
    'jclc':val.SelectValue
})

// 导出样本上传数量
export const DCYBSCSL = (val)=>http.get("/api/review/check/export",{
    'hc':val.hc,
    'cjrq':val.cjrq,
    'jclc':val.lc
})