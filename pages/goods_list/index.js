import { request } from '../../request/index'

Page({
  data: {
    tabs:[
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // url参数
    // console.log(options);
    this.QueryParams.cid = options.cid||""
    this.QueryParams.query = options.query||""
    this.getGoodsList()
  },
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // console.log(res);
    // 获取总条数
    const {total} = res
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPages);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
  },
  handleTabBarChange(e){
    // console.log(e);
    const { index } = e.detail
    const { tabs } = this.data
    tabs.forEach((item,i)=>{
      item.isActive = false
      if (i === index){
        item.isActive = true
      }
    })
    this.setData({
      tabs
    })
  },
  // 监听页面触底上拉刷新
  onReachBottom(e) {
    if (this.QueryParams.pagenum < this.totalPages){
      this.QueryParams.pagenum++
      this.getGoodsList()
    }else{
      wx.showToast({ title: '亲，已经到底了呢~', icon: 'none'});
    }
  },
  // 监听页面下拉刷新
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    // 重置数据
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
    wx.stopPullDownRefresh()
  }
})