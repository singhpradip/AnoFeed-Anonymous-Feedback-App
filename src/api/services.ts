import type { MutationFunction } from '@tanstack/react-query';
import { API } from '../lib/api';
import { AUTH_ENDPOINTS, TEAM_ENDPOINTS, FEEDBACK_ENDPOINTS } from '../constants';
import type {
  User,
  Team,
  TeamMember,
  Feedback,
  FeedbackWithUser,
  LoginData,
  RegisterData,
  CreateTeamData,
  CreateFeedbackData,
  TeamInviteData,
  UpdateUserRoleData,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  DashboardStats,
  TeamAnalytics,
} from "../types";

// Auth Services
export const loginUser: MutationFunction<
  ApiResponse<{ user: User; token: string }>,
  LoginData
> = async (data) => {
  const response = await API.post(AUTH_ENDPOINTS.LOGIN, data);
  return response.data;
};

export const registerUser: MutationFunction<
  ApiResponse<{ user: User; token: string }>,
  RegisterData
> = async (data) => {
  const response = await API.post(AUTH_ENDPOINTS.REGISTER, data);
  return response.data;
};

export const logoutUser: MutationFunction<ApiResponse> = async () => {
  const response = await API.post(AUTH_ENDPOINTS.LOGOUT);
  return response.data;
};

export const fetchUserProfile = async (): Promise<ApiResponse<User>> => {
  const response = await API.get(AUTH_ENDPOINTS.PROFILE);
  return response.data;
};

export const updateUserProfile: MutationFunction<
  ApiResponse<User>,
  Partial<User>
> = async (data) => {
  const response = await API.patch(AUTH_ENDPOINTS.PROFILE, data);
  return response.data;
};

export const changePassword: MutationFunction<
  ApiResponse,
  { currentPassword: string; newPassword: string }
> = async (data) => {
  const response = await API.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
  return response.data;
};

// Team Services
export const fetchTeams = async (
  params?: PaginationParams
): Promise<ApiResponse<PaginatedResponse<Team>>> => {
  const response = await API.get(TEAM_ENDPOINTS.TEAMS, { params });
  return response.data;
};

export const fetchTeamDetails = async (teamId: string): Promise<ApiResponse<Team>> => {
  const response = await API.get(TEAM_ENDPOINTS.TEAM_DETAILS(teamId));
  return response.data;
};

export const fetchTeamMembers = async (
  teamId: string,
  params?: PaginationParams
): Promise<ApiResponse<PaginatedResponse<TeamMember>>> => {
  const response = await API.get(TEAM_ENDPOINTS.TEAM_MEMBERS(teamId), { params });
  return response.data;
};

export const fetchUserTeams = async (): Promise<ApiResponse<Team[]>> => {
  const response = await API.get(TEAM_ENDPOINTS.MY_TEAMS);
  return response.data;
};

export const createTeam: MutationFunction<
  ApiResponse<Team>,
  CreateTeamData
> = async (data) => {
  const response = await API.post(TEAM_ENDPOINTS.TEAMS, data);
  return response.data;
};

export const updateTeam: MutationFunction<
  ApiResponse<Team>,
  { teamId: string; data: Partial<CreateTeamData> }
> = async ({ teamId, data }) => {
  const response = await API.patch(TEAM_ENDPOINTS.TEAM_DETAILS(teamId), data);
  return response.data;
};

export const deleteTeam: MutationFunction<
  ApiResponse,
  string
> = async (teamId) => {
  const response = await API.delete(TEAM_ENDPOINTS.TEAM_DETAILS(teamId));
  return response.data;
};

export const inviteToTeam: MutationFunction<
  ApiResponse,
  TeamInviteData
> = async (data) => {
  const response = await API.post(TEAM_ENDPOINTS.INVITE, data);
  return response.data;
};

export const joinTeam: MutationFunction<
  ApiResponse,
  string
> = async (teamId) => {
  const response = await API.post(TEAM_ENDPOINTS.JOIN(teamId));
  return response.data;
};

export const leaveTeam: MutationFunction<
  ApiResponse,
  string
> = async (teamId) => {
  const response = await API.post(TEAM_ENDPOINTS.LEAVE(teamId));
  return response.data;
};

export const removeFromTeam: MutationFunction<
  ApiResponse,
  { teamId: string; userId: string }
> = async ({ teamId, userId }) => {
  const response = await API.delete(TEAM_ENDPOINTS.REMOVE_MEMBER(teamId, userId));
  return response.data;
};

export const updateMemberRole: MutationFunction<
  ApiResponse<TeamMember>,
  UpdateUserRoleData
> = async (data) => {
  const response = await API.patch(TEAM_ENDPOINTS.UPDATE_ROLE(data.teamId, data.userId), { role: data.role });
  return response.data;
};

// Feedback Services
export const fetchReceivedFeedback = async (
  params?: PaginationParams & { teamId?: string }
): Promise<ApiResponse<PaginatedResponse<FeedbackWithUser>>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.RECEIVED, { params });
  return response.data;
};

export const fetchGivenFeedback = async (
  params?: PaginationParams & { teamId?: string }
): Promise<ApiResponse<PaginatedResponse<Feedback>>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.GIVEN, { params });
  return response.data;
};

export const fetchTeamFeedback = async (
  teamId: string,
  params?: PaginationParams
): Promise<ApiResponse<PaginatedResponse<FeedbackWithUser>>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.TEAM_FEEDBACK(teamId), { params });
  return response.data;
};

export const fetchFeedbackDetails = async (
  feedbackId: string
): Promise<ApiResponse<FeedbackWithUser>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.FEEDBACK_DETAILS(feedbackId));
  return response.data;
};

export const fetchDashboardStats = async (
  teamId?: string
): Promise<ApiResponse<DashboardStats>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.STATS, { params: { teamId } });
  return response.data;
};

export const fetchTeamAnalytics = async (
  teamId: string,
  params?: { startDate?: string; endDate?: string }
): Promise<ApiResponse<TeamAnalytics>> => {
  const response = await API.get(FEEDBACK_ENDPOINTS.TEAM_ANALYTICS(teamId), {
    params,
  });
  return response.data;
};

export const createFeedback: MutationFunction<
  ApiResponse<Feedback>,
  CreateFeedbackData
> = async (data) => {
  const response = await API.post(FEEDBACK_ENDPOINTS.FEEDBACK, data);
  return response.data;
};

export const deleteFeedback: MutationFunction<
  ApiResponse,
  string
> = async (feedbackId) => {
  const response = await API.delete(FEEDBACK_ENDPOINTS.FEEDBACK_DETAILS(feedbackId));
  return response.data;
}; 