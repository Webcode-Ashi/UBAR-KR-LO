import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/uberdriver.png'

const Captainsignup = () => {
    const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [firstname, setFirstname] = useState('')
     const [lastname, setLastname] = useState('')
     const [userdata, setuserdata] = useState({})
     const handleSubmit = (e) => {
       e.preventDefault()
       setuserdata({
         fullname:{
           firstname:firstname,
           lastname:lastname
         },
         email:email,
         password:password
       })
       console.log(userdata);
       
       setEmail('')
       setPassword('')
       setFirstname('')
       setLastname('')
       console.log({ email, password, firstname, lastname })
     }
  return (
       <div className='p-7 flex flex-col  justify-between h-screen'>
     <div >
          <img className='w-20 mb-5' src={logo} alt="Uber Logo" />
      <form onSubmit={handleSubmit}>
          <h3 className='text-base font-bold mb-4'>What's our Captain's name?</h3>
        <div className='flex gap-4 mb-2'>
          < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-500' type="text" 
          value={firstname} onChange={(e) => setFirstname(e.target.value)}
      placeholder='First Name' required />
      < input className='border border-gray-300 bg-[#eeeeee] rounded py-2 text-lg placeholder:text-md px-3 w-1/2 focus:outline-none focus:ring-2 focus:ring-gray-500' type="text" 
      value={lastname} onChange={(e) => setLastname(e.target.value)}
      placeholder='Last Name' required />
         </div>
        <h3 className='text-base font-bold mb-4'>What's our Captain's email?</h3>
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
       <button className='bg-black w-full text-white font-semibold text-xl py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500' type='submit'>Sign Up</button>
      </form>
      <p className='text-center mt-2 text-md font-medium'>Already have an account?  <Link to="/captainlogin" className=' text-[#d5622d] hover:underline'>Login Here</Link></p>
     </div>
     <div>
      <p className='text-justify leading-tight text-xs text-gray-600'>This site is protected by reCAPTCHA and the <span className='text-[#d5622d]'> Google Privacy Policy</span> and Terms of Service apply.</p>
     </div>
    </div>
  )
}

export default Captainsignup