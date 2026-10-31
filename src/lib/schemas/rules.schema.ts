import { z } from 'zod';

export const QualifyingEventModeEnum = z.enum(['CW', 'SSB', 'CW & SSB']);
export type QualifyingEventMode = z.infer<typeof QualifyingEventModeEnum>;

export const QualifyingEventSchema = z.object({
  id: z.number().int().min(1).max(24),
  name: z.string().min(1),
  shortName: z.string().min(1),
  yearlySchedule: z.string().min(1),
  value: z.number().min(800).max(1000),
  primaryRegionValue: z.number().min(800).max(1000).optional(),
  primaryRegionDescription: z.string().optional(),
  year: z.number().int().min(2026).max(2028),
  mode: QualifyingEventModeEnum,
  websiteUrl: z.string().url().optional(),
  datesUtc: z.string().min(1),
});
export type QualifyingEvent = z.infer<typeof QualifyingEventSchema>;

export const QualifyingEventListSchema = z
  .array(QualifyingEventSchema)
  .length(24, 'Table 1 must contain exactly 24 Qualifying Events')
  .superRefine((events, ctx) => {
    // Verify IDs are 1..24 strictly monotonic
    for (let i = 0; i < events.length; i++) {
      if (events[i].id !== i + 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Event at index ${i} has ID ${events[i].id}; expected ${i + 1}`,
          path: [i, 'id'],
        });
      }
    }
  });

export const CategoryWeightingSchema = z.object({
  code: z.string().min(1),
  description: z.string().min(1),
  weight: z.number().min(0.5).max(1.0),
  notes: z.string().min(1),
});
export type CategoryWeighting = z.infer<typeof CategoryWeightingSchema>;

export const CategoryOrderItemSchema = z.object({
  order: z.number().int().min(1).max(6),
  code: z.string().min(1),
  criteria: z.string().min(1),
});
export type CategoryOrderItem = z.infer<typeof CategoryOrderItemSchema>;

export const EntryOverlaySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  multiplier: z.number().min(0.8).max(1.0),
  description: z.string().min(1),
});
export type EntryOverlay = z.infer<typeof EntryOverlaySchema>;

export const WeightingFactorsSchema = z.object({
  categories: z.array(CategoryWeightingSchema).min(6),
  categoryOrder: z.array(CategoryOrderItemSchema).length(6),
  entryOverlays: z.array(EntryOverlaySchema).min(2),
});
export type WeightingFactors = z.infer<typeof WeightingFactorsSchema>;

export const SubAreaSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
});
export type SubArea = z.infer<typeof SubAreaSchema>;

export const ContinentEnum = z.enum([
  'Europe',
  'North America',
  'Asia',
  'Africa',
  'South America',
  'Oceania',
]);
export type Continent = z.infer<typeof ContinentEnum>;

export const QualifyingAreaSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  continent: ContinentEnum,
  allocatedTeams: z.number().int().min(1).max(10),
  countriesDescription: z.string().min(1),
  hasSubAreas: z.boolean(),
  subAreas: z.array(SubAreaSchema).optional(),
});
export type QualifyingArea = z.infer<typeof QualifyingAreaSchema>;

export const QualifyingAreaListSchema = z
  .array(QualifyingAreaSchema)
  .length(29, 'Table 3 must contain exactly 29 Qualifying Areas')
  .superRefine((qas, ctx) => {
    const totalAllocated = qas.reduce((sum, qa) => sum + qa.allocatedTeams, 0);
    if (totalAllocated !== 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total allocated teams across all 29 QAs must equal exactly 50, but found ${totalAllocated}`,
      });
    }

    // Verify continental quota breakdown
    const continentSums = qas.reduce<Record<string, number>>((acc, qa) => {
      acc[qa.continent] = (acc[qa.continent] || 0) + qa.allocatedTeams;
      return acc;
    }, {});

    const expectedContinents: Record<Continent, number> = {
      Europe: 23,
      'North America': 16,
      Asia: 5,
      Africa: 2,
      'South America': 2,
      Oceania: 2,
    };

    for (const [continent, expectedQuota] of Object.entries(expectedContinents)) {
      if (continentSums[continent] !== expectedQuota) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Continent ${continent} must allocate ${expectedQuota} teams, but got ${continentSums[continent] || 0}`,
        });
      }
    }
  });

export const SpecialTeamSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  allocatedTeams: z.number().int().min(1).max(10),
  description: z.string().min(1),
  criteria: z.string().min(1),
});
export type SpecialTeam = z.infer<typeof SpecialTeamSchema>;

export const SpecialTeamListSchema = z
  .array(SpecialTeamSchema)
  .superRefine((teams, ctx) => {
    const total = teams.reduce((sum, t) => sum + t.allocatedTeams, 0);
    if (total !== 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total special teams must equal exactly 10, but found ${total}`,
      });
    }
  });
