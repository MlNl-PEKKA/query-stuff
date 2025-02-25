import type {
  AnyUseMutationOptions,
  AnyUseQueryOptions,
  DataTag,
  DefaultError,
  MutationKey,
  OmitKeyof,
  QueryKey,
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  key,
  type inputSymbol,
  type middlewareCtx,
  type middlewareData,
  type mutationContext,
  type mutationData,
  type mutationError,
  type mutationNode,
  type mutationVariables,
  type queryNodeDefinedInput,
  type queryNodeUndefinedInput,
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
          [queryNodeDefinedInput]: unknown;
        }
      | {
          [queryNodeUndefinedInput]: unknown;
        }
    )
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
  | QUnusedSkipTokenOptionsIn<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsIn<TQueryFnData, TError, TData, TQueryKey>;

export type QAnyQueryOptionsIn = QQueryOptionsIn<any, any, any, any>;

export type QQueryOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QUnusedSkipTokenOptionsOut<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsOut<TQueryFnData, TError, TData, TQueryKey>;

export type QAnyQueryOptionsOut = QQueryOptionsOut<any, any, any, any>;

export type QBaseMutationOptions<T extends AnyUseMutationOptions> = OmitKeyof<
  T,
  "mutationFn" | "mutationKey"
>;

export type MutationKeyTag<
  TMutationKey extends MutationKey = MutationKey,
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
> = {
  mutationKey: TMutationKey & {
    [mutationData]: TData;
    [mutationError]: TError;
    [mutationVariables]: TVariables;
    [mutationContext]: TContext;
  };
};

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

export type ProxyKeyTag<TKey extends QueryKey = QueryKey> = {
  [key]: TKey;
};

export type ProxyKeyNode = (
  | UnknownRecord
  | ((...args: never[]) => UnknownRecord)
) &
  ProxyKeyTag;

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
          ? ((
              ...input: R
            ) => ProxyNode<S, [...TQueryKey, key, R[0]]> &
              ProxyKeyTag<[...TQueryKey, key, R[0]]>) &
              ProxyKeyTag<[...TQueryKey, key]>
          : never
    : T[key] extends Node
      ? ProxyNode<T[key], [...TQueryKey, key]> &
          ProxyKeyTag<[...TQueryKey, key]>
      : never;
} & ProxyKeyTag<TQueryKey>;

export type MiddlewareResponse<TContext> = {
  [middlewareData]: {
    opts: any;
    run: (input: any) => any;
  };
  [middlewareCtx]: TContext;
};

export type MiddlewareFn<TContext, TOverride> = (opts: {
  ctx: TContext;
  next: <TContextIn>(opts: {
    ctx: TContextIn;
  }) => Promise<MiddlewareResponse<TContextIn>>;
}) => Promise<MiddlewareResponse<TOverride>>;

export type CtxOpts<TContext = void, TOverrides extends Overrides = []> = {
  ctx: Merge<TContext, OverridesRecord<TOverrides>>;
};

export type Overrides = readonly UnknownRecord[];

export type OverridesRecord<TOverrides extends Overrides> = TOverrides extends [
  infer Head,
  ...infer Tail,
]
  ? Tail extends Overrides
    ? Merge<Head, OverridesRecord<Tail>>
    : never
  : void;

export type Middlewares<
  TContext = void,
  TOverrides extends Overrides = [],
> = TOverrides extends [infer Head, ...infer Tail]
  ? Tail extends Overrides
    ? [MiddlewareFn<TContext, Head>, ...Middlewares<TContext, Tail>]
    : never
  : [];

export type AnyMiddlewares = MiddlewareFn<any, any>[];

export type Opts<
  TContext = void,
  TOverrides extends Overrides = [],
  TSchema = void,
> = CtxOpts<TContext, TOverrides> & {
  input: TSchema;
};
