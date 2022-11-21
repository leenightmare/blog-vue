import { reqTagListWithCount } from "@/api/tag"

const actions = {
    async getTagListWithCount({ commit }) {
        let result = await reqTagListWithCount();
        if (result.code == 200) {
            // this.categoryList = result.data;
            commit("GETTAGLISTWITHCOUNT", result.data)
        } else {
            Promise.reject(new Error("获取分类列表失败"));
        }
    }
}
const mutations = {
    GETTAGLISTWITHCOUNT(state, data) {
        state.tagList = data;
    }
}
const state = {
    tagList: []
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}