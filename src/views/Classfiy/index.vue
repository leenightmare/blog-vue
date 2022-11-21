<template>
  <div class="container main">
    <ClassfiySelect
      :itemList="categoryList"
      title="分类"
      @selectItem="handlerSelectItem"
    ></ClassfiySelect>
    <ClassfiySelect
      :itemList="tagList"
      title="标签"
      @selectItem="handlerSelectItem"
    ></ClassfiySelect>
    <div class="articl">
      <ArticleItem
        v-for="article in pageInfo.records"
        :key="article.id"
        :articleInfo="article"
        class="animate__animated animate__fadeIn"
      ></ArticleItem>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNo"
      :page-size="pageInfo.pageSize"
      layout="prev, pager, next"
      :total="pageInfo.totalSize"
      class="pager"
      v-show="pageInfo.records.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Classfiy",
  data() {
    return {
      pageInfo: {
        pageNo: 1,
        pageSize: 3,
        totalPages: 1,
        totalSize: 0,
        records: [],
      },
      selectInfo: {
        pageNo: 1,
        pageSize: 5,
        id: 1,
        case: "",
      },
    };
  },
  methods: {
    // 获取博客列表在首页展示
    async getPageData() {
      let { pageNo, pageSize } = this.pageInfo;
      let result = await this.$API.article.reqMiniArticle({ pageNo, pageSize });
      if (result.code == 200) {
        this.pageInfo = result.data;
      } else {
        Promise.reject(new Error("获取博客分页数据失败"));
      }
    },

    async getByTagId(param) {
      let result = await this.$API.article.reqPageMiniArticleByTagId(param);
      if (result.code == 200) {
        this.pageInfo = result.data;
      }
    },
    async getByCategoryId(param) {
      let result = await this.$API.article.reqpageMiniArticleByCategoryId(
        param
      );
      if (result.code == 200) {
        this.pageInfo = result.data;
      }
    },

    handlerSelectItem({ classfiyItem, title }) {
      // console.log(classfiyItem);
      let { pageNo, pageSize } = this.pageInfo;
      let id = classfiyItem.id;
      this.selectInfo = { pageNo, pageSize, id, case: title };
      if (title == "标签") {
        this.getByTagId(this.selectInfo);
      } else if (title == "分类") {
        this.getByCategoryId(this.selectInfo);
      }
    },

    getByCase() {
      if (this.selectInfo.case == "标签") {
        this.getByTagId(this.selectInfo);
      } else if (this.selectInfo.case == "分类") {
        this.getByCategoryId(this.selectInfo);
      }
    },

    handleCurrentChange(page) {
      this.selectInfo.pageNo = page;
      this.getByCase();
    },
  },
  computed: {
    ...mapState("tag", ["tagList"]),
    ...mapState("category", ["categoryList"]),
  },
  mounted() {
    // this.this.tagList[0]
    // this.getPageData();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 100px auto;
  min-height: calc(100vh - var(--footerHeight));
  .pager {
    text-align: center;
  }
}
</style>