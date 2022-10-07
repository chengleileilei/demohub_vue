<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="footer-wrap">
        <div class="centered footer">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="footer-box">
            <p class="footer-tittle">
              {{ $t("footer.authors") }}
            </p>

            <div class="footer-content">
              <p>{{ $t("footer.huang") }}</p>
              <p>{{ $t("footer.wang") }}</p>
              <p>{{ $t("footer.cheng") }}</p>
              <p>{{ $t("footer.sang") }}</p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="footer-box">
            <p class="footer-tittle">
              {{ $t("footer.useful_link") }}
            </p>
            <div class="footer-content" v-if="footerData!=''">
              <a
              
                :href="data.url"
                v-for="(data, index) in footerData.useful_links"
                :key="index"
                >{{ data.text[$i18n.locale] }}</a
              >
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="footer-box" v-if="footerData!=''">
            <p class="footer-tittle">
              {{ $t("footer.contact") }}
            </p>
            <div class="footer-content">
              <p>
                {{ $t("footer.address") }}:
                {{ footerData.address[$i18n.locale] }}
              </p>
              <p>
                {{ $t("footer.postcode") }}:
                {{ footerData.postcode }}
              </p>
              <p>{{ $t("footer.email") }}: {{ footerData.email }}</p>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: '',
      usefulLinkData :'',
      footerData : ''
    };
  },
  created() {
    this.$eventBus.$on("allData", (data) => {
      this.allData = data;
            this.footerData = this.allData.footer

      // this.usefulLinkData = this.allData.footer.useful_links
      
    });
  },
};
</script>

<style>
.footer-wrap {
  background-color: #333333;
}

.footer-wrap p {
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
}
.footer {
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-box {
  /* margin-toyp: 40px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.footer-tittle {
  margin-bottom: 15px;
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  color: #ffffff;
}
.footer-content > p {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 10px;
}
.footer-content > a {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 10px;
}
</style>