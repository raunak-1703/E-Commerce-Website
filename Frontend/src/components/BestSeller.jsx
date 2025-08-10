import React, { useEffect, useState } from "react";
import useShop from "../store/shopStore";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const products = useShop((state) => state.products);
  const fetchProduct = useShop(state=>state.fetchProduct)
  const [bestSeller, setBestSeller] = useState([]);
 useEffect(() => {
  fetchProduct()
}, []);

  useEffect(() => {
    const bestProducts = products.filter(
      (product) => product.bestseller === true
    );
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem illo
          quae harum assumenda quos corrupti exercitationem, beatae veniam
          facilis earum?
        </p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((product,index)=>(<ProductItem key={index} id={product._id} img={product.image} name={product.name} price={product.price}/>))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
