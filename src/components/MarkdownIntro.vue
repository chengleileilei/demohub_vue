<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="intro-wrap">
      <div v-if="markdownData!=null" class="context" v-html="compiledMarkdown"></div>
    </el-col>
  </el-row>
</template>

<script>
import { marked } from "marked";
export default {
  name: "markdownIntro",
  props: ["markdownData"],
  data() {
    return {};
  },
  methods: {
    getType(data) {
      return typeof data;
    },
  },
  computed: {
    compiledMarkdown() {
      return marked.parse(this.markdownData);
    },
  },
};
</script>

<style>
.short-line {
  border-bottom: 4px solid black;
  width: 5%;
  min-width: 40px;
  margin: 20px 0;
}
.inline {
  display: inline;
}

.intro-wrap {
  /* width: 67%; */
  text-align: left;
  margin-bottom: 20px;
}
.intro-tittle {
  font-size: 30px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #000000;
  margin: 15px 0;
}
.intro-text {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #000000;
  line-height: 24px;
  text-indent: 2em;
  margin-bottom: 5px;
}
.intro-text a {
  color: #337ab7;
}
.intro-text a:hover {
  color: #23527c;
  text-decoration-line: underline;
}
</style>