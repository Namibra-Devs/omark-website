import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsApi } from '../api/news';

export const useNews = (params = {}) =>
  useQuery({
    queryKey: ['news', params],
    queryFn: () => newsApi.list(params),
  });

export const useNewsArticle = (id) =>
  useQuery({
    queryKey: ['news', id],
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
  });

export const useCreateNewsArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

export const useUpdateNewsArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => newsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

export const useDeleteNewsArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: newsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news'] }),
  });
};

export const useLikeArticle = () =>
  useMutation({ mutationFn: (id) => newsApi.like(id) });
