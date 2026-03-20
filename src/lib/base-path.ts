/**
 * Base URL segment for `public/` assets on GitHub Pages (injected in `next.config.ts`).
 * Must match `basePath` in production.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Builds a URL to a file under `public/` (e.g. `public/logo/x.png` → `/SPM/logo/x.png` in prod).
 *
 * @param path - Path beginning with `/` (e.g. `/logo/favicon.svg`)
 */
export function withBasePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
