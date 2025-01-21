import type {
  AnyUseMutationOptions,
  AnyUseQueryOptions,
  DataTag,
  DefaultError,
  DefinedInitialDataOptions,
  MutationKey,
  OmitKeyof,
  QueryKey,
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import type {
  mutationNode,
  queryNodeWithInput,
  queryNodeWithoutInput,
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

export type QBaseQueryOptions<T extends AnyUseQueryOptions> = OmitKeyof<
  T,
  "queryFn" | "queryKey"
>;

export type QueryKeyTag<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = DefaultError,
> = {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
};

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
          [queryNodeWithInput]: unknown;
        }
      | {
          [queryNodeWithoutInput]: unknown;
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

export type QBaseMutationOptions<T extends AnyUseMutationOptions> = OmitKeyof<
  T,
  "mutationFn" | "mutationKey"
>;

export type MutationKeyTag<TMutationKey extends MutationKey = MutationKey> = {
  mutationKey: TMutationKey;
};

export type QBaseMutationOptionsOut<T extends AnyUseMutationOptions> = Merge<
  T,
  MutationKeyTag
> & { [mutationNode]: unknown };

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
> = QBaseMutationOptionsOut<
  UseMutationOptions<TData, TError, TVariables, TContext>
>;

export type QAnyMutationOptionsOut = QMutationOptionsOut<any, any, any, any>;

export type ProxyKeyTag<TKey extends QueryKey = []> = {
  _key: TKey;
};

export type ProxyNode<T extends Node, TQueryKey extends QueryKey = []> = {
  [key in keyof T]: T[key] extends (...input: infer R) => infer S
    ? S extends QQueryOptionsOut<infer TQueryFnData, infer TError>
      ? (
          ...input: R
        ) => Merge<
          S,
          QueryKeyTag<
            R[0] extends QAnyQueryOptionsIn | void
              ? [...TQueryKey, key]
              : [...TQueryKey, key, R[0]],
            TQueryFnData,
            TError
          >
        >
      : S extends QAnyMutationOptionsOut
        ? (...input: R) => Merge<S, MutationKeyTag<[...TQueryKey, key]>>
        : S extends Node
          ? (
              ...input: R
            ) => Merge<
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
