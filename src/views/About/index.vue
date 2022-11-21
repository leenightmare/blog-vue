<template>
  <div class="about">
    <div class="about-box">
      <div class="about-clip"></div>
      <div class="about-content">
        <div class="about-header">
          <img src="http://q1.qlogo.cn/g?b=qq&nk=1518674973&s=100" alt="" />
        </div>
        <h2 class="about-name">少女祈祷中</h2>
        <div class="about-contact">
          <a href="https://github.com/leenightmare" target="_blank">
            <i class="iconfont icon-github"></i>
          </a>
          <a href="#"> <i class="iconfont icon-weixin" target="_blank"></i> </a>
          <a href="#"> <i class="iconfont icon-QQ" target="_blank"></i> </a>
        </div>
        <div class="about-text">
          <!-- <p>"莫听穿林打叶声"</p>
          <p>"何妨吟啸且徐行"</p>
          <p>"竹杖芒鞋轻胜马"</p>
          <p>"谁怕？"</p>
          <p>"一蓑烟雨任平生"</p> -->
          <p>欢迎光临本站</p>
          <p>本人目前大四 想要入坑的菜鸟一枚</p>
          <p>热爱编程 喜欢折腾</p>
          <p>一直想构建一个符合自己幻想的网站</p>
          <p>所以大部分样式都是自己写的</p>
          <p>虽然也参考很多其他博客</p>
          <p>本站基于SpringBoot+vue</p>
          <p>项目仍有很多不足之处</p>
          <p>会不断在项目中加入学到的新技术</p>
        </div>
        <!-- <el-divider><i class="iconfont icon-zhuanfa"></i></el-divider> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="less" soped>
.about {
  width: calc(var(--maxWith) - 100px);
  margin: 100px auto;
  text-align: center;
  min-height: calc(100vh - var(--footerHeight));

  .about-box {
    border: 1px solid rgba(34, 36, 38, 0.15);
    // box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%); 这句在less中没用，需要在css中用
    box-shadow: 0 1px 2px 0 rgb(34, 36, 38);
    .about-clip {
      height: 50px;
      background-color: #eaeaea;
    }

    .about-content {
      font-size: 18px;
      padding: 10px 20px 20px 20px;
      background-color: var(--bg-white);
      backdrop-filter: blur(5px);

      .about-header {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: orange;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .about-name {
        margin: 10px 0;
      }

      .about-contact {
        // display: flex;
        // justify-content: center;
        display: inline-block;
        padding: 0 20px;
        border-bottom: 1px solid #333;
        a {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #cdced0;
          margin: 10px;

          i {
            font-size: 20px;
          }
        }
      }

      .about-text {
        margin: 30px 0;

        p {
          line-height: 2.5;
          font-weight: 500;
          font-family: "NSimSun";
        }
      }
    }
  }
}
</style>