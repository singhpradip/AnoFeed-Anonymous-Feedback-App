import { z } from 'zod';

// Create team schema
export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, 'Team name is required')
    .min(2, 'Team name must be at least 2 characters')
    .max(100, 'Team name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Team name can only contain letters, numbers, spaces, hyphens, and underscores'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

// Update team schema
export const updateTeamSchema = z.object({
  name: z
    .string()
    .min(1, 'Team name is required')
    .min(2, 'Team name must be at least 2 characters')
    .max(100, 'Team name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Team name can only contain letters, numbers, spaces, hyphens, and underscores'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
});

// Team invite schema
export const teamInviteSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  role: z
    .enum(['admin', 'member'])
    .default('member'),
});

// Team join schema (for join codes)
export const teamJoinSchema = z.object({
  joinCode: z
    .string()
    .min(1, 'Join code is required')
    .length(8, 'Join code must be exactly 8 characters')
    .regex(/^[A-Z0-9]+$/, 'Join code can only contain uppercase letters and numbers'),
});

// Update member role schema
export const updateMemberRoleSchema = z.object({
  userId: z
    .string()
    .min(1, 'User ID is required'),
  role: z.enum(['admin', 'member']),
});

// Type exports
export type CreateTeamFormData = z.infer<typeof createTeamSchema>;
export type UpdateTeamFormData = z.infer<typeof updateTeamSchema>;
export type TeamInviteFormData = z.infer<typeof teamInviteSchema>;
export type TeamJoinFormData = z.infer<typeof teamJoinSchema>;
export type UpdateMemberRoleFormData = z.infer<typeof updateMemberRoleSchema>; 