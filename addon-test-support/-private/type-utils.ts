/**
 * Extract the keys from a type where the value type of the key extends the given `Condition`.
 *
 * Taken from `type-fest`.
 *
 * @see https://github.com/sindresorhus/type-fest/blob/master/source/conditional-keys.d.ts
 * @license (MIT OR CC0-1.0)
 */
export type ConditionalKeys<Base, Condition> = NonNullable<
  // Wrap in `NonNullable` to strip away the `undefined` type from the produced union.
  {
    // Map through all the keys of the given base type.
    [Key in keyof Base]: Base[Key] extends Condition // Pick only keys with types extending the given `Condition` type. // Retain this key since the condition passes.
      ? Key // Discard this key since the condition fails.
      : never;

    // Convert the produced object into a union type of the keys which passed the conditional test.
  }[keyof Base]
>;

export type RemoveFirstFromTuple<T extends any[]> = ((
  ...b: T
) => void) extends (a: unknown, ...b: infer I) => void
  ? I
  : [];
