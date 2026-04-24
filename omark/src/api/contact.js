import api from '../lib/axios';

export const contactApi = {
  submit: async (payload) => {
    const { data } = await api.post('/contact', payload);
    return data;
  },

  list: async (params = {}) => {
    const { data } = await api.get('/contact', { params });
    return data.data ?? data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/contact/${id}/status`, { status });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/contact/${id}`);
    return data.data ?? data;
  },
};
