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

export const eventsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/events', { params });
    return data.data ?? data;
  },

  upcoming: async (limit = 5) => {
    const { data } = await api.get('/events/upcoming', { params: { limit } });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/events/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/events', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/events/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/events/${id}`);
    return data.data ?? data;
  },

  register: async (id, payload) => {
    const { data } = await api.post(`/events/${id}/register`, payload);
    return data.data ?? data;
  },

  getRegistrations: async (id) => {
    const { data } = await api.get(`/events/${id}/registrations`);
    return data.data ?? data;
  },

  cancelRegistration: async (registrationId) => {
    const { data } = await api.delete(`/events/registrations/${registrationId}`);
    return data.data ?? data;
  },

  exportRegistrationsCsv: (id) =>
    `${api.defaults.baseURL}/events/${id}/registrations/export`,
};
