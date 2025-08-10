import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div>
      <div className='flex text-2xl pt-10 border-t border-gray-200 justify-center'>
        <Title text1='CONTACT' text2='US'/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="contact" className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>            
          <p className='text-gray-500'>37126737 Fake Address <br /> Fake Street <br />Fake Colony</p>
          <p className='text-gray-500'>Tel:12345 <br />user@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Lorem ipsum dolor sit amet.</p>
          <p className='text-gray-500'>Job Openings at our Company</p>
          <button className='border px-8 py-4 text-sm hover:bg-black hover:text-white transform-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default Contact