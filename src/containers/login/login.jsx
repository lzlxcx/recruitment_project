import React, {Component} from 'react'
import {NavBar, WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
import Logo from '../../componnets/logo/logo'
/*
登陆路由组件
 */
class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  //注册
  login = () => {
    //console.log(this.state)
    const {username,password} = this.state
    this.props.login(username,password)
  }

  goRegister = () => {
    //编程式路由导航（跳转）
    this.props.history.replace('/register')
  }

  render () {

    const {redirectTo,msg} = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>直聘王</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            { msg ? <p className='error-msg'>{msg}</p> : null}
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

export default connect(
  state => ({user:state.user}),
{login}
)(Login)