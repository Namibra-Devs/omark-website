import api, { setTokens, clearTokens } from '../lib/axios';

export const authApi = {
  login: async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = data.data ?? data;
    setTokens({ accessToken, refreshToken });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    return { accessToken, refreshToken, user };
  },

  register: async ({ name, email, password, phone }) => {
    const { data } = await api.post('/auth/register', { name, email, password, phone });
    return data.data ?? data;
  },

  refresh: async (refreshToken) => {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    const tokens = data.data ?? data;
    setTokens(tokens);
    return tokens;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async ({ token, password }) => {
    const { data } = await api.post('/auth/reset-password', { token, password });
    return data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearTokens();
    }
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data.data ?? data;
  },

  updateMe: async (payload) => {
    const { data } = await api.put('/auth/me', payload);
    return data.data ?? data;
  },
};
