import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useShop, { backendUrl } from "../store/shopStore";
import axios from "axios";
const PlaceOrder = () => {
  const token = useShop(state=>state.token)
  const cart = useShop(state=>state.cart)
  const setCart = useShop(state=>state.setCart)
  const getCartAmount = useShop(state=>state.getCartAmount)
  const delivery_fee = useShop(state=>state.delivery_fee)
  const currency= useShop(state=>state.currency) 
  const products = useShop(state=>state.products)
  const navigate = useNavigate();
  const [methods, setMethods] = useState("COD");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = []
      for (const items in cart) {
          for (const item in cart[items]) {
          if(cart[items][item]>0){
            const itemInfo = structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity= cart[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:Number(getCartAmount())+Number(delivery_fee)
      }
      
      switch(methods){
        case 'COD':{
          const response = await axios.post(`${backendUrl}/api/order/cod`,orderData,{headers:{token}})
          if(response.data.success){
            setCart({})
            toast.success(response.data.message)
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;
        }
        case 'stripe':{
          const response = await axios.post(`${backendUrl}/api/order/stripe`,orderData,{headers:{token}})
          console.log(response)
          if(response.data.success){
            const {session_url} = response.data
            console.log(session_url)
            window.location.replace(session_url)
          }
          else{
            toast.error(response.data.message)
          }
          break;
        }
        case 'razorpay':{
          toast.success('Razorpay is currently not available')
          return null
        }
        default:{
          break
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200"
    >
      {/* Forms */}
      <div className="flex flex-col w-full sm:max-w-[480px] gap-4">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* CART DETAILS AND PAYMENT METHOD */}
      <div className="flex flex-col w-full sm:max-w-[480px] gap-4">
        <CartTotal />
        <div className="mt-5">
          <Title text1="PAYMENT" text2="METHODS" />
          <div className="flex flex-col sm:flex-row gap-2">
            <div
              className="border border-gray-200 p-2 flex gap-4 items-center cursor-pointer"
              onClick={() => setMethods("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border border-gray-200 ${
                  methods === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="stripe" className="h-5" />
            </div>
            <div
              className="border border-gray-200 p-2 flex gap-4 cursor-pointer items-center"
              onClick={() => setMethods("razorpay")}
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border border-gray-200 ${
                  methods === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="razorpay" className="h-5" />
            </div>
            <div
              className="border border-gray-200 p-2 flex gap-4 items-center cursor-pointer flex-1"
              onClick={() => setMethods("COD")}
            >
              <p
                className={`min-w-3.5 h-3.5 rounded-full border border-gray-200 ${
                  methods === "COD" ? "bg-green-500" : ""
                }`}
              ></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-black text-white px-16 py-3 mt-4 cursor-pointer"
              type="submit"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
