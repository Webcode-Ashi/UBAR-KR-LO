import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {userDataContext} from '../Context/UserContext'
import axios from 'axios'
import logo from '../assets/uberlogo.png'
const Usersignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  
  const navigate = useNavigate()
  const {user,setUser} =useContext(userDataContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
   const newUser = {
     fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password
    }
   
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    
    if(response.status === 201){
      const data = response.data
      
      setUser(data.user)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
   
  }
  return (
     <div className='p-7 flex flex-col  justify-between h-screen'>
     <div >
          <img className='w-20 mb-5' src={logo} alt="Uber Logo" />
      <form onSubmit={handleSubmit}>
         <h3 className='text-base font-bold mb-4'>What's your  name?</h3>
         <div className='flex gap-4 mb-2'>
          < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-500' type="text" 
          value={firstname} onChange={(e) => setFirstname(e.target.value)}
      placeholder='First Name' required />
      < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-500' type="text" 
      value={lastname} onChange={(e) => setLastname(e.target.value)}
      placeholder='Last Name' required />
         </div>
        <h3 className='text-base font-bold mb-4'>What's your  email?</h3>
       < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500' type="email" 
        value={email} onChange={(e) => setEmail(e.target.value)}
      placeholder='email@example.com' required />
       <br/>
       <br/>
       <label className=' text-base font-bold mb-2'>Enter your Password</label>
       <br/>
       <br/>
       < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-500' type="password" 
       value={password} onChange={(e) => setPassword(e.target.value)}
       placeholder='Password' required />
       <br/>
       <br/>
       <button className='bg-black w-full text-white font-semibold text-xl py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500' type='submit'>Create Account</button>
      </form>
      <p className='text-center mt-2 text-md font-medium'>Already have an account? <Link to="/userlogin" className=' text-[#2596be] hover:underline'>Login here</Link></p> 
     </div>
     <div>
      <p className='text-justify leading-tight text-xs text-gray-600'>By proceeding, you consent to get calls,WhatsApp or SMS messages, including by automated means, from Uber and Its affiliates to the phone number provided.</p>
     </div>
    </div>
  )
}

export default Usersignup