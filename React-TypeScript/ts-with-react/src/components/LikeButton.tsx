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