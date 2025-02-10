import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FooterSpacer from "../common/FooterSpacer";
import { getStats } from "../../utils/statsManager";
import BugReportModal from "./BugReportModal";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numWrapped, setNumWrapped] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user-concerts/total-users"
        );
        setNumWrapped(response.data.total_users);
      } catch (error) {
        setNumWrapped("1,432");
        console.error(error);
      }
    })();
  }, []);

  // If still loading auth status, return null or a loading spinner
  if (isLoading) {
    return (
      <div className="bg-[#0f0f0f] text-white text-lg flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleGetStarted = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: {
          returnTo: window.location.origin + "/#/tickets",
        },
      });
    } else {
      navigate("/tickets");
    }
  };

  const handleSavedWrapped = async () => {
    navigate("/saved-wrapped");
  };

  const handleReportBug = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="h-[100dvh] w-full flex justify-center bg-[#0f0f0f] fixed">
      <div className="w-[80%] relative flex flex-col">
        {/* Social Icons */}
        <div className="absolute top-6 right-6 md:right-2 flex gap-4">
          <a
            href="admin@campus-ticket.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com/campusticket"
            className="text-gray-400 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          {isAuthenticated && (
            <motion.button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              Log out
            </motion.button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 inline-block text-transparent bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Concerts Wrapped
            </motion.h1>

            <motion.p
              className="text-2xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Spotify Wrapped, but for your concert memories
            </motion.p>

            {!isAuthenticated && (
              <motion.button
                className="bg-white text-[#0f0f0f] px-4 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"

              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleGetStarted}
              >
                Get Your Wrapped in 2 Minutes
              </motion.button>
            )}


            {isAuthenticated && (
              <div className="flex max-w-sm flex-col gap-4 mx-auto">
                <motion.button
                  className="bg-white text-[#0f0f0f] px-4 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleGetStarted}
                >
                  Click me again!
                </motion.button>

                {/* <motion.button
                  className="bg-white text-[#0f0f0f] px-4 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleSavedWrapped}
                >
                  Your saved wrapped
                </motion.button> */}
              </div>
            )}

            <motion.div
              className="mt-8 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p>{numWrapped} wrapped stories generated</p>
            </motion.div>
          </motion.div>

          <FooterSpacer />
        </div>
      </div>

      <BugReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <button
        className="absolute bottom-8 text-gray-400 hover:text-white transition-colors"
        onClick={handleReportBug}
      >
        Report a bug
      </button>
    </div>
  );
};

export default Home;
