<template>
  <div>
    <!-- <h1>ip</h1>
    <h2>{{ modelData.modelType }}->{{ modelData.modelId }}</h2> -->
    <!-- <h1>{{ modelData }}</h1> -->

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
        <img :src="imageUrl" alt="" class="source-image" />
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
            @change="fileChange()"
          />
        </div>
        <ShowArea
          :showImages="modelData['showImages']"
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
          <p v-show="isLoading2">uploading......</p>
          <img
            :src="targetImageUrl"
            v-show="targetImageUrl != ''"
            alt=""
            class="source-image"
          />
          <!-- {{ modelResult }} -->
        </div>
        <!-- <img :src="imageUrl" alt="" /> -->
      </el-col>
    </el-row>
    <!-- {{ typeof(modelData.args) }}
    {{ modelData.args }} -->
    <el-row
      :gutter="10"
      v-if="
        JSON.stringify(modelData.args) != '{}' &&
        typeof(modelData.args) != 'undefined'
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
          @click="imageClear()"
          >{{ $t("message.clear") }}</a
        >
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <a
          href="javascript:void(0);"
          class="submit upload-btn"
          @click="submit()"
          >{{ $t("message.submit") }}</a
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import configData from "@/assets/config.json";
import ShowArea from "@/components/modelComponents/ShowArea.vue";

export default {
  name: "objectdetection",
  props: ["modelData"],
  components: { ShowArea },

  data() {
    return {
      baseUrl: configData.base_url,
      imageUrl: "",
      targetImageUrl: "",
      isLoading: false,
      isLoading2: false,
      modelResult: "",
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
    // imageLoad() {
    //   this.isLoading = false;
    // },
    imageVerification(file) {
      /*判断文件后缀类型*/
      var strs = new Array(); //定义一数组
      var pic1 = file.value; //获取input框的值，文件路径
      strs = pic1.split("."); //分成数组存储
      var suffix = strs[strs.length - 1]; //获取文件后缀

      if (
        suffix != "jpg" &&
        suffix != "gif" &&
        suffix != "jpeg" &&
        suffix != "png"
      ) {
        alert("您选择的不是图片，请上传一个图片"); //不是图片，做处理
        return false;
      }
      var fileSize = 0; //文件大小默认为0
      /*获取文件大小，以Kb为单位*/
      fileSize = file.files[0].size / 1024;
      if (fileSize > 10000) {
        alert("您选择的图片太大，请选择小于10M的图片");
        return flase;
      } else {
        return true;
      }
    },
    fileChange() {
      if (this.imageVerification(this.$refs.filebutton)) {
        this.isLoading = true;
        this.$nextTick(() => {
          console.log(this.$refs.filebutton.files);
          const formData = new FormData();
          formData.append("image", this.$refs.filebutton.files[0]);
          this.$axios
            .post(this.baseUrl + "upload", formData, {
              "Content-type": "multipart/form-data",
            })
            .then(
              (res) => {
                console.log(res.data);
                this.imageUrl = this.baseUrl + "absimage?path=" + res.data;
              },
              (err) => {
                alert("上传图片失败！");
                // 出现错误时的处理
              }
            )
            .catch((err) => {
              this.$message({
                message: "上传图片失败！" + err,
                type: "error",
              });
            });
        });
      } else {
        this.$message({
          message: "图片校验失败！",
          type: "warning",
        });
        // console.log("图片校验失败！");
      }
    },
    imageClear() {
      (this.imageUrl = ""), (this.$refs.filebutton.value = "");
      this.isLoading = false;
      this.isLoading2 = false;
      this.modelResult = "";
      this.targetImageUrl = "";
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
        this.modelResult = "";
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
        this.$axios
          .post(this.baseUrl + "submit", post_data)
          .then((res) => {
            console.log('kkkkres:',res)
            let target_url = res.data[0];
            target_url = target_url.split(" ");
            target_url = target_url[target_url.length - 1];
            target_url =
              this.baseUrl +
              "absimage?path=" +
              target_url;
            this.targetImageUrl = target_url;
            this.isLoading2 = false;
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
      that.imageClear();
      that.imageUrl = data;
      console.log(data); // 打印结果 = '传递的参数'
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
.source-image {
  margin-top: 15px;
  width: 100%;
  border-radius: 16px;
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