import React, { useEffect, useState } from "react";
import useShop from "../store/shopStore";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const products = useShop((state) => state.products);
  const fetchProduct= useShop((state)=>state.fetchProduct)
  const search = useShop((state) => state.search);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, SetCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sort, setSort] = useState("");
  useEffect(()=>{
    fetchProduct()
  },[products])
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      SetCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      SetCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(() => {
    let filterCopy = [];
    filterCopy = products.filter(product => {
  const matchCategory = category.length === 0 || category.includes(product.category);
  const matchSubCategory = SubCategory.length === 0 || SubCategory.includes(product.subCategory);
  const matchSearch = search.trim() === '' || product.name.toLowerCase().includes(search.toLowerCase());

  return matchCategory && matchSubCategory && matchSearch;
});

    if (sort && sort !== 'relavant') {
      if(sort==='low-high'){
        filterCopy.sort((a,b)=>a.price-b.price)
      }
      else if(sort==='high-low'){
        filterCopy.sort((a,b)=>b.price-a.price)
      }
    }
    
    setFilterProducts(filterCopy)
  }, [category, SubCategory,sort,products,search,products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200">
      {/* Left side */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS{" "}
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={(e) => toggleCategory(e)}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={(e) => toggleCategory(e)}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={(e) => toggleCategory(e)}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={(e) => toggleSubCategory(e)}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product sorting  */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="relavant">Sort by:Relevent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>
        {/* All products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product, index) => (
            <ProductItem
              key={index}
              name={product.name}
              id={product._id}
              price={product.price}
              img={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
