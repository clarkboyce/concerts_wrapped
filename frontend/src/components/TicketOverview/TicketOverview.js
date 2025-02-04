import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Ticket from "./Ticket";
import { Scrollbars } from "react-custom-scrollbars-2";
import FooterSpacer from "../common/FooterSpacer";
import test_data from "../Services/test_data_user.json";
import test_data_full from "../Services/test_data_full.json";
import test_data_1 from "../Services/test_data_1.json";
import test_data_12 from "../Services/test_data_12.json";
import test_data_20 from "../Services/test_data_20.json";


import DataEnrichmentService from "../Services/DataEnrichmentService";
import ConcertDataServices from "../Services/ConcertDataServices";
import LoadingModal from '../LoadingPage/LoadingModal';

const TicketOverview = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    { artist: "", date: "", city: "", price: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const handleAddTicket = () => {
    if (tickets.length < 30) {
      setTickets([...tickets, { artist: "", date: "", city: "", price: "" }]);
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

  const isAnyTicketFilled = useMemo(() => {
    return tickets.some(
      (ticket) =>
        ticket.artist.trim() !== "" &&
        ticket.date !== "" &&
        ticket.city.trim() !== ""
    );
  }, [tickets]);

  const handleSubmit = async () => {
    if (!isAnyTicketFilled) return;

    const filledTickets = tickets.filter(
      (ticket) =>
        ticket.artist.trim() !== "" &&
        ticket.date !== "" &&
        ticket.city.trim() !== ""
    );

    setIsSubmitting(true);
    setError(null);
    setIsLoadingModalOpen(true);
    const startTime = Date.now();

    try {
      const response = await fetch('http://ec2-18-227-228-101.us-east-2.compute.amazonaws.com:8000/api/concerts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tickets: filledTickets }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Ensure minimum 5 second display time
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 5000) {
        await new Promise(resolve => setTimeout(resolve, 5000 - elapsedTime));
      }

      localStorage.setItem("enrichedConcertData", JSON.stringify(data));
      setIsLoadingModalOpen(false);
      navigate("/debug");
    } catch (err) {
      console.error('API error:', err);
      setError('Failed to process tickets. Please try again.');
      setIsLoadingModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestMode = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Check if test data is valid
      if (!test_data_20 || !Array.isArray(test_data_20)) {
        throw new Error('Test data is invalid or not in the correct format');
      }



      console.log('Test data:', test_data_20); // Debug log


      // Process the test data directly through ConcertDataServices
      const processedStats = ConcertDataServices.processConcertData(test_data_20);
      

      // Verify processed stats before storing
      if (!processedStats) {
        throw new Error('Failed to process concert stats');
      }

      console.log('Processed stats:', processedStats); // Debug log
      
      // Store the processed stats
      localStorage.setItem("enrichedConcertData", JSON.stringify(test_data_20));
      localStorage.setItem("processedConcertStats", JSON.stringify(processedStats));
      

      // Navigate to debug view
      navigate("/debug");
    } catch (err) {
      console.error('Test mode error:', err);
      setError(`Failed to process test data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex justify-center bg-[#0f0f0f] py-5 fixed">
      <LoadingModal 
        isOpen={isLoadingModalOpen} 
        onClose={() => setIsLoadingModalOpen(false)} 
      />
      <div className="w-[90%] max-w-2xl flex flex-col items-center justify-between gap-2">
        <motion.h1
          className="text-2xl md:text-3xl font-semibold text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Give us a quick ticket overview!
        </motion.h1>

        <Scrollbars
          style={{ width: "100%", height: "65vh" }}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#ffffff40",
                borderRadius: "4px",
                width: "4px",
              }}
            />
          )}
        >
          <div className="w-full flex flex-col items-center gap-6 pt-5 pb-5 px-4">
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
        </Scrollbars>

        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        <motion.button
          onClick={handleSubmit}
          className={`px-24 py-4 rounded-[20px] font-medium transition-colors ${
            isAnyTicketFilled
              ? "bg-[#73737330] text-white hover:bg-[#73737350]"
              : "bg-[#73737315] text-gray-500 cursor-not-allowed"
          }`}
          whileHover={isAnyTicketFilled ? { scale: 1.05 } : {}}
          whileTap={isAnyTicketFilled ? { scale: 0.95 } : {}}
          disabled={!isAnyTicketFilled || isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Generate Wrapped'}
        </motion.button>

        <motion.button
          onClick={handleTestMode}
          className="px-6 py-2 rounded-[20px] font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Use Test Data
        </motion.button>
        <FooterSpacer />
      </div>
    </div>
  );
};

export default TicketOverview;