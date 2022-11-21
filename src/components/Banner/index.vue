<template>
  <div class="banner"></div>
  
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
.banner {
  position: relative;
  height: 100vh;
  width: 100%;

  /* background-color: rgba(17, 17, 17, 0.5); */
  /* opacity: 0.8; */
}
.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: url("~@/assets/banner.jpg") 50% / cover no-repeat;
  background-position: 50% 0%;
  /* background-attachment: fixed; */
  /* opacity: 0.7; */
}
</style>