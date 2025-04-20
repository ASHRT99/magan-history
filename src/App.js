import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameSetup from './pages/GameSetup'; // ✅ THIS LINE
import PlayerEntry from './pages/PlayerEntry'; // ✅ Add this
import PlayPage from './pages/PlayPage'; // ✅ Add this line
import ResultsPage from './pages/ResultsPage'; // ✅ Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/players" element={<PlayerEntry />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/results" element={<ResultsPage />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
