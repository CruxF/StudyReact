# React简介和基础知识回顾(3-1)
- 课程：[基于实例的 React16 傻瓜课程](https://www.imooc.com/learn/1045)
- 笔记：[慕课网React](https://github.com/CruxF/IMOOC/tree/master/React)<br><br>


# 配置React开发环境(3-2)
**步骤一：** npx create-react-app 项目名 --typescript<br>
- npx的优点：避免安装全局模块；调用项目内部安装的模块；

**步骤二：** npm start或yarn start<br><br>


# 第一个组件-ts为组件助力(3-3)
- 普通
```js
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';

ReactDOM.render(
  <React.StrictMode>
    <Hello message={"Hello React"} />
  </React.StrictMode>,
  document.getElementById('root')
);


// src/components/Hello.tsx
import React from 'react'
interface IHelloProps {
  message: String
}

const Hello = (porps: IHelloProps) => {
  return <h2>{porps.message}</h2>
}
export default Hello
```
- 进阶
```js
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';
ReactDOM.render(
  <React.StrictMode>
    <Hello message={"Hello React"} />
  </React.StrictMode>,
  document.getElementById('root')
);


// src/components/Hello.tsx
import React from 'react'
interface IHelloProps {
  message?: String //外部不传message则使用默认值
}
const Hello: React.FC<IHelloProps> = (porps) => {
  console.log(porps.children)
  return <h2>{porps.message}</h2>
}
Hello.defaultProps = {
  message: "我是默认值"
}
export default Hello
```
<br><br>


# 什么是ReactHook和为什么要使用ReactHook(3-4)
- ReactHook是React16.8带来的全新特性，即将替代class组件的写法。对原先的class组件写法没有破坏性改动，可选且百分百向后兼容。
- 解决的痛点：1、组件难以复用状态逻辑；2、复杂组件难以理解，尤其是生命周期函数
- React组件一直是函数，使用Hook完全拥抱函数<br><br>


# 在函数组件使用state-useStateHook(3-5)
- Hook的概念
- 什么时候会用useStateHook？
- 使用1
```js
// src/components/LikeButton.tsx
import React, { useState } from 'react'
const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  return (
    <button onClick={()=>{
      setLike(like + 1)
    }}>
      点赞数{like}
    </button>
  )
}
export default LikeButton
```
- 使用2
```js
// src/components/LikeButton.tsx
import React, { useState } from 'react'
const LikeButton: React.FC = ()=> {
  const [obj, setObj] = useState({like:0, on:true})
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setObj({like: obj.like + 1, on: obj.on})
      }}>
        点赞数{obj.like}
      </button>
      <button onClick={()=>{
        setObj({like: obj.like, on: !obj.on})
      }}>
        {obj.on?'ON':'OFF'}
      </button>
    </>
  )
}
export default LikeButton
```
- 使用3
```js
// src/components/LikeButton.tsx
import React, { useState } from 'react'
const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1)
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        setOn(!on)
      }}>
        {on?'ON':'OFF'}
      </button>
    </>
  )
}
export default LikeButton
```
<br><br>


# useEffect第一部分-初出茅庐(3-6)
- 1、无需清除的Effect。栗子：使用useEffect操作DOM完成标题更新
```js
// src/components/LikeButton.tsx
import React, { useState, useEffect } from 'react'
const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  useEffect(()=>{
    document.title = `点击了${like}次`
  })
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1)
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        setOn(!on)
      }}>
        {on?'ON':'OFF'}
      </button>
    </>
  )
}
export default LikeButton
```
<br><br>


# useEffect第二部分-有始有终(3-7)
- 1、需要清除的Effect。栗子：使用useEffect完成一个鼠标跟踪器
- 使用1(未清除Effect)
```js
// src/components/MouseTracker.tsx
import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
  const [positons, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("click", updateMouse);
  });
  return (
    <p>
      X:{positons.x},Y:{positons.y}
    </p>
  );
};
export default MouseTracker;
```
- 使用2(清除Effect)
```js
import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
  const [positons, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("click", updateMouse);
    // 清除effect
    return ()=> {       
      document.removeEventListener('click', updateMouse)
    }
  });
  return (
    <p>
      X:{positons.x},Y:{positons.y}
    </p>
  );
};
export default MouseTracker;
```
- 使用3
```js
import React, { useState, useEffect } from "react";

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log('add effect', positions.x)
    const updateMouse = (e: MouseEvent) => {
      console.log('inner')
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("click", updateMouse);
    // 清除effect
    return ()=> {
      console.log('remove effect', positions.x)
      document.removeEventListener('click', updateMouse)
    }
  });
  console.log('before render', positions.x)
  return (
    <p>
      X:{positions.x},Y:{positions.y}
    </p>
  );
};
export default MouseTracker;
```
<br><br>


# useEffect第三部分-控制运行(3-8)
```js
// src/components/LikeButton.tsx
import React, { useState, useEffect } from 'react'
const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1)
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        setOn(!on)
      }}>
        {on?'ON':'OFF'}
      </button>
    </>
  )
}
export default LikeButton
```
<br><br>


# 自定义Hook-重构MouseTracker(3-9)
- 将组件逻辑提取到可重用的函数中
- 创建一个hook
```js
// src/hooks/useMousePosition
import React, { useState, useEffect } from "react";

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log("add effect", positions.x);
    const updateMouse = (e: MouseEvent) => {
      setPositions({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", updateMouse);
    // 清除effect
    return () => {
      console.log("remove effect", positions.x);
      document.removeEventListener("mousemove", updateMouse);
    };
  }, []);
  return positions;
};
export default useMousePosition;
```
- 使用自定义hook
```js
// src/components/Admin
import React, { useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import LikeButton from './LikeButton'

const Admin: React.FC = ()=>{
  const positions= useMousePosition()
  return (
    <div>
      <h2>admin pages</h2>
      <p>X:{positions.x},Y:{positions.y}</p>
      <hr />
      <LikeButton />
    </div>
  )
}
export default Admin


// src/components/LikeButton
import React, { useState, useEffect } from 'react'
import useMousePosition from '../hooks/useMousePosition'

const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const [on, setOn] = useState(true)
  const positions = useMousePosition()
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1)
      }}>
        点赞数{like}
      </button>
      <button style={{marginRight: 10}} onClick={()=>{
        setOn(!on)
      }}>
        {on?'ON':'OFF'}
      </button>
      <button>位置X：{positions.x}, 位置Y：{positions.y}</button>
    </>
  )
}
export default LikeButton
```
<br><br>


# 自定义Hook第二部分-HOC的劣势(3-10)
- HOC：高阶组件，它是一个函数，接受一个组件作为参数，返回一个新的组件
- 安装axios：npm install axios --save-dev
- 创建一个高阶组件
```js
// src/components/withLoader.tsx
import React from 'react'
import axios from 'axios'
interface ILoaderState {
  data: any,
  isLoading: boolean
}
interface ILoaderProps {
  data: any,
}
const withLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false
      }
    }
    componentDidMount() {
      this.setState({
        isLoading: true,
      })
      axios.get(url).then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        })
      })
    }
    render() {
      const { data, isLoading } = this.state
      return (
        <>
          { (isLoading || !data) ? <p>data is loading</p> :
            <WrappedComponent {...this.props as P} data={data} />
          }
        </>
      )
    }
  }
}
export default withLoader
```
- 使用高阶组件
```js
// src/components/Admin.tsx
import React from 'react'
import withLoader from './withLoader'

interface IShowResult {
  message: string,
  status: string
}
const DogShow: React.FC<{data: IShowResult}> = ({data})=>{
  return (
    <>
      <h2>Dog show: {data.status}</h2>
      <img style={{height: "400px", width: "600px"}} src={data.message}></img>
    </>
  )
}
const Admin: React.FC = ()=>{
  const WrappedDogShow = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  return (
    <div>
      <WrappedDogShow />
    </div>
  )
}
export default Admin
```
<br><br>


# 自定义Hook第三部分-正确的方式完成URLLoader(3-11)
- 定义一个hook
```js
// src/hooks/useURLLoader.tsx
import { useState, useEffect } from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then(result => {
      setData(result.data)
      setLoading(false)
    })
  }, deps)
  return [data, loading]
}

export default useURLLoader
```
- 使用hook
```js
// src/components/Admin.tsx
import React, { useState } from 'react'
import useURLLoader from '../hooks/useURLLoader'

interface IShowResult {
  message: string,
  status: string
}
const Admin: React.FC = ()=>{
  const [show, setShow] = useState(true)
  const [ data, loading ] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const dogResult = data as IShowResult
  return (
    <div>
      <div>
        <h2>数据请求</h2>
        <button onClick={()=>{
          setShow(!show)
        }}>更换狗狗</button>
      </div>
      {loading?'狗狗读取ing'
      :<img style={{height: "300px",width:"400px"}} src={dogResult && dogResult.message} />}
    </div>
  )
}
export default Admin
```
<br><br>


# useRef产生的原因：state遇到的难题(3-12)
```js
// src/components/LikeButton.tsx
import React, { useState, useEffect } from 'react'

const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行

  function handleAlertClick() {
    setTimeout(() => {
      // 只会输出最初的like值，不会输出在这期间更新后的like值
      alert('you click on ' + like)
    }, 3000);
  }
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1)
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        handleAlertClick()
      }}>alert click!</button>
    </>
  )
}
export default LikeButton
```
<br><br>


# useRef:多次渲染之间的纽带(3-13)
- 使用1
```js
import React, { useState, useEffect, useRef } from 'react'

const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  function handleAlertClick() {
    setTimeout(() => {
      // 输出最终值
      alert('you click on ' + likeRef.current)
      // 输出最初始那个值
      console.log(like)
    }, 3000);
  }
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1);
        likeRef.current++
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        handleAlertClick()
      }}>alert click!</button>
    </>
  )
}
export default LikeButton
```
- 使用2
```js
import React, { useState, useEffect, useRef } from 'react'

const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const didMountRef = useRef(false)
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  useEffect(()=>{
    if(didMountRef.current) {
      console.log('this.is updated')
    } else {
      didMountRef.current = true
    }
  })
  function handleAlertClick() {
    setTimeout(() => {
      // 输出最终值
      alert('you click on ' + likeRef.current)
      // 输出最初始那个值
      console.log(like)
    }, 3000);
  }
  return (
    <>
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1);
        likeRef.current++
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        handleAlertClick()
      }}>alert click!</button>
    </>
  )
}
export default LikeButton
```
- 使用3
```js
import React, { useState, useEffect, useRef } from 'react'

const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  useEffect(()=>{
    if(didMountRef.current) {
      console.log('this.is updated')
    } else {
      didMountRef.current = true
    }
  }) 
  useEffect(()=>{
    console.log(domRef)
    if(domRef && domRef.current) {
      domRef.current.focus()
    }
  })
  function handleAlertClick() {
    setTimeout(() => {
      // 输出最终值
      alert('you click on ' + likeRef.current)
      // 输出最初始那个值
      console.log(like)
    }, 3000);
  }
  return (
    <>
      <input type="text" ref={domRef} />
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1);
        likeRef.current++
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        handleAlertClick()
      }}>alert click!</button>
    </>
  )
}
export default LikeButton
```
<br><br>


# useContext: 解决多层传递属性的灵丹妙药(3-14)
- 定义Context
```js
// src/components/Admin.tsx
import React from 'react'
import LikeButton from './LikeButton'
import Hello from './Hello'

interface IThemeProps {
  [key: string]: {color: string; background: string}
}
const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}
export const ThemeContext = React.createContext(themes.light)

const Admin: React.FC = ()=>{
  return (
    <div>
      <ThemeContext.Provider value={themes.light}>
        <div style={{height: "400px", width: "100vw"}}>
          <LikeButton />
          <Hello />
        </div>
      </ThemeContext.Provider>
    </div>
  )
}

export default Admin
```
- 传递属性
```js
// src/components/Hello
import React, { useContext } from 'react'
import { ThemeContext } from './Admin'
interface IHelloProps {
  message?: String //外部不传message则使用默认值
}
const Hello: React.FC<IHelloProps> = (porps) => {
  const theme = useContext(ThemeContext)
  console.log('hello组件：'+theme)
  const comstyle = {
    background: theme.background,
    color: theme.color,
    height: "200px"
  }
  console.log(porps.children)
  return <h2 style={comstyle}>{porps.message}</h2>
}
Hello.defaultProps = {
  message: "我是默认值"
}
export default Hello


// src/components/LikeButton
import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './Admin'
const LikeButton: React.FC = ()=> {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)
  const theme = useContext(ThemeContext)
  console.log(theme)
  const comstyle = {
    background: theme.background,
    color: theme.color,
    height: '200px'
  }
  useEffect(()=>{
    console.log('runing!')
    document.title = `点击了${like}次`
  }, [like]) //只有like属性变化的时候才执行，[like, on]表示这两个属性变化时都会执行
  useEffect(()=>{
    if(didMountRef.current) {
      console.log('this.is updated')
    } else {
      didMountRef.current = true
    }
  }) 
  useEffect(()=>{
    console.log(domRef)
    if(domRef && domRef.current) {
      domRef.current.focus()
    }
  })
  function handleAlertClick() {
    setTimeout(() => {
      // 输出最终值
      alert('you click on ' + likeRef.current)
      // 输出最初始那个值
      console.log(like)
    }, 3000);
  }
  return (
    <div style={comstyle}>
      <input type="text" ref={domRef} />
      <button style={{marginRight: 10}} onClick={()=>{
        setLike(like + 1);
        likeRef.current++
      }}>
        点赞数{like}
      </button>
      <button onClick={()=>{
        handleAlertClick()
      }}>alert click!</button>
    </div>
  )
}
export default LikeButton
```
<br><br>


# Hook规则和其他Hook(3-15)
- 只在最顶层使用Hook
- 只在React函数中调用Hook
<br><br>








