import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Ticket from "./Ticket";
import { Scrollbars } from "react-custom-scrollbars-2";
import ConcertDataServices from "../Services/ConcertDataServices";
import LoadingModal from '../LoadingPage/LoadingModal';
import ErrorModal from '../common/errorModal';
import axios from 'axios';


const TicketOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [tickets, setTickets] = useState([
    { artist: "", date: "", city: "", ticket_price: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);


  const handleAddTicket = () => {
    if (tickets.length < 30) {
      setTickets([...tickets, { artist: "", date: "", city: "", ticket_price: "" }]);
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

    // Replace empty ticket prices with null
    const ticketsWithNullPrice = filledTickets.map(ticket => ({
      ...ticket,
      ticket_price: ticket.ticket_price === '' ? null : parseFloat(ticket.ticket_price)
    }));

    setIsSubmitting(true);
    setError(null);
    setIsLoadingModalOpen(true);
    const startTime = Date.now();

    try {
      // Determine userId based on environment
      // @shiv edit back for prod
      // const userId = window.location.hostname === 'localhost' 
      //   ? 'test|0001111'
      //   : user.sub;
      const userId = user?.sub || 'test|0001111';
        console.log("userId", userId);
        console.log("tickets", ticketsWithNullPrice);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/concerts/`, {
        userId: userId,
        tickets: ticketsWithNullPrice
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Raw concerts that match:", response.data);

      // Transform the data to only include matched and created tickets
      const processedData = response.data
        .filter(item => item.status === "Matched" || item.status === "Created")
        .map(item => {
          if (!item.concert) {
            console.warn('Missing concert data in item:', item);
            return null;
          }
          return {
            artist: item.concert.artist || '',
            capacity: item.concert.capacity || 0,
            city: item.concert.city || '',
            date: item.concert.date || '',
            genres: item.concert.genres || [],
            number_of_songs: item.concert.number_of_songs || 0,
            state: item.concert.state || '',
            venue: item.concert.venue || '',
            price: item.ticket?.ticket_price || 0
          };
        })
        .filter(item => item !== null); // Remove any null entries

      console.log("processedData b4 CDS:", processedData);

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 5000) {
        await new Promise(resolve => setTimeout(resolve, 5000 - elapsedTime));
      }

      console.log("stored raw and processed data");
      console.log("enrichedConcertData:", JSON.stringify(response.data));
      // Store both the raw and processed data
      localStorage.setItem("enrichedConcertData", JSON.stringify(response.data));

      console.log("processing data RN");
      // Process the transformed data
      const processedStats = ConcertDataServices.processConcertData(processedData);
      console.log("DONE processing data");
      localStorage.setItem("processedConcertStats", JSON.stringify(processedStats));
      console.log("saved processedStats");
      console.log("processedConcertStats:", JSON.stringify(processedStats));
      
      setIsLoadingModalOpen(false);
      navigate("/wrapped", { state: { concertData: processedStats } });
    } catch (error) {
      console.error('API error:', error);
      setError({
        status: error.response?.status,
        message: error.response?.data?.message || error.message
      });
      setErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
      setIsLoadingModalOpen(false);
    }
  };



  return (
    <div className="h-[100dvh] w-full flex justify-center bg-[#0f0f0f] py-8 fixed">
      <LoadingModal 
        isOpen={isLoadingModalOpen} 
        onClose={() => setIsLoadingModalOpen(false)} 
      />
      <ErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        error={error}
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
            {error.message}
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
      </div>
    </div>
  );
};

export default TicketOverview;