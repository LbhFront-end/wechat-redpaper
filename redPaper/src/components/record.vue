<template>
  <div class="main" :style="height">
      <div class="record flex-x-center flex-y-center flex-col">
          <div class="list flex-x-center flex-y-center flex-col">
              <div class="list-head flex-x-center flex-space-around flex-row">
                  <p>小票号</p>
                  <p>ID</p>
                  <p>红包金额</p>
              </div>
              <hr>
              <div class="outside">
                <div class="list-item flex-x-center flex-space-around flex-row" v-for="item in nameList" :key="item.xph">
                    <p>{{item.xph}}</p>
                    <p>{{item.personName}}</p>
                    <p>{{item.redAmount}}</p>
                </div>
              </div>
              <div class="back flex-x-center flex-y-center flex-col">
                  <router-link :to="{path:'/'}">点击返回</router-link>
              </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
.main {
  background: url("../../static/img/recordBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
}
</style>
<script>
let self;
import { Toast } from "mint-ui";
export default {
  name: "record",
  data() {
    return {
      height: {
        height: ""
      },
      nameList: [],
      openId: ""
    };
  },
  created() {
    self = this;
    self.getHeight();
    var storage = window.localStorage;
    self.openId = storage.getItem("openId");
    self.getRecord();
  },
  methods: {
    getHeight() {
      self.height.height = document.documentElement.clientHeight + "px";
    },
    getRecord() {
      self
        .$axios({
          url: "http://redpacket.dwucity.com/receipt/getWinRecord",
          method: "post",
          data: {
            data: {
              openId: self.openId
            }
          }
        })
        .then(function(response) {
          if (response.data.code == 400) {
            Toast({
              className: "toast",
              message: response.data.message,
              position: "top",
              duration: 2000
            });
          } else {
            self.nameList = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
