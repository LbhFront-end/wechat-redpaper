<template>
  <div class="main">      
      <div class="redPaper flex-x-center flex-col" :class="{showRedPaper:showRedPaperStatue}">
          <div class="inside flex-x-center flex-col flex-y-center">
            <div class="txt flex-x-center flex-col flex-y-center">
                <p>恭喜您领到</p>
                <p><span>{{money}}元</span>现金红包</p>
            </div>  
            <div class="btn flex-x-center flex-col flex-y-center" @click="seeRecord()">
                <a>
                    查看记录
                </a>
            </div>            
          </div>
      </div>
      <div class="index flex-x-center flex-col">
          <div class="ruleText flex-x-center flex-y-center flex-col">
              <p class="flex-left flex-y-center flex-col">VIP当天购物，单笔消费满300元以上，扫码关注《海印又一城》官方微信，输入小票号即可领取一个随机金额的微信红包，最高666。</p>
          </div>
          <div class="btns flex-x-center flex-y-center flex-col">
              <div class="receipts flex-x-center flex-y-center flex-row">
                  <input type="number" placeholder="请输入小票号" v-model="receipts">
              </div>
              <div class="amount flex-x-center flex-y-center flex-row">
                  <input type="number" placeholder="请输入消费金额" v-model="amount">
              </div>
              <div class="receive flex-x-center flex-y-center flex-row" @click="sendMessage()">
                  <p class="flex-x-center flex-y-center flex-row">马上领取</p>
              </div>
          </div>
          <div class="ruleBtn flex-x-center flex-space-between flex-row">
              <router-link :to="{path:'/Rule'}" class="flex-x-center flex-y-center flex-row">活动说明</router-link>
              <router-link :to="{path:'/Record'}" class="flex-x-center flex-y-center flex-row">领取明细</router-link>
          </div>
      </div>
  </div>
</template>
<style>
html,
body {
  background: url("../../static/img/mainBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
</style>
<script>
let self;
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "index",
  data() {
    return {
      receipts: "",
      amount: "",
      money: "300.00",
      showRedPaperStatue: false,
      code: "",
      openId: ""
    };
  },
  created() {
    self = this;
    self.getOpenId();
  },
  methods: {
    getOpenId() {
      const codeUrl = window.location.href;
      const start = codeUrl.indexOf("=") + 1;
      const stop = codeUrl.indexOf("&");
      self.code = codeUrl.substring(start, stop);
      self
        .$axios({
          url: "http://redpacket.dwucity.com/weixin/getOpenId",
          method: "post",
          data: {
            code: self.code
          }
        })
        .then(function(response) {
          self.openId = response.data.data.openId;
          var storage = window.localStorage;
          storage.setItem("openId", response.data.data.openId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendMessage() {
      self
        .$axios({
          url: "http://redpacket.dwucity.com/receipt/handle",
          method: "post",
          data: {
            data: {
              openId: self.openId,
              xph: self.receipts,
              xfje: self.amount
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
            self.showRedPaperStatue = !self.showRedPaperStatue;
            self.money = response.data.data.redAmount;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    seeRecord() {
      self.showRedPaperStatue = false;
      self.$router.push("/Record");
    }
  }
};
</script>
