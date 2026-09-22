// ---- date helpers -------------------------------------------------------
export function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
// Returns {curStart,curEnd,prevStart,prevEnd} for a window of `days` ending today (UTC).
export function windows(days = 30, endDate = isoDate(new Date())) {
  if (!Number.isInteger(days) || days < 1 || days > 366) throw new Error('--days must be an integer from 1 to 366');
  const end = dateValue(endDate);
  const curStart = new Date(end.getTime() - days * 86400000);
  const prevEnd = new Date(curStart.getTime());
  const prevStart = new Date(curStart.getTime() - days * 86400000);
  return {
    curStart: isoDate(curStart), curEnd: isoDate(end),
    prevStart: isoDate(prevStart), prevEnd: isoDate(prevEnd),
    days, endExclusive: true,
  };
}

export function dateValue(value) {
  const d = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(+d) || isoDate(d) !== value) throw new Error(`Invalid date: ${value}; use YYYY-MM-DD`);
  return d;
}
export const inclusiveEnd = (end) => isoDate(new Date(+dateValue(end) - 86400000));

export function pctChange(cur, prev) {
  if (cur == null || prev == null) return null;
  if (prev === 0) return cur ? null : 0;
  return +(((cur - prev) / prev) * 100).toFixed(1);
}


// Observed rows are evidence of coverage, never proof that absent days were zero.
export function observedCoverage(dates, window) {
  const unique = new Set(dates);
  const period = (start, end) => {
    const expected = [];
    for (let d = dateValue(start); isoDate(d) < end; d = new Date(+d + 86400000)) expected.push(isoDate(d));
    const observed = expected.filter(d => unique.has(d));
    return { start, end, expectedDays: expected.length, observedDays: observed.length,
      firstObserved: observed[0] ?? null, lastObserved: observed.at(-1) ?? null,
      missingDates: expected.filter(d => !unique.has(d)), complete: observed.length === expected.length };
  };
  const current = period(window.curStart, window.curEnd), prior = period(window.prevStart, window.prevEnd);
  return { current, prior, comparable: current.complete && prior.complete,
    reason: current.complete && prior.complete ? null : 'Observed dates do not cover both requested windows. Missing dates are unknown, not zero; period changes are withheld.' };
}
