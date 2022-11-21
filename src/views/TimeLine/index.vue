<template>
  <div class="timeline container">
    <el-row :gutter="10">
      <el-col :span="4" class="timeline-box" style="position: relative">
        <el-timeline>
          <el-timeline-item
            color="orange"
            v-for="(year, index) in yearList"
            :key="index"
          >
            <div
              class="timeline-text"
              :class="{ yearSelected: year == selectYear }"
              @click="changeTime(year)"
            >
              {{ year }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="20">
        <ArticleItem
          v-for="article in pageInfo.records"
          :key="article.id"
          :articleInfo="article"
          class="animate__animated animate__fadeInUp"
        ></ArticleItem>
        <el-pagination
          :current-page="pageInfo.pageNo"
          :page-size="pageInfo.pageSize"
          layout="prev, pager, next"
          :total="pageInfo.totalSize"
          style="text-align: center"
          v-show="pageInfo.records.length > 0"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TimeLine",
  data() {
    return {
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        records: [],
        totalSize: 0,
        totalPages: 0,
      },
      articleInfo: {},
      selectYear: "",
    };
  },
  methods: {
    // 按照年份获取
    async getArticleListByYear(year) {
      if (!year) return;
      let { pageNo, pageSize } = this.pageInfo;
      let result = await this.$API.article.reqArticleByYear({
        pageNo,
        pageSize,
        year,
      });
      if (result.code == 200) {
        // this.articleInfo = result.data;
        this.pageInfo.pageNo = result.data.pageNo;
        this.pageInfo.pageSize = result.data.pageSize;
        this.pageInfo.records = result.data.records;
        this.pageInfo.totalSize = result.data.totalSize;
        this.pageInfo.totalPages = result.data.totalPages;

      } else {
        Promise.reject(new Error("获取博客列表失败"));
      }
    },

    changeTime(year) {
      if (this.selectYear == year) return;
      this.selectYear = year;
      this.getArticleListByYear(year);
    },
  },
  computed: {
    ...mapState("article", ["yearList"]),
  },
  mounted() {
    let initYear = this.yearList.length > 0 && this.yearList[0];
    this.selectYear = initYear;
    this.getArticleListByYear(initYear);
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variable.less";

.yearSelected {
  border: 1px solid orange;
  // background-color: #fff;
  color: orange;
}

.timeline {
  margin: 100px auto;
  min-height: calc(100vh - var(--footerHeight));
  .timeline-box {
    margin-top: 10px;
    .timeline-text {
      cursor: pointer;
      // position: absolute;
      font-size: 16px;
      width: (100rem / @baseFont);
      height: (35rem / @baseFont);
      background-color: #fff;
      line-height: (35rem / @baseFont);
      text-align: center;
    }
  }
}
</style>