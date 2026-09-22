import type { ReviewWindow } from './period.mjs';
export function collectAppStore(token: string, appId: string, window: ReviewWindow, allowCreate?: boolean): Promise<unknown>;
export function collectPlay(app: { googlePlay: { packageName: string; exportBucket: string } }, window: ReviewWindow, token: string): Promise<unknown>;
