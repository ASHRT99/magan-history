// src/pages/GameSetup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameSetup = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('Mixed');
  const [mode, setMode] = useState('rounds');
  const [rounds, setRounds] = useState(5);
  const [timeLimit, setTimeLimit] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    const settings = {
      difficulty,
      mode,
      totalRounds: mode === 'rounds' ? rounds : null,
      timeLimit: mode === 'time' ? timeLimit : null,
    };

    // Store settings in sessionStorage
    sessionStorage.setItem('gameSettings', JSON.stringify(settings));

    navigate('/players');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg p-8 max-w-xl w-full text-right">
        <h2 className="text-3xl font-bold text-[#B03A2E] mb-6">إعدادات اللعبة</h2>

        <label className="block mb-2 text-lg">اختر مستوى الصعوبة:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 mb-6 rounded border border-gray-300"
        >
          <option value="Mixed">متنوع</option>
          <option value="Easy">سهل</option>
          <option value="Medium">متوسط</option>
          <option value="Hard">صعب</option>
        </select>

        <label className="block mb-2 text-lg">اختر وضع اللعبة:</label>
        <div className="space-y-2 mb-6">
          <label className="block">
            <input
              type="radio"
              name="mode"
              value="rounds"
              checked={mode === 'rounds'}
              onChange={(e) => setMode(e.target.value)}
              className="ml-2"
            /> عدد جولات محددة
          </label>
          <label className="block">
            <input
              type="radio"
              name="mode"
              value="time"
              checked={mode === 'time'}
              onChange={(e) => setMode(e.target.value)}
              className="ml-2"
            /> وقت محدد بالدقائق
          </label>
          <label className="block">
            <input
              type="radio"
              name="mode"
              value="unlimited"
              checked={mode === 'unlimited'}
              onChange={(e) => setMode(e.target.value)}
              className="ml-2"
            /> غير محدود
          </label>
        </div>

        {mode === 'rounds' && (
          <div className="mb-6">
            <label className="block mb-2 text-lg">عدد الجولات:</label>
            <input
              type="number"
              min="1"
              value={rounds}
              onChange={(e) => setRounds(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>
        )}

        {mode === 'time' && (
          <div className="mb-6">
            <label className="block mb-2 text-lg">مدة اللعبة (بالدقائق):</label>
            <input
              type="number"
              min="1"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#117A65] hover:bg-[#0e5e50] text-white px-6 py-3 rounded-xl text-lg w-full"
        >
          استمرار
        </button>
      </form>
    </div>
  );
};

export default GameSetup;