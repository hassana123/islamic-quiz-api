// src/components/Navbar.js
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className='flex justify-between w-[90%] mx-auto py-5 font-custom2'>
      <h1 className='md:text-[30px] text-[25px] font-custom font-bold text-primary'>IslamicQuizAPI</h1>
      <div className='md:hidden'>
          <IoMenuOutline onClick={toggleMenu} className='text-[38px] cursor-pointer' />
        </div>
      <div className={`lg:space-x-10 md:space-x-4 text-[20px] md:block  ${isOpen?"grid absolute shadow-md rounded-md bg-customGreen text-[#fff] w-[70%] top-20 left-0 py-10 px-5 space-y-10":"hidden"}`}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            borderBottom: isActive ? `${isOpen?"":"2px solid #16423C"}` : "none",
          })}
          className=''
        >
          Home
        </NavLink>
        <NavLink 
          to="/dashboard" 
          style={({ isActive } ) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })}
          className=''
        >
          Api
        </NavLink>
        <NavLink 
          to="/feat" 
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })}
          className=''
        >
          Features
        </NavLink>
        <NavLink 
          to="/docs" 
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #618264" : "none",
          })}
          className=''
        >
          Docs
        </NavLink>
        <div className='lg:space-x-5  md:hidden grid space-y-5 block '>
        <NavLink 
          to="/login" 
          className="rounded-md border border-primary lg:text-[20px] lg:px-5 px-3  py-2"
        >
          Login
        </NavLink>
        <NavLink 
          to="/sign-up" 
          className="rounded-md bg-primary lg:text-[20px] text-[#fff] lg:px-5 px-3  py-2 text-white"
        >
          Sign-Up
        </NavLink>
      </div>
      </div>
      <div className='lg:space-x-5 space-x-3 md:block hidden'>
        <NavLink 
          to="/login" 
          className="rounded-md border border-primary lg:text-[20px] lg:px-5 px-3  py-2"
        >
          Login
        </NavLink>
        <NavLink 
          to="/sign-up" 
          className="rounded-md bg-primary lg:text-[20px] text-[#fff] lg:px-5 px-3  py-2 text-white"
        >
          Sign-Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;