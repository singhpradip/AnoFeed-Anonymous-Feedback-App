import { z } from 'zod';

// Feedback categories enum for validation
const feedbackCategories = ['positive', 'constructive', 'suggestion', 'appreciation', 'concern'] as const;

// Create feedback schema
export const createFeedbackSchema = z.object({
  content: z
    .string()
    .min(1, 'Feedback content is required')
    .min(10, 'Feedback must be at least 10 characters')
    .max(2000, 'Feedback must be less than 2000 characters')
    .refine(
      (content) => content.trim().length >= 10,
      'Feedback must contain at least 10 meaningful characters'
    ),
  category: z.enum(feedbackCategories),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .int('Rating must be a whole number')
    .optional(),
  targetUserId: z
    .string()
    .min(1, 'Please select a team member to give feedback to'),
  teamId: z
    .string()
    .min(1, 'Team ID is required'),
  isAnonymous: z
    .boolean()
    .default(true),
});

// Update feedback schema (for editing)
export const updateFeedbackSchema = z.object({
  content: z
    .string()
    .min(1, 'Feedback content is required')
    .min(10, 'Feedback must be at least 10 characters')
    .max(2000, 'Feedback must be less than 2000 characters')
    .refine(
      (content) => content.trim().length >= 10,
      'Feedback must contain at least 10 meaningful characters'
    ),
  category: z.enum(feedbackCategories),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .int('Rating must be a whole number')
    .optional(),
});

// Feedback filter schema
export const feedbackFilterSchema = z.object({
  category: z
    .enum([...feedbackCategories, 'all'] as const)
    .default('all'),
  rating: z
    .number()
    .min(1)
    .max(5)
    .int()
    .optional(),
  dateFrom: z
    .string()
    .datetime()
    .optional(),
  dateTo: z
    .string()
    .datetime()
    .optional(),
  teamId: z
    .string()
    .optional(),
  targetUserId: z
    .string()
    .optional(),
}).refine(
  (data) => {
    if (data.dateFrom && data.dateTo) {
      return new Date(data.dateFrom) <= new Date(data.dateTo);
    }
    return true;
  },
  {
    message: 'Start date must be before end date',
    path: ['dateTo'],
  }
);

// Feedback search schema
export const feedbackSearchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .min(3, 'Search query must be at least 3 characters')
    .max(100, 'Search query must be less than 100 characters'),
  teamId: z
    .string()
    .optional(),
});

// Type exports
export type CreateFeedbackFormData = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackFormData = z.infer<typeof updateFeedbackSchema>;
export type FeedbackFilterFormData = z.infer<typeof feedbackFilterSchema>;
export type FeedbackSearchFormData = z.infer<typeof feedbackSearchSchema>; 