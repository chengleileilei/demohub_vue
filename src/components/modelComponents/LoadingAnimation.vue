<template>
  <div class="loading-wrap">
    <img src="@/assets/ui/loading.png" alt="" class="imgCircle" />
  </div>
</template>

<script>
export default {
    name:'loadingAnimation'
};
</script>

<style>
.loading-wrap {
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: center;
}

.imgCircle {
    height: 40px;
    width: 40px;
  animation: circle 1s linear infinite;
}
@keyframes circle {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>