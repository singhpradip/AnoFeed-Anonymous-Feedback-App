export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  department?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: TeamRole;
  joinedAt: Date;
  user: User;
}

export interface Feedback {
  id: string;
  content: string;
  rating?: number;
  category: FeedbackCategory;
  teamId: string;
  targetUserId: string;
  submittedAt: Date;
  isAnonymous: boolean;
}

export interface FeedbackWithUser {
  id: string;
  content: string;
  rating?: number;
  category: FeedbackCategory;
  teamId: string;
  targetUserId: string;
  submittedAt: Date;
  isAnonymous: boolean;
  targetUser: User;
}

export const TeamRole = {
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export type TeamRole = (typeof TeamRole)[keyof typeof TeamRole];

export const FeedbackCategory = {
  POSITIVE: "positive",
  CONSTRUCTIVE: "constructive",
  SUGGESTION: "suggestion",
  APPRECIATION: "appreciation",
  CONCERN: "concern",
} as const;

export type FeedbackCategory =
  (typeof FeedbackCategory)[keyof typeof FeedbackCategory];



export interface RegisterData {
  name: string;
  email: string;
  role?: string;
  department?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateTeamData {
  name: string;
  description?: string;
}

export interface CreateFeedbackData {
  content: string;
  rating?: number;
  category: FeedbackCategory;
  teamId: string;
  targetUserId: string;
}

export interface TeamInviteData {
  email: string;
  teamId: string;
  role: TeamRole;
}

export interface UpdateUserRoleData {
  userId: string;
  teamId: string;
  role: TeamRole;
}

export interface ApiResponse<T = Record<string, never>> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  requiredRole?: TeamRole;
}

export interface DashboardStats {
  totalFeedback: number;
  receivedFeedback: number;
  givenFeedback: number;
  teamsCount: number;
}

export interface RegisterData {
  name: string;
  email: string;
  role?: string;
  department?: string;
  password: string;
}

export interface TeamAnalytics {
  totalFeedback: number;
  averageRating: number;
  feedbackByCategory: Record<string, number>;
  feedbackTrends: Array<{ date: string; count: number }>;
  topRatedMembers: Array<{ userId: string; rating: number; name: string }>;
} 