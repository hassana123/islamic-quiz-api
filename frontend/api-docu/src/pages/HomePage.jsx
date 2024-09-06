import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Categories from '../components/Categories';
import NewsLetter from '../components/NewsLetter';
const HomePage = () => {
  return (
  <main className='text-[#000] font-custom2'>
  <Hero/>
  <Features/>
  <Categories/>
  <NewsLetter/>
  </main> 
  );
};

export default HomePage;
