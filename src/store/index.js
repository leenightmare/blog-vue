//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

import article from './article'
import comment from './comment'
import tag from './tag'
import category from './category'


export default new Vuex.Store({
    modules: {
        article,
        comment,
        tag,
        category
    }
})