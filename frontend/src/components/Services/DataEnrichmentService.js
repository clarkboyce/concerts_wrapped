import axios from 'axios';

// Define the API base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class DataEnrichmentService {
  /**
   * Sends a list of tickets to the backend for processing and enrichment.
   * @param {Array} tickets - The list of ticket objects to be processed.
   * @returns {Object} - The response data containing enriched concert information.
   */
  static async processTickets(tickets) {
    try {
      console.log('Sending tickets to backend:', tickets);
      const response = await axios.post(`${API_BASE_URL}/process-tickets`, { tickets });
      console.log('Response from backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error processing tickets:', error);
      throw error;
    }
  }
}

export default DataEnrichmentService;

