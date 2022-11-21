<template>
  <div class="container main">
    <div class="article">
      <!--
      <div class="article-item">
        <div class="article-content">
          <div class="article-detail">
            <h3 class="title">Javase基础知识</h3>
            <p class="text">
              SpringCloud的学习笔记（Eureka、Ribbon、Feign、Hystrix、Zuul）
              SpringCloud的学习笔记（Eureka、Ribbon、Feign、Hystrix、Zuul）
            </p>
            <div class="info">
              <div class="left">
                <div class="left-info author el-icon-s-custom">lee</div>
                <div class="left-info time el-icon-alarm-clock">
                  2022-11-06 15:52
                </div>
                <div class="left-info view el-icon-view">104</div>
                <div class="left-info message el-icon-chat-dot-round">20</div>
              </div>
              <div class="tag">
                <el-tag class="item" type="success" size="mini">Java</el-tag>
                <el-tag class="item" type="success" size="mini"
                  >SpringBoot</el-tag
                >
              </div>
            </div>
          </div>
          <div class="article-img">
            <img
              src="https://lisnote.github.io/articles/assets/Shell.md/background.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
-->
      <!-- <ClassfiySelect :itemList="tagList"></ClassfiySelect> -->
      <!-- <ClassfiySelect :itemList="categoryList"></ClassfiySelect> -->
      <div class="top-banner">
        <div class="top-label iconfont icon-biaoqian1">博客</div>
        <div class="top-count">共{{ pageInfo.totalSize }}篇笔记</div>
      </div>
      <div class="animate__animated animate__fadeIn">
        <ArticleItem
          v-for="article in pageInfo.records"
          :key="article.id"
          :articleInfo="article"
          class=""
        ></ArticleItem>
      </div>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="pageInfo.totalSize"
        :current-page="pageInfo.pageNo"
        :page-size="pageInfo.pageSize"
        style="text-align: center"
      >
      </el-pagination>
    </div>
    <div class="sidebar" style="display: none">
      <div class="userinfo">
        <div class="head"></div>
        <div class="name">lijad</div>
        <div class="link">
          <a href="#" class="el-icon-link"></a>
          <a href="#" class="el-icon-link"></a>
          <a href="#" class="el-icon-link"></a>
          <a href="#" class="el-icon-link"></a>
        </div>
        <div class="follow">Follow me</div>
      </div>
      <div class="classfiy">
        <div class="title">归档</div>
        <div class="item">
          <a href="#">
            <i>2022-06</i>
            <i>10</i>
          </a>
          <a href="#">
            <i>2022-06</i>
            <i>10</i>
          </a>
          <a href="#">
            <i>2022-06</i>
            <i>10</i>
          </a>
        </div>
      </div>
      <SideBarItem title="分类">
        <template slot="content">
          <p class="content">
            博客改版上线，项目源码在上方Github处，如有问题，请在留言区评论，我会及时回复，承蒙关照。
            This is Joker‘s Blog 3.0(bate)
          </p>
        </template>
      </SideBarItem>
    </div>
  </div>
</template>

<script>
import SideBarItem from "./SideBarItem";

export default {
  name: "Main",
  data() {
    return {
      pageInfo: {
        pageNo: 1,
        pageSize: 5,
        totalPages: 1,
        totalSize: 5,
        records: [],
      },

    };
  },
  components: {
    SideBarItem,
  },
  computed: {},

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

    // 改变页数
    handleCurrentChange(val) {
      this.pageInfo.pageNo = val;
      this.getPageData();
    },
  },
  mounted() {
    // 获取博客列表在首页展示
    this.getPageData();
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variable.less";

.main {
  display: flex;
  margin: (70rem / @baseFont) auto;
  margin-bottom: 80px;
  // max-width: 1100px;
  min-height: calc(100vh - var(--footerHeight));

  .article {
    flex: 5;
    padding: 15px;

    .top-banner {
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
      font-size: 20px;
      padding: 20px 30px;
      // color: #7ec661;
      .top-label {
        font-size: 20px;
      }
      .top-count {
        // font-size: 20px;
      }
    }
  }
  .sidebar {
    flex: 2;
    padding: 15px;
    .userinfo {
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 15px;
      background-color: #fff;
      overflow: hidden;
      .head {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #f52360;
        margin: 15px auto;
      }

      .name {
        text-align: center;
        // margin-bottom: 10px;
        font-size: 20px;
      }
      .link {
        margin: 30px 0;
        display: flex;
        justify-content: space-evenly;
        text-align: center;
        a {
          font-size: 18px;
        }
      }

      .follow {
        margin: 20px auto;
        width: 80%;
        height: 40px;
        background-color: skyblue;
        text-align: center;
        line-height: 40px;

        font-size: 20px;
        color: #fff;
      }
    }

    .classfiy {
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #fff;
      padding: 0 15px;
      .title {
        text-align: center;
        padding-top: 15px;
        font-size: 20px;
        letter-spacing: 1px;
      }

      .item {
        margin-top: 10px;
        padding: 10px 0;
        font-size: 16px;
        a {
          display: flex;
          justify-content: space-between;
          // height: 20px;
          padding: 10px 10px;

          // background-color: pink;
          i {
            font-style: normal;
          }

          &:hover {
            background-color: pink;
          }
        }
      }
    }

    .note {
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #fff;
      padding: 0 15px;

      .title {
        text-align: center;
        padding-top: 15px;
        font-size: 20px;
        letter-spacing: 1px;
      }

      .content {
        // padding: 10px;
        // margin-top: 10px;
        // font-size: 15px;
        // line-height: 2;
      }
    }
  }
}
</style>