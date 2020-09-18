import React from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import './index.less';

const { SubMenu } = Menu;
export default class NavLeft extends React.Component{
  componentWillMount(){
    const memuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      memuTreeNode
    })
  }
  // 菜单渲染(使用递归)
  renderMenu =(data)=>{
    return data.map((item)=>{
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>;
    })
  }
  render(){
    return (
      <div>
        <div className="logo">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585027981343&di=bd3bd3fe549a1b2c5a0458da88940d56&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fu%2F00%2F38%2F54%2F05%2F55fbac0d85bab.png" alt=""></img>
          <h1>Imooc</h1>
        </div>
        <Menu mode="vertical" theme="dark">
          {this.state.memuTreeNode}
        </Menu>
      </div>
    )
  }
}