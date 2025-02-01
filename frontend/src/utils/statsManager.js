const STATS_KEY = 'concerts_wrapped_stats';

export const getStats = () => {
  const stats = localStorage.getItem(STATS_KEY);
  return stats ? JSON.parse(stats) : { storiesGenerated: 0 };
};

export const incrementStoriesGenerated = () => {
  return 235;
}; 