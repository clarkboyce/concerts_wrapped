import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FooterSpacer from "../common/FooterSpacer";
import wrappy from "../common/wrappy.png";
import ExampleTicket from "./ExampleTicket";
import start_img from "./start_img.png";
import BugReportModal from "./BugReportModal";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numWrapped, setNumWrapped] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user-concerts/total-users`
        );
        setNumWrapped(response.data.total_users);
      } catch (error) {
        setNumWrapped("0");
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowY = "hidden";
      document.body.style.overflowX = "hidden";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If still loading auth status, return null or a loading spinner
  if (isLoading) {
    return (
      <div className="bg-[#0f0f0f] text-white text-lg flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleShareWrapped = async () => {
    const shareUrl = window.location.origin;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '2024 Concerts Wrapped',
          text: 'Check out your concert stats for 2024!',
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

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
    <>
      <div className="h-[100dvh] w-full flex justify-center bg-[#0f0f0f] relative">
        <div className="w-[90%] sm:w-[70%] relative flex flex-col">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{
              duration: 0.8,
              rotate: {
                delay: 1,
                duration: 2,
                ease: "easeInOut",
              },
            }}
            src={wrappy}
            onClick={handleShareWrapped}
            alt="Concerts Wrapped Logo"
            className="w-14 h-14 absolute top-2 left-6"
          />
          {/* Social Icons */}
          <div className="absolute top-6 right-6 md:right-2 flex gap-5 items-center">
            <a
              href="https://instagram.com/campusticket"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
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
            {isAuthenticated && (
              <motion.button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
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
                  className="inline-flex items-center justify-center px-4 h-12 text-xl text-white border-0 rounded-md cursor-pointer relative overflow-hidden whitespace-nowrap"
                  style={{
                    backgroundImage: "radial-gradient(100% 100% at 100% 0,rgb(29, 158, 111) 0,rgb(27, 161, 182) 100%)",
                    boxShadow: "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset"
                  }}
                  whileHover={{
                    boxShadow: "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px,rgb(31, 153, 172) 0 -3px 0 inset",
                    y: -2
                  }}
                  whileTap={{
                    boxShadow: "#22d3ee 0 3px 7px inset",
                    y: 2
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleGetStarted}
                >
                  Get Wrapped in 2 Minutes
                </motion.button>
              )}

              {isAuthenticated && (
                  <motion.button
                    className="inline-flex items-center justify-center px-4 h-12 text-xl text-white border-0 rounded-md cursor-pointer relative overflow-hidden whitespace-nowrap"
                    style={{
                      backgroundImage: "radial-gradient(100% 100% at 100% 0,rgb(29, 158, 111) 0,rgb(27, 161, 182) 100%)",
                      boxShadow: "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset"
                    }}
                    whileHover={{
                      boxShadow: "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px,rgb(31, 153, 172) 0 -3px 0 inset",
                      y: -2
                    }}
                    whileTap={{
                      boxShadow: "#22d3ee 0 3px 7px inset",
                      y: 2
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    onClick={handleGetStarted}
                  >
                    Click me again!
                  </motion.button>

                  /* <motion.button
                  className="bg-white text-[#0f0f0f] px-4 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={handleSavedWrapped}
                >
                  Your saved wrapped
                </motion.button> */
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
      </div>
      {showArrow && (
          <motion.div 
            className="absolute bottom-16 left-[48%]"
            animate={{ y: [0, 16, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-8 h-8 text-white/70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        )}
      <div className="h-full w-full flex justify-center bg-[#0f0f0f] relative pb-16">
        <div className="p-8 bg-radial-at-t from-cyan-400/10 to-transparent absolute top-0 w-full h-full" />
        <div className="w-[80%] sm:w-[60%] relative flex flex-col mb-16">
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-20">
            <motion.h1 className="text-4xl w-full font-bold mb-12 bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
              How It Works
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col items-start space-y-4 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gray-100/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl text-emerald-400 font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Sign-up with .Edu Email
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Create your campusticket account and verify your student email
                  address.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col items-start space-y-4 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-gray-100/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl text-emerald-400 font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Enter Your Tickets
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Fill in the details of all the concerts you attended in 2024.
                </p>
                <div className="w-full mt-4 mb-4">
                  <ExampleTicket />
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col items-start space-y-4 text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-gray-100/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-2xl text-emerald-400 font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Get Your Wrapped
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Watch your personalized concert story and share it with
                  friends.
                </p>
                <img
                  src={start_img}
                  className="w-full mt-4 mb-4 rounded-2xl bg-black/20 border-2 border-white/10 backdrop-blur-md"
                ></img>
              </motion.div>
            </div>
            <div className="m-8 flex flex-col text-lg gap-2">
              <p className="text-left text-gray-200 font-bold">
                Having issues?
              </p>
              <button className="w-content text-gray-400 underline" onClick={handleReportBug}>report a bug</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-start text-left gap-4 mt-20">
            <motion.h1 className="text-3xl w-full font-bold mb-2 bg-gradient-to-r from-cyan-400 to-emerald-400 inline-block text-transparent bg-clip-text">
              What is CampusTicket?
            </motion.h1>
            <motion.p className="text-gray-300 text-md">
              CampusTicket is a platform for students to sell their concert and
              sports tickets to other students with no fees. We created Concerts
              Wrapped to give you your concerts stats for 2024 and get you ready
              for 2025.
            </motion.p>
            <motion.p className="text-gray-300 text-md">
              We are using your CampusTicket account to store your wrapped
              information so that you can compare your stats next year!
            </motion.p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-left gap-4 mt-20">
            <motion.h1 className="text-3xl w-full font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 inline-block text-transparent bg-clip-text">
              FAQs
            </motion.h1>
            <motion.div className="flex flex-col items-start gap-2 w-full rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md p-4">
              <motion.p className="text-white text-lg">
                Is Concerts Wrapped free?
              </motion.p>
              <motion.p className="text-gray-300 text-sm">
                Totally, 100% free just like CampusTicket. Make sure to share
                with your friends!
              </motion.p>
            </motion.div>
            <motion.div className="flex flex-col items-start gap-2 w-full rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md p-4">
              <motion.p className="text-white text-lg">
                Is it only for university students?
              </motion.p>
              <motion.p className="text-gray-300 text-sm">
                Currently we require a university email to signup or campusticket but we plan to
                expand to all students soon. Tap{" "}
                <a
                  href="https://subscribe.concertswrapped.com"
                  className="text-cyan-400"
                >
                  here
                </a>{" "}
                for phone reminders.
              </motion.p>
            </motion.div>
            <motion.div className="flex flex-col items-start gap-2 w-full rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md p-4">
              <motion.p className="text-white text-lg">
                Where does my data go?
              </motion.p>
              <motion.p className="text-gray-300 text-sm">
                We only store information regaurding the tickets that you submit
                and we are working on a feature to view your previous wraps
                right now.
              </motion.p>
            </motion.div>
            <motion.div className="flex flex-col items-start gap-2 w-full rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md p-4">
              <motion.p className="text-white text-lg">
                Does it still work if I only saw a few concerts?
              </motion.p>
              <motion.p className="text-gray-300 text-sm">
                Yes, it still works you might just not see as many stats.
              </motion.p>
            </motion.div>
          </div>
          <span className="text-gray-300 text-sm text-center pb-8 pt-8">
            <a
              href="https://campus-ticket.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>{" "}
            |{" "}
            <a
              href="https://campus-ticket.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>{" "}
            |{" "}
            <a
              href="https://campus-ticket.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CampusTicket
            </a>{" "}
            |{" "}
            <a
              href="https://instagram.com/campusticket"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </span>
        </div>
      </div>
      <BugReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;
