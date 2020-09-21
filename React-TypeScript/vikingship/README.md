# 组件库开始起航：需求分析(4-1)
完成一个组件库需要考虑的问题
- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成等等<br><br>


# 文件结构和代码规范(4-2)
- 配置ESLint<br><br>


# 样式解决方案分析(4-3)
- Inline CSS
```js
const divstyle = {
  color: "red",
  backgroundImage: 'url(' + imgUrl +')'  
}
function HelloComponent() {
  return <div style={divstyle}>hello world</div>
}
```
- CSS in JS
- Styled Component
- Sass/Less<br><br>


# 做一次设计师：添加自己的色彩体系(4-4)
- 系统色板-基础色版+中性色板
- 产品色板-品牌色+功能色板
- 借鉴网站：[中国色](http://zhongguose.com/)
- 安装Sass：npm install node-sass --save
- 添加色彩：src/styles/_variables.scss(各种变量以及可配置设置)<br><br>


# 更多样式变量：添加字体变量解决方案(4-5)
组件库样式变量分类
- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关<br><br>


# 初次亮相：添加normalize.css(4-6)
- [官网](https://github.com/necolas/normalize.css)
- 项目文件地址：src/styles/_reboot.scss<br><br>


# Button组件需求分析(4-7)
- 不同的type
- 不同的size
- disabled状态<br><br>


# 小试牛刀：Button组件编码第一部分(4-8)
- 安装classnames: npm install classnames --save
- 安装types类型：npm install @types/classnames --save
- 创建Button组件
```js
// src/components/Button/button.tsx
import React from "react";
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode,
  href?: string
}

const Button: React.FC<BaseButtonProps> = (props)=> {
  const {
    btnType,
    disabled,
    size, 
    children,
    href,
  } = props
  // btn,btn-lg,btn-primary
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if(btnType === ButtonType.Link && href) {
    return (
      <a 
        className={classes}
        href={href}>
          {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}>
          {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;
```
- 使用Button组件
```js
// src/App.tsx
import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">bai du</Button>
      </header>
    </div>
  );
}

export default App;
```
<br><br>


# 添加Button基本样式(4-9)
- 主文件
```js
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
- 调用文件
```js
// src/App.tsx
import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App" style={{margin: "20px"}}>
      <header className="App-header">
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello Large</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Hello Small</Button>
        <Button btnType={ButtonType.Danger}>Hello Default</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">bai du</Button>
      </header>
    </div>
  );
}

export default App;
```
- 样式文件
```css
// src/components/Button/_style.scss
.btn {
  position: relative;
  display: inline-block;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  color: $body-color;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: $btn-border-width solid transparent;
  @include button-size( $btn-padding-y,  $btn-padding-x,  $btn-font-size,  $border-radius);
  box-shadow: $btn-box-shadow;
  cursor: pointer;
  transition: $btn-transition;
  &.disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    box-shadow: none;
    > * {
      pointer-events: none;
    }
  }
}
```
- 样式配置文件
```css
// src/styles/index.scss
@import "variables";

@import "reboot";

@import "mixin";

@import "../components/Button/style";
```
<br><br>


# 升级Button组件样式(4-10)
- 定义src/styles/_mixin.scss文件
- 定义scr/components/Button/_style.scss
```css
.btn {
  position: relative;
  display: inline-block;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  color: $body-color;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: $btn-border-width solid transparent;
  @include button-size( $btn-padding-y,  $btn-padding-x,  $btn-font-size,  $border-radius);
  box-shadow: $btn-box-shadow;
  cursor: pointer;
  transition: $btn-transition;
  &.disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    box-shadow: none;
    > * {
      pointer-events: none;
    }
  }
}

.btn-lg {
  @include button-size($btn-padding-y-lg, $btn-padding-x-lg, $btn-font-size-lg, $btn-border-radius-lg);
}
.btn-sm {
  @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $btn-font-size-sm, $btn-border-radius-sm);
}

