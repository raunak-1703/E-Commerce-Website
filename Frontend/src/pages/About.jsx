import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl flex justify-center pt-8 border-t border-gray-200'>
       <Title text1='ABOUT' text2='US'/>
      </div>
      <div className='my-10 flex flex-col sm:flex-row gap-16'>
        <img src={assets.about_img} alt="about" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo suscipit eaque ipsum debitis at eveniet nesciunt sint veritatis repellat corporis?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur excepturi fugit qui earum illum nulla esse soluta odit odio explicabo.</p>
            <p className='text-gray-800 font-bold'>Our Mission</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, soluta vel. Soluta maxime vero fugiat dolorum sed aliquam sapiente, itaque quo quisquam numquam suscipit quam rem provident! Dolore, eligendi voluptates.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1='WHY' text2='CHHOSE US'/>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Quality Assurance</p>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ad est quidem ducimus enim commodi, quasi perferendis molestiae doloribus saepe!</p>
        </div>
         <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Convinience</p>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ad est quidem ducimus enim commodi, quasi perferendis molestiae doloribus saepe!</p>
        </div>
         <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p className='font-bold'>Exceptional Customer Service:</p>
          <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ad est quidem ducimus enim commodi, quasi perferendis molestiae doloribus saepe!</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About