<template>
  <div>
    <el-row class="show-wrap">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="model-left-wrap"
      >
        <p class="model-inout-tittle">{{ $t("message.input_image") }}</p>
        <vue-viewer
          v-show="imageUrl != ''"
          :thumb="imageUrl"
          :full="imageUrl"
          class="source-image"
        >
        </vue-viewer>
        <div
          id="drop-area"
          class="input-wrap"
          v-show="imageUrl == ''"
          @click="moveClick()"
        >
          <img src="@/assets/ui/默认图片@2x.png" alt="" />
          <p class="input-help" v-show="isLoading == false">
            {{ $t("message.drop_image") }}
          </p>
          <p class="input-help" v-show="isLoading == false">
            {{ $t("message.or") }}
          </p>
          <p class="input-help" v-show="isLoading == false">
            {{ $t("message.click_upload") }}
          </p>
          <p v-show="isLoading">uploading......</p>
          <input
            ref="filebutton"
            type="file"
            v-show="0"
            @change="fileChange('filebutton', 'imageUrl', 'isLoading')"
          />
        </div>
        <ShowArea
          :showAreaData="{
            images: modelData.detialData['show_images'],
            bindName: 'imageUrl',
          }"
          class="centered lr-padding"
        ></ShowArea>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        class="model-right-wrap"
      >
        <p class="model-inout-tittle">{{ $t("message.result") }}</p>
        <div>
          <LoadingAnimationVue v-show="isLoading2"></LoadingAnimationVue>

          <vue-viewer
            v-show="targetImageUrl != ''"
            :thumb="targetImageUrl"
            :full="targetImageUrl"
            class="source-image"
          >
          </vue-viewer>
        </div>
      </el-col>
    </el-row>

    <el-row
      :gutter="10"
      v-if="
        JSON.stringify(modelData.args) != '{}' &&
        typeof modelData.args != 'undefined'
      "
      class="arg-background"
    >
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
        v-for="(arg_data, arg_name) in modelData.args"
        :key="arg_name"
      >
        <div class="arg-wrap">
          <p>{{ arg_name }}:</p>
          <!-- select类型 -->
          <el-select
            v-if="arg_data.type == 'select'"
            v-model="arg_data.default"
            placeholder="请选择"
          >
            <el-option
              v-for="item in arg_data.values"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- int类型 -->
          <el-input-number
            v-if="arg_data.type == 'int'"
            v-model="arg_data.default"
            :precision="0"
            :step="1"
            :min="Math.min.apply(null, arg_data.values)"
            :max="Math.max.apply(null, arg_data.values)"
          ></el-input-number>
          <!-- float类型 -->
          <el-input-number
            v-if="arg_data.type == 'float'"
            v-model="arg_data.default"
            :precision="2"
            :step="0.1"
            :min="Math.min.apply(null, arg_data.values)"
            :max="Math.max.apply(null, arg_data.values)"
          ></el-input-number>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <a
          href="javascript:void(0);"
          class="clear upload-btn"
          @click="
            imageClear(
              (clearStrs = ['imageUrl', 'targetImageUrl']),
              (clearRefNames = ['filebutton']),
              (clearLoadingTokens = ['isLoading', 'isLoading2'])
            ),
              stopAxios()
          "
          >{{ $t("message.clear") }}</a
        >
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <a
          href="javascript:void(0);"
          class="submit upload-btn"
          :class="{ 'submit-forbidden': isLoading2 == true }"
          @click="submit()"
          >{{ $t("message.submit") }}</a
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import configData from "@/assets/config.json";
import ShowArea from "@/components/modelComponents/subComponents/ShowArea.vue";
import LoadingAnimationVue from "@/components/modelComponents/subComponents/LoadingAnimation.vue";

