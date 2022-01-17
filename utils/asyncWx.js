/**

 * promise 形式  getSetting
   */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
* promise 形式  chooseAddress
*/
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**

* promise 形式  openSetting
*/
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**

*  promise 形式  showModal
*  @param {object} param0 参数
 */
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}


/**

*  promise 形式  showToast
*  @param {object} param0 参数
 */
export const showToast = ({ title, icon="none" }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**

* promise 形式  login
*/
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**

* promise 形式的 小程序的微信支付
* @param {object} pay 支付所必要的参数
*/
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      }
    });

  })
}
/**

* promise 形式的 小程序的获取用户个人信息
*  @param {object} param0 参数
*/
export const getUserProfile = ({desc}) => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc, // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        resolve(res)
      },
      fail: (err)=>{
        reject(err)
      }
    })

  })
}


