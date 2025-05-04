class ConcertDataServices {
  // Constants for calculations
  static SONG_LENGTH_MINUTES = 4; // Average song length

  // Main data processing function
  static processConcertData(concerts) {
    if (!concerts || !Array.isArray(concerts)) {
      console.error("Invalid concerts data:", concerts);
      throw new Error("Concerts data must be an array");
    }



    // Calculate all required data
    const totalMinutes = this.calculateTotalMinutes(concerts);
    const totalConcerts = concerts.length;
    const totalSpent = this.calculateTotalSpent(concerts);
    // maxAvgPrice and actualPrice are slightly iffy for right now. @clark @shiv
    const { maxAvgPrice, actualPrice } =
      this.findMostExpensiveTicketInfo(concerts);
    const artistGenres = this.mapArtistsToGenres(concerts);
    const genreCounts = this.calculateGenreCounts(concerts);
    const seasonalData = this.calculateSeasonalDistribution(concerts);
    const venueCapacities = this.getUniqueVenues(concerts);
    const concertAttendance = this.getConcertAttendance(concerts);
    const mostVisitedVenueInfo = this.findMostVisitedVenueInfo(concerts);
    const artistCounts = this.calculateArtistCounts(concerts);

    return {
      totalMinutes,
      totalConcerts,
      totalSpent,
      avgEventPrice: totalSpent / totalConcerts,
      maxAvgPrice,
      actualPrice,
      artistGenres,
      genreCounts,
      seasonalData,
      venues: Object.keys(venueCapacities),
      concertAttendance,
      uniqueVenueCount: Object.keys(venueCapacities).length,
      topVenue: mostVisitedVenueInfo.venueName,
      topVenueCapacity: mostVisitedVenueInfo.capacity,
      topVenueCity: mostVisitedVenueInfo.city,
      topVenueState: mostVisitedVenueInfo.state,
      artistCounts,
      topArtist: this.calculateTopArtistData(concerts),
    };
  }

  // Helper functions
  static calculateTotalMinutes(concerts) {
    return concerts.reduce((total, concert) => {
      const numSongs = concert.number_of_songs || 15;
      console.log("numSongs:", numSongs);
      console.log("ret minutes from numSongs:", total + numSongs * this.SONG_LENGTH_MINUTES);
      return total + numSongs * this.SONG_LENGTH_MINUTES;
    }, 0);
  }

  static calculateTotalSpent(concerts) {
    return concerts.reduce((total, concert) => {
      let price = concert.price ? parseFloat(concert.price) : 0;
  
      // if price is 0, simulate a random price between 50–120
      if (!price || isNaN(price)) {
        price = parseFloat((Math.random() * (120 - 50) + 50).toFixed(2));
      }
  
      console.log("Final price used:", price);
      return total + price;
    }, 0);
  }  
  

  static calculateSeasonalDistribution(concerts) {
    const seasons = {
      spring: 0,
      summer: 0,
      fall: 0,
      winter: 0,
    };

    concerts.forEach((concert) => {
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
      const venueName = concert.venue;
      const capacity = concert.venue;
      if (!acc[venueName]) {
        acc[venueName] = {
          count: 0,
          capacity: capacity,
          city: concert.city,
          state: concert.state,
          name: venueName,
        };
      }
      acc[venueName].count++;
      return acc;
    }, {});

    const mostVisitedVenues = Object.values(venueVisits).sort(
      (a, b) => b.count - a.count || (b.capacity || 0) - (a.capacity || 0)
    );

    return {
      venueName: mostVisitedVenues[0]?.name || null,
      capacity: mostVisitedVenues[0]?.capacity || null,
      city: mostVisitedVenues[0]?.city || null,
      state: mostVisitedVenues[0]?.state || null,
    };
  }


  static calculateTopArtistData(concerts) {
    console.log('topartistdata input:', concerts); 
    
    // Validate input
    if (!concerts || !Array.isArray(concerts) || concerts.length === 0) {
      console.warn('Invalid or empty concerts array');
      return null; // Or return a default value like "Unknown Artist"
    }
    
    const artistCounts = {};
    
    concerts.forEach((concert) => {
      artistCounts[concert.artist] = (artistCounts[concert.artist] || 0) + 1;
    });

    // Find the highest count
    const maxCount = Math.max(...Object.values(artistCounts));

    // Get all artists with that count
    const topArtists = Object.entries(artistCounts).filter(
      ([_, count]) => count === maxCount
    );

    // Pick a random artist from those with the highest count
    const [artistName] =
      topArtists[Math.floor(Math.random() * topArtists.length)];

    console.log("topartistname:", artistName);
    return artistName;
  }


  static mapArtistsToGenres(concerts) {
    return concerts.reduce((map, concert) => {
      map[concert.artist] = concert.genres;
      console.log("ret map2genres");
      return map;
    }, {});
  }


  static calculateGenreCounts(concerts) {
    return concerts.reduce((counts, concert) => {
      let genres = [];
      console.log("ret genre from calcgenrecounts:", genres);
      // Handle different genre formats
      if (Array.isArray(concert.genres)) {
        genres = concert.genres;
      } else if (typeof concert.genres === 'string') {
        // If the genres are a comma-separated string, split them into individual genres
        genres = concert.genres.split(',').map(genre => genre.trim());
      }
  
      // Only process if genres exists and isn't null/undefined
      if (genres.length > 0) {
        genres.forEach(genre => {
          counts[genre] = (counts[genre] || 0) + 1;
        });
      }
      console.log("ret genrecounts:", counts);
      return counts;
    }, {});
  }

  static getUniqueVenues(concerts) {
    const venues = [...new Set(concerts.map((concert) => concert.venue))];
    return venues.reduce((acc, venueName) => {
      const venueInfo = concerts.find((concert) => concert.venue === venueName);
      acc[venueName] = venueInfo.capacity;
      console.log("ret uniqueVenues:", acc);
      return acc;
    }, {});
  }

  static findMostExpensiveTicketInfo(concerts) {
    console.log("starting finding most expensive ticket");
    const sortedByPrice = [...concerts].sort((a, b) => {
      return (b["avg price"] || 0) - (a["avg price"] || 0);
    });
    const mostExpensiveEvent = sortedByPrice[0] || {};
    console.log("found most expensive ticket");
    return {
      maxAvgPrice: mostExpensiveEvent["avg price"] || 0,
      actualPrice: mostExpensiveEvent.price || 0,
    };
  }

  static calculateArtistCounts(concerts) {
    return concerts.reduce((counts, concert) => {
      counts[concert.artist] = (counts[concert.artist] || 0) + 1;
      console.log("ret artistNum:", counts);
      return counts;
    }, {});
  }

  static getConcertAttendance(concerts) {
    // First, sort concerts by capacity to identify the largest
    const sortedConcerts = [...concerts].sort(
      (a, b) => b.capacity - a.capacity
    );
    const largestVenue = sortedConcerts[0]?.venue;

    console.log("ret concertattendance");
    return concerts
      .map((concert) => ({
        artist: concert.artist,
        venue: concert.venue,
        capacity:
          concert.capacity === 0 // If capacity is 0, default to 500
            ? 500
            : concert.venue === largestVenue
            ? concert.capacity // Keep original capacity for largest venue
            : Math.round(
                concert.capacity * (0.85 + Math.random() * 0.15)
              ), // Random between 85-100% for others
      }))
      .sort((a, b) => b.capacity - a.capacity);
    }
}

export default ConcertDataServices;

