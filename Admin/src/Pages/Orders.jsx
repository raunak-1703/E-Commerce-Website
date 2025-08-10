import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        console.log(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const updateStatus = async (e,orderId)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/order/update`,{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await getAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h3 className="text-3xl font-semibold mb-8">Orders Page</h3>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-6 bg-white flex flex-col md:flex-row md:justify-between md:items-start gap-6"
            >
              {/* Left: Items and Address */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={assets.parcel_icon}
                    alt="parcel"
                    className="w-12 h-12 flex-shrink-0"
                  />
                  <div className="flex flex-wrap gap-1 text-gray-800 text-sm sm:text-base">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity} <span className="font-semibold">{item.size}</span>
                        {i !== order.items.length - 1 && <>,&nbsp;</>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold text-lg">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                  <p>Phone: {order.address.phone}</p>
                </div>
              </div>

              {/* Right: Order Details */}
              <div className="flex flex-col items-start md:items-end gap-3 min-w-[180px]">
                <p>
                  <span className="font-semibold">Items:</span> {order.items.length}
                </p>
                <p>
                  <span className="font-semibold">Method:</span> {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span> {order.payment ? "Done" : "Pending"}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-xl font-bold">
                  {currency}
                  {order.amount.toFixed(2)}
                </p>
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.status}
                  onChange={(e)=>updateStatus(e,order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
