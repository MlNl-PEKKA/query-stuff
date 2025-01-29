import type {
  AnyUseMutationOptions,
  AnyUseQueryOptions,
  DataTag,
  dataTagErrorSymbol,
  dataTagSymbol,
  DefaultError,
  DefinedInitialDataInfiniteOptions,
  DefinedInitialDataOptions,
  InfiniteData,
  MutationKey,
  OmitKeyof,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  UnusedSkipTokenInfiniteOptions,
  UnusedSkipTokenOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import type {
  dataTagContextSymbol,
  dataTagVariablesSymbol,
  inputSymbol,
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
} from "./symbols.js";

export type UnknownRecord = Record<PropertyKey, unknown>;

export type Prettify<T> = { [key in keyof T]: T[key] } & {};

export type SimpleMerge<Destination, Source> = {
  [Key in keyof Destination as Key extends keyof Source
    ? never
    : Key]: Destination[Key];
} & Source;

export type PickIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? KeyType
    : never]: ObjectType[KeyType];
};

export type OmitIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
};

export type Merge<Destination, Source> = Prettify<
  SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>> &
    SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>
>;

export type Node = {
  [key: PropertyKey]:
    | Node
    | ((
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut);
};

export type QueryKeyTag<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = DefaultError,
> = {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
};

export type QBaseQueryOptions<T extends AnyUseQueryOptions> = OmitKeyof<
  T,
  "queryFn" | "queryKey"
>;

export type QBaseQueryOptionsOut<
  T extends AnyUseQueryOptions,
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  OmitKeyof<T, "queryKey"> &
    QueryKeyTag<TQueryKey, TQueryFnData, TError> &
    (
      | {
          [queryNodeDefinedInput]: unknown;
        }
      | {
          [queryNodeUndefinedInput]: unknown;
        }
    )
>;

export type QDefinedInitialDataOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

export type QDefinedInitialDataOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptionsOut<
    DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QUnusedSkipTokenOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

export type QUnusedSkipTokenOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptionsOut<
    UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QUndefinedInitialDataOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

export type QUndefinedInitialDataOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptionsOut<
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QQueryOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataOptionsIn<TQueryFnData, TError, TData, TQueryKey>
  | QUnusedSkipTokenOptionsIn<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsIn<TQueryFnData, TError, TData, TQueryKey>;

export type QAnyQueryOptionsIn = QQueryOptionsIn<any, any, any, any>;

export type QQueryOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataOptionsOut<TQueryFnData, TError, TData, TQueryKey>
  | QUnusedSkipTokenOptionsOut<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsOut<TQueryFnData, TError, TData, TQueryKey>;

export type QAnyQueryOptionsOut = QQueryOptionsOut<any, any, any, any>;

export type MutationKeyTag<
  TMutationKey extends MutationKey = MutationKey,
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
> = {
  mutationKey: TMutationKey & {
    [dataTagSymbol]: TData;
    [dataTagErrorSymbol]: TError;
    [dataTagVariablesSymbol]: TVariables;
    [dataTagContextSymbol]: TContext;
  };
};

export type QBaseMutationOptions<T extends AnyUseMutationOptions> = OmitKeyof<
  T,
  "mutationFn" | "mutationKey"
>;

export type QBaseMutationOptionsOut<
  T extends AnyUseMutationOptions,
  TMutationKey extends MutationKey = MutationKey,
> =
  T extends UseMutationOptions<
    infer TData,
    infer TError,
    infer TVariables,
    infer TContext
  >
    ? Merge<
        T,
        MutationKeyTag<TMutationKey, TData, TError, TVariables, TContext>
      > & {
        [mutationNode]: unknown;
      }
    : never;

export type QMutationOptionsIn<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
> = Prettify<
  QBaseMutationOptions<UseMutationOptions<TData, TError, TVariables, TContext>>
>;

export type QMutationOptionsOut<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
  TMutationKey extends MutationKey = MutationKey,
> = QBaseMutationOptionsOut<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  TMutationKey
>;

export type QAnyMutationOptionsOut = QMutationOptionsOut<any, any, any, any>;

export type InfiniteQueryKeyTag<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = DefaultError,
> = {
  queryKey: DataTag<TQueryKey, InfiniteData<TQueryFnData>, TError>;
};

export type QBaseQueryInfiniteOptions<T> = Omit<
  T,
  "queryFn" | "queryKey" | "initialPageParam" | "getNextPageParam"
>;

export type QBaseQueryInfiniteOptionsOut<
  T,
  TQueryFnData = InfiniteData<unknown>,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  Omit<T, "queryKey"> &
    QueryKeyTag<TQueryKey, InfiniteData<TQueryFnData>, TError> &
    (
      | {
          [queryNodeDefinedInput]: unknown;
        }
      | {
          [queryNodeUndefinedInput]: unknown;
        }
    )
>;

export type QDefinedInitialDataInfiniteOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptions<
    DefinedInitialDataInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  >
>;

export type QDefinedInitialDataInfiniteOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptionsOut<
    DefinedInitialDataInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QUnusedSkipTokenInfiniteOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptions<
    UnusedSkipTokenInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  >
>;

export type QUnusedSkipTokenInfiniteOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptionsOut<
    UnusedSkipTokenInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QUndefinedInitialDataInfiniteOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptions<
    UndefinedInitialDataInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  >
>;

export type QUndefinedInitialDataInfiniteOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryInfiniteOptionsOut<
    UndefinedInitialDataInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
    TQueryFnData,
    TError,
    TQueryKey
  >
>;

export type QQueryInfiniteOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataInfiniteOptionsIn<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >
  | QUnusedSkipTokenInfiniteOptionsIn<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >
  | QUndefinedInitialDataInfiniteOptionsIn<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >;

export type QAnyQueryInfiniteOptionsIn = QQueryInfiniteOptionsIn<
  any,
  any,
  any,
  any,
  any
>;

export type QQueryInfiniteOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TPageParam = unknown,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataInfiniteOptionsOut<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >
  | QUnusedSkipTokenInfiniteOptionsOut<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >
  | QUndefinedInitialDataInfiniteOptionsOut<
      TQueryFnData,
      TError,
      TPageParam,
      TData,
      TQueryKey
    >;

export type QAnyQueryInfiniteOptionsOut = QQueryInfiniteOptionsOut<
  any,
  any,
  any,
  any,
  any
>;

export type ProxyKeyTag<TKey extends QueryKey = QueryKey> = {
  _key: TKey;
};

export type ProxyKeyNode = UnknownRecord & ProxyKeyTag;

export type ProxyNode<
  T extends Node = Node,
  TQueryKey extends QueryKey = [],
> = {
  [key in keyof T]: T[key] extends (...input: infer R) => infer S
    ? S extends QQueryOptionsOut<infer TQueryFnData, infer TError>
      ? (
          ...input: R
        ) => Merge<
          S,
          QueryKeyTag<
            R[0] extends QAnyQueryOptionsIn | void
              ? [...TQueryKey, key]
              : [...TQueryKey, key, { [inputSymbol]: R[0] }],
            TQueryFnData,
            TError
          >
        >
      : S extends QQueryInfiniteOptionsOut<infer TQueryFnData, infer TError>
        ? (
            ...input: R
          ) => Merge<
            S,
            InfiniteQueryKeyTag<
              R[0] extends QAnyQueryInfiniteOptionsIn | void
                ? [...TQueryKey, key]
                : [...TQueryKey, key, { [inputSymbol]: R[0] }],
              TQueryFnData,
              TError
            >
          >
        : S extends QMutationOptionsOut<
              infer TData,
              infer TError,
              infer TVariables,
              infer TContext
            >
          ? (
              ...input: R
            ) => Merge<
              S,
              MutationKeyTag<
                [...TQueryKey, key],
                TData,
                TError,
                TVariables,
                TContext
              >
            >
          : S extends Node
            ? (
                ...input: R
              ) => R[0] extends void | undefined
                ? Merge<
                    ProxyNode<S, [...TQueryKey, key]>,
                    ProxyKeyTag<[...TQueryKey, key]>
                  >
                : Merge<
                    ProxyNode<S, [...TQueryKey, key, R[0]]>,
                    ProxyKeyTag<[...TQueryKey, key, R[0]]>
                  >
            : never
    : T[key] extends Node
      ? Merge<
          ProxyNode<T[key], [...TQueryKey, key]>,
          ProxyKeyTag<[...TQueryKey, key]>
        >
      : never;
};
