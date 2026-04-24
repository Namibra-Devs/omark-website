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

export const galleryApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/gallery', { params });
    return data.data ?? data;
  },

  categories: async () => {
    const { data } = await api.get('/gallery/categories');
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/gallery', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  bulkCreate: async (items) => {
    const { data } = await api.post('/gallery/bulk', { items });
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/gallery/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/gallery/${id}`);
    return data.data ?? data;
  },
};
