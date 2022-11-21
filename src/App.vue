<template>
  <div>
    <!-- <Banner v-show="$route.path == '/'"></Banner> -->
    <Header v-show="$route.meta.showHeader"></Header>
    <Girl></Girl>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import layout from "@/layout/index.vue";
export default {
  name: "App",
  components: {
    layout,
  },
  methods: {
  },
  created() {
    // 获取标签列表存到仓库
    this.$store.dispatch("tag/getTagListWithCount");
    // 获取分类列表存到仓库
    this.$store.dispatch("category/getCategoryList");
    // 获取年份列表存到仓库中
    this.$store.dispatch("article/getArticleYearList");

    console.log("APP 挂载");
  },
};
</script>

<style>
</style>


