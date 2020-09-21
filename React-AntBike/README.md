# 第一章：课程导学
## 课程收获
- 掌握React全家桶技能
- 掌握地图和React集成技能
- 掌握前端图表开发技巧
- 掌握基于React的UI框架-AntD
- 前端后台架构设计、公共机制封装、后台管理系统开发经验<br><br>


# 第二章：React基础知识
## React生命周期包含哪些(2-1)
- getDefaultProps：设置组件属性的默认值，通过组件的getDefaultProps方法
- getInitialState：实例化数据
- componentWillMount：componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。
- render：render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。
- componentDidMount：组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
- componentWillReceiveProps：在接受父组件改变后的props需要重新渲染组件时用到的比较多；接受一个参数nextProps；通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件
- shouldComponentUpdate：主要用于性能优化(部分更新)；唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新；因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
- componentWillUpdate：shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState。
- componentWillUnmount：在此处完成组件的卸载和数据的销毁(clear你在组建中所有的setTimeout,setInterval；移除所有组建中的监听 removeEventListener；有时候我们会碰到这个warning)。<br><br>


## 两种方法的定义(2-3)
```js
import React from 'react';
import Child from './Child'
export default class Life extends React.Component {
  state = {
    count: 0
  }
  handleAdd = ()=>{ //箭头函数(调用不需要绑定bind)
    this.setState({
      count: this.state.count + 1
    })
  }
  handleClick(){ //普通函数(调用需要绑定bind)
    this.setState({
      count: this.state.count - 1
    })
  }
  render(){
    return <div style={{padding: 40}}> 
      <p>生命周期</p>
      <button onClick={this.handleAdd}>点击一下+</button>
      <button onClick={this.handleClick.bind(this)}>点击一下-</button>
      <p>{this.state.count}</p>
      <Child name={this.state.count}></Child>
    </div>
  }
}
```
<br><br>


# 第三章：主页面架构设计
## 项目搭建(3-1)
- Node环境配置
- npm install create-react-app -g
- create-react-app 项目名
- 安装router：npm install react-router-dom
- 安装axios：npm install axios
- 安装AntD：npm install antd
- 安装less-loader：npm install less-loader
- 安装less：npm install less
- 安装babel-plugin-import(按需加载样式代码)：npm install babel-plugin-import
- 暴露webpack配置文件(为了让less文件生效)： yarn eject  (命令成功后那么就可以配置webpack.config.js文件让less文件生效，参考cssRegex或者sassRegex的相关配置即可)
```js
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'sass-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules, but using SASS
// using the extension .module.scss or .module.sass
{
  test: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
    'sass-loader'
  ),
},
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
    'less-loader'
  ),
}
```
<br><br>


## 使用Ant Design(3-2)
```js
import React from 'react';
import Child from './Child';
import { Button } from "antd";
import "./index.less";
import "antd/dist/antd.css";
export default class Life extends React.Component {
  state = {
    count: 0
  }
  handleAdd = ()=>{
    this.setState({
      count: this.state.count + 1
    })
  }
  handleClick(){
    this.setState({
      count: this.state.count - 1
    })
  }
  render(){
    return <div className="content"> 
      <p>生命周期</p>
      <button onClick={this.handleAdd}>点击一下+</button>
      <button onClick={this.handleClick.bind(this)}>点击一下-</button>
      <p>{this.state.count}</p>
      <Button type="primary">这是一个按钮</Button>
      <Child name={this.state.count}></Child>
    </div>
  }
}
```
<br><br>


