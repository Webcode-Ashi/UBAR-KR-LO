import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import { useContext } from 'react'
import { userDataContext } from './Context/UserContext'
const App = () => {

  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userlogin' element={<Userlogin />} />
        <Route path='/usersignup' element={<Usersignup />} />
        <Route path='/captainlogin' element={<Captainlogin />} />
        <Route path='/captainsignup' element={<Captainsignup />} />
      </Routes>
    </div>
  )
}

export default App