import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '../api/contact';

export const useSubmitContact = () =>
  useMutation({ mutationFn: contactApi.submit });

export const useContactMessages = (params = {}) =>
  useQuery({
    queryKey: ['contact', params],
    queryFn: () => contactApi.list(params),
  });

export const useUpdateContactStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => contactApi.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact'] }),
  });
};

export const useDeleteContactMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: contactApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact'] }),
  });
};
