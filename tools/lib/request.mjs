import { AsyncLocalStorage } from 'node:async_hooks';
// Per-run state is isolated across concurrent apps, including in Workers.
const budgets = new AsyncLocalStorage();
// The budget bounds the READ, not only the requests it makes. Handing the
// signal to `request` covers what `request` performs and nothing else: a read
// that awaits a bare fetch, a driver, or a promise left over from an
// invocation that has already been killed just sits there, and the caller sits
// with it. That is how the minute cron reached its 15-minute wall time on 40 ms
// of CPU (2026-09-22). Racing the deadline here makes "collection failed" the
// worst case instead of "the worker hangs", for every caller at once.
export function withRequestBudget(read, milliseconds = 90000, requests = 120) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`Provider read exceeded its ${Math.round(milliseconds / 1000)}s budget.`)), milliseconds);
  return budgets.run({ signal: controller.signal, remaining: requests }, async () => {
    try {
      return await Promise.race([read(), rejectWhenAborted(controller.signal)]);
    } finally { clearTimeout(timer); }
  });
}
function rejectWhenAborted(signal) {
  return new Promise((_, reject) => {
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
}
// Bound each provider response on both runtimes. Signed downloads never enter logs.
export async function request(url, init = {}) {
  const budget = budgets.getStore();
  if (budget && --budget.remaining < 0) throw new Error('Provider pagination exceeded request budget; narrow the window.');
  const signals = [AbortSignal.timeout(20000), init.signal, budget?.signal].filter(Boolean);
  // Workers rejects redirect: 'error' before making a request. Reject manually
  // on both runtimes so a redirect can never forward provider credentials.
  const response = await fetch(url, { ...init, redirect: 'manual', signal: AbortSignal.any(signals) });
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    await response.body?.cancel().catch(() => {});
    throw new Error('Provider redirect refused. Verify the configured resource endpoint.');
  }
  if (!response.body) return response;
  const maxBytes = 16 * 1024 * 1024;
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new Error('Provider response exceeds 16 MB; narrow the review window.');
      chunks.push(value);
    }
  } catch (e) { await reader.cancel().catch(() => {}); throw e; }
  return new Response(new Blob(chunks), { status: response.status, statusText: response.statusText, headers: response.headers });
}
