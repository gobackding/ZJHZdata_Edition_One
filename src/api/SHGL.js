import http from "@utils/http";

// 生成上报
export const SCSHVALUE = (val)=>http.get("/api/review/dataCheckList",{
    'cjrq':val.Time
})

// 检核结果历史查询-分页器
export const FYLISTFROM = (val) =>http.get("/api/review/dataCheckList",{
    'cjrq':val.Time,
    'page':val.page
})

// 发送时间-获取轮次
export const HQLCLIST = (val) =>http.get("/api/review/check/lc",{
    'cjrq':val.Time
})

// 向后端发送 时间+轮次
export const LCTIME = (val)=>http.get("/api/review/dataCheckList",{
    'cjrq':val.Time,
    'jclc':val.SelectValue
})

// 生成上报按钮
export const SCSBButton = (val) =>http.post('/api/review/checkOut',{
    'lc':val.lc,
    'checkTime':val.Time,
    'dDqGzs':val.FromListStatus
})

// 获取最大的轮次
export const MaxLC = ()=>http.get('/api/review/check/lcMax',{
    'lc':'',
    'checkTime':''
})