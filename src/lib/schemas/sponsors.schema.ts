import { z } from 'zod';

export const SponsorItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  url: z.string().url().optional(),
  logo: z.string().optional(),
  country: z.string().optional(),
});

export type SponsorItem = z.infer<typeof SponsorItemSchema>;

export const SponsorTierSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  badge: z.string().min(1),
  description: z.string().min(1),
  packageScope: z.string().min(1),
  inquirySubject: z.string().min(1),
  partners: z.array(SponsorItemSchema),
});

export type SponsorTier = z.infer<typeof SponsorTierSchema>;

export const InstitutionalHostSchema = z.object({
  name: z.string().min(1),
  nativeName: z.string().min(1),
  acronym: z.string().min(1),
  role: z.string().min(1),
  url: z.string().url(),
  foundedYear: z.number().int(),
  description: z.string().min(1),
});

export type InstitutionalHost = z.infer<typeof InstitutionalHostSchema>;

export const SponsorsDataSchema = z.object({
  institutionalHost: InstitutionalHostSchema,
  tiers: z.array(SponsorTierSchema),
  contactEmail: z.string().email(),
});

export type SponsorsData = z.infer<typeof SponsorsDataSchema>;
