export function request(url: string, init?: RequestInit): Promise<Response>;

export function withRequestBudget<T>(read: () => Promise<T>, milliseconds?: number, requests?: number): Promise<T>;
