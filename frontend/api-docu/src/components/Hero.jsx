import React from 'react'
import { NavLink } from 'react-router-dom';
import vector from "../assets/edit.png"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
const Hero = () => {
  return (
   <section className='font-[500] my-[40px] md:mt-[80px] md:space-y-0 space-y-8 font-custom2 w-[90%] items-center mx-auto md:flex space-x-10 text-[#000] '>
    <img className='w-[50%] md:hidden block mx-auto rounded-lg' src={image2} alt="" />
    <div className='space-y-5'>
        <h1 className='lg:text-[45px] text-[25px] '>The Quiz Api Includes a wide number of Islamic Questions</h1>
        <p className='lg:text-[25px] text-[19px]'>Test your knowledge or easily embed a quiz on your website with the quiz api</p>
        <div className='space-x-5 md:space-y-0 space-y-5'>
      <NavLink to="/login" className="rounded-md bg-primary text-[20px]  px-5 py-2 text-[#fff] " >Login</NavLink>
      <NavLink to="/register" className="rounded-md border boder-primary text-[20px]  px-5 py-2" >Sign-Up</NavLink>
    </div>
    </div>
    <img className='w-[50%] md:block hidden rounded-lg' src={image2} alt="" />
   </section>
  )
}

export default Hero