.btn-primary {
  @include button-style($primary, $primary, $white)
}
.btn-danger {
  @include button-style($danger, $danger, $white)
}

.btn-default {
  @include button-style($white, $gray-400, $body-color, $white, $primary, $primary)
}

.btn-link {
  font-weight: $font-weight-normal;
  color: $btn-link-color;
  text-decoration: $link-decoration;
  box-shadow: none;
  &:hover {
    color: $btn-link-hover-color;
    text-decoration: $link-hover-decoration; 
  }
  &:focus,
  &.focus {
    text-decoration: $link-hover-decoration;
    box-shadow: none;
  }
  &:disabled,
  &.disabled {
    color: $btn-link-disabled-color;
    pointer-events: none;
  }
}
```
<br><br>


# 精益求精：Button组件编码第二部分(4-11)
支持事件以及其他属性的注入
```js
// src/App.tsx
import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
function App() {
  return (
    <div className="App" style={{margin: "20px"}}>
      <header className="App-header">
        <Button disabled style={{marginRight: "20px"}}>Hello</Button>
        <Button onClick={()=>{
          console.log('click事件执行')
        }}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello Large</Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Hello Small</Button>
        <Button btnType={ButtonType.Danger}>Hello Default</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">bai du</Button>
      </header>
    </div>
  );
}
export default App;


