<template>
  <div class="iframe-container">
    <!-- <img src="@/assets/vbfi/vbfi_res.png" alt=""> -->
    <img src="@/assets/vbfi/vbfi_start.png" alt="">


    <!-- <iframe src="http://demohub.bjtu.edu.cn:8080/" scrolling='auto' frameborder="0"></iframe> -->
  </div>
</template>

<script>
export default {
  name: "vbfi",
  props: ["modelData"],

  created() {
    window.open("http://demohub.bjtu.edu.cn:8080/", "_blank");
  },
};
</script>

<style>
.iframe-container {
	min-height:400px;
	overflow:hidden
}
.iframe-container * {
  width: 100%;
  height: 100%;
  display:block;
}
</style>