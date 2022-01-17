let ajaxTimes = 0
export const request = function (params) {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header = { ...params.header };
  if (params.url.includes("/my/")) {
    // 拼接header 带上token
    header["Authorization"] = wx.getStorageSync("token");
  }
  ajaxTimes++
  wx.showLoading({ title: '正在加载...', mask: true });
  // 定义公共URL
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header:header,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        if (--ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}

export const request2 = function (params) {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header = { ...params.header };
  header["Authorization"] = wx.getStorageSync("token2");
  // 定义公共URL
  const baseUrl = "https://img.coolcr.cn/api"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header:header,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}