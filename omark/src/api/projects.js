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

export const projectsApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/projects', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/projects/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/projects', toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/projects/${id}`, toFormData(payload), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data.data ?? data;
  },

  getGallery: async (id) => {
    const { data } = await api.get(`/projects/${id}/gallery`);
    return data.data ?? data;
  },

  addGalleryImage: async (id, payload) => {
    const form = toFormData(payload);
    const { data } = await api.post(`/projects/${id}/gallery`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data ?? data;
  },

  removeGalleryImage: async (id, imageId) => {
    const { data } = await api.delete(`/projects/${id}/gallery/${imageId}`);
    return data.data ?? data;
  },
};
