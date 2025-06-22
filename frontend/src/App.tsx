import { Route, Routes } from 'react-router'
import './index.css'
import Landing from './pages/Landing'

function App() {


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
