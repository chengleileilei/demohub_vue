<template>
  <div class=" centered lr-padding">
    <el-breadcrumb separator="/" class="bread-tag centered lr-padding">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t("message.home")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>NoData</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="no-data">
      <img src="@/assets/ui/暂无数据icon@2x.png" alt="" />
      <p>暂无数据</p>
    </div>
    
  </div>
</template>

<script>
export default {};
</script>

<style>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 550px;
}
.no-data > img {
  max-width: 288px;
  /* max-height: 288px; */
}
.bread-tag {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 45px;
}
</style>