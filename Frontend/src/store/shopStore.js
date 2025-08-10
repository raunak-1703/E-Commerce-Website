import { create } from "zustand";
import { toast } from "react-toastify";
import axios from 'axios'
export const backendUrl=import.meta.env.VITE_BACKEND_URL
const useShop = create((set, get) => ({
  token: localStorage.getItem("token") || "",
  setToken:(token)=>{
    set({token})
  },
  products:[],
  fetchProduct:async()=>{
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      // console.log(response)
      if(response.data.success){
        // console.log(response.data)
        set({products:response.data.products})
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  },
  currency: "₹",
  delivery_fee: 10,
  search: "",
  setSearch: (e) => set({ search: e.target.value }),
  showSearch: false,
  setShowSearch: (value) => set((state) => ({ showSearch: value })),
  cart: {},
  setCart: (cartData) => set({ cart: cartData }),
  addToCart: async (productId, size) => {
    if (!size) {
      toast.error("Select Product size");
      return;
    }
    const cart = get().cart;
    let cartData = structuredClone(cart);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    get().setCart(cartData);
    if(get().token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`,{itemId:productId,size},{headers:{token:get().token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  },
  getCartCount: () => {
    const cart = get().cart;
    let totalCount = 0;
    for (const key in cart) {
      for (const keys in cart[key]) {
        totalCount += Number(cart[key][keys]);
      }
    }
    
    return totalCount;
  },
  removeFromCart: async (productId) => {
    const cart = get().cart;
    if (cart[productId]) {
      delete cart[productId];
    }
    set({ cart: { ...cart } });
    if(get().token||localStorage.getItem('token')){
      try {
        console.log('API HIT')
        const response =await axios.post(`${backendUrl}/api/cart/delete`,{itemId:productId},{headers:{token:get().token}})
        console.log(response)
        console.log(get().cart)
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  },
  updateQuantity: async (productId, quantity, size) => {
    const cart = get().cart;
    cart[productId][size] = Number(quantity);
    set({ cart: { ...cart } });
    if(get().token){
      try {
        await axios.post(`${backendUrl}/api/cart/update`,{itemId:productId,size,quantity},{headers:{token:get().token}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  },
  getCartAmount:  () => {
    const delivery_fee=get().delivery_fee
    let price = 0;
    const products = get().products;
    const cart = get().cart;
    for (const item in cart) {
      const findProduct = products.find((items) => items._id === item);
      for (const size in cart[item]) {
        if (findProduct) {
          price += findProduct.price * cart[item][size];
        }
      }
    }
    return price+delivery_fee;
  },
  getUserCart:async(token)=>{
    try {

      const response = await axios.post(`${backendUrl}/api/cart/get`,{},{headers:{token}})
      if(response.data.success){
       
        get().setCart(response.data.CartData)
        
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
}));
export default useShop;
