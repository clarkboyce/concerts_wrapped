import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Ticket from './Ticket';

const TicketOverview = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([{ artist: '', date: '', city: '', price: '' }]);

  const handleAddTicket = () => {
    if (tickets.length < 20) {
      setTickets([...tickets, { artist: '', date: '', city: '', price: '' }]);
    }
  };

  const handleDeleteTicket = (index) => {
    if (tickets.length > 1) {
      const newTickets = tickets.filter((_, i) => i !== index);
      setTickets(newTickets);
    }
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index] = { ...newTickets[index], [field]: value };
    setTickets(newTickets);
  };

  const handleSubmit = () => {
    // Here you can add validation and data processing before navigation
    // For now, we'll just navigate to the loading page
    navigate('/loading');
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#0f0f0f] py-10">
      <div className="w-[90%] max-w-2xl flex flex-col items-center justify-between gap-2">
        <motion.h1 
          className="text-3xl font-bold text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Give us a quick ticket overview!
        </motion.h1>

        <div className="w-full flex flex-col items-center gap-6 pt-5 pb-5 overflow-y-auto max-h-[75vh] px-4">
          {tickets.map((ticket, index) => (
            <Ticket
              key={index}
              index={index}
              ticket={ticket}
              onDelete={handleDeleteTicket}
              onChange={handleTicketChange}
            />
          ))}
          
          {tickets.length < 20 && (
            <motion.button
              onClick={handleAddTicket}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add new ticket +
            </motion.button>
          )}
        </div>

        <motion.button
          onClick={handleSubmit}
          className="px-24 py-4 bg-[#73737330] text-white rounded-[20px] font-medium hover:bg-[#73737330] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Wrapped
        </motion.button>
      </div>
    </div>
  );
};

export default TicketOverview; 