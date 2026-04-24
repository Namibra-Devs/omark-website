import api from '../lib/axios';

export const statsApi = {
  overall: async () => {
    const { data } = await api.get('/stats');
    return data.data ?? data;
  },

  eventBreakdown: async () => {
    const { data } = await api.get('/stats/events');
    return data.data ?? data;
  },

  projectBreakdown: async () => {
    const { data } = await api.get('/stats/projects');
    return data.data ?? data;
  },

  recentActivity: async () => {
    const { data } = await api.get('/stats/activity');
    return data.data ?? data;
  },
};
