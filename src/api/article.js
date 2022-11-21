import requests from "./request";


//博客列表 首页展示
export const reqMiniArticle = (data) => {
    return requests({
        url: "/article/page/mini",
        method: "GET",
        params: data
    });
}


// 根据ID获取博客详细信息
export const reqDetailArticle = (articleId) => {
    return requests({
        url: `/article/detail/${articleId}`,
        method: "GET"
    })
}

// 获取年份列表
export const reqArticleYearList = () => {
    return requests({
        url: "/article/yearlist",
        method: "GET"
    })
}

// 根据年份获取博客列表
export const reqArticleByYear = ({ pageNo, pageSize, year }) => {
    return requests({
        url: `/article/timeline/${year}`,
        method: "GET",
        params: {
            pageNo, pageSize
        }
    })
}

// 根据标签获取文章
// /article/tag/{tagId}
export const reqPageMiniArticleByTagId = ({ pageNo, pageSize, id }) => {
    return requests({
        url: `/article/tag/${id}`,
        method: "GET",
        params: {
            pageNo, pageSize
        }
    })
}

// 根据分类获取文章
// /article/tag/{tagId}
export const reqpageMiniArticleByCategoryId = ({ pageNo, pageSize, id }) => {
    return requests({
        url: `/article/category/${id}`,
        method: "GET",
        params: {
            pageNo, pageSize
        }
    })
}

// 
export const pageMiniArticleByKeyWord = ({ pageNo, pageSize, keyword }) => {
    return requests({
        url: `/article/keyword/${keyword}`,
        method: "GET",
        params: { pageNo, pageSize }
    })
}