import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { clearTokens } from '../lib/axios';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data.user);
      navigate('/admin');
    },
  });
};

export const useRegister = () =>
  useMutation({ mutationFn: authApi.register });

export const useForgotPassword = () =>
  useMutation({ mutationFn: (email) => authApi.forgotPassword(email) });

export const useResetPassword = () =>
  useMutation({ mutationFn: authApi.resetPassword });

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearTokens();
      queryClient.clear();
      navigate('/login');
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    enabled: !!localStorage.getItem('accessToken'),
    retry: false,
  });

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateMe,
    onSuccess: (data) => queryClient.setQueryData(['me'], data),
  });
};
