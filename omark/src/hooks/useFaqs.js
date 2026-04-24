import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { faqsApi } from '../api/faqs';

export const useFaqs = ({ enabled = true, ...params } = {}) =>
  useQuery({
    queryKey: ['faqs', params],
    queryFn: () => faqsApi.list(params),
    enabled,
  });

export const useFaqsAdmin = (params = {}) =>
  useQuery({
    queryKey: ['faqs', 'admin', params],
    queryFn: () => faqsApi.listAdmin(params),
  });

export const useFaqCategories = () =>
  useQuery({
    queryKey: ['faqs', 'categories'],
    queryFn: faqsApi.categories,
  });

export const useCreateFaq = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: faqsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['faqs'] }),
  });
};

export const useUpdateFaq = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => faqsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['faqs'] }),
  });
};

export const useDeleteFaq = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: faqsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['faqs'] }),
  });
};
