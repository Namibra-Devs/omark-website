import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { careersApi } from '../api/careers';

export const useCareers = (params = {}) =>
  useQuery({
    queryKey: ['careers', params],
    queryFn: () => careersApi.list(params),
  });

export const useCareer = (id) =>
  useQuery({
    queryKey: ['careers', id],
    queryFn: () => careersApi.getById(id),
    enabled: !!id,
  });

export const useCreateCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: careersApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['careers'] }),
  });
};

export const useUpdateCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => careersApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['careers'] }),
  });
};

export const useDeleteCareer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: careersApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['careers'] }),
  });
};

export const useApplyForJob = (jobId) =>
  useMutation({ mutationFn: (payload) => careersApi.apply(jobId, payload) });

export const useJobApplications = (id, params = {}) =>
  useQuery({
    queryKey: ['careers', id, 'applications', params],
    queryFn: () => careersApi.getApplications(id, params),
    enabled: !!id,
  });

export const useUpdateApplicationStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => careersApi.updateApplicationStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['careers'] }),
  });
};
