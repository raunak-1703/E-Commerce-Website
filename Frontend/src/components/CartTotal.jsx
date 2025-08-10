import React, { useEffect, useState } from 'react'
import useShop from '../store/shopStore'
import Title from './Title'
import { Link } from 'react-router-dom'

const CartTotal = () => {
  const getCartAmount = useShop((state) => state.getCartAmount)
  const delivery_fee = useShop((state) => state.delivery_fee)
  const currency = useShop((state) => state.currency)
  const cart = useShop((state)=>state.cart)
  const getUserCart = useShop((state)=>state.getUserCart)
  const [amount, setAmount] = useState(0)
  const token = useShop(state=>state.token)
 useEffect(() => {
  const fetchAmount = async () => {
    await getUserCart(token)  
    const value = getCartAmount()
    setAmount(value)
  }
  fetchAmount()
}, [cart])



  return (
    <div className='flex mt-20 '>
      <div className='flex-1'>
        <div className='text-2xl mb-5'>
          <Title text1='CART' text2='TOTALS' />
        </div>
        <div className='flex flex-col gap-3 items-end w-full '>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 w-full">
            <p>Subtotal</p>
            <p>{currency}{amount - delivery_fee}.00</p>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 w-full">
            <p>Shipping fee</p>
            <p>{currency}{delivery_fee}.00</p>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 w-full">
            <p className='font-bold'>Total</p>
            <p>{currency}{amount}.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
