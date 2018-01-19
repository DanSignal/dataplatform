<!-- da-title -->
<template>
  <div class="da-title">
      <span class="title">{{titleName}}</span>
      <span class="remark">{{titleRemark}}</span>
  </div>
</template>

<script>
export default {
  props: ["tname", "remark"],
  data() {
    return {};
  },

  components: {},

  computed: {
    titleName() {
      return this.tname;
    },
    titleRemark() {
      if (this.remark) return this.remark;
      else return "";
    }
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
    .da-title{
        margin: 0 auto;
        margin-top: 30px;
        border-bottom: 1px solid #aaa;
        height: 40px;
        line-height: 40px;
    }
    .title{
        float: left;
        font-size: 24px;
    }
    .remark{
        float: right;
        font-size: 14px;
        color: #999
    }
</style>