<template>
  <div>
    <div class="container detail">
      <div class="title-split"></div>
      <div class="article">
        <h1 class="title w100">{{ articleInfo.title }}</h1>
        <div class="info w100">
          <img
            src="http://q1.qlogo.cn/g?b=qq&nk=1518674973&s=40"
            alt=""
            class="userAvatar info-item"
          />
          <span href="" class="userNickName info-item">{{
            articleInfo.nickname
          }}</span>
          <span href="" class="time info-item iconfont icon-date">{{
            articleInfo.createTime
          }}</span>
          <span href="" class="view info-item iconfont icon-view">{{
            articleInfo.visits
          }}</span>
          <span href="" class="view info-item iconfont icon-comment1">{{
            articleInfo.commentCount
          }}</span>
        </div>
        <div
          class="
            content
            typo typo-selection
            animate__animated animate__fadeIn
          "
          v-html="articleInfo.content"
          v-loading="loading"
          element-loading-text="拼命加载中"
        ></div>
        <!-- <div class="divider" v-show="!loading">End</div> -->
        <!-- <el-divider content-position="center">End</el-divider> -->
      </div>
      <div class="comment">
        <div class="title">评论</div>
        <div class="box">
          <div
            class="item"
            v-for="parentComment in commentInfo.records"
            :key="parentComment.id"
          >
            <div class="avatar">
              <el-avatar :size="50" :src="parentComment.userAvatar">
                <!-- <img /> -->
                {{ parentComment.userNickName }}
              </el-avatar>
            </div>

            <div class="con">
              <div class="metadata">
                <a href="#" class="name">{{ parentComment.userNickName }}</a>
                <span class="time">{{ parentComment.createTime }}</span>
              </div>
              <div class="text">{{ parentComment.content }}</div>
              <div class="action">
                <span class="reply" @click="handlerReply(parentComment)"
                  >回复</span
                >
                <!-- <span class="delete">删除</span> -->
              </div>
              <!-- 子集评论 -->
              <div class="reply-box">
                <div
                  v-for="child in parentComment.childComment"
                  :key="child.id"
                >
                  <div class="reply-avadtar">
                    <el-avatar :size="50" :src="child.userAvatar">
                      {{ child.userNickName }}
                    </el-avatar>
                    <!-- <img  /> -->
                  </div>
                  <div class="con">
                    <div class="metadata">
                      <a href="#" class="name">{{ child.userNickName }}</a>
                      <span
                        >回复 <a href="#"> @{{ child.replyUserNickName }}</a>
                      </span>
                      <span class="time"> {{ child.createTime }}</span>
                    </div>
                    <div class="text">{{ child.content }}</div>
                    <div class="action">
                      <span class="reply" @click="handlerReply(child)"
                        >回复</span
                      >
                      <!-- <span class="delete">删除</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="comment-send">
        <div class="input-area">
          <el-form ref="commentForm" :model="commentForm" :rules="rules">
            <el-form-item prop="content" ref="commentAreaRef">
              <!-- el-form-item添加ref, 用来调用$emit -->
              <textarea
                ref="commentArea"
                class="comment-text"
                placeholder="说点什么"
                rows="10"
                v-model="commentForm.content"
                @blur="handlerBlurContent"
              ></textarea>
            </el-form-item>
            <div class="coll-box">
              <el-form-item
                prop="userNickName"
                class="collectmessage"
                ref="userNickNameRef"
              >
                <input
                  type="text"
                  v-model="commentForm.userNickName"
                  placeholder="昵称"
                  @blur="handlerBlurNickName"
                />
              </el-form-item>
              <el-form-item prop="qqNum" class="collectmessage" ref="qqNumRef">
                <input
                  type="text"
                  v-model="commentForm.qqNum"
                  placeholder="QQ"
                  @blur="handlerBlurQQNum"
                />
              </el-form-item>
              <el-form-item
                prop="userEmail"
                class="collectmessage"
                ref="userEmailRef"
              >
                <input
                  type="text"
                  v-model="commentForm.userEmail"
                  placeholder="邮箱"
                  @blur="handlerBlurUserEmail"
                />
              </el-form-item>
              <div
                class="send iconfont icon-zhuanfa"
                @click="handlerSubmitComment"
              >
                发布评论
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div style="margin: 50px; height: 100px" class="w100"></div> -->
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import prism from "prismjs";
import filterXSS from "@/plugins/xss/index";
import initjs from "@/utils/init";
export default {
  name: "Detail",
  data() {
    return {
      articleInfo: {
        categoryId: 1,
        categoryName: "",
        commentCount: 0,
        content: "",
        contentMd: "",
        createTime: "2022-11-14 12:11:51",
        description: "",
        id: undefined,
        image: "",
        isTop: 1,
        nickname: "",
        pollCount: 23,
        status: 1,
        tagList: [],
        title: "",
        updateTime: "2022-11-14 12:11:51",
        userId: 1,
        visits: 20,
      },
      commentInfo: {
        pageNo: 1,
        pageSize: 10,
        records: [],
      },
      commentForm: {
        parentId: undefined,
        userAgent: undefined,
        userIp: undefined,
        userEmail: undefined,
        userId: undefined,
        userNickName: "",
        content: "",
        replyUserId: undefined,
        replyUserNickName: undefined,
        targetType: 1,
        articleId: undefined,
        createTime: undefined,
        status: 1,
        userAvatar: "",
        replyUserAvatar: undefined,
        qqNum: "",
      },
      // 表单验证规则
      rules: {
        content: [
          {
            required: true,
            message: "请输入评论",
            trigger: "change",
          },
          {
            min: 1,
            max: 100,
            trigger: "blur",
            message: "评论内容为1-200个字符",
          },
        ],
        userNickName: [
          { min: 1, max: 10, trigger: "blur", message: "昵称长度为1-10个字符" },
        ],
        qqNum: [
          {
            required: true,
            message: "输入QQ号，用于头像展示",
            trigger: "blur",
          },
        ],
        userEmail: [
          { required: true, message: "请输入邮箱，以便回复", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    // 获取文章详情
    async getDetailArticle() {
      this.loading = true;
      let articleId = this.$route.params.articleId;
      let result = await this.$API.article.reqDetailArticle(articleId);
      if (result.code == 200) {
        this.articleInfo = result.data;
        this.articleInfo.content = marked(this.articleInfo.contentMd);
        this.$nextTick(() => {
          prism.highlightAll();
        });
        this.loading = false;
      } else {
        Promise.reject(new Error("获取文章详情失败"));
      }
    },
    // 获取评论列表
    async getPageComment() {
      let articleId = this.$route.params.articleId;
      let result = await this.$API.comment.reqPageComment({
        pageNo: this.commentInfo.pageNo,
        pageSize: this.commentInfo.pageSize,
        articleId,
      });
      if (result.code == 200) {
        this.commentInfo = result.data;
      }
      //填充评论区用户信息
      initjs.initCommentInfo(this.commentForm);
    },

    // 点击回复按钮，确认回复的是哪个
    handlerReply(commentNode) {
      const commentBox = this.$refs.commentArea;
      commentBox.placeholder = "@" + commentNode.userNickName;
      commentBox.focus();
      // 如果父级ID为null，说明是回复一级评论
      if (commentNode.parentId == null) {
        //父级ID等于点击的评论的ID
        this.commentForm.parentId = commentNode.id;
      } else {
        // 回复二级评论
        this.commentForm.parentId = commentNode.parentId;
      }
      //要回复的对象
      this.commentForm.replyUserId = commentNode.userId;
      this.commentForm.replyUserNickName = commentNode.userNickName;
      this.commentForm.targetType = 2;
      this.commentForm.replyUserAvatar = commentNode.userAvatar;
    },

    // 离开输入域时，如果文本为空。则重置回复对象
    handlerReplyTo() {
      if (!this.commentForm.content.trim()) {
        this.$refs.commentArea.placeholder = "说点什么";
      }
    },

    // 提交评论
    handlerSubmitComment() {
      // 转义字符，防止xss注入
      // this.commentForm.content = filterXSS.process(this.commentForm.content);
      this.commentForm.qqNum = filterXSS.process(this.commentForm.qqNum);
      this.commentForm.userEmail = filterXSS.process(
        this.commentForm.userEmail
      );
      this.commentForm.userNickName = filterXSS.process(
        this.commentForm.userNickName
      );

      //构建获取QQ头像URL
      let qqAvatarUrl =
        "http://q1.qlogo.cn/g?b=qq&nk=" + this.commentForm.qqNum + "&s=40";
      this.commentForm.userAvatar = qqAvatarUrl;

      // 如果没有回复的人的名字,说明是直接评论文章
      if (!this.commentForm.replyUserNickName) this.commentForm.targetType = 1;
      this.commentForm.articleId = this.articleInfo.id;

      this.$refs.commentForm.validate((valid) => {
        if (valid) {
          this.$API.comment
            .reqSaveComment(this.commentForm)
            .then((result) => {
              if (result.code == 200) {
                this.$message({
                  message: "评论成功",
                  type: "success",
                });
                // 用户信息保存到本地
                initjs.setLocalUserCommentInfo(this.commentForm);
                this.$router.go(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          // this.$store.dispatch("comment/toSaveComment", this.commentForm);
        } else {
          console.log(this.commentForm);
        }
      });
    },

    handlerBlurContent(mes) {
      // 添加blur事件回调，为了emit这个'el.form.blur'事件！
      this.$refs.commentAreaRef.$emit("el.form.blur", mes);
    },

    handlerBlurNickName(mes) {
      this.$refs.userNickNameRef.$emit("el.form.blur", mes);
    },
    handlerBlurQQNum(mes) {
      this.$refs.qqNumRef.$emit("el.form.blur", mes);
    },
    handlerBlurUserEmail(mes) {
      this.$refs.userEmailRef.$emit("el.form.blur", mes);
    },
  },
  computed: {
    // 把markdown文章内容转为html
    articleContent() {
      // let converter = new showdown.Converter();
      // let html = converter.makeHtml(this.articleInfo.contentMd);
      // console.log(marked);
      // prism.highlightAll();
      let html = marked(this.articleInfo.contentMd);
      return html;
    },
  },
  mounted() {
    this.getDetailArticle();
    this.getPageComment();
  },
};
</script>

<style lang="less" scoped>
@import "~@/plugins/typo/typo.css";
@import "~@/assets/styles/variable.less";

.detail {
  // max-width: 1000px;
  margin-top: calc(var(--headerHeight) + 20px);

  .title-split {
    height: 50px;
    background-color: #c7c7c7;
  }
  .article {
    background-color: var(--bg-white);
    padding: 70px;

    .title {
      padding: 10px 0;
      margin-bottom: 30px;

      font-size: 35px;
      height: 60px;
      // text-align: center;

      // background-color: #eee;
    }

    .info {
      display: flex;
      font-size: 17px;
      padding-bottom: 10px;
      align-items: center;
      // border-bottom: 2px solid #eee;

      a {
        padding-right: 10px;
      }
      .info-item {
        margin: 2px;
      }

      .userAvatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    .content {
      padding: 15px 0;
      font-size: 18px;
      text-align: justify;
      // background-color: transparent;
      min-height: 200px;
    }

    .divider {
      position: relative;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 2px;
        width: 46%;
        background-color: #c7c7c7;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        height: 2px;
        width: 46%;
        background-color: #c7c7c7;
      }
    }
  }

  .comment {
    background-color: var(--bg-white);
    padding: 20px 45px;

    .title {
      font-size: 24px;
      padding: 10px 0;
    }

    .box {
      padding: 15px;
      // background-color: red;
      .item {
        // display: flex;
        // background-color: skyblue;
        border-top: 1px solid #c7c7c7;
        .avatar {
          float: left;
          margin-top: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          // background-color: orange;
          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .con {
          font-size: 18px;
          margin-left: 3.5em;
          padding: 20px 0 14px 0;
          // letter-spacing: 1px;
          .metadata {
            font-size: 16px;
            .name {
              padding-right: 10px;
            }
            .time {
              color: gray;
              font-size: 15px;
            }
          }

          .text {
            margin: 0.5em 0 0.5em;
            font-size: 18px;
            word-wrap: break-word;
            color: rgba(0, 0, 0, 0.87);
            line-height: 1.3;
          }

          .action {
            color: rgba(0, 0, 0, 0.4);
            font-size: 16px;
            span {
              margin-right: 5px;
              cursor: pointer;
            }
          }

          .reply-box {
            padding-top: 10px;
            // background-color: pink;
            .reply-avadtar {
              float: left;
              width: 50px;
              height: 50px;
              margin-top: 20px;
              border-radius: 50%;
              // background-color: orange;
              margin-right: 10px;
              img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  .comment-send {
    // margin-top: 10px;
    padding: 30px 45px;
    background-color: var(--bg-white);

    font-size: 16px;

    .input-area {
      // display: flex;

      .comment-text {
        -webkit-appearance: none;
        -webkit-transition: color 0.1s ease, border-color 0.1s ease;
        width: 100%;
        max-height: 10em;
        margin: 0;
        tap-highlight-color: rgba(255, 255, 255, 0);
        padding: 0.78571429em 1em;
        border: 1px solid rgba(34, 36, 38, 0.15);
        outline: 0;
        color: rgba(0, 0, 0, 0.87);
        box-shadow: 0 0 0 0 transparent inset;
        transition: color 0.1s ease, border-color 0.1s ease;
        font-size: 1em;
        line-height: 1.2857;
        resize: none;
        // border: none;
        border: 1px dotted black;
        // border-bottom: none;
        background-color: transparent;
      }

      .coll-box {
        margin-top: 10px;
        display: flex;
        .collectmessage {
          margin-bottom: 0;
          flex: 1;
          height: 50px;
          font-size: 18px;
          // border: 2px solid green;
          // border-right: none;
          // box-shadow: 10px 10px 5px #d6c8ba;
          opacity: 0.7;
          // background-color: #d6c8ba;
          /deep/ .el-form-item__content {
            width: 100%;
            height: 100%;
          }
          input {
            outline: none;
            padding: 10px 25px;
            width: 100%;
            height: 100%;
            // background: url("https://mapaler.gitee.io/dajiadehuanxiangxiang-skin/Resources/char/charcute/ATH000101.webp") no-repeat;
            background: url("~@/assets/images/reimu.webp") no-repeat;
            background-size: 50px;
            background-position: 100% 50%;
            border: 1px dotted black;
            opacity: 0.7;
            font-weight: 700;
          }
        }
        .send {
          cursor: pointer;
          margin-left: 10px;
          font-size: 18px;
          line-height: 50px;
          padding: 0 15px;
          background-color: #f3b35e;
          background-color: #7ec661;

          // width: 100px;
          // font-family: "KaiTi";
          text-align: center;
          font-weight: 700;
          // border-radius: 10px;
        }
      }
    }

    .comment-message {
      margin-top: 10px;
    }
  }
}
</style>