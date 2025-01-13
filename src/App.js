import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ConcertStatsTest from './components/ConcertStats/ConcertStatsTest';
import ConcertStats from './components/ConcertStats/ConcertStats';
import TicketOverview from './components/TicketOverview/TicketOverview';
import LoadingPage from './components/LoadingPage/LoadingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<ConcertStats />} />
        <Route path="/test" element={<ConcertStatsTest />} />
        <Route path="/ticket-overview" element={<TicketOverview />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
