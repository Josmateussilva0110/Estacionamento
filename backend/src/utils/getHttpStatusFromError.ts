export function getHttpStatusFromError(
  code: string,
  map: Record<string, number>,
  fallback = 400
) {
  return map[code] ?? fallback
}
