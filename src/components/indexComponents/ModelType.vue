<template>
  <div class="model-type-wrap">
    <!-- {{this.$route.params}} -->
    <!-- 标题在index页面下显示，在more组件下不显示 -->
    <div
      class="type-tittle-wrap"
      v-if="JSON.stringify(this.$route.params) == '{}'"
    >
      <div class="type-tittle">
        <p>{{ typeData.name[this.$i18n.locale] }}</p>
      </div>
      <div class="type-more" @click="routerTo('/model/' + type)">
        <img src="@/assets/ui/组 4@2x.png" alt="" />
        <p>
          {{ $t("message.more") + ">>" }}
        </p>
      </div>
    </div>

    <el-row :gutter="10" class="type-main">
      <!-- <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="(model, index) in typeData.models"
        :key="index"
      >
        <ModelCard :modelData="model" :type="type" :model="index"></ModelCard>
      </el-col> -->
<!-- {{listTypeData}} -->
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        v-for="(model, index) in listTypeData"
        :key="index"
      >
        <!-- {{model}}{{index}} -->
        <ModelCard
          :modelData="model"
          :type="type"
          :model="listTypeData[index].model_id"
          v-if="index < maxCardNum"
        ></ModelCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModelCard from "@/components/indexComponents/ModelCard.vue";

export default {
  name: "ModelType",
  props: ["typeData", "type"],
  components: { ModelCard },
  data() {
    return {
      listTypeData: [],
      maxCardNum: 6,
    };
  },
  created() {
    // 限制index页显示card数量，在more页不限制card数量
    if (this.$route.path != "/") {
      this.maxCardNum = 99999;
    }
    // JSON.parse(JSON.stringify(obj))
    for (let m in this.typeData.models) {
      let item = JSON.parse(JSON.stringify(this.typeData.models[m]));
      item["model_id"] = m;
      this.listTypeData.push(item);
    }
  },
  methods: {
    routerTo(route) {
      if (this.$route.path != route) {
        // this.reload();
        this.$router.push(route);
      }
    },
  },
};
</script>

<style>
.model-type-wrap {
}
.type-tittle-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.type-tittle {
  float: left;
  border-bottom: 4px solid rgba(254, 209, 0, 1);
}
.type-tittle > p {
  padding: 0 5px 0 0;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000000;
  position: relative;
  top: 10px;
}
.type-more {
  cursor: pointer;
  /* background: #333333; */

  padding: 10px;
}
.type-more > img {
  width: 70px;
  position: absolute;
}
.type-more > p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.type-main {
  /* display: flex; */
  margin: 0 5px;
}
</style>