import { motion } from 'framer-motion';

function Slide7({ stats }) {
  const handleShare = async () => {
    const shareUrl = 'concertswrapped.com'; // Replace with your actual URL

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My 2024 Concerts Wrapped',
          text: 'Check out my concert stats for 2024!',
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard if share API is not available
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!'); // Or use a more elegant notification
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full text-center mb-6"
      >
        <h1 className="text-2xl font-bold mb-4">My 2024 Concerts Wrapped</h1>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Num Concerts</h2>
          <p className="text-xl">{stats?.numConcerts || '0'}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Spending</h2>
          <p className="text-xl">${stats?.totalSpent || '0'}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Top Artist</h2>
          <p className="text-xl">{stats?.topArtist || '-'}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Top Season</h2>
          <p className="text-xl">{stats?.topSeason || '-'}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Top Genre</h2>
          <p className="text-xl">{stats?.topGenre || '-'}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 p-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">Top Venue</h2>
          <p className="text-xl">{stats?.topVenue || '-'}</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 relative z-50"
      >
        <button 
          onClick={handleShare}
          className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          Share your wrapped
        </button>
      </motion.div>

    </div>
  );
}

export default Slide7; 