import React, { useState, useEffect } from 'react';
import ConcertDataServices from '../Services/ConcertDataServices';
import ConcertStatsTest from './ConcertStatsWrapped';

function ConcertStatsContainer() {
  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    // Get enriched data from localStorage
    const enrichedData = JSON.parse(localStorage.getItem('enrichedConcertData')) || [];
    console.log('Loading enriched data:', enrichedData);

    try {
      // Process the enriched data through ConcertDataServices
      const processed = ConcertDataServices.processConcertData(enrichedData);
      console.log('Processed data:', processed);

      // Store processed data in localStorage
      localStorage.setItem('processedConcertStats', JSON.stringify(processed));
      
      setProcessedData(processed);
    } catch (error) {
      console.error('Error processing enriched data:', error);
    }
  }, []); // Empty dependency array means this runs once on mount

  if (!processedData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">No concert data available</div>
      </div>
    );
  }

  return <ConcertStatsTest concertData={processedData} />;
}

export default ConcertStatsContainer;
