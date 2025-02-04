import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingPage.css';

const LoadingModal = ({ isOpen, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Analyzing your concert memories...",
    "Counting those unforgettable moments...",
    "Preparing your musical journey...",
    "Almost ready to show your Wrapped...",
    "Creating something special just for you..."
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        >
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-8 p-8 rounded-2xl bg-[#0f0f0f]">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal; 