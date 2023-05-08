export type Input = Record<string | number | symbol, any>
export type IgnoredInput =
  | boolean
  | number
  | null
  | any[]
  | Record<never, any>
  | undefined

export type Merger = <T extends Input, K extends keyof T>(
  object: T,
  key: keyof T,
  value: T[K],
  namespace: string
) => any

type nullish = null | undefined | void

export type MergeObjects<
  Destination extends Input,
  Defaults extends Input,
> = Destination extends Defaults
   ? Destination
   : Omit<Destination, keyof Destination & keyof Defaults> &
   Omit<Defaults, keyof Destination & keyof Defaults> & {
      -readonly [Key in keyof Destination &
      keyof Defaults]: Destination[Key] extends nullish
         ? Defaults[Key] extends nullish
            ? nullish
            : Defaults[Key]
         : Defaults[Key] extends nullish
            ? Destination[Key]
            : Merge<Destination[Key], Defaults[Key]>;
   }

export type Nyxdefaults<
  S extends Input,
  D extends Array<Input | IgnoredInput>,
> = D extends [infer F, ...infer Rest]
   ? F extends Input
      ? Rest extends Array<Input | IgnoredInput>
         ? Nyxdefaults<MergeObjects<S, F>, Rest>
         : MergeObjects<S, F>
      : F extends IgnoredInput
         ? Rest extends Array<Input | IgnoredInput>
            ? Nyxdefaults<S, Rest>
            : S
         : S
   : S

export type NyxdefaultsFn = <
  Source extends Input,
  Defaults extends Array<Input | IgnoredInput>,
>(
  source: Source,
  ...defaults: Defaults
) => Nyxdefaults<Source, Defaults>

export interface NyxdefaultsInstance {
  <Source extends Input, Defaults extends Array<Input | IgnoredInput>>(
      source: Source | IgnoredInput,
      ...defaults: Defaults
   ): Nyxdefaults<Source, Defaults>
  fn: NyxdefaultsFn
  arrayFn: NyxdefaultsFn
  extend(merger?: Merger): NyxdefaultsFn
}

export type MergeArrays<Destination, Source> = Destination extends Array<
  infer DestinationType
>
   ? Source extends Array<infer SourceType>
      ? Array<DestinationType | SourceType>
      : Source | Array<DestinationType>
   : Source | Destination

export type Merge<Destination extends Input, Defaults extends Input> =
  // Remove explicitly null types
  Destination extends nullish
     ? Defaults extends nullish
        ? nullish
        : Defaults
     : Defaults extends nullish
        ? Destination
        : // Handle arrays
        Destination extends Array<any>
           ? Defaults extends Array<any>
              ? MergeArrays<Destination, Defaults>
              : Destination | Defaults
           : // Don't attempt to merge Functions, RegExps, Promises

           Destination extends Function
              ? Destination | Defaults
              : Destination extends RegExp
                 ? Destination | Defaults
                 : Destination extends Promise<any>
                    ? Destination | Defaults
                    : // Don't attempt to merge Functions, RegExps, Promises

                    Defaults extends Function
                       ? Destination | Defaults
                       : Defaults extends RegExp
                          ? Destination | Defaults
                          : Defaults extends Promise<any>
                             ? Destination | Defaults
                             : // Ensure we only merge Records
                             Destination extends Input
                                ? Defaults extends Input
                                   ? MergeObjects<Destination, Defaults>
                                   : Destination | Defaults
                                : Destination | Defaults
