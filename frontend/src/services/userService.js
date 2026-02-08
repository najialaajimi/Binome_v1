import api from './api';

export const userService = {
  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addFavorite: async (listingId) => {
    const response = await api.post(`/users/favorites/${listingId}`);
    return response.data;
  },

  removeFavorite: async (listingId) => {
    const response = await api.delete(`/users/favorites/${listingId}`);
    return response.data;
  }
};
