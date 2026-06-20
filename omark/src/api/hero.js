import api from '../lib/axios';

const toFormData = (payload) => {
  const form = new FormData();
  Object.entries(payload).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (Array.isArray(val)) {
      val.forEach((v) => form.append(key, v));
    } else {
      form.append(key, val);
    }
  });
  return form;
};

export const heroApi = {
  list: async ({ all } = {}) => {
    const { data } = await api.get('/hero', { params: all ? { all: true } : {} });
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/hero', toFormData(payload));
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/hero/${id}`, toFormData(payload));
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/hero/${id}`);
    return data.data ?? data;
  },
};
