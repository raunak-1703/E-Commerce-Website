import React, { useState, useEffect } from "react";
import useShop from "../store/shopStore";
import Title from "../components/Title";
import { backendUrl } from "../store/shopStore";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const currency = useShop((state) => state.currency);
  const token = useShop((state) => state.token);
  const [orderData, setOrderData] = useState([]);

  const getOrderData = async () => {
    if (!token) {
      toast.error("Login first to check this page");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/order/userOrders`, {},{
        headers: {
          token, 
        },
      });
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div className="border-t pt-16 border-gray-200">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="mt-4 text-gray-500">No orders found.</p>
      ) : (
        <div>
          {orderData.map((product, index) => (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Image + Product Info */}
              <div className="flex gap-4 flex-1">
                <img
                  src={product.image?.[0]}
                  alt="image"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-base font-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {product.price}
                    </p>
                    <p>Quantity: {product.quantity || 1}</p>
                    <p>Size: {product.size || "M"}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(product.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{product.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Center: Order Status */}
              <div className="flex items-center gap-2 justify-center w-full md:w-1/4" >
                <p className="min-w-[8px] h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{product.status || "Ready to ship"}</p>
              </div>

              {/* Right: Track Order Button */}
              <div className="flex justify-end w-full md:w-1/4">
                <button className="border px-4 py-2 text-sm font-medium rounded-sm border-gray-200 whitespace-nowrap cursor-pointer" onClick={getOrderData}>
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
