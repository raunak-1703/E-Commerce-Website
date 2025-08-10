import React, { useEffect, useState } from 'react'
import useShop from '../store/shopStore'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category,subCategory}) => {
    const products = useShop((state=>state.products))
    const fetchProduct  = useShop((state)=>state.fetchProduct)
    const [related,setRelated] = useState([])
    useEffect(()=>{
        fetchProduct()
        if(products.length>0){
            let productsCopy = [...products]
            productsCopy= productsCopy.filter((product)=>category===product.category)
            productsCopy= productsCopy.filter((product)=>subCategory===product.subCategory)
            setRelated(productsCopy.slice(0,5));
        }
    },[products])
  return (
    <div className='mt-24'>
        <div className='flex justify-center text-3xl py-2 w-[100%]'> <Title text1={'RELATED'} text2={'PRODUCTS'}/></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((product,index)=>(
                <ProductItem key={index} id={product._id} name={product.name} price={product.price} img={product.image}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts