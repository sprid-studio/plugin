import type { ReviewWindow } from './period.mjs';
export function bingSiteUrl(websiteUrl: string | null | undefined): string | null;
export function collectBing(site: { slug: string; websiteUrl?: string | null }, apiKey: string, window: ReviewWindow, options?: { queries?: number; pages?: number; fetch?: (url: string) => Promise<Response> }): Promise<unknown>;
