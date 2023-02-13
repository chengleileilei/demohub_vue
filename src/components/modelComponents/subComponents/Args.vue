<template>
  <el-row
    :gutter="10"
    v-if="JSON.stringify(argsData) != '{}'"
    class="arg-background"
  >
    <!-- {{argsData}} -->
    <p class="args-tittle">function:</p>
    <el-select
      v-model="funName"
      placeholder="请选择函数"
      @change="selectChange()"
      class="args-bottom"
    >
      <el-option
        v-for="(arg_item, arg_key) in argsData"
        :key="arg_key"
        :label="arg_key"
        :value="arg_key"
      >
      </el-option>
    </el-select>

    <p class="args-tittle">function args:</p>
    <el-input
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 3 }"
      placeholder="请输入函数参数"
      v-model="postData"
      class="args-bottom"
      @change="inputChange()"
    >
    </el-input>

    <p class="args-tittle" v-if="funName != ''">function infomation:</p>
    <div v-if="funName != ''">
      <p class="fun-info-wrap">
        {{ argsData[funName].doc }}
      </p>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "args",
  props: ["argsData"],
  data() {
    return {
      funName: "",
      postData: "",
    };
  },
  methods: {

    // 组件间通信
    transferArgData(trans_data) {
      this.$eventBus.$emit("transferArgData", trans_data);
      console.log("changed");
    },

    // 更新postData
    updataPostData() {
      var varstr = "";
      for (var key in this.argsData[this.funName].args) {
        varstr +=
          key + "=" + this.argsData[this.funName].args[key].default + ", ";
      }
      varstr = varstr.substring(0, varstr.length - 2);
      this.postData = varstr;
    },

    selectChange() {
      this.updataPostData();
      this.transferArgData({ funName: this.funName, postData: this.postData });
    },

    inputChange() {
      this.transferArgData({ funName: this.funName, postData: this.postData });
    },
  },
  created() {
    for (var item in this.argsData) {
      this.funName = item;
      break;
    }
    this.updataPostData();
  },
};
</script>

<style>
.arg-background {
  margin-top: 10px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
}
.args-tittle {
  font-size: 22px;
  font-weight: bold;
}
.args-bottom {
  margin-bottom: 20px;
}
.fun-info-wrap {
  white-space: pre-wrap;
  padding: 10px;
  max-height: 300px;
  overflow: auto;
}
</style>