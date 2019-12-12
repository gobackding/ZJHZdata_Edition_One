import http from "@utils/http";

// 获取select 下拉
export const SELECTLIST = ()=>http.get("/api/review/standardType/getType")

// 传递 参数
export const USERDATA = (val)=>http.get("/api/review/standardType/submitType",{
    cjrq:val.cjrq,
    booken:val.booken,
    field_name:val.field_name
})

