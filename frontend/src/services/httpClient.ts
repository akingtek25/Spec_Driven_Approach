export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function http<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 15000, headers, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...rest,
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
