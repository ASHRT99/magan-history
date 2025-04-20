// src/pages/ResultsPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [guesses, setGuesses] = useState({});
  const [scores, setScores] = useState({});
  const [event, setEvent] = useState(null);
  const [round, setRound] = useState(1);

  useEffect(() => {
    const storedPlayers = JSON.parse(sessionStorage.getItem('players') || '[]');
    const storedGuesses = JSON.parse(sessionStorage.getItem('guesses') || '{}');
    const settings = JSON.parse(sessionStorage.getItem('gameSettings') || '{}');

    const currentRound = Object.keys(storedGuesses).length;
    setRound(currentRound);

    const currentGuesses = storedGuesses[currentRound] || {};
    setPlayers(storedPlayers);
    setGuesses(currentGuesses);

    const mockEvent = {
      title: 'تولى السلطان قابوس الحكم',
      correctYear: 1970,
    };
    setEvent(mockEvent);

    const currentScores = JSON.parse(sessionStorage.getItem('scores') || '{}');
    storedPlayers.forEach((player) => {
      const playerGuess = currentGuesses[player];
      if (typeof playerGuess === 'number') {
        const difference = Math.abs(playerGuess - mockEvent.correctYear);
        currentScores[player] = (currentScores[player] || 0) + difference;
      }
    });

    sessionStorage.setItem('scores', JSON.stringify(currentScores));
    setScores(currentScores);
  }, []);

  const handleNextRound = () => {
    navigate('/play');
  };

  if (!event) return <div className="text-center mt-20">تحميل النتائج...</div>;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-100 p-8 rounded-xl shadow text-right">
        <h2 className="text-2xl font-bold text-[#B03A2E] mb-4">نتائج الجولة {round}</h2>
        <p className="mb-6 text-lg">✅ الحدث: <strong>{event.title}</strong></p>
        <p className="mb-6 text-md">📅 السنة الصحيحة: <strong>{event.correctYear}</strong></p>

        <div className="space-y-3">
          {players.map((player) => (
            <div key={player} className="p-4 bg-white rounded shadow-sm border">
              <p className="text-lg"><strong>{player}</strong> خمن السنة: {guesses[player]}</p>
              <p className="text-sm text-gray-600">📉 الفرق: {Math.abs(guesses[player] - event.correctYear)} سنة</p>
              <p className="text-sm text-gray-800">🔢 المجموع: {scores[player]}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNextRound}
          className="mt-8 w-full bg-[#117A65] hover:bg-[#0e5e50] text-white py-3 rounded-xl text-lg"
        >
          الجولة التالية
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;