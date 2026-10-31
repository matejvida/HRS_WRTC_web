import sponsorsData from '@/../data/sponsors.json';
import { SponsorsDataSchema, type SponsorsData } from './schemas/sponsors.schema';

export function getSponsorsData(): SponsorsData {
  return SponsorsDataSchema.parse(sponsorsData);
}
