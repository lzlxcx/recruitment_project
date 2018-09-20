import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
/*
个人中心路由组件
 */
class Personal extends Component {

  logout = () => {
    Modal.alert('退出', '确认退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确认',
        onPress: () => {
          // 清除cookie中的userid
          Cookies.remove('userid')
          // 重置redux的user状态
          this.props.resetUser()
        }
      }
    ])
  }

  render () {
    const {username, header, post, info, salary, company} = this.props.user
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width:50}} alt="header"/>}
          title={username}
          message={company}
        />
        <List>
          <Item>
            {post ? <Brief>职位：{post}</Brief> : null}
            {info ? <Brief>描述：{info}</Brief> : null}
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {resetUser}
)(Personal)