import { z } from 'zod';

export const NewsCategoryEnum = z.enum([
  'Official Rules',
  'Standings Update',
  'Organization',
  'Venue',
]);
export type NewsCategory = z.infer<typeof NewsCategoryEnum>;

export const NewsFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),
  category: NewsCategoryEnum,
  summary: z.string().min(1, 'Summary is required'),
  slug: z.string().min(1, 'Slug is required'),
  author: z.string().min(1, 'Author is required'),
  featured: z.boolean().optional(),
});
export type NewsFrontmatter = z.infer<typeof NewsFrontmatterSchema>;

export const NewsArticleSchema = NewsFrontmatterSchema.extend({
  content: z.string(),
});
export type NewsArticle = z.infer<typeof NewsArticleSchema>;
