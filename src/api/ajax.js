/*
* 使用axios封装一个ajax请求函数
* 函数的返回值是promise（以便利用async）
* */
//引人axios
import axios from 'axios'


export default function ajax(url,data={},type='GET') {//发请求确定三个参数
  if (type==='GET') {
    //将data中所有的数据转换成query参数字符串接到url中
    let queryString = ''  //查询参数字符串
    Object.keys(data).forEach(key => {  //Object.keys(obj):得到obj对象自身所有属性的属性名组成的数组
      const value = data[key]//属性名是一个变量(key)
      queryString += key + '=' +value + '&'
    })
    //如果有数据 去掉多余的&
    if (queryString) {
      queryString = queryString.substring(0, queryString.length-1) //截取字符串
      url += '?' + queryString
    }
    //发送get请求
    return axios.get(url)  // 参数在url中，传入的是对象但需要的是串 所以要遍历data中所有的数据进行拼串
  } else {
    //发post请求
    return axios.post(url,data)  // data:  包含所有参数的对象
  }
}