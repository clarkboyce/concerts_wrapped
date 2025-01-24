import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DataEnrichmentService from '../Services/DataEnrichmentService';
import './LoadingPage.css';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Analyzing your concert memories...",
    "Counting those unforgettable moments...",
    "Preparing your musical journey...",
    "Almost ready to show your Wrapped...",
    "Creating something special just for you..."
  ];

  useEffect(() => {
    const processData = async () => {
      try {
        // Get the raw ticket data
        const rawTicketData = JSON.parse(localStorage.getItem('rawTicketData'));
        
        if (!rawTicketData) {
          navigate('/'); // Return to ticket input if no data
          return;
        }

        // Wait for messages to display (minimum 6 seconds)
        await new Promise(resolve => setTimeout(resolve, 6000));

        // Navigate to stats
        navigate('/stats');
        
        // Clean up
        localStorage.removeItem('rawTicketData');

      } catch (error) {
        console.error('Error processing data:', error);
        navigate('/error');
      }
    };

    processData();

    // Set up the message rotation
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="h-[100dvh] w-full flex justify-center items-center bg-[#0f0f0f] overflow-hidden">
      <div className="w-[85%] flex flex-col items-center gap-8">
        {/* Music Wave Loader */}
        <div className="music">
          {[...Array(10)].map((_, index) => (
            <div 
              key={index} 
              className="bar"
              style={{ 
                minWidth: '4px',
                minHeight: '2px'
              }}
            />
          ))}
        </div>
        
        {/* Loading Message */}
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 2 }}
          className="text-2xl font-normal text-blue-100 text-center"
        >
          {messages[currentMessage]}
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage; 