<template>
  <div class="container main">
    <div class="message-box">
      <div class="title">留言板</div>
      <div class="message-page">
        <div class="pre-page page-button" @click="prePage">上页</div>
        <div class="next-page page-button" @click="nextPage">下页</div>
      </div>

      <div class="inner">
        <MessageItem
          class="item-box animate__animated animate__fadeIn"
          v-for="message in messageInfo.records"
          :key="message.id"
          :messageItem="message"
        ></MessageItem>
      </div>
    </div>
    <div class="action">
      <el-form ref="messageForm" :model="messageForm" :rules="rules">
        <div class="action-text">
          <el-form-item prop="content" ref="contentRef" class="content-text">
            <input
              type="text"
              placeholder="说点什么..."
              v-model="messageForm.content"
              @blur.stop="handlerBlurContent"
            />
          </el-form-item>
          <div class="send iconfont icon-zhuanfa" @click="handlerSubmitMessage">
            发布留言
          </div>
        </div>
        <div class="action-userinfo">
          <el-form-item
            prop="userNickName"
            ref="userNickNameRef"
            class="username input-item"
          >
            <input
              type="text"
              placeholder="昵称"
              v-model="messageForm.userNickName"
              @blur.stop="handlerBlurUserNickName"
            />
          </el-form-item>
          <el-form-item prop="qqNum" ref="qqNumRef" class="input-item">
            <input
              class=""
              type="text"
              placeholder="QQ"
              v-model="messageForm.qqNum"
              @blur.stop="handlerBlurQQNum"
            />
          </el-form-item>
          <el-form-item
            prop="userEmail"
            ref="userEmailRef"
            class="email input-item"
          >
            <input
              type="text"
              placeholder="邮箱(必填)"
              v-model="messageForm.userEmail"
              @blur.stop="handlerBlurUserEmail"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import MessageItem from "./MessageItem";

