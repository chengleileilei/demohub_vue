<template>
  <div id="app">
    <img class="background-image" src="@/assets/ui/Bg@2x.png" alt="" />
    <Header></Header>
    <router-view v-if="isRouterAlive" />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/structure/Header.vue";
import Footer from "@/components/structure/Footer.vue";
import configData from "@/assets/config.json";

export default {
  name: "App",
  components: { Header, Footer },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      baseUrl: configData.base_url,
      allData:{}
    };
  },
  created() {
    this.$axios
      .get(this.baseUrl + "data")
      .then((response) => {
        this.allData = response.data;
        this.$store.setMessageAction(this.allData);
        this.$eventBus.$emit("allData",this.allData);
      })
      .catch((err) => {
        this.$message({
          message: err,
          type: "error",
        });
      });
  },
  mounted() {
    // 监听当浏览器窗口关闭或者刷新时
    // window.addEventListener('unload', this.saveSharedState)
    window.addEventListener("beforeunload", this.saveSharedState);
  },
  methods: {
    saveSharedState() {
      window.sessionStorage.setItem(
        "sharedState",
        JSON.stringify(this.$store.state)
      );
    },
    // 路由变化时刷新model组件 https://blog.csdn.net/yaxuan88521/article/details/123307992
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
.background-image {
  width: 100%;
  position: absolute;
  z-index: -1;
}

a {
  text-decoration-line: none;
  color: black;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}
.centered {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5px;
}
.border {
  outline: 1px solid rgba(87, 87, 87, 0.26);
}

.lr-padding1 {
  padding-left: 80px;
  padding-right: 80px;
}
.lr-padding2 {
  padding-left: 40px;
  padding-right: 40px;
}
.lr-padding3 {
  padding-left: 30px;
  padding-right: 30px;
}

@media screen and (max-width: 1200px) {
  .top2-r {
    height: 60px;
  }
}
@media screen and (max-width: 992px) {
  .top2-l {
    height: 80px;
  }
  .lr-padding1 {
    padding-left: 15px;
    padding-right: 15px;
  }
  .lr-padding2 {
    padding-left: 10px;
    padding-right: 10px;
  }
  .lr-padding3 {
    padding-left: 2px;
    padding-right: 2px;
  }
  .top-wrap p {
    margin: 15px 3px 15px 3px;
  }
  .backcolor-blue {
    padding-top: 40px;
    padding-bottom: 10px;
  }
}
</style>
