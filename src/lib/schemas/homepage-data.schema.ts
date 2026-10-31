import { z } from 'zod';

export const EXPECTED_OC_CALLSIGNS = [
  '9A4M',
  '9A1UN',
  '9A5W',
  '9A3A',
  '9A2G',
  '9A5X',
  '9A5R',
  '9A6KX',
  '9A3XV',
  'YU1LA',
  '9A6PAX',
] as const;

export const EXPECTED_PAST_EVENT_YEARS = [
  1990, 1996, 2000, 2002, 2006, 2010, 2014, 2018, 2022, 2026,
] as const;

const CallsignRegex = /^[A-Z0-9]{1,3}[0-9][A-Z0-9]{1,4}$/;

export const CommitteeMemberSchema = z.object({
  callsign: z
    .string()
    .regex(CallsignRegex, 'Invalid amateur radio callsign format'),
  name: z.string().min(2, 'Committee member name is required'),
  initials: z.string().min(2).max(3),
  role: z.string().min(3, 'Committee member official role is required'),
});

export const CommitteeListSchema = z
  .array(CommitteeMemberSchema)
  .length(11, 'Organizing Committee dataset must contain exactly 11 members')
  .superRefine((members, ctx) => {
    const callsigns = members.map((m) => m.callsign);
    for (const expectedCall of EXPECTED_OC_CALLSIGNS) {
      if (!callsigns.includes(expectedCall)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing required Organizing Committee member callsign: ${expectedCall}`,
        });
      }
    }
  });

export const PastEventSchema = z.object({
  year: z.number().int().min(1990).max(2026),
  edition: z.string().min(4, 'Edition label is required'),
  hostCity: z.string().min(2, 'Host city is required'),
  hostCountry: z.string().min(2, 'Host country is required'),
  location: z.string().min(4, 'Location summary is required'),
  champions: z
    .array(
      z.string().regex(CallsignRegex, 'Champion callsign must be a valid callsign')
    )
    .length(2, 'Each WRTC edition must list both champion operator callsigns'),
  championNames: z.string().min(3, 'Champion operator names are required'),
  archiveUrl: z.string().url('Archive URL must be a valid URL'),
});

export const PastEventListSchema = z
  .array(PastEventSchema)
  .min(9, 'Past WRTC archive must include historical editions from 1990 through 2026')
  .superRefine((events, ctx) => {
    const years = events.map((e) => e.year);
    for (const expectedYear of EXPECTED_PAST_EVENT_YEARS) {
      if (!years.includes(expectedYear)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Missing required historical WRTC edition year: ${expectedYear}`,
        });
      }
    }
    const first = events[0];
    if (first && (first.year !== 1990 || !first.hostCity.includes('Seattle'))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'First historical WRTC edition must be 1990 Seattle',
      });
    }
    const last = events[events.length - 1];
    if (
      last &&
      (last.year !== 2026 ||
        (!last.hostCountry.includes('UK') &&
          !last.hostCountry.includes('United Kingdom')))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Final historical WRTC edition prior to 2030 must be 2026 UK',
      });
    }
  });

export type CommitteeMember = z.infer<typeof CommitteeMemberSchema>;
export type PastEvent = z.infer<typeof PastEventSchema>;
