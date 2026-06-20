import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { heroApi } from '../api/hero';

export const useHero = (params = {}) =>
  useQuery({
    queryKey: ['hero', params],
    queryFn: () => heroApi.list(params),
  });

export const useCreateHeroSlide = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: heroApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hero'] }),
  });
};

export const useUpdateHeroSlide = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => heroApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hero'] }),
  });
};

export const useDeleteHeroSlide = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: heroApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hero'] }),
  });
};
