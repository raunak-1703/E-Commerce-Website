import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useShop from "../store/shopStore.js";
const Navbar = () => {
  const token = useShop((state)=>state.token)
  const setToken = useShop((state)=>state.setToken)
  const cart = useShop((state) => state.cart);
  const setCart= useShop((state)=>state.setCart)
  const [visible, setVisible] = useState(false);
  const setShowSearch = useShop((state) => state.setShowSearch);
  const navigate = useNavigate();
  const getCartCount = useShop((state) => state.getCartCount);
  let cartTotal = getCartCount();
  useEffect(()=>{
    cartTotal=getCartCount()
  },[cart])
  const clickHandler = () => {
    navigate("/collection");
    setShowSearch(true);
  };
  const RedirectLogic = ()=>{
    if(token){
      setToken('')
      localStorage.removeItem("token");
      setCart({})
      navigate('/login')
    }
    else{
      navigate('/login')
    }
  }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="cursor-pointer w-5"
          onClick={clickHandler}
        />
        <div className="group relative">
          <Link to={token?'/':'/login'}>
          <img
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
          />
          </Link>
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col w-36 gap-2 px-5 py-3 bg-slate-100 text-gray-500 rounded">
              {token!==''&&<p className="cursor-pointer hover:text-black">My Profile</p>}
              {token!==''&&<p className="cursor-pointer hover:text-black" onClick={()=>navigate('/orders')}>Orders</p>}
              <p className="cursor-pointer hover:text-black" onClick={RedirectLogic}>{token?'Logout':'Login'}</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart_icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white h-4 rounded-full flex items-center justify-center text-xs">
            {cartTotal}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180 cursor-pointer"
            />
            <p className="cursor-pointer">Back</p>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6 border-b mb-1"
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className="py-2 pl-6 border-b mb-1"
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className="py-2 pl-6 border-b mb-1"
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 pl-6 border-b mb-1"
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
