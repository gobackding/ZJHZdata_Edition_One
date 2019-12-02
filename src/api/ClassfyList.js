import http from "@utils/http";

// 数据检核-获取重要性
export const SJJHZYX = ()=>http.get("/api/review/rules/ruleType")