import type { ReviewWindow } from './period.mjs';
export function collectPosthog(app: { slug: string; posthogProjectId?: string | null; posthogHost?: string | null; posthogEvents?: Record<string, string> | null; posthogConfig?: { internalPersons?: Array<{ distinctId: string }> } | null }, token: string, window: ReviewWindow, options?: { trustedHost?: string }): Promise<unknown>;

export function queryPosthog(app: { posthogProjectId?: string | null; posthogHost?: string | null }, apiKey: string, query: string, options?: { trustedHost?: string }): Promise<unknown>;

export function posthogHost(requested?: string | null, trustedHost?: string): string;

export function internalPersonsClause(app: { posthogConfig?: { internalPersons?: Array<{ distinctId: string }> } | null }): string;
