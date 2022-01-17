// pages/collect/index.js
Page({
  data: {
    tabs:[
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ],
    collect: []
  },
  onShow() {
    let collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
  },
  changeTitleByindex(index) {
    const { tabs } = this.data
    tabs.forEach((item,i)=>{i === index ? item.isActive = true : item.isActive = false})
    this.setData({
      tabs
    })
  },
  handleTabBarChange(e){
    // console.log(e);
    const { index } = e.detail
    this.changeTitleByindex(index)
    // this.getOrders(index+1)
  },
})