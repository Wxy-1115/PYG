import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime'
//Page Object
Page({
  data: {
    // 左侧菜单数据
    leftList: [],
    // 右侧分类数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    scrollTop: 0
  },
  Cates: [],
  //options(Object)
  onLoad: function (options) {
    // 判断是否有缓存数据
    wx.getStorage({
      key: 'Cates',
      success: (result) => {
        // console.log(result);
        if (Date.now() - result.data.time > 1000 * 60 * 5) {
          console.log("数据已过期，重新获取!!!");
          this.getCates()
        } else {
          this.Cates = result.data.data
          let leftList = this.Cates.map(i => i.cat_name)
          let rightContent = this.Cates[0].children
          this.setData({
            leftList,
            rightContent
          })
        }
      },
      fail: () => {
        this.getCates()
      }
    });
  },
  async getCates() {
    const res = await request({ url: "/categories" })
    // console.log(res);
    this.Cates = res
    wx.setStorageSync("Cates", { time: Date.now(), data: this.Cates });
    
    let leftList = this.Cates.map(i => i.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftList,
      rightContent
    })
  },
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
});