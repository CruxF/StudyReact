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