// src/components/Button/button.tsx
import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode,
  href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props)=> {
  const {
    btnType,
    className,
    disabled,
    size, 
    children,
    href,
    ...restProps
  } = props
  // btn,btn-lg,btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if(btnType === ButtonType.Link && href) {
    return (
      <a 
        className={classes}
        href={href}
        {...restProps}>
          {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}>
          {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;
```
<br><br>


# 为什么要有测试(5-1)
- 高质量代码
- 更早的发现bug，减少成本
- 让重构和升级变得更加容易和可靠
- 让开发流程更加敏捷

React组件特别适合单元测试，理由如下：
- Component-组件
- Function-函数
- 单向数据流<br><br>


# 通用测试框架jest出场(5-2)
使用jest步骤
- 通过package.json文件可知jest已被安装
- 创建jest.test.js
```js
test('test common matcher', ()=>{
  expect(2+2).toBe(4)
})
```
- 运行：npx jest jest.test.js 或者 npx jest jest.test.js --watch
- 运行npx jest jest.test.js --watch之后继续编写代码
```js
test('test common matcher', ()=>{
  expect(2+2).toBe(4) //2+2等于4
  expect(2+2).not.toBe(5) //2+2不等于5
})

test('test to be true or false', ()=>{
  expect(1).toBeTruthy() //1等于true
  expect(0).toBeFalsy() //0等于false
})

test('test number',()=>{
  expect(4).toBeGreaterThan(3) //4大于3
  expect(2).toBeLessThan(3) //2小于3
})

test('test object',()=>{ //对象属性是否相等
  expect({name: 'viking'}).toEqual({name: 'viking'})
})
```
- 参考资料1：[使用Jest测试JavaScript (入门篇)](https://www.jianshu.com/p/70a4f026a0f1)
- 参考资料2：[Jest中文官方](https://jestjs.io/zh-Hans/)<br><br>


# React测试工具：react-testing-library(5-3)
- [官网测试工具](https://react.docschina.org/docs/test-utils.html)
- 创建测试文件
```js
// src/components/Button/button.test.tsx
import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

test('our first react test case', ()=>{
  const wrapper = render(<Button>Nice</Button>)
  // const element = wrapper.queryByText('abc') // 运行报错
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
})
```
- 运行：npm run test<br><br>


# 添加Button测试代码第一部分(5-4)
- 安装测试工具：npm install @testing-library/jest-dom --save-dev
- 创建文件
```js
// src/components/Button/button.test.tsx
import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

describe('test Button component', ()=>{
  it('should render the correct default button', ()=>{
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument() //是否出现在文档中
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on different props', ()=>{

  })
  it('should render a link when btnType equals link and href is provided',()=>{

  })
  it('should render disabled button when disabled set to true', ()=>{
    
  })
})
```
- 运行：npm run test<br><br>


# 添加Button测试代码第二部分(5-5)
```js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', ()=>{
  it('should render the correct default button', ()=>{
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() //是否出现在文档中
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', ()=>{
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('should render a link when btnType equals link and href is provided',()=>{
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', ()=>{
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
```
<br><br>


# Menu组件需求分析(6-1)
<br><br>


# 基础架构：Menu组件编码第一部分(6-2)
```js
// src/components/Menu/menu.tsx
import React from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void
}

const Menu: React.FC<MenuProps> = (props)=>{
  const { className, mode, style, children, defaultIndex } = props
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu


// src/components/Menu/menuItem.tsx
import React from 'react'
import classNames from 'classnames'

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) =>{
  const {index, disabled, className, style, children} = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
  })
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}
export default MenuItem


// src/App.tsx
import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App" style={{margin: "20px"}}>
      <Menu defaultIndex={0}>
        <MenuItem>link1</MenuItem>
        <MenuItem>link2</MenuItem>
        <MenuItem>link3</MenuItem>
      </Menu>
    </div>
  );
}
export default App;
```
<br><br>


# 需求升级：Menu组件编码第二部分(6-3)
```js
// src/components/Menu/menu.tsx
import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0})
const Menu: React.FC<MenuProps> = (props)=>{
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive?currentActive:0,
    onSelect: handleClick,
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu


// src/components/Menu/menuItem.tsx
import React, { useContext } from 'react'
import classNames from 'classnames'
import Menu, { MenuContext } from './menu'

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) =>{
  const {index, disabled, className, style, children} = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index == index
  })
  const handleClick = ()=>{
    if(context.onSelect && !disabled) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
export default MenuItem


// src/App.tsx
import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App" style={{margin: "20px"}}>
      <Menu defaultIndex={0} onSelect={(index)=>{
        alert(index)
      }}>
        <MenuItem index={0}>link1</MenuItem>
        <MenuItem index={1} disabled>link2</MenuItem>
        <MenuItem index={2}>link3</MenuItem>
      </Menu>
    </div>
  );
}
export default App;
```
<br><br>


# 添加Menu样式(6-4)
<br><br>


# 测试驱动：Menu测试添加(6-5)
```js
// src/components/Menu/menu.tsx
import React, { useState, createContext } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0})
const Menu: React.FC<MenuProps> = (props)=>{
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive?currentActive:0,
    onSelect: handleClick,
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu


// src/components/Menu/menu.test.tsx
import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
const generateMenu = (props: MenuProps)=>{
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        index2
      </MenuItem>
    </Menu>
  )
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe('test Menu and MenuItem conponent', ()=>{
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', ()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should changes active and call the right callback', ()=>{
    const thirdItem = wrapper.getByText('index2')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', ()=>{
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
```
<br><br>


# 日趋完美：Menu组件编码第三部分(6-6)
- src/components/Menu/menu.tsx
```js
import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({index: 0})
const Menu: React.FC<MenuProps> = (props)=>{
  const { className, mode, style, children, defaultIndex, onSelect } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive?currentActive:0,
    onSelect: handleClick,
  }
  const renderChildren = ()=>{
    return React.Children.map(children, (child, index)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.log('Warning: Menu has a child which is not a MenuItem Component')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu
```
- src/components/Menu/menuItem.tsx
```js
import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) =>{
  const {index, disabled, className, style, children} = props
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index == index
  })
  const handleClick = ()=>{
    if(context.onSelect && !disabled && (typeof index === 'number')) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
```
- src/components/Menu/menu.test.tsx
```js
import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
const generateMenu = (props: MenuProps)=>{
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        index2
      </MenuItem>
    </Menu>
  )
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe('test Menu and MenuItem conponent', ()=>{
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', ()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should changes active and call the right callback', ()=>{
    const thirdItem = wrapper.getByText('index2')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', ()=>{
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})
```


