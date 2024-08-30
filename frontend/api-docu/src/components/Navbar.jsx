// src/components/Navbar.js
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
   <nav className='flex justify-between w-[90%] mx-auto py-5 font-custom2'>
    <h1 className='text-[30px] font-custom font-bold text-primary'>IslamicQuizAPI</h1>
    <div className='space-x-10 text-[20px]'>
    <NavLink   style={({ isActive }) => {
            return isActive ? { borderBottom: "2px solid #618264" } : {};
          }} to="/" className=''>Home</NavLink>
      <NavLink style={({ isActive }) => {
            return isActive ? { borderBottom: "2px solid #618264" } : {};
          }}  to="/dashboard" className=''>Api</NavLink>
      <NavLink style={({ isActive }) => {
            return isActive ? { borderBottom: "2px solid #618264" } : {};
          }} to="/feat" className=''>Features</NavLink>
      <NavLink style={({ isActive }) => {
            return isActive ? { borderBottom: "2px solid #618264" } : {};
          }} to="/docs" className=''>Docs</NavLink>
    </div>
    <div className='space-x-5'>
      <NavLink to="/login" className="rounded-md border boder-primary text-[20px]  px-5 py-2">Login</NavLink>
      <NavLink to="/register" className="rounded-md bg-primary text-[20px]  px-5 py-2 text-[#fff] ">Sign-Up</NavLink>
    </div>
   </nav>
  );
};

export default Navbar;
