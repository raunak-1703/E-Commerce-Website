import React from 'react'

const NewsLetter = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault()
    }
  return (
    <div className='text-center'>
        <p className='font-medium text-2xl'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error reiciendis voluptas eius suscipit animi maxime.</p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto border my-6 pl-3' onSubmit={(e)=>onSubmitHandler(e)}>
           <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/> 
           <button type='submit' className='bg-black text-xs py-4 px-10 text-white cursor-pointer'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter