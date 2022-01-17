import { getUserProfile } from "../../utils/asyncWx"

// pages/login/index.js
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  async getUserProfile() {
    const res = await getUserProfile({ desc: '用于完善会员资料' })
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync("userInfo", res.userInfo);
    wx.navigateBack({
      delta: 1
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync("userInfo", e.detail.userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})