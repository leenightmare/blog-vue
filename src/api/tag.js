import requests from "./request";

// 获取标签列表
export const reqTagListWithCount = () => { 
    return requests({
        url: "/tag/listwithcount",
        method: "GET",
        
    })
}