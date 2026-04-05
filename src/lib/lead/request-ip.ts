/**
 * Best-effort client IP for rate limiting (Vercel / common proxies).
 */
export function getClientIp(request: Request): string {
  const h = request.headers;
  const forwarded = h.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = h.get('x-real-ip')?.trim();
  if (real) return real;
  const cf = h.get('cf-connecting-ip')?.trim();
  if (cf) return cf;
  return 'unknown';
}
