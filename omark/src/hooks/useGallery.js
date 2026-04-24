import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { galleryApi } from '../api/gallery';

export const useGallery = (params = {}) =>
  useQuery({
    queryKey: ['gallery', params],
    queryFn: () => galleryApi.list(params),
  });

export const useGalleryCategories = () =>
  useQuery({
    queryKey: ['gallery', 'categories'],
    queryFn: galleryApi.categories,
  });

export const useCreateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: galleryApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

export const useUpdateGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => galleryApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

export const useDeleteGalleryItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: galleryApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};

export const useBulkCreateGallery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: galleryApi.bulkCreate,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });
};
