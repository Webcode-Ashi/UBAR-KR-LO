import React from 'react'
import logo from '../assets/uberlogo.png'
const Home = () => {
  return (
    <div className='h-screen pt-5  flex justify-between flex-col bg-red-300 '>
        <img className='w-24 pl-5' src={logo} alt="Uber Logo" />
        <div className='bg-white py-5 px-5'>
            <h2 className='text-2xl whitespace-nowrap font-bold mb-2'>Get Started with Uber</h2>
            <button className='w-full bg-black text-white text-lg py-2 rounded-sm'>Continue</button>
        </div>
    </div>
  )
}

export default Home
