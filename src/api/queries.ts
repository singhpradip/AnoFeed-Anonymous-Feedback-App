import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { AUTH_QUERY_KEYS, TEAMS_QUERY_KEYS, FEEDBACK_QUERY_KEYS } from './keys';
import {
  fetchUserProfile,
  fetchTeams,
  fetchTeamDetails,
  fetchTeamMembers,
  fetchUserTeams,
  fetchReceivedFeedback,
  fetchGivenFeedback,
  fetchTeamFeedback,
  fetchFeedbackDetails,
  fetchDashboardStats,
  fetchTeamAnalytics,
} from './services';
import type {
  User,
  Team,
  TeamMember,
  Feedback,
  FeedbackWithUser,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  DashboardStats,
  TeamAnalytics,
} from '../types';

// Auth Queries
export const useUserProfileQuery = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}): UseQueryResult<ApiResponse<User>> =>
  useQuery({
    queryKey: [AUTH_QUERY_KEYS.PROFILE],
    queryFn: fetchUserProfile,
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

// Teams Queries
export const useTeamsQuery = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: PaginationParams;
} = {}): UseQueryResult<ApiResponse<PaginatedResponse<Team>>> =>
  useQuery({
    queryKey: [TEAMS_QUERY_KEYS.ALL_TEAMS, params],
    queryFn: () => fetchTeams(params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

export const useTeamDetailsQuery = ({
  enabled = false,
  teamId,
}: {
  enabled?: boolean;
  teamId?: string;
}): UseQueryResult<ApiResponse<Team>> =>
  useQuery({
    queryKey: [TEAMS_QUERY_KEYS.TEAM_DETAILS, teamId],
    queryFn: () => fetchTeamDetails(teamId!),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!teamId,
  });

export const useTeamMembersQuery = ({
  enabled = false,
  teamId,
  params,
}: {
  enabled?: boolean;
  teamId?: string;
  params?: PaginationParams;
}): UseQueryResult<ApiResponse<PaginatedResponse<TeamMember>>> =>
  useQuery({
    queryKey: [TEAMS_QUERY_KEYS.TEAM_MEMBERS, teamId, params],
    queryFn: () => fetchTeamMembers(teamId!, params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!teamId,
  });

export const useUserTeamsQuery = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}): UseQueryResult<ApiResponse<Team[]>> =>
  useQuery({
    queryKey: [TEAMS_QUERY_KEYS.USER_TEAMS],
    queryFn: fetchUserTeams,
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

// Feedback Queries
export const useReceivedFeedbackQuery = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: PaginationParams & { teamId?: string };
} = {}): UseQueryResult<ApiResponse<PaginatedResponse<FeedbackWithUser>>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.RECEIVED_FEEDBACK, params],
    queryFn: () => fetchReceivedFeedback(params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

export const useGivenFeedbackQuery = ({
  enabled = true,
  params,
}: {
  enabled?: boolean;
  params?: PaginationParams & { teamId?: string };
} = {}): UseQueryResult<ApiResponse<PaginatedResponse<Feedback>>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.GIVEN_FEEDBACK, params],
    queryFn: () => fetchGivenFeedback(params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

export const useTeamFeedbackQuery = ({
  enabled = false,
  teamId,
  params,
}: {
  enabled?: boolean;
  teamId?: string;
  params?: PaginationParams;
}): UseQueryResult<ApiResponse<PaginatedResponse<FeedbackWithUser>>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.TEAM_FEEDBACK, teamId, params],
    queryFn: () => fetchTeamFeedback(teamId!, params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!teamId,
  });

export const useFeedbackDetailsQuery = ({
  enabled = false,
  feedbackId,
}: {
  enabled?: boolean;
  feedbackId?: string;
}): UseQueryResult<ApiResponse<FeedbackWithUser>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.FEEDBACK_DETAILS, feedbackId],
    queryFn: () => fetchFeedbackDetails(feedbackId!),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!feedbackId,
  });

export const useDashboardStatsQuery = ({
  enabled = true,
  teamId,
}: {
  enabled?: boolean;
  teamId?: string;
} = {}): UseQueryResult<ApiResponse<DashboardStats>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.DASHBOARD_STATS, teamId],
    queryFn: () => fetchDashboardStats(teamId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled,
  });

export const useTeamAnalyticsQuery = ({
  enabled = false,
  teamId,
  params,
}: {
  enabled?: boolean;
  teamId?: string;
  params?: { startDate?: string; endDate?: string };
}): UseQueryResult<ApiResponse<TeamAnalytics>> =>
  useQuery({
    queryKey: [FEEDBACK_QUERY_KEYS.TEAM_ANALYTICS, teamId, params],
    queryFn: () => fetchTeamAnalytics(teamId!, params),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled && !!teamId,
  }); 