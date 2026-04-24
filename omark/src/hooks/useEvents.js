import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events';

export const useEvents = (params = {}) =>
  useQuery({
    queryKey: ['events', params],
    queryFn: () => eventsApi.list(params),
  });

export const useUpcomingEvents = (limit = 5) =>
  useQuery({
    queryKey: ['events', 'upcoming', limit],
    queryFn: () => eventsApi.upcoming(limit),
  });

export const useEvent = (id) =>
  useQuery({
    queryKey: ['events', id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  });

export const useCreateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useUpdateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }) => eventsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};

export const useRegisterForEvent = (eventId) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => eventsApi.register(eventId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events', eventId] }),
  });
};

export const useEventRegistrations = (id) =>
  useQuery({
    queryKey: ['events', id, 'registrations'],
    queryFn: () => eventsApi.getRegistrations(id),
    enabled: !!id,
  });

export const useCancelRegistration = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: eventsApi.cancelRegistration,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
};
