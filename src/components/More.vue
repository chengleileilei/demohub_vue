<template>
  <div class="centered lr-padding">
    <!-- {{baseUrl}} -->
    <el-breadcrumb separator="/" class="bread-tag centered lr-padding">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t("message.home")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        allData["model_type"][modelType]["name"][this.$i18n.locale]
          .slice(0, 1)
          .toUpperCase() +
        allData["model_type"][modelType]["name"][this.$i18n.locale]
          .slice(1)
          .toLowerCase()
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-wrap">
      <MyIntro
        v-if="allData != ''"
        :introData="allData.index.introduction"
        class="intro-index"
      ></MyIntro>
      <!-- {{ modelType }} -->
      <ModelType
        :typeData="allData.model_type[modelType]"
        :type="modelType"
      ></ModelType>
    </div>
  </div>
</template>

<script>
import MyIntro from "@/components/indexComponents/Intro.vue";
import ModelType from "@/components/indexComponents/ModelType.vue";

export default {
  name: "Index",
  components: { MyIntro, ModelType },
  data() {
    return {
      allData: this.$store.state.message,
      modelType: this.$route.params.model_type,
    };
  },
  created() {
    if (this.allData == null || JSON.stringify(this.allData) == "{}") {
      this.$eventBus.$on("allData", (data) => {
        this.allData = data;
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bread-tag {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 45px;
}
.index-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.index-logo > img {
  height: 42px;
  width: 42px;
  margin: 12px;
}
.index-logo > p {
  font-size: 36px;
  font-family: Arial Black;
  font-weight: 400;
  color: #333333;
}

.intro-index {
  margin-top: 20px;
  margin-bottom: 40px;
}

.myimg {
  width: 50%;
}
</style>
