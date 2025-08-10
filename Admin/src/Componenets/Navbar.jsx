import React from 'react'
import {assets} from '../assets/assets.js'
const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%]'>
        <img src={assets.logo} alt="logo" className='w-[max(10%,80px)]' />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer' onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar