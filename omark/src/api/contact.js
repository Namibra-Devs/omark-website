import api from '../lib/axios';

export const contactApi = {
  submit: async (payload) => {
    const { data } = await api.post('/contact', payload);
    return data;
  },

  list: async (params = {}) => {
    const { data } = await api.get('/contacts', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/contacts/${id}`);
    return data.data ?? data;
  },

  updateStatus: async (id, status) => {
    const { data } = await api.patch(`/contacts/${id}/status`, { status });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data.data ?? data;
  },
};
