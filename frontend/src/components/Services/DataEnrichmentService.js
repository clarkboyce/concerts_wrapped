import axios from 'axios';
import apiClient from '../api/client';

class DataEnrichmentService {
  /**
   * Sends a list of tickets to the backend for processing and enrichment.
   * @param {Array} tickets - The list of ticket objects to be processed.
   * @returns {Object} - The response data containing enriched concert information.
   */
  static async processTickets(tickets) {
    try {
      console.log('sending tix to bend:', tickets);
      const response = await apiClient.post('/process-tickets', { tickets });
      console.log('res from bend:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error processing tickets:', error);
      throw error;
    }
  }
}

export default DataEnrichmentService;

