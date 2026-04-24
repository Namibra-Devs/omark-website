import api from '../lib/axios';

export const testimonialsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/testimonials', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/testimonials/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/testimonials', payload);
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/testimonials/${id}`, payload);
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/testimonials/${id}`);
    return data.data ?? data;
  },
};
