import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime'
import { showToast } from "../../utils/asyncWx";

Page({
  data: {
    goodsObj: {},
    isCollect: false
  },
  GoodsInfo: {},
  goods_id: 0,
  //options(Object)
  onShow: function(){
    var curPages =  getCurrentPages();
    let {options} = curPages[curPages.length - 1]
    const { goods_id } = options
    this.goods_id = parseInt(goods_id)
    this.getGoodsDetail(goods_id)
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    let isCollect = collect.some(v=>v.goods_id===this.goods_id )
    this.setData({
      isCollect
    })
  },
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: '/goods/detail', data: { goods_id}})
    // console.log(goodsObj);
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj:{
        pics: goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },
  // 放大浏览轮播图
  handleSwiperClick(e) {
    // 获取图片列表
    const urls = this.data.goodsObj.pics.map(item => item.pics_mid)
    // 当前图片索引
    const {index} = e.currentTarget.dataset
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handleCartAdd(e) {
    // 获取缓存中购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断该商品是否存在于cart
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if(index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num ++
    }
    wx.setStorageSync("cart", cart);
    showToast({title: '加入成功',icon: 'success'})
  },
  // 立即购买
  handleBuy(e) {
    console.log(this.GoodsInfo);
    this.GoodsInfo.num = 1
    wx.navigateTo({url:"/pages/pay/index?goods_id="+this.goods_id})
  },
  // 收藏按钮点击
  handleCollectChange() {
    const {isCollect} = this.data
    let collect = wx.getStorageSync("collect")||[];
    if(!isCollect){
      wx.setStorageSync("collect", [...collect, this.GoodsInfo])
      showToast({title:'收藏成功', icon:"success"})
    }else{
      const newCollect = collect.filter(v=>v.goods_id!==this.goods_id)
      // console.log(newCollect);
      wx.setStorageSync("collect", newCollect)
      showToast({title:'取消成功', icon:"success"})
    }
    this.setData({
      isCollect: !isCollect
    })
  }
});