import axios from 'axios/dist/axios.min'

let conf = {
  /**
   * get请求
   * @param url  请求地址
   * @param callback  回调函数
   */
  get (url, callback) {
    axios.get(url).then(response => {
      callback(response.data)
    }).catch(e => {
      console.log(e)
    })
  },
  /**
   * post请求
   * @param url  请求地址
   * @param parms 请求参数
   * 
   * @param callback 回调函数
   */
  post (url, parms, callback) {
    axios.post(url, parms).then(response => {
      callback(response.data)
    }).catch(e => {
      console.log(e)
    })
  }
}

export {
  conf
}
