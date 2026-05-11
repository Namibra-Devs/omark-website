import api from '../lib/axios';
import { uploadApi } from './upload';

export const careersApi = {
  list: async (params = {}) => {
    const { data } = await api.get('/jobs', { params });
    return data.data ?? data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/jobs/${id}`);
    return data.data ?? data;
  },

  create: async (payload) => {
    const { data } = await api.post('/jobs', payload);
    return data.data ?? data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`/jobs/${id}`, payload);
    return data.data ?? data;
  },

  remove: async (id) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data.data ?? data;
  },

  apply: async (id, { fullName, email, phone, coverLetter, resume }) => {
    const resumeUrl = await uploadApi.file(resume);
    const { data } = await api.post(`/jobs/${id}/apply`, { fullName, email, phone, coverLetter, resumeUrl });
    return data.data ?? data;
  },

  getApplications: async (id, params = {}) => {
    const { data } = await api.get(`/jobs/${id}/applications`, { params });
    return data.data ?? data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const { data } = await api.patch(`/jobs/applications/${applicationId}/status`, { status });
    return data.data ?? data;
  },

  exportApplicationsCsv: (id) =>
    `${api.defaults.baseURL}/jobs/${id}/applications/export`,
};
