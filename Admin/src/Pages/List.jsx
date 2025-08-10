import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { currency } from "../App";
const List = ({ token }) => {
  const [product, setProduct] = useState([]);
  const fetchProduct = async () => {
    try {
      const respone = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (respone.data.success) {
        setProduct(respone.data.products);
      } else {
        toast.error(respone.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const deleteProduct = async(id)=>{
    try {
        const response = await axios.post(`${backendUrl}/api/product/remove`,{id},{headers:{token}})
        if(response.data.success){
            toast.success(response.data.message)
            await fetchProduct()
        }
        else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm border-gray-200">
          <b>Image</b> <b>Name</b> <b>Category</b> <b>Price</b> <b className="text-center">Action</b>
        </div>
        {/* Displaying Products */}
        
            {product.map((item,index)=>(<div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 bg-gray-100 text-sm border-gray-200">
                <img src={item.image[0]} alt="image" className="w-12"/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p className="text-right md:text-center cursor-pointer text-lg" onClick={()=>deleteProduct(item._id)}>X</p>
            </div>))}
        
      </div>
    </div>
  );
};

export default List;
