import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ConcertStatsWrapped from './components/ConcertStats/ConcertStatsWrapped';
import TicketOverview from './components/TicketOverview/TicketOverview';
import LoadingPage from './components/LoadingPage/LoadingPage';
import DebugDataView from './components/Debug/DebugDataView';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wrapped" element={<ConcertStatsWrapped />} />
        <Route path="/tickets" element={<TicketOverview />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/debug" element={<DebugDataView />} />
      </Routes>
  );
};

export default App;
