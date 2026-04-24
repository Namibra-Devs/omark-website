import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsletterApi } from '../api/newsletter';

export const useSubscribeNewsletter = () =>
  useMutation({ mutationFn: (email) => newsletterApi.subscribe(email) });

export const useNewsletterSubscribers = (params = {}) =>
  useQuery({
    queryKey: ['newsletter', 'subscribers', params],
    queryFn: () => newsletterApi.list(params),
  });

export const useRemoveSubscriber = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: newsletterApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['newsletter'] }),
  });
};

export const useSendNewsletter = () =>
  useMutation({ mutationFn: newsletterApi.send });
