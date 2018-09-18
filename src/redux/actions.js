/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {
  reqRegister,
  reqLogin
} from "../api"
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from "./action-types";

//注册/登录成功的同步action
const arthSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//注册/登录失败的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

//注册的异步action
export function register({username,password,type}) {
  return dispatch => {
    //发异步ajax请求注册
    reqRegister({username,password,type}).then(response => {
      const result = response.data  //返回 {code:0/1 ,msg:'',data:user}
      if (result.code==0) { //成功
        const user = result.data
        //分发成功的同步action
        dispatch(arthSuccess(user))
      } else {    //失败
        const msg = result.msg
        //分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}

//登录的异步action
export function login(username,password) {
  return dispatch => {
    //发异步ajax请求登录
    reqLogin({username,password}).then(response => {
      const result = response.data
      if (result.code==0) {
        const user = result.data
        //分发成功的同步action
        dispatch(arthSuccess(user))
      } else {
        const msg = result.msg
        //分发失败同步action
        dispatch(errorMsg(msg))
      }
    })
  }
}