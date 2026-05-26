import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/uberlogo.png'
const Userlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userdata, setuserdata] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
   console.log({email,password})
   setuserdata({
    email:email,
    password:password
   })
    setEmail('')
    setPassword('')

  }
  return (
    <div className='p-7 flex flex-col  justify-between h-screen'>
     <div >
          <img className='w-20 mb-5' src={logo} alt="Uber Logo" />
      <form onSubmit={handleSubmit}>
        <h3 className='text-base font-bold mb-4'>What's your  email?</h3>
       < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500' type="email" 
       value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' required />
       <br/>
       <br/>
       <label className=' text-base font-bold mb-2'>Enter your Password</label>
       <br/>
       <br/>
       < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500' type="password" 
       value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
       <br/>
       <br/>
       <button className='bg-black w-full text-white font-semibold text-xl py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500' type='submit'>Login</button>
      </form>
      <p className='text-center mt-2 text-md font-medium'>New here? <Link to="/usersignup" className=' text-[#2596be] hover:underline'>Create new Account</Link></p>
     </div>
     <div>
      <Link to="/captainlogin" className='bg-[#2596be] flex items-center justify-center w-full text-white font-semibold text-xl py-2 px-4 rounded-md hover:bg-[#1E81B0] focus:outline-none focus:ring-2  mt-5'>Sign in as Captain</Link>
     </div>
    </div>
  )
}

export default Userlogin