import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import webComp from 'src./components/webComp.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <webComp />
    </>
  )
}

export default App;
