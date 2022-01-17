import { request } from "../../request/index";
import { chooseAddress, requestPayment, showModal, showToast } from "../../utils/asyncWx";

// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    goods_id: -1,
  },

  onLoad: function (options) {
    // console.log(options.goods_id)
    if (options.goods_id) {
      this.setData({
        goods_id: options.goods_id
      })
      this.getGoodsDetail(options.goods_id)
    }
  },
  onShow: function () {
    let address = wx.getStorageSync("address");
    if (address.userName) {
      address.detailInfos = address.provinceName + address.cityName + address.countyName + address.detailInfo
    }
    this.setData({
      address
    })
    let { cart } = this.data
    if (this.data.goods_id < 0) {
      console.log("none");
      let totalPrice = 0, totalNum = 0
      cart = wx.getStorageSync("cart") || [];
      cart = cart.filter(v => v.checked)
      // 总价格 总数量
      cart.forEach(v => {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      })
      this.setData({
        cart,
        totalPrice,
        totalNum
      })
    } 
  },
  async handleOrderPay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return
    }
    // const header = { Authorization: token };
    // 3.2 请求体参数
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address.detailInfos
    const cart = this.data.cart
    // 3.3 订单数组
    let goods = []
    cart.forEach(e => goods.push({
      goods_id: e.goods_id,
      goods_number: e.num,
      goods_price: e.goods_price
    }))
    // console.log(goods);
    const orderParams = { order_price, consignee_addr, goods }
    // console.log(orderParams, header);
    // 4 准备发送订单 创建订单 获取订单编号
    const { order_number } = await request({
      url: '/my/orders/create',
      method: 'post',
      data: orderParams
    })
    // console.log(order_number);
    const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } })
    // const res = await requestPayment(pay)
    await showToast({ title: "支付失败" , icon: "error"})
    let newCart = wx.getStorageSync("cart") || [];
    newCart = newCart.filter(v => !v.checked)
    wx.setStorageSync("cart", newCart);
    setTimeout(() => {
      wx.switchTab({
        url: "/pages/cart/index"
      })
    }, 1500);
  },
  async getGoodsDetail(goods_id) {
    let goodsObj = await request({ url: '/goods/detail', data: { goods_id } })
    console.log(goodsObj);
    // goodsInfo()
    const { cart } = this.data
    goodsObj.num = 1
    let totalPrice = goodsObj.goods_price, totalNum = 1
    cart.push(goodsObj)
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
})