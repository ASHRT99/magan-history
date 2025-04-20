// src/pages/PlayerEntry.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerEntry = () => {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(1);
  const [players, setPlayers] = useState(['']);

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPlayerCount(count);
    const updatedPlayers = [...players];
    while (updatedPlayers.length < count) updatedPlayers.push('');
    while (updatedPlayers.length > count) updatedPlayers.pop();
    setPlayers(updatedPlayers);
  };

  const handleNameChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('players', JSON.stringify(players));
    navigate('/play');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg max-w-xl w-full text-right">
        <h2 className="text-3xl font-bold text-[#B03A2E] mb-6">إدخال أسماء اللاعبين</h2>

        <label className="block mb-2">كم عدد اللاعبين؟</label>
        <input
          type="number"
          min="1"
          value={playerCount}
          onChange={handleCountChange}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        {players.map((name, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1">اسم اللاعب {index + 1}:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#117A65] hover:bg-[#0e5e50] text-white px-6 py-3 rounded-xl text-lg w-full"
        >
          بدء الجولة
        </button>
      </form>
    </div>
  );
};

export default PlayerEntry;
