import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { testimonialsApi } from '../api/testimonials';

export const useTestimonials = (params = {}) =>
  useQuery({
    queryKey: ['testimonials', params],
    queryFn: () => testimonialsApi.list(params),
  });

export const useCreateTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: testimonialsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

export const useUpdateTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => testimonialsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

export const useDeleteTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: testimonialsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};
