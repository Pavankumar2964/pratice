import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeddingInvite from './weddingInvite'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeddingInvite />
    </>
  )
}

export default App
