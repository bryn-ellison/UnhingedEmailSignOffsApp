import { useState } from 'react'
import './App.css'
import SignOff from './SignOff'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SignOff />
      </div>
    </>
  )
}

export default App
