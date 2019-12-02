import http from "@utils/http";

// Home页面 废掉按钮
export const ADANDONVALUE = (val)=>http.get("/api/review/rules/AbolishRules",{
    id:val
})