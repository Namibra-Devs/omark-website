import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../api/stats';

export const useOverallStats = () =>
  useQuery({
    queryKey: ['stats', 'overall'],
    queryFn: statsApi.overall,
    staleTime: 1000 * 60 * 2,
  });

export const useEventStats = () =>
  useQuery({
    queryKey: ['stats', 'events'],
    queryFn: statsApi.eventBreakdown,
  });

export const useProjectStats = () =>
  useQuery({
    queryKey: ['stats', 'projects'],
    queryFn: statsApi.projectBreakdown,
  });

export const useRecentActivity = () =>
  useQuery({
    queryKey: ['stats', 'activity'],
    queryFn: statsApi.recentActivity,
    staleTime: 1000 * 30,
  });
