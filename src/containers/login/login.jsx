import React, {Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'

import Logo from '../../componnets/logo/logo'
/*
登陆路由组件
 */
export default class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  //注册
  login = () => {
    console.log(this.state)
  }


  render () {
    return (
      <div>
        <NavBar>直聘王</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem
              placeholder='请输入用户名'
              onChange={val=> this.handleChange('username', val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type='password'
              placeholder='请输入密码'
              onChange={val=> this.handleChange('password', val)}
            >
              密码:
            </InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>登&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.goLogin}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}