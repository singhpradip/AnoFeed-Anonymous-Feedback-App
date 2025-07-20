// Base API configuration
import { CONFIG } from '../config/environment';

export const API_BASE_URL = CONFIG.API_BASE_URL;

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
} as const;

// Team endpoints
export const TEAM_ENDPOINTS = {
  TEAMS: '/teams',
  TEAM_DETAILS: (teamId: string) => `/teams/${teamId}`,
  TEAM_MEMBERS: (teamId: string) => `/teams/${teamId}/members`,
  MY_TEAMS: '/teams/my-teams',
  INVITE: '/teams/invite',
  JOIN: (teamId: string) => `/teams/${teamId}/join`,
  LEAVE: (teamId: string) => `/teams/${teamId}/leave`,
  REMOVE_MEMBER: (teamId: string, userId: string) => `/teams/${teamId}/members/${userId}`,
  UPDATE_ROLE: (teamId: string, userId: string) => `/teams/${teamId}/members/${userId}/role`,
} as const;

// Feedback endpoints
export const FEEDBACK_ENDPOINTS = {
  FEEDBACK: '/feedback',
  RECEIVED: '/feedback/received',
  GIVEN: '/feedback/given',
  TEAM_FEEDBACK: (teamId: string) => `/feedback/team/${teamId}`,
  FEEDBACK_DETAILS: (feedbackId: string) => `/feedback/${feedbackId}`,
  STATS: '/feedback/stats',
  TEAM_ANALYTICS: (teamId: string) => `/feedback/team/${teamId}/analytics`,
} as const;

// All endpoints combined for easy access
export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  TEAMS: TEAM_ENDPOINTS,
  FEEDBACK: FEEDBACK_ENDPOINTS,
} as const; 