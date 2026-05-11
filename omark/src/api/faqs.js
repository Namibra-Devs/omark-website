import api from '../lib/axios';

export const faqsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/faq', { params });
    return data.data ?? data;
  },

  listAdmin: async (params = {}) => {
    const { data } = await api.get('/faq', { params });
    return data.data ?? data;
  },

  categories: async () => {
    const { data } = await api.get('/faq/categories');
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/faq/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/faq', payload);
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/faq/${id}`, payload);
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/faq/${id}`);
    return data.data ?? data;
  },
};
