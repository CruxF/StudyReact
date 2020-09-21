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