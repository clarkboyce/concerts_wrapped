import React from 'react';
import { motion } from 'framer-motion';

const Ticket = ({ index, ticket, onDelete, onChange }) => {
  return (
    <motion.div 
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="absolute -inset-[2px] bg-gradient-to-r from-[#1DC3BB] to-[#1130FA] rounded-[20px]" />
      
      <div className="relative w-full p-4 sm:p-6 rounded-[18px] bg-[#272727]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-semibold">Ticket {index + 1}</h2>
          <button 
            onClick={() => onDelete(index)}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={ticket.artist || ''}
              onChange={(e) => onChange(index, 'artist', e.target.value)}
              className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Artist name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="date"
                value={ticket.date || ''}
                onChange={(e) => onChange(index, 'date', e.target.value)}
                min="2024-01-01"
                max="2024-12-31"
                className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none appearance-none w-full"
                style={{
                  colorScheme: 'dark',
                  WebkitAppearance: 'none',
                }}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={ticket.city || ''}
              onChange={(e) => onChange(index, 'city', e.target.value)}
              className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="City"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={ticket.price || ''}
              onChange={(e) => onChange(index, 'price', e.target.value)}
              className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
              placeholder="Price (recommended)"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Ticket; 