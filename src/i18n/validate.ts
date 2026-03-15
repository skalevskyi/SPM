/**
 * Validates that a candidate locale object matches the base (FR) structure exactly.
 * Use during development or manually. No key-by-key fallback; structure must match.
 */

type StructuralNode = Record<string, unknown> | unknown[];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getKeys(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).sort();
}

export function validateLocaleShape(
  base: StructuralNode,
  candidate: StructuralNode,
  label: string,
): { ok: true } | { ok: false; path: string; reason: string } {
  if (Array.isArray(base)) {
    if (!Array.isArray(candidate)) {
      return {
        ok: false,
        path: label,
        reason: `Expected array, got ${typeof candidate}`,
      };
    }
    if (base.length !== candidate.length) {
      return {
        ok: false,
        path: label,
        reason: `Array length mismatch: base ${base.length}, candidate ${candidate.length}`,
      };
    }
    for (let i = 0; i < base.length; i++) {
      const b = base[i];
      const c = candidate[i];
      if (typeof b === 'object' && b !== null && typeof c === 'object' && c !== null) {
        const nested = validateLocaleShape(
          b as StructuralNode,
          c as StructuralNode,
          `${label}[${i}]`,
        );
        if (!nested.ok) return nested;
      }
    }
    return { ok: true };
  }

  if (!isPlainObject(base) || !isPlainObject(candidate)) {
    return {
      ok: false,
      path: label,
      reason: `Type mismatch at ${label}`,
    };
  }

  const baseKeys = getKeys(base);
  const candidateKeys = getKeys(candidate as Record<string, unknown>);

  for (const k of baseKeys) {
    if (!candidateKeys.includes(k)) {
      return {
        ok: false,
        path: label ? `${label}.${k}` : k,
        reason: `Missing key: ${k}`,
      };
    }
  }
  for (const k of candidateKeys) {
    if (!baseKeys.includes(k)) {
      return {
        ok: false,
        path: label ? `${label}.${k}` : k,
        reason: `Extra key: ${k}`,
      };
    }
  }

  for (const k of baseKeys) {
    const b = base[k];
    const c = (candidate as Record<string, unknown>)[k];
    const path = label ? `${label}.${k}` : k;

    if (typeof b === 'object' && b !== null && typeof c === 'object' && c !== null) {
      const nested = validateLocaleShape(
        b as StructuralNode,
        c as StructuralNode,
        path,
      );
      if (!nested.ok) return nested;
    }
  }

  return { ok: true };
}
