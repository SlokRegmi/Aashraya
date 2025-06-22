import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <div>
          <Routes>
            <Route element={<Landing/>} path='/'/>
          </Routes>

        </div>
       
    </>
  )
}

export default App
