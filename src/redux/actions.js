/*
包含n个action creator函数的模块
同步action: 对象
异步action: dispatch函数
 */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from "../api"
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from "./action-types";

//注册/登录成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//注册/登录失败的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
//接收用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
//重置用户的同步action
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
//接收用户列表的同步action
export const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST,data:userList})


//注册的异步action
export function register({username,password,password2,type}) {

  //前台表单验证
  if (!username) { //此时本质是同步action
    return errorMsg('请指定用户名')
  } else if(!password) {
    return errorMsg('请指定密码')
  } else if (password2!=password) {
    return errorMsg('密码必须一致')
  } else if (!type) {
    return errorMsg('请指定用户类型')
  }

  return async dispatch => {
    //发异步ajax请求注册
    const response = await reqRegister({username,password,password2,type})
    const result = response.data  //返回 {code:0/1 ,msg:'',data:user}
    if (result.code==0) { //成功
      const user = result.data
      //分发成功的同步action
      dispatch(authSuccess(user))
    } else {    //失败
      const msg = result.msg
      //分发失败同步action
      dispatch(errorMsg(msg))
    }
  }
}

//登录的异步action
export function login(username,password) {
  return async dispatch => { //async用在await所在函数定义的左侧
    //表单验证
    if (!username) { //必须分发一个同步的action对象
      return dispatch(errorMsg('请指定用户名'))  //return 代表结束
    } else if (!password) {
      return dispatch(errorMsg('请指定密码'))
    }


    //发异步ajax请求登录
    const response = await reqLogin(username, password) //response 是promise函数异步返回的数据
    const result = response.data
    console.log(result.code)
    if (result.code == 0) {
      const user = result.data
      //分发成功的同步action
      dispatch(authSuccess(user))
    } else {
      const msg = result.msg
      //分发失败同步action
      dispatch(errorMsg(msg))
    }
  }
}

/*
* 异步更新用户
* */

export function updateUser(user) {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0){
      const user = result.data
      dispatch(receiveUser(user))
    } else {
      const msg = result.data
      dispatch(resetUser(msg))
    }
  }
}

/*
* 获取当前用户的异步action
* */

export function getUser() {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

/*
* 获取用户列表的异步action
* */
export function getUserList(type) {
  return async dispatch  => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      const userList = result.data
      dispatch(receiveUserList(userList))
    }
  }
}