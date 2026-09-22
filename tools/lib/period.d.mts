export interface ReviewWindow { curStart: string; curEnd: string; prevStart: string; prevEnd: string; days: number; endExclusive: boolean }
export function windows(days?: number, endDate?: string): ReviewWindow;
export function isoDate(date: Date): string;
export function inclusiveEnd(end: string): string;
export function dateValue(value: string): Date;
export function pctChange(current: number | null, prior: number | null): number | null;

export interface ObservedPeriod { start: string; end: string; expectedDays: number; observedDays: number; firstObserved: string | null; lastObserved: string | null; missingDates: string[]; complete: boolean }
export function observedCoverage(dates: string[], window: ReviewWindow): { current: ObservedPeriod; prior: ObservedPeriod; comparable: boolean; reason: string | null };
