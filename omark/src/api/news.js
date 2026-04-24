import api from '../lib/axios';

const toFormData = (payload) => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    form.append(key, val);
  });
  return form;
};

export const newsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/news', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/news/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/news', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/news/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/news/${id}`);
    return data.data ?? data;
  },

  incrementView: async (id) => {
    const { data } = await api.post(`/news/${id}/view`);
    return data;
  },

  like: async (id) => {
    const { data } = await api.post(`/news/${id}/like`);
    return data;
  },
};
