<template>
  <div class="container main">
    <div class="top-banner">
      <div class="top-label">搜索结果：{{ keyword }}</div>
      <div class="top-count">共{{ pageInfo.totalSize }}条数据</div>
    </div>
    <ArticleItem
      v-for="article in pageInfo.records"
      :articleInfo="article"
      :key="article.id"
    ></ArticleItem>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNo"
      :page-size="pageInfo.pageSize"
      layout="prev, pager, next"
      :total="pageInfo.totalSize"
      v-show="pageInfo.records.length > 0"
      class="pager"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        records: [],
        totalPages: 0,
        totalSize: 0,
      },
      keyword: "",
    };
  },
  methods: {
    async getArticleByKeyWord() {
      if (!this.keyword) return;
      let { pageNo, pageSize } = this.pageInfo;
      let keyword = this.keyword;
      let result = await this.$API.article.pageMiniArticleByKeyWord({
        pageNo,
        pageSize,
        keyword,
      });
      if (result.code == 200) {
        this.pageInfo = result.data;
      } else {
        Promise.reject(new Error("搜索数据失败"));
      }
    },
    handleCurrentChange(page) {
      this.pageInfo.pageNo = page;
      this.getArticleByKeyWord();
    },
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
    this.getArticleByKeyWord();

    this.$bus.$on("sendKeyword", (word) => {
      this.keyword = word;
      this.getArticleByKeyWord();
    });
  },
};
</script>

<style lang="less" scoped>
.main {
  margin-top: calc(var(--headerHeight) + 20px);
  min-height: calc(100vh - var(--footerHeight));
  .top-banner {
    margin-bottom: 10px;
    // height: 50px;
    opacity: 0.9;
    background-color: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-bottom: none;
    border-top: 5px solid var(--topic-green);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    padding: 20px 30px;
    // color: #7ec661;
    font-family: "KaiTi";
    .top-label {
    }
    .top-count {
      // font-size: 20px;
    }
  }
  .pager {
    text-align: center;
  }
}
</style>