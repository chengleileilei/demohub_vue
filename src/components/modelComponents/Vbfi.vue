<template>
  <div class="iframe-container">
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
	height:200px;
	overflow:hidden
}
.iframe-container * {
  width: 100%;
  height: 100%;
  display:block;
}
</style>