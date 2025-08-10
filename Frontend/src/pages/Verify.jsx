import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useShop, { backendUrl } from '../store/shopStore'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Verify = () => {
    const navigate = useNavigate()
    const setCart = useShop(state=>state.setCart)
    const token = useShop(state=>state.token)
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const verifyPayment = async ()=>{
        try {
            if(!token){
                return null
            }
            else{
                const response =  await axios.post(`${backendUrl}/api/order/verifystripe`,{success,orderId},{headers:{token}})
                if(response.data.success){
                    setCart({})
                    navigate('/orders')
                }
                else{
                    navigate('/cart')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[])
  return (
    <div>
        verify
    </div>
  )
}

export default Verify