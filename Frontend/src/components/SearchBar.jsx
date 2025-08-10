import React, { useEffect } from "react";
import useShop from "../store/shopStore";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation()
  const search = useShop((state) => state.search);
  const setSearch = useShop((state) => state.setSearch);
  const showSearch = useShop((state) => state.showSearch);
  const setShowSearch = useShop((state) => state.setShowSearch);
  const products = useShop((state)=>state.products)
  useEffect(()=>{
    if(location.pathname!=='/collection'){
        setShowSearch(false)
    }
  },[location.pathname])

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center border-gray-100 flex items-center justify-center">
      <div className="flex items-center gap-2 justify-between px-4 py-2 my-5 mx-auto w-3/4 sm:w-1/2">
        {/* Search input with icon */}
        <div className="flex items-center border border-gray-400 rounded-full px-4 py-2 flex-1 bg-gray-50">
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-gray-50 text-sm flex-1"
            value={search}
            onChange={(e) => setSearch(e)}
          />
          <img src={assets.search_icon} alt="search_icon" className="w-4" />
        </div>

        {/* Cross icon */}
        <img
          src={assets.cross_icon}
          alt="cross_icon"
          className="cursor-pointer w-3"
          onClick={()=>setShowSearch(false)}
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
