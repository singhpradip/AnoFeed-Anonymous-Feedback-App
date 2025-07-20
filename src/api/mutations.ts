import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  changePassword,
  createTeam,
  updateTeam,
  deleteTeam,
  inviteToTeam,
  joinTeam,
  leaveTeam,
  removeFromTeam,
  updateMemberRole,
  createFeedback,
  deleteFeedback,
} from './services';
import type {
  User,
  Team,
  TeamMember,
  Feedback,
  LoginData,
  RegisterData,
  CreateTeamData,
  CreateFeedbackData,
  TeamInviteData,
  UpdateUserRoleData,
  ApiResponse,
} from '../types';

// Auth Mutations
export const useLoginMutation = (
  options?: UseMutationOptions<
    ApiResponse<{ user: User; token: string }>,
    Error,
    LoginData
  >
) =>
  useMutation({
    mutationFn: loginUser,
    ...options,
  });

export const useRegisterMutation = (
  options?: UseMutationOptions<
    ApiResponse<{ user: User; token: string }>,
    Error,
    RegisterData
  >
) =>
  useMutation({
    mutationFn: registerUser,
    ...options,
  });

export const useLogoutMutation = (
  options?: UseMutationOptions<ApiResponse, Error>
) =>
  useMutation({
    mutationFn: logoutUser,
    ...options,
  });

export const useUpdateProfileMutation = (
  options?: UseMutationOptions<ApiResponse<User>, Error, Partial<User>>
) =>
  useMutation({
    mutationFn: updateUserProfile,
    ...options,
  });

export const useChangePasswordMutation = (
  options?: UseMutationOptions<
    ApiResponse,
    Error,
    { currentPassword: string; newPassword: string }
  >
) =>
  useMutation({
    mutationFn: changePassword,
    ...options,
  });

// Team Mutations
export const useCreateTeamMutation = (
  options?: UseMutationOptions<ApiResponse<Team>, Error, CreateTeamData>
) =>
  useMutation({
    mutationFn: createTeam,
    ...options,
  });

export const useUpdateTeamMutation = (
  options?: UseMutationOptions<
    ApiResponse<Team>,
    Error,
    { teamId: string; data: Partial<CreateTeamData> }
  >
) =>
  useMutation({
    mutationFn: updateTeam,
    ...options,
  });

export const useDeleteTeamMutation = (
  options?: UseMutationOptions<ApiResponse, Error, string>
) =>
  useMutation({
    mutationFn: deleteTeam,
    ...options,
  });

export const useInviteToTeamMutation = (
  options?: UseMutationOptions<ApiResponse, Error, TeamInviteData>
) =>
  useMutation({
    mutationFn: inviteToTeam,
    ...options,
  });

export const useJoinTeamMutation = (
  options?: UseMutationOptions<ApiResponse, Error, string>
) =>
  useMutation({
    mutationFn: joinTeam,
    ...options,
  });

export const useLeaveTeamMutation = (
  options?: UseMutationOptions<ApiResponse, Error, string>
) =>
  useMutation({
    mutationFn: leaveTeam,
    ...options,
  });

export const useRemoveFromTeamMutation = (
  options?: UseMutationOptions<
    ApiResponse,
    Error,
    { teamId: string; userId: string }
  >
) =>
  useMutation({
    mutationFn: removeFromTeam,
    ...options,
  });

export const useUpdateMemberRoleMutation = (
  options?: UseMutationOptions<
    ApiResponse<TeamMember>,
    Error,
    UpdateUserRoleData
  >
) =>
  useMutation({
    mutationFn: updateMemberRole,
    ...options,
  });

// Feedback Mutations
export const useCreateFeedbackMutation = (
  options?: UseMutationOptions<ApiResponse<Feedback>, Error, CreateFeedbackData>
) =>
  useMutation({
    mutationFn: createFeedback,
    ...options,
  });

export const useDeleteFeedbackMutation = (
  options?: UseMutationOptions<ApiResponse, Error, string>
) =>
  useMutation({
    mutationFn: deleteFeedback,
    ...options,
  }); 