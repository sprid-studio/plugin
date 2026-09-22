import type { ReviewWindow } from './period.mjs';
export function collectSearch(app: { slug: string; gscProperty?: string | null }, token: string, window: ReviewWindow, options?: { pages?: number }): Promise<unknown>;
