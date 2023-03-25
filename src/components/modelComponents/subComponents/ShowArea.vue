<template>
  <el-row :gutter="5">
    <el-col
      :xs="8"
      :sm="8"
      :md="4"
      :lg="4"
      :xl="4"
      v-for="(imageUrl, index) in showAreaData.images"
      :key="index"
    >
      <div class="show-image-wrap" v-if="index < 6">
        <img
          :src="baseUrl + 'absimage?path=' + imageUrl"
          alt=""
          class="show-image"
          @click="addShowImage(baseUrl + 'absimage?path=' + imageUrl)"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import configData from "@/assets/config.json";

export default {
  props: ["showAreaData"],
  data() {
    return {
      baseUrl: configData.base_url,
    };
  },
  methods: {
    addClick() {
      this.$eventBus.$emit("addClick");
    },
    addShowImage(showImageUrl) {
      this.$eventBus.$emit("addShowImage", {bindName:this.showAreaData.bindName,showImageUrl:showImageUrl});
    },
  },
};
</script>

<style>
.show-image {
  cursor: pointer;
}
.show-image-wrap {
  margin-top: 5px;
  height: 80px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  opacity: 0.9;
  border-radius: 10px;
}
.show-image-wrap img {
  border-radius: 10px;
}
.add-wrap {
  cursor: pointer;
  margin-top: 5px;
  height: 80px;
  background-color: #f4f4f4;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
}
.add-wrap::before {
  position: absolute;
  content: "";
  height: 30px;
  width: 6px;
  background-color: black;
}
.add-wrap::after {
  position: absolute;
  content: "";
  height: 6px;
  width: 30px;
  background-color: black;
}
</style>