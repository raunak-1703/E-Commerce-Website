import React from 'react'
import useShop from '../store/shopStore'
import { Link } from 'react-router-dom';

const ProductItem = ({id,img,name,price}) => {
    const currency = useShop((state)=>state.currency);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition-all ease-in-out' src={img[0]} alt="banner"/>
        </div>
        <p className='pt-3 text-sm pb-1'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem