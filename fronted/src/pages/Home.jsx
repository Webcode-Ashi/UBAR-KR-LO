import React from 'react'
import logo from '../assets/uberlogo.png'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-cover bg-center bg-[url("/src/assets/trafficlight.avif")] h-screen pt-5  flex justify-between flex-col '>
        <img className='w-24 pl-5' src={logo} alt="Uber Logo" />
        <div className='bg-white py-5 px-5'>
            <h2 className='text-2xl pb-4 whitespace-nowrap font-bold mb-2'>Get Started with Uber</h2>
            <Link to="/userlogin" className='flex items-center justify-center w-full bg-black text-white text-lg py-2 rounded-sm text-center'>Continue</Link>
        </div>
    </div>
  )
}

export default Home
