import { reqMiniArticle, reqArticleYearList } from "@/api/article";
const actions = {
    async getMiniArticle(context, data) {
        let result = await reqMiniArticle(data);
        if (result.code == 200) {
            context.commit("GETMINIARTICLE", result.data)
        }
    },

    // 获取年份列表
    async getArticleYearList({ commit }) {
        let result = await reqArticleYearList();
        if (result.code == 200) {
            commit("GETARTICLEYEARLIST", result.data);
        } else { 
            Promise.reject(new Error("获取年份列表失败"))
        }
    }
}


const mutations = {
    GETMINIARTICLE(state, data) {
        state.pageMiniArticle = data;
    },
    GETARTICLEYEARLIST(state,data) { 
        state.yearList = data;
    }
}


const state = {
    pageMiniArticle: {},
    yearList: []
}
const getters = {
    miniArticleList(state) {
        return state.pageMiniArticle.records || [];
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}