import filterXSS from "@/plugins/xss/index";
import initjs from "@/utils/init";
export default {
  name: "Message",
  components: {
    MessageItem,
  },
  data() {
    return {
      messageInfo: {
        pageNo: 1,
        pageSize: 8,
        totalSize: 10,
        totalPages: 2,
        records: [],
      },
      messageForm: {
        content: "",
        userNickName: undefined,
        qqNum: "",
        userEmail: "",
        userAvatar: "",
        targetType: 3,
        userAgent: "",
        userIp: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入留言", trigger: "change" },
          { min: 1, max: 50, trigger: "blur", message: "留言内容为1-50个字符" },
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
    };
  },
  methods: {
    // 提交添加评论
    handlerSubmitMessage() {
      // 转义字符，防止xss注入
      this.messageForm.content = filterXSS.process(this.messageForm.content);
      this.messageForm.qqNum = filterXSS.process(this.messageForm.qqNum);
      this.messageForm.userEmail = filterXSS.process(
        this.messageForm.userEmail
      );
      this.messageForm.userNickName = filterXSS.process(
        this.messageForm.userNickName
      );

      //构建获取QQ头像URL
      let qqAvatarUrl =
        "http://q1.qlogo.cn/g?b=qq&nk=" + this.messageForm.qqNum + "&s=40";
      this.messageForm.userAvatar = qqAvatarUrl;

      console.log(this.messageForm);
      this.$refs.messageForm.validate((valid) => {
        if (valid) {
          this.$API.comment
            .reqSaveComment(this.messageForm)
            .then((result) => {
              if (result.code == 200) {
                this.$message({
                  message: "留言成功",
                  type: "success",
                });
              }
              initjs.setLocalUserCommentInfo(this.messageForm);
              this.$router.go(0);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    handlerBlurContent(v) {
      this.$refs.contentRef.$emit("el.form.blur", v);
    },
    handlerBlurUserNickName(v) {
      this.$refs.userNickNameRef.$emit("el.form.blur", v);
    },
    handlerBlurQQNum(v) {
      this.$refs.qqNumRef.$emit("el.form.blur", v);
    },
    handlerBlurUserEmail(v) {
      this.$refs.userEmailRef.$emit("el.form.blur", v);
    },

    // 获取留言列表
    async getPageMessageComment() {
      let { pageNo, pageSize } = this.messageInfo;
      let result = await this.$API.comment.reqPageMessageComment({
        pageNo,
        pageSize,
      });
      if (result.code == 200) {
        this.messageInfo.records = result.data.records;
        this.messageInfo.totalSize = result.data.totalSize;
        this.messageInfo.totalPages = result.data.totalPages;
      } else {
        Promise.reject(new Error("获取留言列表失败"));
      }
    },

    prePage() {
      if (this.messageInfo.pageNo <= 1) return;
      this.messageInfo.pageNo = this.messageInfo.pageNo - 1;
      this.getPageMessageComment();
    },
    nextPage() {
      if (this.messageInfo.pageNo >= this.messageInfo.totalPages) return;
      this.messageInfo.pageNo = this.messageInfo.pageNo + 1;
      this.getPageMessageComment();
    },
  },
  mounted() {
    this.getPageMessageComment();
    initjs.initCommentInfo(this.messageForm);
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variable.less";

.main {
  // background-color: #fff;
  margin: 100px auto;
  // padding: 0 20px;

  .message-box {
    position: relative;
    overflow: hidden;
    background: url("~@/assets/images/bg_message4.png") no-repeat;
    background-size: contain;
    background-position: 50% 0%;
    max-width: (1280rem / @baseFont);
    height: (720rem / @baseFont);
    margin: 0 auto;

    .title {
      text-align: center;
      padding-top: (35rem / @baseFont);
      // border: 2px solid #f3b35e;
      color: #f3b35e;
      font-family: "STLiti";
    }

    .message-page {
      .page-button {
        cursor: pointer;
        // width: 60px;
        // height: 220px;
        width: (60rem / @baseFont);
        height: (220rem / @baseFont);
        // background-color: orange;
        color: #ea9d37;
        font-family: "STLiti";
        writing-mode: vertical-rl;
        text-align: center;
        &:active {
          color: #d69239;
        }
      }

      .pre-page {
        position: absolute;
        top: 26.5%;
        left: 1%;
        padding: (25rem / @baseFont) 0;
      }

      .next-page {
        position: absolute;
        top: 26.5%;
        right: 1%;
        padding: (25rem / @baseFont) 0;
        padding-left: (5rem / @baseFont);
        padding-right: (5rem / @baseFont);
        // background-color: #fff;
      }
    }

    .inner {
      position: absolute;
      top: 16.38%; // (118 / 720) * 100%
      // top: calc((118 + ((720 - 658) / 2)) / 720 * 100%);
      // top: 20.5%;
      left: 9%; // (105 / 1170) * 100%
      width: (960rem / @baseFont);
      height: (475rem / @baseFont);
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      // background-color: #f2f2f2;
      .item-box:nth-child(n + 5) {
        margin-top: -10px;
      }
    }
  }

  .action {
    // background-color: pink;
    margin: 0 60px;
    .action-text {
      display: flex;
      margin-bottom: 20px;
      .content-text {
        flex: 1;
        height: 50px;
        margin-bottom: 0;

        // border: 2px solid green;
        // border-right: none;
        // box-shadow: 10px 10px 5px #d6c8ba;
        // opacity: 0.7;
        input {
          font-size: 20px;
          outline: none;
          // background: url("https://mapaler.gitee.io/dajiadehuanxiangxiang-skin/Resources/char/charcute/ATH000101.webp") no-repeat;
          background: url("~@/assets/images/reimu.webp") no-repeat;
          background-size: 50px;
          background-position: 100% 50%;
          background-color: #d6c8ba;
          border: 1px solid #eee;
          padding: 10px 25px;
          width: 100%;
          height: 100%;
        }

        /deep/ .el-form-item__content {
          width: 100%;
          height: 100%;
        }
      }
      .send {
        cursor: pointer;
        margin-left: 10px;
        font-size: 20px;
        line-height: 50px;
        padding: 0 15px;
        background-color: #f3b35e;
        // width: 100px;
        // font-family: "KaiTi";
        text-align: center;
        font-weight: 700;
      }
    }
    .action-userinfo {
      display: flex;
      margin-top: 10px;

      .input-item {
        flex: 1;
        // margin: 0 10px;
        // border: 1px solid #eee;
        // opacity: 0.7;
        input {
          font-size: 20px;
          border: 1px dotted #d69239;
          outline: none;
          background-color: #d6c8ba;
          padding: 10px 25px;
          width: 100%;
          height: 100%;
        }

        /deep/ .el-form-item__content {
          width: 100%;
          height: 100%;
        }
      }

      .username {
        // border-right: 1px solid #eee;
      }
    }
  }
}
</style>