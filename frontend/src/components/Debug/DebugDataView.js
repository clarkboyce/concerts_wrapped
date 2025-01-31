import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterSpacer from '../common/FooterSpacer';

function DebugDataView() {
  const navigate = useNavigate();
  const enrichedData = JSON.parse(localStorage.getItem('enrichedConcertData')) || [];
  const processedStats = JSON.parse(localStorage.getItem('processedConcertStats')) || null;

  const handleNext = () => {
    // Pass the processed stats to the test component
    navigate('/wrapped', { state: { concertData: processedStats } });
  };

  return (
    <div className="h-[100vh] bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-white mb-4">Debug Data View</h1>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-xl text-white mb-2">Raw Enriched Data:</h2>
          <pre className="text-green-400 overflow-auto max-h-[25vh] p-4 bg-gray-900 rounded">
            {JSON.stringify(enrichedData, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-xl text-white mb-2">Processed Statistics:</h2>
          <pre className="text-blue-400 overflow-auto max-h-[25vh] p-4 bg-gray-900 rounded">
            {JSON.stringify(processedStats, null, 2)}
          </pre>
        </div>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Continue to Slides →
        </button>
        <FooterSpacer />
      </div>
    </div>
  );
}

export default DebugDataView; 