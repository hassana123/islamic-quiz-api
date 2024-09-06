import React from 'react'
import categories from '../util/categories'
import { NavLink } from 'react-router-dom'
const Categories = () => {
  return (
   <section className='mt-[100px]'>
   <h1 className='md:items-center md:w-[50%] mx-auto md:flex  md:justify-between font-[500] mb-10 md:text-[40px] text-center text-[30px] space font-custom'>
        <span className='block md:w-[150px]   md:block hidden rounded h-[3px] bg-primary'>

        </span>
       Categories
        <span className='block md:w-[150px] md:block hidden float-right rounded h-[3px] bg-primary'>

        </span>
        <div className=''></div>
    </h1>
    <div  className=' w-[90%]  mx-auto md:grid items-center md:grid-cols-3 md:space-y-0 space-y-8 lg:grid-cols4'>
      {categories.slice(0,6).map((category, index)=>(
        <div className='relative' key={index} >
          <img className='w-[70%] mx-auto  bg-[]  rounded-lg h-[25vh]' src={category.image} alt="" />
          <h3 className='absolute bottom-0 left-[15%] text-2xl px-2 text-[#fff] font-bold '>{category.category}</h3>
        </div>
      ))}
    </div>
    <NavLink to="/" className="text-center block  my-5  text-primary  text-[26px] font-custom">More .....</NavLink>
   </section>
  )
}

export default Categories