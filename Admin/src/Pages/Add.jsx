import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading,setLoading] = useState(false)
  const submitHandler=async(e)=>{
    setLoading(true)
          e.preventDefault()
    try {
        const formData = new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("bestseller",JSON.stringify(bestseller))
        formData.append("sizes",JSON.stringify(sizes))

       image1 && formData.append("image1",image1)
       image2 && formData.append("image2",image2)
       image3 && formData.append("image3",image3)
       image4 && formData.append("image4",image4)
        const response = await axios.post(`${backendUrl}/api/product/add`,formData,{headers:{token}})
        console.log(response)
        setLoading(false)
        if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice('')
        setSizes([])
        }
        else{
            console.log(error)
            toast.error(response.data.message)
        }
    } catch (error) {
        setLoading(false)
        toast.error(error.message)
    }
  }
  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={submitHandler}>
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={
                image1 ? URL.createObjectURL(image1) : assets.upload_area
              }
              alt="uplaodlogo"
              className="w-20"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={`${
                image2 ? URL.createObjectURL(image2) : assets.upload_area
              }`}
              alt="uplaodlogo"
              className="w-20"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={`${
                image3 ? URL.createObjectURL(image3) : assets.upload_area
              }`}
              alt="uplaodlogo"
              className="w-20"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={`${
                image4 ? URL.createObjectURL(image4) : assets.upload_area
              }`}
              alt="uplaodlogo"
              className="w-20"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          type="text"
          placeholder="Write Description here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            placeholder="100"
            className="w-full px-3 py-2 sm:w-[120px]"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="mb-3">Product Sizes</p>
        <div className="flex gap-2">
          <div>
            <p
              className={`bg-slate-200 cursor-pointer px-3 py-1 ${sizes.includes('S')?'bg-slate-400':''}`} 
              onClick={() =>
                setSizes((prev) => {
                  if (prev.includes("S")) {
                    return prev.filter((s)=>s!=='S');
                  } else {
                    return [...prev, "S"];
                  }
                })
              }
            >
              S
            </p>
          </div>
          <div>
            <p
              className={`bg-slate-200 cursor-pointer px-3 py-1 ${sizes.includes('M')?'bg-slate-400':''}`} 
              onClick={() =>
                setSizes((prev) => {
                  if (prev.includes("M")) {
                    return prev.filter((s)=>s!=='M');
                  } else {
                    return [...prev, "M"];
                  }
                })
              }
            >
              M
            </p>
          </div>
          <div>
            <p
              className={`bg-slate-200 cursor-pointer px-3 py-1 ${sizes.includes('L')?'bg-slate-400':''}`} 
              onClick={() =>
                setSizes((prev) => {
                  if (prev.includes("L")) {
                    return prev.filter((s)=>s!=='L');
                  } else {
                    return [...prev, "L"];
                  }
                })
              }
            >
              L
            </p>
          </div>
          <div>
            <p
              className={`bg-slate-200 cursor-pointer px-3 py-1 ${sizes.includes('XL')?'bg-slate-400':''}`} 
              onClick={() =>
                setSizes((prev) => {
                  if (prev.includes("XL")) {
                    return prev.filter((s)=>s!=='XL');
                  } else {
                    return [...prev, "XL"];
                  }
                })
              }
            >
              XL
            </p>
          </div>
          <div>
            <p
              className={`bg-slate-200 cursor-pointer px-3 py-1 ${sizes.includes('XXL')?'bg-slate-400':''}`} 
              onClick={() =>
                setSizes((prev) => {
                  if (prev.includes("XXL")) {
                    return prev.filter((s)=>s!=='XXL');
                  } else {
                    return [...prev, "XXL"];
                  }
                })
              }
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" checked={bestseller} onChange={(e)=>setBestSeller(prev=>!prev)}/>
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white cursor-pointer">
        {loading?'Adding...':'Add'}
      </button>
    </form>
  );
};

export default Add;
