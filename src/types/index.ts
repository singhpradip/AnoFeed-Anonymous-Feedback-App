export interface User {
  id: string;
  email: string;
  name: string;
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

export enum TeamRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum FeedbackCategory {
  POSITIVE = 'positive',
  CONSTRUCTIVE = 'constructive',
  SUGGESTION = 'suggestion',
  APPRECIATION = 'appreciation',
  CONCERN = 'concern',
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
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

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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