<template>
  <div class="main" :style="height">
      <div class="record flex-x-center flex-y-center flex-col">
          <div class="list flex-x-center flex-y-center flex-col">
              <div class="back flex-x-center flex-y-center flex-col">
                  <router-link :to="{path:'/'}">点击返回</router-link>
              </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
.main {
  background: url("../../static/img/activityRule.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  overflow: hidden;
}
</style>
<script>
export default {
  name: "record",
  data() {
    return {
      height: {
        height: ""
      },
    };
  },
  created() {
    this.getHeight();
  },
  methods: {
    getHeight() {
      var self = this;
      self.height.height = document.documentElement.clientHeight+'px';
    }
  }
};
</script>
