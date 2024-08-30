import React from 'react'
import { NavLink } from 'react-router-dom';
import vector from "../assets/edit.png"
const Hero = () => {
  return (
   <section className='font-[500] font-custom2 w-[90%] items-center mx-auto md:flex space-x-3 text-[#000] '>
    <div className='space-y-5'>
        <h1 className='text-[45px] '>The Quiz Api Includes a wide number of Islamic Questions</h1>
        <p className='text-[25px]'>Test your knowledge or easily embed a quiz on your website with the quiz api</p>
        <div className='space-x-5'>
      <NavLink to="/login" className="rounded-md bg-primary text-[20px]  px-5 py-2 text-[#fff] " >Login</NavLink>
      <NavLink to="/register" className="rounded-md border boder-primary text-[20px]  px-5 py-2" >Sign-Up</NavLink>
    </div>
    </div>
    <img className='w-[50%]' src={vector} alt="" />
   </section>
  )
}

export default Hero