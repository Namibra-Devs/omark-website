import api from '../lib/axios';

export const faqsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/faqs', { params });
    return data.data ?? data;
  },

  listAdmin: async (params = {}) => {
    const { data } = await api.get('/faqs/all', { params });
    return data.data ?? data;
  },

  categories: async () => {
    const { data } = await api.get('/faqs/categories');
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/faqs/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/faqs', payload);
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/faqs/${id}`, payload);
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/faqs/${id}`);
    return data.data ?? data;
  },
};
