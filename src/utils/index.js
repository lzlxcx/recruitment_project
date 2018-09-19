/*
* 包含n个工具函数的模块
* */

/*
得到需要自动跳转的path
路径结果： 注册 laoban/dashen   ----- /laobaninfo   /dasheninfo
      登录 laoban/dashen   ----- /laobaninfo或/laoban  /dasheninfo或/dashen
传参:   type    header  信息没有完善
 */
export function getRedirectPath(type,header) {
  let path = ''
  if (type === 'laoban') {
    path = '/laoban'
  }else if (type==='dashen') {
    path = '/dashen'
  }

  if (!header) { //信息没有完善
    path += 'info'
  }
  return path
}