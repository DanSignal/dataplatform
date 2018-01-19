<!-- card-panel -->
<template>
    <div class='card-panel' >
        <div class="card-panel-description">
        <count-to class="card-panel-num" :startVal="startval" :endVal="endVal" :duration="durationv"></count-to>
            <div class="card-panel-text">
                <div class="text1">{{cardName}}</div>
                <div class="text2">{{cardNote}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  props: {
    cardname: [String, Number],
    cardnote: [String, Number],
    startval: {
      type: [String, Number],
      default: 0,
      validator: function (value) {
        return value >= 0
      }
    },
    endval: {
      type: [String, Number],
      required: true,
      validator: function (value) {
        return value >= 0
      }
    },
    duration: {
      type: [String, Number],
      default: 2600
    }
  },
  data() {
    return {};
  },

  components: {
       CountTo,
  },

  computed: {
    cardName: function(){
      return this.cardname;
    },
    cardNote: function(){
      return this.cardnote;
    },
    startVal: function(){
      return this.startval;
    },
    endVal: function(){
      return parseFloat(this.endval);
    },
    durationv: function(){
      return parseFloat(this.duration);
    }
  },

  mounted: function() {
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
.card-panel-description {
  text-align: center;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
  margin-right: 0px;
  .card-panel-text {
    text-align: center;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-top: 12px;
    .text2 {
      font-size: 12px;
    }
  }
  .card-panel-num {
    font-size: 20px;
  }
}
</style>