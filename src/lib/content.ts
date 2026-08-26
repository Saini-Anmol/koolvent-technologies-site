/**
 * Helpers for dealing with placeholder content.
 *
 * Throughout `src/data/*` and the pages, content that the owner still needs
 * to supply is written as `TODO: …`. Use these helpers so that placeholder
 * text is never rendered to visitors — show a graceful fallback instead.
 */

/** True if a string is unset, a `TODO:` placeholder, or "NA" / "N/A". */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  const v = value.trim();
  return /^todo\b/i.test(v) || /^n\/?a$/i.test(v);
}

/** Keep only the entries whose value at `key` is real (not a placeholder). */
export function realEntries<T>(items: readonly T[], key: keyof T): T[] {
  return items.filter((item) => !isPlaceholder(String(item[key] ?? '')));
}
