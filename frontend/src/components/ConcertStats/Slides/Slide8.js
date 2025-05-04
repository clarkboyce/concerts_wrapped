import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

function Slide8({ 
  numConcerts = 0,
  totalSpent = 0,
  topArtist = '-',
  topSeason = '-',
  topGenre = '-',
  topVenue = '-'
}) {

  const captureScreenshot = async () => {
    try {
      const element = document.querySelector('.slide-container');
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // Better quality for retina displays
        backgroundColor: null // Preserve transparency
      });
      
      return new Promise(resolve => {
        canvas.toBlob(blob => {
          resolve(blob);
        }, 'image/png', 1.0);
      });
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      return null;
    }
  };

  const handleShare = async () => {
    const shareUrl = process.env.REACT_APP_MAIN_DOMAIN_URL;
    const screenshot = await captureScreenshot();

    if (navigator.share && screenshot) {
      try {
        const file = new File([screenshot], 'concerts-wrapped.png', { type: 'image/png' });
        await navigator.share({
          title: '2024 Concerts Wrapped',
          text: 'Check out my concert stats for 2024!',
          url: shareUrl,
          files: [file]
        });
      } catch (error) {
        console.log('Error sharing:', error);
        await navigator.share({
          title: '2024 Concerts Wrapped',
          text: 'Check out your concert stats for 2024!',
          url: shareUrl
        });
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="slide-container w-full h-full flex flex-col items-center justify-center p-6 sm:p-[3vh]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full text-center"
      >
        <h1 className="text-2xl sm:text-xl text-white font-bold py-[2vh]">My 2024 Concerts Wrapped</h1>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:gap-3 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">🎤 Concerts</h2>
          <p className="text-sm sm:text-base text-blue-600 text-center font-bold break-words">{numConcerts}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">💸 Spending</h2>
          <p className="text-sm sm:text-base text-green-600 text-center font-bold break-words">${totalSpent}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-pink-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">🧑‍🎤 Top Artist</h2>
          <p className="text-sm sm:text-base text-pink-600 text-center font-bold break-words">{topArtist}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">🗓️ Top Season</h2>
          <p className="text-sm sm:text-base text-yellow-600 text-center font-bold break-words">{topSeason}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-purple-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">🎵 Top Genre</h2>
          <p className="text-sm sm:text-base text-purple-600 text-center font-bold break-words">{topGenre}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-orange-800 px-3 bg-opacity-20 py-[2.5vh] rounded-lg"
        >
          <h2 className="text-lg font-semibold text-gray-300 mb-[1vh]">🏟️ Top Venue</h2>
          <p className="text-sm sm:text-base text-orange-600 text-center font-bold break-words">{topVenue}</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 relative z-50 bg-gray-800 bg-opacity-40 rounded-lg px-4 py-[2vh] text-center"
      >
        <a href="https://www.campus-ticket.com" className="text-xl sm:text-lg text-white font-bold">Visit CampusTicket for $5 off your first ticket</a>
      </motion.div>

      <div className="text-center text-md text-gray-400 py-[2vh] sm:py-[1vh]">
        Special thanks to Spotify and Setlist.fm for support with data access.
      </div>



      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-2 relative z-50"
      >
        <button 
          onClick={handleShare}
          className="bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share concerts wrapped
        </button>
      </motion.div>

    </div>
  );
}

export default Slide8; 