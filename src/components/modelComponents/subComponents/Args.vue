<template>
  <el-row
    :gutter="10"
    v-if="JSON.stringify(argsData) != '{}'"
    class="arg-background"
  >
    {{ postData }}
    {{ funData }}
    <el-row v-for="(arg_data, arg_type) in argsData" :key="arg_type">
      <h2>{{ arg_type }}:</h2>
      <!-- {{ arg_data }} -->

      function:<el-select v-model="postData[arg_type]" placeholder="请选择">
        <el-option
          v-for="(arg_item, arg_key) in arg_data"
          :key="arg_key"
          :label="arg_key"
          :value="arg_key"
        >
        </el-option>
      </el-select>

      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        v-for="(arg_item, arg_key) in arg_data[postData[arg_type]]"
        :key="arg_key"
      >
      {{arg_item}}
        <!-- {{arg_key}}##{{arg_item}}** -->
        <div class="arg-wrap">
          <p>{{ arg_key }}:</p>

          <el-select
            v-if="arg_item.type == 'select'"
            v-model="funData[postData[arg_type]][arg_key]"
            placeholder="请选择"
          >
            <el-option
              v-for="item in arg_item.values"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-input-number
            v-if="arg_item.type == 'int'"
            v-model="funData[postData[arg_type]][arg_key]"
            :precision="0"
            :step="1"
            :min="Math.min.apply(null, arg_item.values)"
            :max="Math.max.apply(null, arg_item.values)"
          ></el-input-number>

          <el-input-number
            v-if="arg_item.type == 'float'"
            v-model="funData[postData[arg_type]][arg_key]"
            :precision="2"
            :step="0.1"
            :min="Math.min.apply(null, arg_item.values)"
            :max="Math.max.apply(null, arg_item.values)"
          ></el-input-number>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "args",
  props: ["argsData"],
  data() {
    return {
      postData: {},
      funData: {},
    };
  },
  created() {
    for (var arg_type in this.argsData) {
      // console.log(this.argsData[arg_type])
      for (var arg_key in this.argsData[arg_type]) {
        this.funData[arg_key] = {};
        // for (var arg in this.argsData[arg_type][arg_key]) {
        //   this.funData[arg_key][arg] = 0;
        // }
      }
    }
    console.log(this.funData);
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
</style>