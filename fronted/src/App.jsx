import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from './pages/Userlogin'
import Usersignup from './pages/Usersignup'
import Captionlogin from './pages/Captionlogin'
import Captionsignup from './pages/Captionsignup'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/userlogin' element={<Userlogin />} />
        <Route path='/usersignup' element={<Usersignup />} />
        <Route path='/captionlogin' element={<Captionlogin />} />
        <Route path='/captionsignup' element={<Captionsignup />} />
      </Routes>
    </div>
  )
}

export default App