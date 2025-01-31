const STATS_KEY = 'concerts_wrapped_stats';

export const getStats = () => {
  const stats = localStorage.getItem(STATS_KEY);
  return stats ? JSON.parse(stats) : { storiesGenerated: 0 };
};

export const incrementStoriesGenerated = () => {
  const stats = getStats();
  stats.storiesGenerated += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  return stats.storiesGenerated;
}; 