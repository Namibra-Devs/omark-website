import api from '../lib/axios';

export const uploadApi = {
  image: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/upload/image', form);
    const d = data.data ?? data;
    return d.url ?? d.file;
  },

  file: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/upload/file', form);
    const d = data.data ?? data;
    return d.url ?? d.file;
  },
};
