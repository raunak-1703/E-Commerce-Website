import React, { useEffect, useState } from "react";
import useShop from "../store/shopStore";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const fetchProduct= useShop((state)=>state.fetchProduct)
  const getUserCart = useShop((state)=>state.getUserCart)
  const token = useShop((state)=>state.token)
  const currency = useShop((state) => state.currency);
  const products = useShop((state) => state.products);
  const cart = useShop((state) => state.cart);
  const [cartData, setCartData] = useState([]);
  const getCartCount= useShop((state)=>state.getCartCount)
  const removeFromCart=useShop((state)=>state.removeFromCart)
  const updateQuantity = useShop((state)=>state.updateQuantity)
  useEffect(() => {
    fetchProduct();
    if (token) getUserCart(token); 
  }, [token]);
  useEffect(() => {
    if(products.length>0){
    const tempData = [];
    for (const items in cart) {
      for (const size in cart[items]) {
        if (cart[items][size] > 0) {
          tempData.push({
            _id: items,
            size: size,
            quantity: cart[items][size],
          });
        }
      }
    }
    for (const data of tempData) {
      const product=products.find(item=>item._id===data._id)
      if(product){
        data.name=product.name
        data.price=product.price
        data.image=product.image[0]
      }
    }
    setCartData(tempData)

  }
  }, [cart,products]);
  return  getCartCount()>0? (
    <div className="border-t pt-14 border-gray-200">
      <div className="text-2xl mb-3">
      <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((product,index)=>(
          <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center  gap-4 border-gray-200" key={index}>
            <div className="flex items-start gap-6">
              <img src={product.image} alt="image" className="w-16 sm:w-20"/>
              <div>
                <p className="text-xs sm:text-sm font-medium">{product.name}</p>
                <div className="flex items-center gap-5 mt-2">
                     <p>{currency}{product.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{product.size}</p>
                </div>
              </div>
            </div>
            <input type="number" min={1} defaultValue={product.quantity} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 border-gray-200" onChange={(e)=>updateQuantity(product._id,e.target.value,product.size)}/>
            <img src={assets.bin_icon} alt="removeCarticon" className="w-4 sm:w-5 mr-4 cursor-pointer" onClick={()=>removeFromCart(product._id)}/>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
      <CartTotal/>
      <div  className='flex justify-end w-full'>
        <Link to='/placeorder'> <button className='bg-black text-white px-5 py-3 mt-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
        </Link>
        </div>
      </div>
      
    </div>
  ):(
    <div className="text-center text-2xl font-medium border-t pt-14 border-gray-200 ">CART IS EMPTY🛒</div>
  )
};

export default Cart;
