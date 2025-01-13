import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingPage.css';

const LoadingPage = () => {
  console.log('LoadingPage rendering');
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Analyzing your concert memories...",
    "Counting those unforgettable moments...",
    "Preparing your musical journey...",
    "Almost ready to show your Wrapped...",
    "Creating something special just for you..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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