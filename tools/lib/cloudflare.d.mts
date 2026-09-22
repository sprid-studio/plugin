import type { ReviewWindow } from './period.mjs';
export function collectCloudflare(app: { slug: string; websiteUrl?: string | null; cloudflareZoneId?: string | null; cloudflareAccountTag?: string | null }, token: string, window: ReviewWindow): Promise<unknown>;
