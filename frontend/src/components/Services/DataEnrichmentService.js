import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class DataEnrichmentService {
  /**
   * Sends a list of tickets to the backend for processing and enrichment.
   * @param {Array} tickets - The list of ticket objects to be processed.
   * @returns {Object} - The response data containing enriched concert information.
   */
  static async processTickets(tickets) {
    try {
      console.log('sending tix to bend:', tickets);
      // @shiv routedne
      const response = await axios.post(`${API_BASE_URL}/process-tickets`, { tickets });
      console.log('res from bend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error processing tickets:', error);
      throw error;
    }
  }
}

export default DataEnrichmentService;


