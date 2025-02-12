import React from 'react';
import { motion } from 'framer-motion';

const ExampleTicket = () => {
  return (
    <motion.div 
      className="relative w-full max-w-[20rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -inset-[2px] bg-gradient-to-r from-[#1DC3BB] to-[#1130FA] rounded-[20px] opacity-80" />
      
      <div className="relative w-full p-4 rounded-[18px] bg-[#272727]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg text-white font-semibold">Your Ticket</h2>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="bg-gray-800 text-white/70 rounded-md p-1 border border-gray-700 text-sm"
              placeholder="Artist name"
            disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="date"
              className="bg-gray-800 text-white/70 rounded-md p-1 border border-gray-700 text-sm"
              placeholder="Date"
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="bg-gray-800 text-white/70 rounded-md p-1 border border-gray-700 text-sm"
              placeholder="City"
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="bg-gray-800 text-white/70 rounded-md p-1 border border-gray-700 text-sm"
              placeholder="Price"
              disabled
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExampleTicket;