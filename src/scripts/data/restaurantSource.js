import axios from 'axios';
import API_ENDPOINT from '../global/api-endpoint';

class RestaurantSource {
  static async getAll() {
    try {
      const response = await axios.get(API_ENDPOINT.GET_ALL);
      return ({ code: 'success', data: response.data.restaurants });
    } catch (error) {
      return ({ code: 'error', data: error });
    }
  }

  static async searchRestaurants(query) {
    try {
      const response = await axios.get(API_ENDPOINT.SEARCH(query));
      return ({ code: 'success', data: response.data.restaurants });
    } catch (error) {
      return ({ code: 'error', data: error });
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await axios.get(API_ENDPOINT.DETAIL(id));
      return ({ code: 'success', data: response.data.restaurant });
    } catch (error) {
      return ({ code: 'error', data: error });
    }
  }

  static async addReview(body) {
    try {
      const response = await axios.post(API_ENDPOINT.ADD_REVIEW, body);
      return ({ code: 'success', data: response.data.customerReviews });
    } catch (error) {
      return ({ code: 'error', data: error });
    }
  }
}

export default RestaurantSource;
