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
      <MarkdownIntro :markdownData="introData[$i18n.locale]"></MarkdownIntro>

      <!-- <MyIntro
        v-if="allData != '' && allData != null"
        :introData="allData['model_type'][modelType]['introduction']"
        class="intro-index"
      ></MyIntro> -->
      <!-- {{ modelType }} -->
      <ModelType
        :typeData="allData.model_type[modelType]"
        :type="modelType"
      ></ModelType>
    </div>
  </div>
</template>

<script>
import MarkdownIntro from "@/components/MarkdownIntro.vue";
import MyIntro from "@/components/indexComponents/Intro.vue";
import ModelType from "@/components/indexComponents/ModelType.vue";
import configData from "@/assets/config.json";

export default {
  name: "Index",
  components: { MyIntro, ModelType, MarkdownIntro },
  data() {
    return {
      baseUrl: configData.base_url,

      allData: this.$store.state.message,
      modelType: this.$route.params.model_type,
      introData: '',
    };
  },
  created() {
    if (this.allData == null || JSON.stringify(this.allData) == "{}") {
      this.$eventBus.$on("allData", (data) => {
        this.allData = data;
      });
    }
    this.$axios
      .get(this.baseUrl + "markdown", {
        params: {
          type: this.modelType,
        },
      })
      .then((response) => {
        this.introData = response.data;
        console.log("introdata:", this.introData);
        // console.log("Current model pageviews: ", response.data);
      });
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
