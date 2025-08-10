import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = ({setToken}) => {
    const navigate =   useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
const submitHandller  = async (e)=>{
    try {
        e.preventDefault()
        const response =await axios.post(`${backendUrl}/api/auth/admin`,{email,password})
        if(response.data.success){
            setToken(response.data.token)
            navigate('/add')
        }
        else{
            toast.error(response.data.message)
        }
        console.log(response)
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
}
  return (
    <div className='flex min-h-screen items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md '>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={(e)=>submitHandller(e)}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input type="email" placeholder='your@email.com'  required   className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input type="password" placeholder='Enter your password' required   className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer'>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login