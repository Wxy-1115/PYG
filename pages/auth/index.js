import { login } from "../../utils/asyncWx"
import { request } from "../../request/index"

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()
      console.log(code);
      const loginParams = { encryptedData, rawData, iv, signature, code }
      console.log(encryptedData, rawData, iv, signature, code);
      wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
      const token = wx.getStorageSync("token")
      wx.navigateBack({
        delta: 1
      });
    }catch(err){
      console.log(err);
    }
  }
})