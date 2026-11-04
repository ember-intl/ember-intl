export function t(key: string): string {
  return key;
}

export function tKey<T extends string>(key: T): T {
  return key;
}
