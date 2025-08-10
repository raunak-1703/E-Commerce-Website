import React, { useEffect, useState } from 'react'
import useShop from '../store/shopStore'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const products = useShop((state)=>state.products)
    const fetchProduct  = useShop((state)=>state.fetchProduct)
    const [latestProducts,setLatestProducts] = useState([]);
    useEffect(()=>{
      fetchProduct()
      setLatestProducts(products.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1='LATEST' text2='COLLECTION'/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem illo quae harum assumenda quos corrupti exercitationem, beatae veniam facilis earum?
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((product,index)=>(<ProductItem key={index} id={product._id} img={product.image} name={product.name} price={product.price}/>))}
        </div>
    </div>
  )
}
// id,img,name,price

export default LatestCollection