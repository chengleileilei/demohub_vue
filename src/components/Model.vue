<template>
  <div>
    <!-- {{myComponents}} -->
    <el-breadcrumb separator="/" class="bread-tag centered lr-padding">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t("message.home")
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/model/' + modelType }">{{
        allData["model_type"][modelType]["name"][this.$i18n.locale]
          .slice(0, 1)
          .toUpperCase() +
        allData["model_type"][modelType]["name"][this.$i18n.locale]
          .slice(1)
          .toLowerCase()
      }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{
        allData["model_type"][modelType]["models"][modelId]["name"][
          this.$i18n.locale
        ]
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="centered lr-padding">
      <!-- <MyIntro
        :introData="
          allData['model_type'][modelType]['models'][modelId]['introduction']
        "
      ></MyIntro> -->
      <!-- {{introData[$i18n.locale]}} -->
      <MarkdownIntro :markdownData="introData[$i18n.locale]"></MarkdownIntro>
    </div>

    <div class="model-background">
      <component
        :is="currentView"
        :modelData="{
          modelType: modelType,
          modelId: modelId,
          detialData: allData['model_type'][modelType]['models'][modelId],
          condaEnv:
            allData['model_type'][modelType]['models'][modelId]['conda_env'],
          args: allData['model_type'][modelType]['models'][modelId]['args'],
          showImages:
            allData['model_type'][modelType]['models'][modelId]['show_images'],
        }"
        class="centered lr-padding"
      ></component>
    </div>
  </div>
</template>

<script>
import MarkdownIntro from "@/components/MarkdownIntro.vue";
import configData from "@/assets/config.json";
import MyIntro from "@/components/indexComponents/Intro.vue";
import ShowArea from "@/components/modelComponents/subComponents/ShowArea.vue";
export default {
  name: "Model",
  components: {
    MarkdownIntro,
    MyIntro,
    ShowArea,
    classification: () =>
      import("@/components/modelComponents/Classification.vue"),
    image_processing: () =>
      import("@/components/modelComponents/ImageProcess.vue"),
    object_detection: () =>
      import("@/components/modelComponents/ObjectDetection.vue"),
    segmentation: () => import("@/components/modelComponents/Segmentation.vue"),
    augmentations: () =>
      import("@/components/modelComponents/Augmentations.vue"),
    vbfi: () => import("@/components/modelComponents/Vbfi.vue"),
    digital_watermark: () =>
      import("@/components/modelComponents/DigitalWaterMark.vue"),
    diffusion: () =>
      import("@/components/modelComponents/Diffusion.vue"),
  },
  data() {
    return {
      currentView: String(this.$route.params.model_type),
      baseUrl: configData.base_url,
      modelType: this.$route.params.model_type,
      modelId: this.$route.params.model_id,
      allData: this.$store.state.message,
      modelData: {},
      introData: "",
    };
  },
  created() {
    this.$axios
      .get(this.baseUrl + "markdown", {
        params: {
          type: this.modelType,
          model: this.modelId,
        },
      })
      .then((response) => {
        this.introData = response.data;
        console.log("introdata:", this.introData);
        // console.log("Current model pageviews: ", response.data);
      });
    // 更新模型访问量
    this.$axios
      .get(this.baseUrl + "pageviews", {
        params: {
          type: this.modelType,
          model: this.modelId,
        },
      })
      .then((response) => {
        // console.log("Current model pageviews: ", response.data);
      });
    // 处理在浏览器直接打开model页的情况，此时session不存在，无模型数据，需要重新请求
    if (this.allData == null || JSON.stringify(this.allData) == "{}") {
      this.$axios.get(this.baseUrl + "data").then((response) => {
        console.log(response);
        this.allData = response.data;
        this.$store.setMessageAction(this.allData);
      });
    }
  },
  warch: {
    $route(to, from) {
      this.currentView = this.$route.params.model_type;
      this.modelType = this.$route.params.model_type;
      this.modelId = this.$route.params.model_id;
      // console.log("model.vue is watching:",to, from);
      // console.log(this.modelId);
    },
  },
};
</script>

<style>
.model-background {
  padding-top: 20px;
  background: #f4f4f4;
}
.bread-tag {
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 45px;
}
</style>