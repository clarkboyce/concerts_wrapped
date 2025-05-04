import {React, useState} from 'react';
import { motion } from 'framer-motion';

const Ticket = ({ index, ticket, onDelete, onChange, isSubmitted }) => {
  const [touched, setTouched] = useState({
    artist: false,
    date: false,
    city: false
  });


  const isEmpty = (value) => {
    return value === null || value === undefined || value.trim() === '';
  };

  const isInvalid = (field) => {
    return (touched[field] || isSubmitted) && isEmpty(ticket[field]);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

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
              onBlur={() => handleBlur('artist')}
              className={`bg-gray-800 text-white rounded-md p-2 border ${
                isInvalid('artist') 
                  ? 'border-red-500' 
                  : 'border-gray-700 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="Artist name"
              required
            />
            {isInvalid('artist') && (
              <p className="text-red-400 text-xs">Artist name is required</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="date"
                value={ticket.date || ''}
                onChange={(e) => onChange(index, 'date', e.target.value)}
                min="2024-01-01"
                max="2024-12-31"
                // className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none appearance-none w-full [&:not(:valid)]:text-transparent"
                style={{
                  colorScheme: 'dark',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '100%',
                  height: '42px',
                  lineHeight: '1.5',
                  padding: '8px',
                }}
                onBlur={() => handleBlur('date')}
                className={`bg-gray-800 text-white rounded-md p-2 border ${
                  isInvalid('date') 
                    ? 'border-red-500' 
                    : 'border-gray-700 focus:border-blue-500'
                } focus:outline-none`}
                required
              />
              {isInvalid('date') && (
              <p className="text-red-400 text-xs">Date is required</p>
            )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={ticket.city || ''}
              onChange={(e) => onChange(index, 'city', e.target.value)}
              // className="bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
              onBlur={() => handleBlur('city')}
              className={`bg-gray-800 text-white rounded-md p-2 border ${
                isInvalid('city') 
                  ? 'border-red-500' 
                  : 'border-gray-700 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="City"
              required
            />
            {isInvalid('city') && (
              <p className="text-red-400 text-xs">City is required</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="number"
              value={ticket.ticket_price || ''}
              onChange={(e) => onChange(index, 'ticket_price', e.target.value)}
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