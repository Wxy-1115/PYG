import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: '全部订单',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: []
  },
  onLoad(){
  },
  onShow(options) {
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return
    }
    var curPages =  getCurrentPages();
    // console.log(curPages);
    let pages = curPages[curPages.length - 1]
    // console.log(pages.options);
    const {type} = pages.options
    this.getOrders(type)
    this.changeTitleByindex(type-1)
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
    this.getOrders(index+1)
  },
  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({url:"/my/orders/all",data:{type}})
    console.log(res);
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn: new Date(v.create_time*1000).toLocaleString()}))
    })
  },
})