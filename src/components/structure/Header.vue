<template>
  <header>
    <!-- {{ menuData[menuCurrentType].models }} -->
    <!-- {{ menuData }} -->
    <!-- {{ searchOriginData }} -->
    <div class="nav-background">
      <div class="centered lr-padding3 nav">
        <div class="logo-wrap" @click="routerTo('/')">
          <!-- <img src="@/assets/img/nav-logo.png" alt="" /> -->
          <div class="logo-tittle-wrap">
            <p class="logo-tittle-up">Demo<span class="yellow">Hub</span></p>
            <p class="logo-tittle-down">
              Try state-of-the-art computer visons models
            </p>
          </div>
        </div>
        <div class="search-wrap">
          <div class="search-border">
            <input
              v-model="searchValue"
              class="search-input"
              type="text"
              :placeholder="$t('message.search_holder')"
              @input="queryData"
              @blur="queryData"
            />
            <div class="search-right">
              <div
                class="delete-wrap"
                v-show="searchValue != ''"
                @click="cleanSearch()"
              >
                <img src="@/assets/ui/delete.png" alt="" />
                <span></span>
              </div>
              <p class="search-button" @click="searchButton()">
                {{ $t("message.search") }}
              </p>
            </div>
          </div>

          <div class="search-result-warp" v-show="searchValue != ''">
            <div
              v-for="(item, index) in searchResult"
              :key="index"
              @click="routerTo(item.route), cleanSearch()"
              class="search-result-item"
            >
              <img
                src="@/assets/ui/model_icoon@2x.png"
                v-if="item.resultType == 'model'"
                alt=""
              />
              <img
                src="@/assets/ui/set_icoon@2x.png"
                v-if="item.resultType == 'set'"
                alt=""
              />
              <p v-if="searchResult.length != 0">
                <!-- {{item.key.indexOf(searchValue)}} -->
                <span>{{
                  item.key
                    .slice(
                      0,
                      item.key.toLowerCase().indexOf(searchValue.toLowerCase())
                    )
                    .slice(0, 1)
                    .toUpperCase() +
                  item.key
                    .slice(
                      0,
                      item.key.toLowerCase().indexOf(searchValue.toLowerCase())
                    )
                    .slice(1)
                    .toLowerCase()
                }}</span
                ><span
                  class="yellow"
                  v-show="
                    item.key.toLowerCase().indexOf(searchValue.toLowerCase()) ==
                    0
                  "
                  >{{
                    searchValue.slice(0, 1).toUpperCase() +
                    searchValue.slice(1).toLowerCase()
                  }}</span
                ><span
                  class="yellow"
                  v-show="
                    item.key.toLowerCase().indexOf(searchValue.toLowerCase()) !=
                    0
                  "
                  >{{ searchValue.toLowerCase() }}</span
                ><span>{{
                  item.key
                    .slice(
                      item.key
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) + searchValue.length
                    )
                    .toLowerCase()
                }}</span>
              </p>
            </div>
            <p class="no-result-text" v-if="searchResult.length == 0">
              暂无结果！
            </p>
          </div>
        </div>

        <div class="head-right">
          <div class="head-circle" @click="changeLang()">
            <a href="javascript:void(0);">{{ $t("message.lang") }}</a>
          </div>
          <div
            class="head-circle nav-menu-button"
            @mouseover="menuShow()"
            @mouseleave="menuHide()"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="centered lr-padding3 nav-menu-wrap-father">
        <div
          class="nav-menu-wrap"
          v-show="menuIsShow"
          @mouseover="menuShow2()"
          @mouseleave="menuHide()"
        >
          <div
            v-if="
              this.menuData != null && JSON.stringify(this.menuData) != '{}'
            "
          >
            <div
              v-for="(typeData, typeKey) in menuData"
              :key="typeKey"
              @mouseover="changeMenuCurrentType(typeKey)"
              @click="
                changeMenuCurrentType(typeKey),
                  routerTo('/model/' + menuCurrentType)
              "
              class="menu-tag-wrap cursor"
              :class="{ 'activate-tag': menuCurrentType == typeKey }"
            >
              <p>
                {{ typeData.name[$i18n.locale] }}
              </p>
            </div>
          </div>
          <div class="sub-menu-wrap" v-if="menuCurrentType != ''">
            <div
              v-for="(typeData, typeKey) in menuData[menuCurrentType].models"
              :key="typeKey"
              class="menu-tag-wrap model-tag-wrap"
              @click="routerTo('/model/' + menuCurrentType + '/' + typeKey)"
            >
              <p>
                {{ typeData.name[$i18n.locale] }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import configData from "@/assets/config.json";

export default {
  inject: ["reload"],

  name: "myHeader",
  data() {
    return {
      searchValue: "",
      searchResult: [],
      searchOriginData: [],
      // resultNum: 0,
      menuData: "",
      menuIsShow: false,
      menuIsShow2: false,
      timer: null,
      menuCurrentType: "",
      baseUrl: configData.base_url,
    };
  },
  created() {
    // 接收index.vue传来的数据
    this.$eventBus.$on("allData", (data) => {
      this.menuData = data.model_type;
      for (var typeKey in this.menuData) {
        this.menuCurrentType = typeKey;
        break;
      }
      // resultType: set表示模型集合，model表示具体模型
      // 为menuData添加对应路由
      for (var typeKey in this.menuData) {
        this.searchOriginData.push({
          key: this.menuData[typeKey].name.en,
          route: "/model/" + typeKey,
          resultType: "set",
        });
        this.searchOriginData.push({
          key: this.menuData[typeKey].name.cn,
          route: "/model/" + typeKey,
          resultType: "set",
        });
        for (var modelKey in this.menuData[typeKey]["models"]) {
          this.searchOriginData.push({
            key: this.menuData[typeKey]["models"][modelKey].name.en,
            route: "/model/" + typeKey + "/" + modelKey,
            resultType: "model",
          });
          this.searchOriginData.push({
            key: this.menuData[typeKey]["models"][modelKey].name.cn,
            route: "/model/" + typeKey + "/" + modelKey,
            resultType: "model",
          });
        }
      }
    });

    // });
  },

  methods: {
    routerTo(route) {
      if (this.$route.path != route) {
        this.reload();
        this.$router.push(route);
      }
    },
    changeLang() {
      console.log(this.$i18n.locale);
      if (this.$i18n.locale == "cn") {
        this.$i18n.locale = "en";
      } else if (this.$i18n.locale == "en") {
        this.$i18n.locale = "cn";
      }
    },

    // search
    cleanSearch() {
      this.searchValue = "";
      this.queryData();
    },
    searchButton() {


      if (
        this.searchResult.length == 0
      ) {
        this.routerTo("/nodata");
        this.cleanSearch();
      } else {
        this.routerTo(this.searchResult[0].route);
        this.cleanSearch();
      }
    },
    changeMenuCurrentType(currentType) {
      this.menuCurrentType = currentType;
    },
    queryData() {
      //并没有输入关键字时，就不要再搜索了
      if (this.searchValue === "" || this.searchValue == null) {
        this.searchResult = [];
        return;
      }
      //搜索
      let list = this.searchOriginData.filter(
        (item) =>
          item["key"].toLowerCase().indexOf(this.searchValue.toLowerCase()) >= 0
      );
      // console.log(list)
      if (list.length == 0) {
        // this.resultNum = 0;
        this.searchResult = [];
      } else {
        // this.resultNum = list.lenght;

        this.searchResult = list;
      }
    },
    // reset() {
    //   this.orgList = JSON.parse(JSON.stringify(this.normal));
    // },

    // menu
    menuShow() {
      this.menuIsShow = true;
      // console.log("show is run");
    },
    menuShow2() {
      clearInterval(this.timer);
      // this.menuIsShow2 = true;
      // console.log("show2 is run");
    },
    menuHide() {
      var that = this;
      this.timer = setTimeout(() => {
        // 需要执行的代码
        that.menuIsShow = false;
      }, 200);
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  flex-wrap: wrap;
}

.logo-wrap {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo-wrap > img {
  width: 45px;
  margin: 0px 13px;
}
.logo-tittle-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.logo-tittle-up {
  font-size: 26px;
  font-family: Arial Black;
}
.yellow {
  color: rgba(254, 209, 0, 1);
}
.logo-tittle-down {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #333333;
  padding-bottom: 5px;
}

/* search */
.search-wrap {
  width: 40%;
  max-height: 42px;
}
.search-border {
  border: 1px solid rgba(254, 209, 0, 1);
  border-radius: 20px;
  padding: 10px 5px;
  background-color: white;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.search-input {
  margin-left: 10px;
  outline: none;
  border: 0px;
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #333333;
  width: 80%;
}
.search-input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #333333;
  opacity: 0.3;
}

.search-input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #333333;
  opacity: 0.3;
}

.search-input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #333333;
  opacity: 0.3;
}
.search-button {
  font-size: 15px;
  min-width: 30px;
  cursor: pointer;
  background: #fed100;
  box-shadow: 0px 5px 8px 0px rgba(254, 209, 0, 0.16);
  border-radius: 18px;
  padding: 7px 10px;
}
.search-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-right > .delete-wrap {
  display: flex;
  align-items: center;
}
.search-right > .delete-wrap > img {
  height: 13px;
  cursor: pointer;
}
.search-right > .delete-wrap > span {
  border: 1px solid #eeeeee;
  background-color: #eeeeee;
  border-radius: 2px;
  height: 15px;
  margin: 0 10px;
}

.search-result-warp {
  margin-top: 10px;
  z-index: 99999;
  padding: 10px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 6px 20px 0px rgba(212, 212, 212, 0.25);
  border-radius: 8px;
  position: relative;
  /* top: 70px; */
}
.search-result-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.search-result-item > img {
  margin-right: 5px;
  height: 24px;
  width: 24px;
}
.search-result-item > p {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
}
.search-result-item:hover {
  background: rgba(250, 251, 253, 1);
}
.no-result-text {
  color: rgb(143, 143, 143);
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  margin: 10px;
}

/* head-right */
.head-right {
  display: flex;
}
.head-right > div {
  margin: 0 7px;
}
.head-circle {
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: #ffffff;
  box-shadow: 0px 10px 16px 0px rgba(186, 185, 185, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head-circle:hover {
  box-shadow: 0px 10px 16px 0px rgba(254, 209, 0, 0.2);
}
.head-circle > a {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}

.head-circle:hover > a {
  color: #fed100;
}

.nav-menu-button span {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: rgba(51, 51, 51, 1);
  margin: 1px;
}
.nav-menu-button:hover > span {
  background-color: rgba(254, 209, 0, 1);
}

/* nav-menu */
.nav-menu-wrap-father {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.nav-menu-wrap {
  z-index: 99999;
  display: flex;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 6px 20px 0px rgba(212, 212, 212, 0.25);
  border-radius: 8px;
}
.nav-menu-wrap > div {
  width: 150px;
  display: flex;
  flex-direction: column;
}
.menu-tag-wrap {
  padding: 20px 20px;
}
.menu-tag-wrap > p {
  font-size: 14px;
}
.sub-menu-wrap {
  background: #fafbfd;
}
.activate-tag {
  background: #fafbfd;
  color: rgb(254, 207, 0);
}
.cursor {
  cursor: pointer;
}
.model-tag-wrap {
  cursor: pointer;
}
.model-tag-wrap:hover > p {
  color: rgb(254, 207, 0);
}
</style>
