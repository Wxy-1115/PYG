import { chooseAddress } from "../../utils/asyncWx";

// pages/user/index.js
Page({
  data: {
    userInfo: {},
    isLogin: false,
    collectNums: 0
  },
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    // console.log(Object.keys(userInfo));
    if (Object.keys(userInfo).length !== 0) {
      const collect = wx.getStorageSync("collect");
      let collectNums = collect.length
      this.setData({
        userInfo,
        isLogin: true,
        collectNums
      })
    }
  },
  // 获取收货地址
  async handleChooseAddress() {
    const res = await chooseAddress()
    wx.setStorageSync("address", res);
  },
})