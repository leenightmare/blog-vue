import requests from "@/api/request";

// 根据文章ID获取对应的评论
export const reqPageComment = ({ pageNo, pageSize, articleId }) => {
    return requests({
        url: "/comment/byArticleId",
        method: "GET",
        params: {
            pageNo: pageNo || 1,
            pageSize: pageSize || 3,
            articleId: articleId
        }
    })
}

// 添加评论的方法
export const reqSaveComment = (data) => {
    return requests({
        url: "/comment/save",
        method: "POST",
        data
    })
}


// 获取留言的方法
export const reqPageMessageComment = (params) => {
    return requests({
        url: "/comment/message",
        method: "GET",
        params
    })
}

