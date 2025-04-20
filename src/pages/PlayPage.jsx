// src/pages/PlayPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [event, setEvent] = useState(null);
  const [round, setRound] = useState(1);

  useEffect(() => {
    const loadedPlayers = JSON.parse(sessionStorage.getItem('players')) || [];
    setPlayers(loadedPlayers);
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const mockEvent = {
      title: 'تولى السلطان قابوس الحكم',
      correctYear: 1970,
      hintRange: '1800 - 2010'
    };
    setEvent(mockEvent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGuesses = JSON.parse(sessionStorage.getItem('guesses') || '{}');
    if (!updatedGuesses[round]) updatedGuesses[round] = {};

    updatedGuesses[round][players[currentPlayerIndex]] = parseInt(guess);
    sessionStorage.setItem('guesses', JSON.stringify(updatedGuesses));

    setGuess('');

    if (currentPlayerIndex + 1 < players.length) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      navigate('/results');
    }
  };

  if (!event || players.length === 0) return <div className="text-center mt-20">تحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg text-right">
        <h2 className="text-2xl font-bold text-[#B03A2E] mb-4">السؤال للجولة {round}</h2>
        <p className="text-lg mb-2">اللاعب الحالي: <strong>{players[currentPlayerIndex]}</strong></p>
        <p className="text-lg mb-4">الحدث: <strong>{event.title}</strong></p>
        <p className="text-sm text-gray-600 mb-6">🔎 التلميح: بين {event.hintRange}</p>

        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="اكتب السنة هنا"
          className="w-full p-3 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#117A65] hover:bg-[#0e5e50] text-white py-3 rounded-xl text-lg"
        >
          تأكيد التخمين
        </button>
      </form>
    </div>
  );
};

export default PlayPage;