## 项目主页结构开发(3-3、3-4)
- 页面结构定义
- 目录结构定义
- 栅格系统使用
```js
// src/Admin.js
import React from 'react';
import { Row, Col } from 'antd';
import NavLeft from '../src/components/NavLeft';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from '../src/pages/Home';
import './style/common.less';
export default class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
            <NavLeft />
        </Col>
        <Col span={21} className="main">
            <Header/>
            <Row className="content">
                <Home></Home>
            </Row>
            <Footer/>
        </Col>
      </Row>
    )
  }
}

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import Admin from './Admin';
ReactDOM.render(<Admin />,document.getElementById('root'));
```
- calc计算方法[使用](http://caibaojian.com/css3-calc.html)<br><br>


## 菜单组件开发(3-5、3-6)
- [官方组件库](https://ant.design/components/menu-cn/)
- 修改主题色
- 安装图标库：npm install @ant-design/icons -s
- 初步使用
```js
// src/config/menuConfig.js在正式开发中，menu表单内容为接口返回，因为涉及到登录人员身份的权限
const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/buttons'
      },
      {
        title: '弹框',
        key: '/admin/ui/modals'
      }
    ]
  },
  {
    title: '表单',
    key: '/admin/form'
  }
]
export default menuList;


// src/components/Navleft/index.js
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
```
<br><br>


## 头部组件实现(3-7)
```js
// src/components/Header/index
import React from 'react'
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/index'
export default class Header extends React.Component{
  state = {}
  componentWillMount() {
    this.setState({
      userName: 'Zz皓'
    })
    setInterval(() => {
      let sysTime = Util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      this.setState({
        sysTime
      })
    }, 1000);
  }
  render(){
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}


// src/utils/index
export default {
  formatDate (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    // 如果fmt存在4个'y'字符，则将yyyy替换为：年份；RegExp.$1表示匹配到的第一组数据即yyyy
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      // M==5 ==> 005 ==>05；涉及到的语法：stringObject.substr(start,length)，substr()方法可在字符串中抽取从start下标开始的指定数目的字符。
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }
}
```
- CSS实现三角形[原理以及应用](http://caibaojian.com/css-border-triangle.html)<br><br>


## 百度天气API调用(3-8)
- 为了避免跨域，我们需要安装jsonp
- 安装：yarn add jsonp --save
- 定义请求文件
```js
// axios/index
import JsonP from 'jsonp';
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status == 'success') {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      })
    })
  }
}
```
- 使用百度天气API
```js
// src/components/Header
import React from 'react'
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/index'
import axios from '../../axios'
export default class Header extends React.Component {
  state = {}
  componentWillMount() {
    this.setState({
      userName: 'Zz皓'
    })
    setInterval(() => {
      let sysTime = Util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
      this.setState({
        sysTime
      })
    }, 1000);
    this.getWeatherAPIData()
  }
  getWeatherAPIData() {
    let city = '深圳';
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }
  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            {/* <span className="weather-detail">晴转多云</span> */}
            <span className="weather-img">
              <img src={this.state.dayPictureUrl} />
            </span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
```
<br><br>


## 底部组件实现(3-9)
```js
import React from 'react'
import './index.less'
export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        版权所有：慕课网&河畔一角（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：河畔一角
            </div>
    );
  }
}
```
<br><br>

## Router4.0路由基本介绍
- react-router：提供了一些router的核心API，包括Router，Route，Switch等
- react-router-dom：提供了BrowserRouter，HashRouter，Route，Link，NavLink
- react-router和react-router-dom理解：4.0版本中已不需要路由配置，一切皆组件

### react-router-dom核心用法
- 安装：npm install -S react-router-dom
- HashRouter和BrowserRouter：`http://localhost:3000/#/admin/buttoms`和`http://localhost:3000/admin/buttoms`，前者是HashRouter，后者是BrowserRouter
```js
<BrowserRouter>
  <Switch>
    <Route path='/home' component={Home}></Route>
    <Route path='/category' component={Category}></Route>
    <Route path='/car' component={Car}></Route>
    <Route path='/user' component={User}></Route>
  </Switch>
</BrowserRouter>
```
- Route：path、exact、component、render：第一种用法`<Route path='/home' component={Home}></Route>`，第二种用法`<Route path='/home' render={()=><Admin><Route path='/home' component={Home}></Route></Admin>}></Route>`
- NavLink、Link:
```js
import {Link} from 'react-router-dom';
const Header = ()=>{
  <header>
    <nav>
      <ul>
        <li><Link to='/about'></Link></li>
        <li><Link to='/three'></Link></li>
        <li><Link to={{pathname: '/second/7'}}></Link></li>
      </ul>
    </nav>
  </header>
}
// 最后一个，定义：<Route path="/second/:number" />,那么取值：this.props.match.params.number
```
- Switch
```js
<Switch>
  <Route path='/home' component={Home}></Route>
  <Route path='/category' component={Category}></Route>
  <Route path='/car' component={Car}></Route>
  <Route path='/user' component={User}></Route>
</Switch>
```
- Redirect
```js
// 路由重定向
<Redirect to="/admin/home" />
```

### 4.0基本路由功能Demo实现-混合组件化
```js
import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Main from "./Main";
import About from "./about";
import Topic from "./topic";
export default class Home extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact={true} path="/" component={Main}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topics" component={Topic}></Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
// 注意：Switch中会匹配到第一位匹配项，然后break，因此后面的匹配不执行。
// 所以我们需要在Route中添加精准匹配属性：exact，设置其值为true
```

### 4.0基本路由功能Demo实现-配置化
```js
// router.js
import React from "react";
import { HashRouter as Router, Route, LinK } from "react-router-dom";
import Main from "./Main";
import About from "./../reoute1/about";
import Topic from "./../reoute1/topic";
import Home from "./Home";
export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Route
            path="/main"
            render={() => (
              <Main>
                <Route path="/main/a" component={About}></Route>
              </Main>
            )}
          ></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topics" component={Topic}></Route>
        </Home>
      </Router>
    );
  }
}

// Home.js
import React from "react";
import { Link } from "react-router-dom";
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/main">Home1</Link>
          </li>
          <li>
            <Link to="/about">About1</Link>
          </li>
          <li>
            <Link to="/topics">Topics1</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

// Main.js
import React from "react";
import { Link } from "react-router-dom";
export default class Main extends React.Component {
  render() {
    return (
      <div>
        this is main page.
        <Link to="/main/a">嵌套路由</Link>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
```

### 4.0基本路由功能Demo实现-路由传值
```js
// router.js
import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Main from "./Main";
import Info from "./info";
import About from "./../reoute1/about";
import Topic from "./../reoute1/topic";
import Home from "./Home";
import NoMatch from "./NoMatch";
export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route
              path="/main"
              render={() => (
                <Main>
                  <Route path="/main/:value" component={Info}></Route>
                </Main>
              )}
            ></Route>
            <Route path="/about" component={About}></Route>
            <Route exact={true} path="/about/abc" component={About}></Route>
            <Route path="/topics" component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    );
  }
}

// home.js
import React from "react";
import { Link } from "react-router-dom";
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/main">Home1</Link>
          </li>
          <li>
            <Link to="/about">About1</Link>
          </li>
          <li>
            <Link to="/topics">Topics1</Link>
          </li>
          <li>
            <Link to="/imooc1">imooc1</Link>
          </li>
          <li>
            <Link to="/imooc2">imooc2</Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

// main.js
import React from "react";
import { Link } from "react-router-dom";
export default class Main extends React.Component {
  render() {
    return (
      <div>
        this is main page.
        <br />
        <Link to="/main/test-id">嵌套路由1</Link>
        <br />
        <Link to="/main/456">嵌套路由2</Link>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

// info.js
import React from "react";
export default class Info extends React.Component {
  render() {
    return (
      <div>
        这里是测试动态路由功能。 动态路由的值是：{this.props.match.params.value}
      </div>
    );
  }
}

// NoMatch.js
import React from "react";
export default class Home extends React.Component {
  render() {
    return <div>404 No Pages.</div>;
  }
}
```

## 项目工程化之table动态渲染

### mock数据
- [Yapi](http://yapi.demo.qunar.com/)
- [Yapi使用技巧](https://www.jianshu.com/p/2d5dce8b9c76)
- [easyMock](https://www.easy-mock.com/)
- 定义一份mock数据
```js
{
  "code":0,
  "msg":"success",
  "result":[{
    "id":0,
    "userName":"jack",
    "sex":"1",
    "state":"1",
    "interest":"1",
    "birthday":"2000-01-01",
    "address":"北京市奥林匹克公园",
    "time":"09:00"
  }]
}
```

### Axios封装与调用
- 封装
```js
import axios from "axios";
import { Modal } from "antd";
export default class Axios {
  static ajax(options) {
    let baseApi = "http://yapi.demo.qunar.com/mock/92829";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ""
      }).then(response => {
        if (response.status == "200") {
          let res = response.data;
          if (res.code == "0") {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
```
- 调用
```js
import axios from "./../../axios/index";
// 动态获取mock数据
request = () => {
  let _this = this;
  axios
    .ajax({
      url: "/table/list",
      data: {
        params: {
          page: this.params.page
        }
      }
    })
    .then(res => {
      console.log(res)
    });
};
```

### Loading处理、错误拦截
- 将该段代码放在全局文件index.html中
```html
<div class="ajax-loading" id="ajaxLoading" style="display: none;">
  <div class="overlay"></div>
  <div class="loading">
    <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt="">
    <span>加载中，请稍后...</span>
  </div>
</div>
```
- 定义axios封装文件
```js
import axios from "axios";
import { Modal } from "antd";
export default class Axios {
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    let baseApi = "http://yapi.demo.qunar.com/mock/92829";
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ""
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (response.status == "200") {
          let res = response.data;
          if (res.code == "0") {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
```
- 请求时加载状态的配置
```js
request = () => {
  let _this = this;
  axios
    .ajax({
      url: "/table/list",
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: false // 不显示加载状态
      }
    })
    .then(res => {
      if (res.code == 0) {
        res.result.map((item, index) => {
          item.key = index;
        });
        this.setState({
          dataSource2: res.result,
          selectedRowKeys: [],
          selectedRows: null,
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            this.request();
          })
        });
      }
    });
};
```

## 地图功能实现
- 创建ak，加载百度地图sdk
```js
// 在public文件夹下的index.html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的ak码"></script>
```
- 地图初始化
```js
// orderDetailMap为html代码的DOM节点
renderMap = result => {
  this.map = new window.BMap.Map("orderDetailMap");
  // this.map.centerAndZoom('北京',11);
  // 添加地图控件
  this.addMapControl();
  // 调用路线图绘制方法
  this.drawBikeRoute(result.position_list);
  // 调用服务区绘制方法
  this.drwaServiceArea(result.area);
};
```
- 添加地图控件
```js
// 添加地图控件
addMapControl = () => {
  let map = this.map;
  // 控件设置在右上角位置
  map.addControl(
    new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
  );
  map.addControl(
    new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    })
  );
};
```
- 绘制用户行驶路线
```js
// 绘制用户的行驶路线
drawBikeRoute = positionList => {
  let map = this.map;
  let startPoint = "";
  let endPoint = "";
  if (positionList.length > 0) {
    let first = positionList[0];
    let last = positionList[positionList.length - 1];
    startPoint = new window.BMap.Point(first.lon, first.lat);
    let startIcon = new window.BMap.Icon(
      "/assets/start_point.png",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );

    let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
    this.map.addOverlay(startMarker);

    endPoint = new window.BMap.Point(last.lon, last.lat);
    let endIcon = new window.BMap.Icon(
      "/assets/end_point.png",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
    this.map.addOverlay(endMarker);

    // 连接路线图
    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }

    let polyline = new window.BMap.Polyline(trackPoint, {
      strokeColor: "#1869AD",
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyline);
    this.map.centerAndZoom(endPoint, 11);
  }
};
```
- 绘制服务区地图
```js
// 绘制服务区
drwaServiceArea = positionList => {
  // 连接路线图
  let trackPoint = [];
  for (let i = 0; i < positionList.length; i++) {
    let point = positionList[i];
    trackPoint.push(new window.BMap.Point(point.lon, point.lat));
  }
  // 绘制服务区
  let polygon = new window.BMap.Polygon(trackPoint, {
    strokeColor: "#CE0000",
    strokeWeight: 4,
    strokeOpacity: 1,
    fillColor: "#ff8605",
    fillOpacity: 0.4
  });
  this.map.addOverlay(polygon);
};
```

## 项目工程化
- 能解决什么问题：提高开发效率；降低维护难度；
- 如何解决这些问题：项目架构设计；目录结构定义；制定项目开发规范（ESLint规范）；模块化与组件化；前后端接口规范；性能优化和自动化部署（压缩、合并、打包）

## 项目工程化-包含的内容
- 架构设计
- 目录定义
- 路由封装
- Axios封装
- 错误拦截
- Loading封装
- 表单封装
- 表格封装
- 分页封装
- 组件封装
- 菜单封装
- API封装
- 公共机制方法封装
- 公共样式
- MOCK数据
- NoData封装

## 表单封装
```js
import React, { Component } from "react";
import Utils from "../../utils/index";
import { Card, Button, Form, Select, DatePicker, Input, Checkbox } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
export default class PackageCom extends Component {
  state = {};
  formList = [
    {
      type: "SELECT",
      label: "城市",
      field: "city",
      placeholder: "全部",
      initialValue: "1",
      width: 80,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "天津" },
        { id: "3", name: "上海" }
      ]
    },
    {
      type: "时间查询",
      field: "time",
      placeholder: "请选择时间",
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      initialValue: "1",
      width: 80,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "结束行程" }
      ]
    }
  ];
  formListTwo = [
    {
      type: "INPUT",
      label: "订单ID",
      field: "id",
      placeholder: "请输入订单ID",
      initialValue: "",
      width: 160
    },
    {
      type: "SELECT",
      label: "城市",
      field: "city",
      placeholder: "请选择城市",
      initialValue: "0",
      width: 120,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "天津" },
        { id: "3", name: "上海" },
        { id: "4", name: "广州" }
      ]
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "请选择订单状态",
      initialValue: "0",
      width: 140,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "订单完成" },
        { id: "3", name: "订单取消" }
      ]
    },
    {
      type: "时间查询",
      field: "time",
      placeholder: "请选择时间",
    }   
  ];
  handleFilter = params => {
    this.params = params;
    console.log(params)
  };
  render() {
    return (
      <div>        
        <Card title="初步封装">
          <FilterForm />
        </Card>
        <Card title="进阶封装" style={{ marginTop: 10 }}>
          <FilterFormAdvanced formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card title="进阶封装" style={{ marginTop: 10 }}>
          <FilterFormAdvanced formList={this.formListTwo} filterSubmit={this.handleFilter} />
        </Card>
      </div>
    );
  }
}
// 初步封装搜索栏
class FilterForm extends React.Component {
  reset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city_id")(
            <Select style={{ width: 160 }} placeholder="请选择城市">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator("mode")(
            <Select style={{ width: 180 }} placeholder="请选择用车模式">
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator("op_mode")(
            <Select style={{ width: 180 }} placeholder="请选择营运模式">
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator("auth_status")(
            <Select style={{ width: 180 }} placeholder="请选择授权状态">
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
// 进阶封装搜索栏
class FilterFormAdvanced extends React.Component {
  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  };
  reset = () => {
    this.props.form.resetFields();
  };
  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || "";
        let placeholder = item.placeholder;
        let width = item.width;
        if (item.type == "时间查询") {
          const begin_time = (
            <FormItem label="订单时间" key={field}>
              {getFieldDecorator("begin_time")(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key={i}>
              {getFieldDecorator("end_time")(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          );
          formItemList.push(end_time);
        } else if (item.type == "INPUT") {
          const INPUT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue: initialValue
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type == "SELECT") {
          const SELECT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select showSearch={true} style={{ width: width }} placeholder={placeholder} key={field}>
                  {Utils.getOptionList(item.list)}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type == "CHECKBOX") {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                valuePropName: "checked",
                initialValue: initialValue //true | false
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        }
      });
    }
    return formItemList;
  };
  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button
            type="primary"
            style={{ margin: "0 20px" }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterFormAdvanced = Form.create({})(FilterFormAdvanced);
```

