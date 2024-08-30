import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/questions', {
  //         params: {
  //           category,
  //           difficulty,
  //           searchTerm,
  //         },
  //       });
  //       setQuestions(response.data.questions);
  //     } catch (error) {
  //       console.error('Error fetching questions:', error);
  //     }
  //   };

  //   fetchQuestions();
  // }, [searchTerm, category, difficulty]);

  // useEffect(() => {
  //   const filterQuestions = () => {
  //     let filtered = questions;
  //     if (searchTerm) {
  //       filtered = filtered.filter(q =>
  //         q.question.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //     }
  //     if (category) {
  //       filtered = filtered.filter(q => q.category === category);
  //     }
  //     if (difficulty) {
  //       filtered = filtered.filter(q => q.difficulty === difficulty);
  //     }
  //     setFilteredQuestions(filtered);
  //   };

  //   filterQuestions();
  // }, [questions, searchTerm, category, difficulty]);

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, filteredQuestions.length - 1));
  // };

  return (
  <main className='text-[#000] font-custom2'>
  <Hero/>
  <Features/>
  </main> 
  );
};

export default HomePage;
