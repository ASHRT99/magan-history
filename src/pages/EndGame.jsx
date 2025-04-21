// src/pages/EndGame.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EndGame = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({});
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const storedScores = JSON.parse(sessionStorage.getItem('scores') || '{}');
    setScores(storedScores);

    const sorted = Object.entries(storedScores).sort((a, b) => a[1] - b[1]);
    if (sorted.length > 0) {
      setWinner(sorted[0][0]);
    }
  }, []);

  const getNickname = (score) => {
    if (score <= 5) return '🧠 خبير التاريخ';
    if (score <= 15) return '🎯 مؤرخ دقيق';
    if (score <= 30) return '🕰️ عاشق الماضي';
    return '🌪️ مغامر زمني';
  };

  const handleRestart = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-right max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-[#B03A2E] mb-6">🏁 نهاية اللعبة</h2>

        {winner ? (
          <div className="mb-8">
            <p className="text-xl">الفائز هو:</p>
            <h3 className="text-4xl text-[#117A65] font-bold mt-2">{winner}</h3>
            <p className="text-lg mt-1">لقبه: {getNickname(scores[winner])}</p>
          </div>
        ) : (
          <p className="text-lg mb-6">لا يوجد بيانات للفائز.</p>
        )}

        <div className="space-y-4">
          {Object.entries(scores).map(([player, score]) => (
            <div key={player} className="p-4 border rounded bg-gray-100">
              <p className="text-lg font-semibold">{player}</p>
              <p className="text-sm text-gray-600">المجموع: {score}</p>
              <p className="text-sm">{getNickname(score)}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleRestart}
          className="mt-8 bg-[#117A65] hover:bg-[#0e5e50] text-white py-3 px-8 rounded-xl text-lg"
        >
          🔁 ابدأ من جديد
        </button>
      </div>
    </div>
  );
};

export default EndGame;