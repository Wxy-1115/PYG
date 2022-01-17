import { chooseAddress, showModal, showToast } from "../../utils/asyncWx";

// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    let address = wx.getStorageSync("address");
    if (address.userName) {
      address.detailInfos = address.provinceName + address.cityName + address.countyName + address.detailInfo
    }
    let cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取收货地址
  async handleChooseAddress() {
    const res = await chooseAddress()
    wx.setStorageSync("address", res);
    this.setData({
      address: res
    })
  },
  // 商品复选框点击功能
  handleItemChange(e) {
    const {id} = e.target.dataset
    const { cart } = this.data
    cart.map(i => {
      if (i.goods_id === id){
        i.checked = !i.checked
      }
    })
    this.setCart(cart)
  },
  // 全选按钮点击事件
  handleAllChange() {
    let { allChecked, cart } = this.data
    cart.map(i =>{
      i.checked = !allChecked
    })
    this.setCart(cart)
  },
  // 商品数量编辑事件
  async handleNumClick(e) {
    const {operation,id} = e.target.dataset
    // console.log(num);
    const { cart } = this.data
    const index = cart.findIndex(v=>v.goods_id === id)
    if(cart[index].num<=1&&operation===-1){
      const res = await showModal({content:"是否删除此商品？"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else{
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  setCart(cart) {
    let allChecked = true
    // 总价格 总数量
    let totalPrice = 0, totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        console.log("未选中");
        allChecked = false
      }
    })
    // console.log(allChecked);
    allChecked = cart.length ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  // 结算点击事件
  async handlePay() {
    // 判断是否有收货地址
    const {address,totalNum} = this.data
    if(!address.userName){
      await showToast({title:"请选择收货地址", icon:"error"})
      return
    }
    if(totalNum === 0){
      await showToast({title:"您还没有选购商品"})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})