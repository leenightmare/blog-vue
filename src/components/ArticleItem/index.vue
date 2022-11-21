<template>
  <div class="article-item">
    <div class="article-content">
      <div class="article-detail">
        <h3 class="title">
          <router-link :to="`/detail/${articleInfo.id}`">
            {{ articleInfo.title }}
          </router-link>
        </h3>
        <p class="text">
          {{ articleInfo.description }}
        </p>
        <!-- <div class="classfiy"></div> -->
        <div class="info">
          <div class="left">
            <div class="left-info author">
              <img :src="articleInfo.userAvatar" alt="" class="userAvatar" />
              <span> {{ articleInfo.nickname }}</span>
            </div>
            <div class="left-info time iconfont icon-date">
              {{ articleInfo.createTime }}
            </div>
            <div class="left-info view iconfont icon-view">
              {{ articleInfo.visits }}
            </div>
            <div class="left-info message iconfont icon-comment1">
              {{ articleInfo.commentCount }}
            </div>
          </div>
          <div class="tag">
            <el-tag
              class="item"
              type="success"
              size="mini"
              v-for="tag in articleInfo.tagList"
              :key="tag.id"
              >{{ tag.name }}</el-tag
            >

            <el-tag class="item" type="" size="mini">{{
              articleInfo.categoryName
            }}</el-tag>
          </div>
        </div>
      </div>
      <div class="article-img" v-show="articleInfo.image">
        <a href="#" class="w100 h100">
          <img :src="articleInfo.image" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: ["articleInfo"],
  mounted() {},
  activated() {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variable.less";
.article-item {
  display: flex;
  align-items: center;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgb(34, 36, 38);
  padding: (10rem / @baseFont) 0;
  background-color: var(--bg-white);
  min-height: 200px;
  // backdrop-filter: blur(10px);

  .article-content {
    padding: 0 (30rem / @baseFont);
    min-height: 230px;
    display: flex;
    flex: 1;

    .article-img {
      padding: 10px;
      width: 250px;
      max-height: 250px;

      img {
        height: 100%;
        width: 100%;
        border-radius: 20px;
      }
    }

    .article-detail {
      justify-content: space-evenly;
      flex-direction: column;
      display: flex;
      padding: 0 10px;
      font-size: 14px;
      flex: 1;

      .title {
        margin-bottom: (14rem / @baseFont);
        font-size: 20px;
        a {
          color: #333;
        }
      }

      .text {
        margin-bottom: (20rem / @baseFont);
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        color: gray;
        font-size: 16px;
        line-height: 2;
      }

      .info {
        justify-content: space-between;
        align-items: center;
        display: flex;

        .left {
          display: flex;
          align-items: center;
          .left-info {
            // margin: 0 5px;
            margin-right: 5px;
          }
          .author {
            display: flex;
            align-items: center;
            .userAvatar {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
        .tag {
          .item {
            margin-left: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>