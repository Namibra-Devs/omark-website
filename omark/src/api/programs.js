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

export const programsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/programs', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/programs/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/programs', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/programs/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/programs/${id}`);
    return data.data ?? data;
  },

  register: async (id, payload) => {
    const { data } = await api.post(`/programs/${id}/register`, payload);
    return data.data ?? data;
  },

  getRegistrations: async (id) => {
    const { data } = await api.get(`/programs/${id}/registrations`);
    return data.data ?? data;
  },
};
