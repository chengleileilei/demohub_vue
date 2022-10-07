<template>
  <div class="card">
    <!-- {{model}} -->
    <div class="image-wrap">
      <div class="card-image">
        <img
          :src="baseUrl + 'absimage?path=' + modelData.input_image_name"
          alt=""
        />
      </div>
      <div class="card-image">
        <img
          :src="baseUrl + 'absimage?path=' + modelData.output_image_name"
          alt=""
        />
      </div>
    </div>
    <p class="model-name" @click="routerTo()">
      {{ modelData.name[this.$i18n.locale] }}
    </p>
    <div class="model-info">
      <p class="author">{{ modelData.author }}</p>
      <div class="info">
        <span class="el-icon-view"></span>
        <p>{{ modelData.pageviews }}</p>
        <div
          class="heart-shaped"
          @click="like()"
          :style="{ '--currentHeartColor': currentHeartColor }"
        ></div>
        <p>{{ modelData.likes }}</p>
      </div>
    </div>

    <!-- {{type}} -->

    <!-- {{modelData}} -->
  </div>
</template>

<script>
import configData from "@/assets/config.json";
export default {
  name: "ModelCard",
  props: ["modelData", "type", "model"],
  data() {
    return {
      baseUrl: configData.base_url,
      imageFileName: configData.image_file_name,
      currentHeartColor: "#9c9c9c",
      heartColor: {
        active: "#ff6347",
        inactive: "#9c9c9c",
      },
    };
  },
  mounted() {
    if (
      localStorage.getItem(this.type + this.model + "_like") == null ||
      localStorage.getItem(this.type + this.model + "_like") == 0
    ) {
      this.currentHeartColor = this.heartColor["inactive"];
    } else {
      this.currentHeartColor = this.heartColor["active"];
    }
  },
  methods: {
    routerTo() {
      this.$router.push("/model/" + this.type + "/" + this.model);
    },
    like() {
      if (
        localStorage.getItem(this.type + this.model + "_like") == null ||
        localStorage.getItem(this.type + this.model + "_like") == 0
      ) {
        this.currentHeartColor = this.heartColor["active"];
        localStorage[this.type + this.model + "_like"] = 1;
        this.$axios
          .get(this.baseUrl + "like", {
            params: {
              type: this.type,
              model: this.model,
            },
          })
          .then((response) => {
            this.modelData.likes = response.data;
          });
      } else {
        this.currentHeartColor = this.heartColor["inactive"];
        this.$axios
          .get(this.baseUrl + "dislike", {
            params: {
              type: this.type,
              model: this.model,
            },
          })
          .then((response) => {
            this.modelData.likes = response.data;
          });
        localStorage[this.type + this.model + "_like"] = 0;
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  margin-bottom: 40px;
}
.image-wrap {
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  overflow: hidden;
}
.card-image {
  width: 50%;
  height: 185px;
  display: flex;
  overflow: hidden;
  justify-content: center;
}
.card-image > img {
  /* width: 100%; */
}
.model-name {
  cursor: pointer;
  text-align: left;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  margin: 10px 0;
}
.model-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* align-i; */
}
.author {
  font-size: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.info p {
  margin-left: 5px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a7a7a7;
}
.info span {
  font-size: 20px;
  color: rgb(156 156 156);
}

/* 心形 */
.heart-shaped {
    margin-left: 10px;

  cursor: pointer;
  width: 10px;
  height: 10px;
  background-color: var(--currentHeartColor);
  transform: rotate(-45deg);
}

.heart-shaped:before {
  content: "";
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--currentHeartColor);
}

.heart-shaped:after {
  content: "";
  position: absolute;
  top: 0px;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: var(--currentHeartColor);
  border-radius: 50%;
}
</style>