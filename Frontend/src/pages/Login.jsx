import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useShop from "../store/shopStore";
import { backendUrl } from "../store/shopStore";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const setToken = useShop((state)=>state.setToken)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    if (currentState === "Sign Up") {
      try {
        const response = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        navigate('/')
      }
      else{
        toast.error(response.data.message)
      }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    else{
      try {
        const response = await axios.post(`${backendUrl}/api/auth/login`,{email,password})
        if(response.data.success){
          setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
          navigate('/')
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };
  const [currentState, setCurrentState] = useState("Login");
  return (
    <form
      className="flex  flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4"
      onSubmit={(e) => submitHandler(e)}
    >
      <div className="flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" ? (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        ""
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer text-gray-700">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer text-gray-700"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer text-gray-700"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
