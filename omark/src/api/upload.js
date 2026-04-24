import api from '../lib/axios';

export const uploadApi = {
  image: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/upload/image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return (data.data ?? data).url;
  },

  file: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/upload/file', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return (data.data ?? data).url;
  },
};