export default {
  name: "segmentation",
  props: ["modelData"],
  components: { ShowArea, LoadingAnimationVue },

  data() {
    return {
      baseUrl: configData.base_url,
      imageUrl: "",
      targetImageUrl: "",
      isLoading: false,
      isLoading2: false,
      // modelResult: "",
    };
  },
  methods: {
    getType(data) {
      return typeof data;
    },
    //   点击事件转移
    moveClick() {
      // https://blog.csdn.net/youdu0213/article/details/122825179
      this.$nextTick(() => {
        this.$refs.filebutton.dispatchEvent(new MouseEvent("click"));
        // console.log(this.$refs.filebutton.files)
      });
    },

    stopAxios() {
      if (undefined != this.source) {
        this.source.cancel("Operation canceled by the user.");
      }
    },

    submit() {
      if (this.imageUrl == "") {
        this.$message({
          message: "请先上传图片！",
          type: "warning",
        });
      } else {
        this.targetImageUrl = "";
        this.isLoading2 = true;
        // this.modelResult = "";
        let post_data = {
          local_image_url: this.imageUrl.split("=")[1],
          conda_env: this.modelData.condaEnv,
          args: {},
          classname: this.modelData.modelType,
          demoname: this.modelData.modelId,
        };
        for (var arg_name in this.modelData.args) {
          post_data["args"][arg_name] =
            this.modelData.args[arg_name]["default"];
        }
        // console.log(post_data["local_image_url"]);
        this.CancelToken = this.$axios.CancelToken;
        this.source = this.CancelToken.source();
        this.$axios
          .post(this.baseUrl + "submit", post_data, {
            cancelToken: this.source.token,
          })
          .then((res) => {
            // console.log("kkkkres:", res);
            if (res.data == false) {
              this.$message({
                message: "服务器繁忙，请稍后提交！",
                type: "error",
              });
            } else {
              let target_url = res.data[res.data.length - 1];
              target_url = target_url.split(" ");
              target_url = target_url[target_url.length - 1];
              target_url =
                this.baseUrl +
                "absimage?path=" +
                target_url +
                "&t=" +
                Math.random(); // 设置随机数，让浏览器重新请求图片，解决相同url图片不刷新问题
              this.targetImageUrl = target_url;
              this.isLoading2 = false;
            }
          })
          .catch((err) => {
            this.isLoading2 = false;
            this.$message({
              message: err,
              type: "error",
            });
          });
      }
    },
    // 拖拽上传
    onDrop(e) {
      var that = this;
      let ev = window.event || e;
      ev.preventDefault();
      this.$refs.filebutton.files = e.dataTransfer.files;
      this.fileChange();
      console.log(this.$refs.filebutton.files);
      console.log(e.dataTransfer.files[0]);
      // this.imgSaveToUrl(e.dataTransfer.files[0],1,true)
    },
  },
  mounted() {
    setTimeout(() => {
      var that = this;
      let allimg = document.getElementById("drop-area");
      allimg.ondragenter =
        allimg.ondragover =
        allimg.ondragleave =
          function () {
            // 阻止默认事件
            return false;
          };
      //释放文件
      allimg.addEventListener("drop", that.onDrop);
    }, 0);
    var that = this;
    this.$eventBus.$on("addClick", function (data) {
      that.moveClick();
      // console.log("father was called!"); // 打印结果 = '传递的参数'
    });
    this.$eventBus.$on("addShowImage", function (data) {
      that[data.bindName] = data.showImageUrl;
    });
  },
};
</script>

<style>
.show-wrap {
  background: rgba(250, 251, 253, 1);
  border-radius: 16px;
  overflow: hidden;
}
.model-left-wrap {
  padding: 20px;
  background: #ffffff;
}
.model-right-wrap {
  padding: 20px;
}
.arg-background {
  margin-top: 10px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
}
.model-inout-tittle {
  /* margin-bottom: 15px; */
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.input-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background: #fafbfd;
  border: 3px dashed #dddfe1;
  border-radius: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
.input-wrap > img {
  height: 90px;
}
.input-wrap > .input-help {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.source-image > img {
  margin-top: 15px;
  width: 100%;
  border-radius: 16px;
  height: auto;
  margin: 0;
  cursor: zoom-in;
}
.upload-btn {
  text-align: center;
  display: inline-block;
  width: 100%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 33px;
  margin-top: 10px;
}
.upload-btn:hover {
  text-decoration-line: underline;
}
.clear {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #333333;
  background: #ffffff;
  box-shadow: 0px 10px 16px 0px rgba(186, 185, 185, 0.185);
  border-radius: 8px;
  margin-bottom: 20px;
}
.submit {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #333333;
  background: #fed100;
  box-shadow: 0px 10px 16px 0px rgba(254, 179, 0, 0.3);
  border-radius: 8px;
  margin-bottom: 20px;
}
.submit-forbidden {
  color: #696868;
  pointer-events: none;
  background: #a8a8a6;
  box-shadow: 0px 10px 16px 0px rgba(126, 125, 124, 0.3);
}
.arg-wrap {
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: flex-start; */
}
.arg-wrap > * {
  width: 50%;
  margin: 5px 0;
}
.arg-wrap > p {
  width: 40%;

  /* padding-left: 10px; */
}
</style>