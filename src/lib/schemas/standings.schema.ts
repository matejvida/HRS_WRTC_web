import { z } from 'zod';

export const ContestEntrySchema = z.object({
  eventId: z.number().int().min(1).max(24),
  contestName: z.string().min(1),
  category: z.string().min(1),
  isMultiOp: z.boolean(),
  isOutsideQa: z.boolean(),
  weightingFactor: z.number().min(0.5).max(1.0),
  rawScore: z.number().nonnegative(),
  qaMaxScore: z.number().positive(),
  calculatedPoints: z.number().nonnegative(),
  isCounted: z.boolean(),
});

export type ContestEntry = z.infer<typeof ContestEntrySchema>;

export const OperatorStandingSchema = z
  .object({
    callsign: z.string().min(3).max(15),
    name: z.string().optional(),
    country: z.string().min(1),
    dxcc: z.string().min(1),
    qaCode: z.string().min(2),
    subAreaCode: z.string().optional(),
    rank: z.number().int().positive(),
    totalPoints: z.number().nonnegative(),
    countedEventsCount: z.number().int().nonnegative(),
    entries: z.array(ContestEntrySchema),
  })
  .superRefine((op, ctx) => {
    const countedEntries = op.entries.filter((e) => e.isCounted);
    const isYouth = op.qaCode.toUpperCase() === 'YOUTH';

    // Youth max 6 events; Standard max 10 events
    if (isYouth) {
      if (countedEntries.length > 6 || op.countedEventsCount > 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Youth applicant ${op.callsign} cannot exceed 6 counted events (found ${countedEntries.length})`,
          path: ['countedEventsCount'],
        });
      }
    } else {
      if (countedEntries.length > 10 || op.countedEventsCount > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Applicant ${op.callsign} cannot exceed 10 counted events (found ${countedEntries.length})`,
          path: ['countedEventsCount'],
        });
      }
    }

    // Max 3 Multi-Op events among counted events (§5.A)
    const countedMultiOp = countedEntries.filter((e) => e.isMultiOp).length;
    if (countedMultiOp > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Applicant ${op.callsign} has ${countedMultiOp} counted Multi-Op events; cannot exceed 3 per Selection Rules §5.A`,
        path: ['entries'],
      });
    }

    // Max 3 Outside-QA events among counted events (§5.B)
    const countedOutsideQa = countedEntries.filter((e) => e.isOutsideQa).length;
    if (countedOutsideQa > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Applicant ${op.callsign} has ${countedOutsideQa} counted Outside-QA events; cannot exceed 3 per Selection Rules §5.B`,
        path: ['entries'],
      });
    }
  });

export type OperatorStanding = z.infer<typeof OperatorStandingSchema>;

export const AreaStandingsSchema = z.object({
  qaCode: z.string().min(2),
  qaName: z.string().min(2),
  allocatedTeams: z.number().int().positive(),
  standings: z.array(OperatorStandingSchema),
});

export type AreaStandings = z.infer<typeof AreaStandingsSchema>;

export const StandingsSnapshotSchema = z.object({
  version: z.string().min(1),
  generatedAt: z.string().datetime({ offset: true }),
  description: z.string().min(1),
  areas: z.array(AreaStandingsSchema).min(1),
});

export type StandingsSnapshot = z.infer<typeof StandingsSnapshotSchema>;
