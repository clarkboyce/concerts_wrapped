class ConcertDataServices {
  // Constants for calculations
  static SONG_LENGTH_MINUTES = 4; // Average song length
  static TIERS = {
    PLATINUM: 10,
    GOLD: 5,
    SILVER: 3,
    BRONZE: 1
  };

  // Main data processing function
  static processConcertData(enrichedConcerts) {
    if (!enrichedConcerts || !Array.isArray(enrichedConcerts)) {
      console.error('Invalid concerts data:', enrichedConcerts);
      throw new Error('Concerts data must be an array');
    }

    // Calculate all required data
    const totalMinutes = this.calculateTotalMinutes(enrichedConcerts);
    const totalConcerts = enrichedConcerts.length;
    const totalSpent = this.calculateTotalSpent(enrichedConcerts);
    const { maxAvgPrice, actualPrice } = this.findMostExpensiveTicketInfo(enrichedConcerts);
    const artistGenres = this.mapArtistsToGenres(enrichedConcerts);
    const genreCounts = this.calculateGenreCounts(enrichedConcerts);
    const seasonalData = this.calculateSeasonalDistribution(enrichedConcerts);
    const venues = this.getUniqueVenues(enrichedConcerts);
    const mostVisitedVenueInfo = this.findMostVisitedVenueInfo(enrichedConcerts);

    return {
      totalMinutes,
      totalConcerts,
      tiers: this.TIERS,
      totalSpent,
      avgEventPrice: totalSpent / totalConcerts,
      maxAvgPrice,
      actualPrice,
      artistGenres,
      genreCounts,
      seasonalData,
      uniqueVenueCount: venues.length,
      topVenue: mostVisitedVenueInfo.venueName,
      topVenueCapacity: mostVisitedVenueInfo.capacity,
      topVenueCity: mostVisitedVenueInfo.city,
      topVenueState: mostVisitedVenueInfo.state
    };
  }

  // Helper functions
  static calculateTotalMinutes(concerts) {
    return concerts.reduce((total, concert) => {
      const numSongs = concert.performance?.num_songs || 15; // Updated to match server output
      return total + (numSongs * this.SONG_LENGTH_MINUTES);
    }, 0);
  }

  static calculateTotalSpent(concerts) {
    return concerts.reduce((total, concert) => {
      return total + (concert.price || 0);
    }, 0);
  }

  static calculateSeasonalDistribution(concerts) {
    const seasons = {
      spring: 0,
      summer: 0,
      fall: 0,
      winter: 0
    };

    concerts.forEach(concert => {
      const date = new Date(concert.date);
      const month = date.getMonth();
      
      if (month >= 2 && month <= 4) seasons.spring++;
      else if (month >= 5 && month <= 7) seasons.summer++;
      else if (month >= 8 && month <= 10) seasons.fall++;
      else seasons.winter++;
    });

    return seasons;
  }

  static findMostVisitedVenueInfo(concerts) {
    const venueVisits = concerts.reduce((acc, concert) => {
      const venueName = concert.venue.name;
      if (!acc[venueName]) {
        acc[venueName] = {
          count: 0,
          capacity: concert.venue.capacity,
          city: concert.venue.city,
          state: concert.venue.state,
          name: venueName
        };
      }
      acc[venueName].count++;
      return acc;
    }, {});

    const mostVisitedVenues = Object.values(venueVisits)
      .sort((a, b) => b.count - a.count || (b.capacity || 0) - (a.capacity || 0));

    return {
      venueName: mostVisitedVenues[0]?.name || null,
      capacity: mostVisitedVenues[0]?.capacity || null,
      city: mostVisitedVenues[0]?.city || null,
      state: mostVisitedVenues[0]?.state || null
    };
  }

  static findMostVisitedCity(concerts) {
    const cityCounts = concerts.reduce((acc, concert) => {
      acc[concert.venue.city] = (acc[concert.venue.city] || 0) + 1;
      return acc;
    }, {});

    const mostVisitedCity = Object.entries(cityCounts)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      cityName: mostVisitedCity[0],
      visitCount: mostVisitedCity[1]
    };
  }

  static calculateUniqueVenues(concerts) {
    // Count unique venues (would need venue standardization)
    const uniqueVenues = new Set(concerts.map(concert => concert.venue.name));
    return uniqueVenues.size;
  }

  // New helper methods
  static calculateGenreData(concerts) {
    const genreCounts = {};
    const artistsByGenre = {};
    
    concerts.forEach(concert => {
      concert.artist.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        if (!artistsByGenre[genre]) {
          artistsByGenre[genre] = new Set();
        }
        artistsByGenre[genre].add(concert.artist.name);
      });
    });

    const topGenre = Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    return {
      topGenre,
      uniqueGenres: Object.keys(genreCounts).length,
      topGenreArtists: Array.from(artistsByGenre[topGenre] || []).slice(0, 3)
    };
  }

  static calculateVenueData(concerts) {
    const venueCounts = {};
    const cityCounts = {};

    concerts.forEach(concert => {
      const venueName = concert.venue.name;
      const cityName = concert.venue.city;
      
      venueCounts[venueName] = (venueCounts[venueName] || 0) + 1;
      cityCounts[cityName] = (cityCounts[cityName] || 0) + 1;
    });

    return {
      topVenue: Object.entries(venueCounts)
        .sort(([,a], [,b]) => b - a)[0][0],
      topCity: Object.entries(cityCounts)
        .sort(([,a], [,b]) => b - a)[0][0],
      uniqueVenues: Object.keys(venueCounts).length
    };
  }

  static calculateTopArtistData(concerts) {
    const artistCounts = {};
    concerts.forEach(concert => {
      artistCounts[concert.artist.name] = (artistCounts[concert.artist.name] || 0) + 1;
    });

    const [name, count] = Object.entries(artistCounts)
      .sort(([,a], [,b]) => b - a)[0];

    return { name, count };
  }

  static determineTopSeason(seasonalData) {
    const seasons = Object.entries(seasonalData)
      .sort(([,a], [,b]) => b - a);
    return seasons[0][0].charAt(0).toUpperCase() + seasons[0][0].slice(1);
  }

  static calculateTotalFanCount(concerts) {
    // Estimate based on venue capacities or use actual attendance if available
    return concerts.reduce((total, concert) => 
      total + (concert.venue.capacity || 1000), 0);
  }

  static findMostExpensiveEvent(concerts) {
    return Math.max(...concerts.map(concert => concert.price));
  }

  static mapArtistsToGenres(concerts) {
    return concerts.reduce((map, concert) => {
      map[concert.artist.name] = concert.artist.genres;
      return map;
    }, {});
  }

  static calculateGenreCounts(concerts) {
    return concerts.reduce((counts, concert) => {
      concert.artist.genres.forEach(genre => {
        counts[genre] = (counts[genre] || 0) + 1;
      });
      return counts;
    }, {});
  }

  static getUniqueVenues(concerts) {
    return [...new Set(concerts.map(concert => ({
      name: concert.venue.name,
      city: concert.venue.city,
      state: concert.venue.state,
      capacity: concert.venue.capacity
    })))];
  }

  static findMostExpensiveTicketInfo(concerts) {
    const sortedByPrice = [...concerts].sort((a, b) => {
      return (b.average_ticket_price || 0) - (a.average_ticket_price || 0);
    });
    const mostExpensiveEvent = sortedByPrice[0] || {};
    
    return {
      maxAvgPrice: mostExpensiveEvent.average_ticket_price || 0,
      actualPrice: mostExpensiveEvent.price || 0
    };
  }
}

export default ConcertDataServices;
