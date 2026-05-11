import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { programsApi } from '../api/programs';

export const usePrograms = (params = {}) =>
  useQuery({
    queryKey: ['programs', params],
    queryFn: () => programsApi.list(params),
  });

export const useProgram = (id) =>
  useQuery({
    queryKey: ['programs', id],
    queryFn: () => programsApi.getById(id),
    enabled: !!id,
  });

export const useCreateProgram = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: programsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['programs'] }),
  });
};

export const useUpdateProgram = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => programsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['programs'] }),
  });
};

export const useDeleteProgram = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: programsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['programs'] }),
  });
};

export const useProgramRegistrations = (id) =>
  useQuery({
    queryKey: ['programs', id, 'registrations'],
    queryFn: () => programsApi.getRegistrations(id),
    enabled: !!id,
  });
