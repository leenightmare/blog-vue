<template>
  <div class="live-girl" @click="showDialog">
    <div class="dialog" v-show="show">请好好感受一下吧，这是一颗充满希望的温暖之心。</div>
  </div>
</template>

<script>
export default {
  name: "Girl",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showDialog() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/variable.less";

@keyframes spring {
  0% {
    transform: scaleY(0.95) skewX(-1deg);
  }
  50% {
    transform: scaleY(1) skewX(0);
  }
  100% {
    transform: scaleY(0.95) skewX(1deg);
  }
}

.live-girl {

  z-index: 999;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 5px;
  //   width: (200rem / @baseFont);
  //   height: (300rem / @baseFont);
  width: (180rem / @baseFont);
  height: (220rem / @baseFont);
  // background: url("https://mapaler.gitee.io/dajiadehuanxiangxiang-skin/Resources/char/charimg/ATH0004A1.webp") no-repeat;
  //   background: url("https://mapaler.gitee.io/dajiadehuanxiangxiang-skin/Resources/char/charimg/ATH000101.webp")
  background: url("~@/assets/images/girl.webp") no-repeat;
  //     no-repeat;
  background-size: (300rem / @baseFont) (200rem / @baseFont);
  //   background-size: contain;
  background-position: 50%;
  //   background-color: orange;

  .dialog {
    // display: none;
    opacity: 0.7;
    position: absolute;
    top: 10%;
    left: -110%;
    width: (200rem / @baseFont);
    max-height: 10em;
    // height: 100px;
    background-color: yellowgreen;
    // border: 1px solid yellowgreen;
    padding: (20rem / @baseFont) (15rem / @baseFont);
    line-height: 1.5;
    font-size: (17rem / @baseFont);
    // overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      right: -1.5em;
      bottom: 50%;
      transform: translateY(50%);
      //   width: 40%;
      //   height: 40%;
      width: 1.5em;
      height: 1.5em;
      //   transform: rotate(45deg);
      background-color: yellowgreen;
      //   border-top: 1px solid yellowgreen;
      //   border-right: 1px solid yellowgreen;

      clip-path: polygon(0 0, 100% 50%, 0 100%);
    }
  }
}
</style>