import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShop from "../store/shopStore";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Products = () => {
  const { productId } = useParams();
  const cart = useShop((state)=>state.cart)
  const addToCart = useShop((state) => state.addToCart);
  const products = useShop((state) => state.products);
  const currency = useShop((state) => state.currency);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const myProduct = products.filter((product) => product._id === productId);
    setSelectedProduct(myProduct);
    setImage(myProduct[0].image[0]);
  }, [products, productId]);

  return selectedProduct ? (
    <div className="border-t-2 pt-10 transition-opacity ease in duration-500 opacity-100 border-gray-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {selectedProduct[0].image.map((product, index) => (
              <img
                key={index}
                src={product}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(product)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="image" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {selectedProduct[0].name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {selectedProduct[0].price}
            </p>
            <p className="text-gray-500 md:w-4/5 mt-5">
              {selectedProduct[0].description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {selectedProduct[0].sizes.map((s, index) => (
                  <button
                    key={index}
                    className={` border border-gray-100 py-2 px-4 bg-gray-100 ${
                      s === size ? "border-red-500" : ""
                    } cursor-pointer`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="bg-black py-3 px-8 text-white text-sm active:bg-gray-700 cursor-pointer"
              onClick={() => addToCart(selectedProduct[0]._id, size)}
            >
              ADD TO CART
            </button>
            <div className="mt-8 sm:w-4/5 bg-gray-100 h-[2px]"></div>
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm border-gray-200">
            Description
          </p>
          <p className="border px-5 py-3 text-sm border-gray-200">
            Reviews(122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-200 px-6 text-sm text-gray-500 py-6">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={selectedProduct[0].category}
        subCategory={selectedProduct[0].subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Products;
