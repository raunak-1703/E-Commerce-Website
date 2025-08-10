import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
            consectetur deleniti at totam corrupti soluta tempore magnam,
            placeat in labore quidem sint, autem quas harum.
          </p>
        </div>
        <div>
          <div className="font-medium text-xl sm:text-2xl mb-5">COMPANY</div>
          <div className="text-gray-600 flex flex-col gap-1">
          <div>Home</div>
          <div>About us</div>
          <div>Delivery</div>
          <div>Privacy policy</div>
          </div>
        </div>
        <div>
          <div className="font-medium text-xl sm:text-2xl mb-5">GET IN TOUCH</div>
          <div className="text-gray-600 flex flex-col gap-1">
          <div>+91-123-456-7890</div>
          <div>macintosh@gmail.com</div>
          <div>Social Handle</div>
          </div>
        </div>
      </div>
      <div className='w-full h-[1px] bg-gray-200 mb-4'></div>
      <div className="text-center mb-3">Copyright 2025@ macintosh - All Right Reserved.</div>
    </div>
  );
};

export default Footer;
