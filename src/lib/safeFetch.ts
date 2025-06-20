type SafeFetchOptions = RequestInit;

export async function safeFetch<T = any>(
  url: string,
  options?: SafeFetchOptions
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text(); // to read actual server message
    throw new Error(`Fetch error ${res.status}: ${errorText}`);
  }

  return res.json();
}
