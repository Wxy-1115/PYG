import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数据
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList(){
    request({
      url: '/home/swiperdata',
    }).then(res => {
      res.map(v=>{
        v.navigator_url = v.navigator_url.replace(/main/,'index')
      })
      this.setData({
        swiperList:res
      })
    })
  },
  getCateList() {
    request({
      url: '/home/catitems',
    }).then(res => {
      this.setData({
        cateList: res
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata',
    }).then(res => {
      res.map(item1=>{
        item1.product_list.map(item2=>{
          item2.navigator_url = item2.navigator_url.replace(/list/,'list/index')
          // console.log(item2.navigator_url);
        })
      })
      this.setData({
        floorList: res
      })
    })
  }
})