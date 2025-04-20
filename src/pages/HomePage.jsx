import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/setup'); // later we'll build this route
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-5xl font-bold text-[#B03A2E] mb-6">تاريخ مجان</h1>
      <p className="text-xl text-gray-700 mb-8">اللعبة التي تختبر معرفتك بتاريخ سلطنة عمان</p>
      <button
        onClick={handleStart}
        className="bg-[#117A65] hover:bg-[#0e5e50] text-white px-8 py-4 rounded-xl text-lg shadow-lg"
      >
        ابدأ اللعبة
      </button>
    </div>
  );
};

export default HomePage;
