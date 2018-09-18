/*
* 包含n个接口请求函数的模块
* 函数的返回值：promise
* */
import ajax from './ajax'

const BASE = ''

//请求注册接口
/*export function reqRegister({username,password,typw}) {
  return ajax('/register',{username,password,type},'POST')
}*/
export const reqRegister = ({username,password,type}) => ajax(BASE+'/register',{username,password,type},'POST')
//请求登录接口
/*export function reqLogin(username,password) {
  return ajax('/login',(username,password),'POST')
}*/
//用两个参数传参 要求：传参顺序  如果用对象传参 要求：属性名必须一致
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')