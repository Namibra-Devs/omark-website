import api from '../lib/axios';

export const newsletterApi = {
  subscribe: async (email) => {
    const { data } = await api.post('/newsletter/subscribe', { email });
    return data;
  },

  unsubscribe: async (token) => {
    const { data } = await api.get(`/newsletter/unsubscribe/${token}`);
    return data;
  },

  list: async (params = {}) => {
    const { data } = await api.get('/newsletter/subscribers', { params });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/newsletter/subscribers/${id}`);
    return data.data ?? data;
  },

  send: async (payload) => {
    const { data } = await api.post('/newsletter/send', payload);
    return data;
  },
};
