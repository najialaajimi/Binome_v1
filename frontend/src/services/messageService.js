import api from './api';

export const messageService = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (conversationId) => {
    const response = await api.get(`/messages/conversations/${conversationId}`);
    return response.data;
  },

  sendMessage: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get('/messages/unread');
    return response.data;
  }
};
