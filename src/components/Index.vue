<template>
  <div class="centered lr-padding">
    <div class="main-wrap">
      <MyIntro
        v-if="introData != ''"
        :introData="introData"
        class="intro-index"
      ></MyIntro>
      <div v-for="(typeData, type) in allData.model_type" :key="type">
        <ModelType :typeData="typeData" :type="type"></ModelType>
      </div>
    </div>
  </div>
</template>

<script>
import MyIntro from "@/components/indexComponents/Intro.vue";
import ModelType from "@/components/indexComponents/ModelType.vue";
import configData from "@/assets/config.json";

export default {
  name: "Index",
  components: { MyIntro, ModelType },
  data() {
    return {
      allData: {},
      introData: "",
      baseUrl: configData.base_url,
    };
  },

  created() {
    // 解决首次加载无数据问题
    this.$eventBus.$on("allData", (data) => {
      this.allData = data;
      this.introData = this.allData.index.introduction;
      this.$store.setMessageAction(this.allData);
    });

    if (this.allData == null || JSON.stringify(this.allData) == "{}") {
      this.allData = this.$store.state.message;
      this.introData = this.allData.index.introduction;
      this.$store.setMessageAction(this.allData);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-top: 85px;
  margin-bottom: 40px;
}

.myimg {
  width: 50%;
}
</style>
