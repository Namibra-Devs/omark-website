import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../api/projects';

export const useProjects = (params = {}) =>
  useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsApi.list(params),
  });

export const useProject = (id) =>
  useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => projectsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useProjectGallery = (id) =>
  useQuery({
    queryKey: ['projects', id, 'gallery'],
    queryFn: () => projectsApi.getGallery(id),
    enabled: !!id,
  });

export const useAddProjectGalleryImage = (projectId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => projectsApi.addGalleryImage(projectId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects', projectId, 'gallery'] }),
  });
};

export const useRemoveProjectGalleryImage = (projectId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (imageId) => projectsApi.removeGalleryImage(projectId, imageId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects', projectId, 'gallery'] }),
  });
};
