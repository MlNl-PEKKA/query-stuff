import type {
  AnyUseMutationOptions,
  AnyUseQueryOptions,
  DataTag,
  DefaultError,
  DefinedInitialDataOptions,
  MutationFunction,
  MutationKey,
  OmitKeyof,
  QueryKey,
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import type { UnknownRecord } from "type-fest";

const queryNodeWithoutInput = Symbol("queryNodeWithoutInput");
const queryNodeWithInput = Symbol("queryNodeWithInput");
const mutationNode = Symbol("mutationNode");

const isString = (p: string | symbol): p is string => {
  return typeof p === "string";
};

const isNodeObject = (target: unknown): target is Node => {
  return target !== null && typeof target === "object";
};

const isQueryNodeWithoutInput = (
  target: unknown,
): target is QQueryOptionsOut => {
  return isNodeObject(target) && queryNodeWithoutInput in target;
};

const isQueryNodeWithInput = (target: unknown): target is QQueryOptionsOut => {
  return isNodeObject(target) && queryNodeWithInput in target;
};

const isQueryNode = (target: unknown): target is QQueryOptionsOut => {
  return (
    isNodeObject(target) &&
    (isQueryNodeWithInput(target) || isQueryNodeWithoutInput(target))
  );
};

const isMutationNode = (target: unknown): target is QMutationOptionsOut => {
  return isNodeObject(target) && mutationNode in target;
};

const isNodeFunction = (
  target: unknown,
): target is (
  ...input: unknown[]
) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut => {
  return target !== null && typeof target === "function";
};

const isNode = (
  target:
    | undefined
    | Node
    | QAnyQueryOptionsOut
    | QAnyMutationOptionsOut
    | ((
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut),
): target is Node => {
  return (
    isQueryNode(target) ||
    isMutationNode(target) ||
    isNodeFunction(target) ||
    isNodeObject(target)
  );
};

const createProxyNode = <T extends Node>(
  node: T,
  keys: QueryKey = [],
): ProxyNode<T> => {
  return new Proxy(node, {
    get: (target, p, receiver) => {
      if (isNodeFunction(target)) {
        throw new Error("Only non-functions allowed");
      }
      if (!isString(p)) {
        throw new Error("Only string properties allowed");
      }
      if (p === "_key") {
        return keys;
      }
      if (isQueryNode(target)) {
        return Reflect.get({ ...target, queryKey: keys }, p, receiver);
      }
      if (isMutationNode(target)) {
        return Reflect.get({ ...target, mutationKey: keys }, p, receiver);
      }
      const nextTarget = target[p];
      const nextKeys = [...keys, p];
      if (isNode(nextTarget)) {
        return createProxyNode(nextTarget, nextKeys);
      }
    },
    apply: (target, _thisArg, argArray: UnknownRecord[]) => {
      if (!isNodeFunction(target)) {
        throw new Error("Unknow function structure");
      }
      const nextTarget = target(...argArray);
      const nextKeys = [...keys];
      if (
        argArray[0] &&
        !(isMutationNode(nextTarget) || isQueryNodeWithoutInput(nextTarget))
      ) {
        nextKeys.push(argArray[0]);
      }
      if (isNode(nextTarget)) {
        return createProxyNode(nextTarget, nextKeys);
      }
    },
  }) as unknown as ProxyNode<T>;
};

abstract class QueryStuffRoot<TInput = {}> {
  constructor(protected _input: TInput = {} as TInput) {}
}

export class QueryStuff<
  TInput extends UnknownRecord = {},
> extends QueryStuffRoot<TInput> {
  factory<T extends Node>(
    fn: (q: QueryStuffWithoutInput<TInput>) => T,
  ): ProxyNode<T> {
    return createProxyNode(fn(new QueryStuffWithoutInput(this._input)));
  }
}

class QueryStuffWithoutInput<TInput> extends QueryStuffRoot<TInput> {
  module<T extends Node>(fn: (q: QueryStuffWithoutInput<TInput>) => T): T {
    return fn(new QueryStuffWithoutInput(this._input));
  }
  input<
    T extends Prettify<UnknownRecord & { [key in keyof TInput]?: never }>,
  >() {
    return new QueryStuffWithInput<TInput, Prettify<Omit<T, keyof TInput>>>(
      this._input,
    );
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: TInput) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: TInput) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: TInput) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: TInput) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    return (overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: () => queryFn(this._input),
      }),
      [queryNodeWithoutInput]: {},
    });
  }
  mutation<TData = unknown, TError = DefaultError, TContext = unknown>(
    mutationFn: MutationFunction<TData, TInput>,
  ): (
    overrideOptions?: QMutationOptionsIn<TData, TError, TInput, TContext>,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    void,
    NoInfer<TContext>
  > {
    return (overrideOptions = {}) => ({
      ...overrideOptions,
      mutationKey: [],
      mutationFn: () => mutationFn(this._input),
      onMutate: () => overrideOptions.onMutate?.(this._input),
      onSuccess: (data, _, context) =>
        overrideOptions.onSuccess?.(data, this._input, context),
      onError: (error, _, context) =>
        overrideOptions.onError?.(error, this._input, context),
      onSettled: (data, error, _, context) =>
        overrideOptions.onSettled?.(data, error, this._input, context),
      [mutationNode]: {},
    });
  }
}

class QueryStuffWithInput<TInput, TInputIn> extends QueryStuffRoot<TInput> {
  module<T extends Node>(
    fn: (q: QueryStuffWithoutInput<Merge<TInput, TInputIn>>) => T,
  ): (input: TInputIn) => T {
    return (input) =>
      fn(
        new QueryStuffWithoutInput<Merge<TInput, TInputIn>>({
          ...this._input,
          ...input,
        }),
      );
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: Merge<TInput, TInputIn>) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInputIn,
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: Merge<TInput, TInputIn>) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    input: TInputIn,
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: Merge<TInput, TInputIn>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInputIn,
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (input: Merge<TInput, TInputIn>) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    input: TInputIn,
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    return (input, overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: () => queryFn({ ...this._input, ...input }),
      }),
      [queryNodeWithInput]: {},
    });
  }
  mutation<TData = unknown, TError = DefaultError, TContext = unknown>(
    mutationFn: MutationFunction<TData, Merge<TInput, TInputIn>>,
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      Merge<TInput, TInputIn>,
      TContext
    >,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    NoInfer<TInputIn>,
    NoInfer<TContext>
  > {
    return (overrideOptions = {}) => ({
      ...overrideOptions,
      mutationKey: [],
      mutationFn: (input) => mutationFn({ ...this._input, ...input }),
      onMutate: (input) =>
        overrideOptions.onMutate?.({ ...this._input, ...input }),
      onSuccess: (data, input, context) =>
        overrideOptions.onSuccess?.(
          data,
          { ...this._input, ...input },
          context,
        ),
      onError: (error, input, context) =>
        overrideOptions.onError?.(error, { ...this._input, ...input }, context),
      onSettled: (data, error, input, context) =>
        overrideOptions.onSettled?.(
          data,
          error,
          { ...this._input, ...input },
          context,
        ),
      [mutationNode]: {},
    });
  }
}

type Prettify<T> = { [key in keyof T]: T[key] } & {};

type SimpleMerge<Destination, Source> = {
  [Key in keyof Destination as Key extends keyof Source
    ? never
    : Key]: Destination[Key];
} & Source;

type PickIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? KeyType
    : never]: ObjectType[KeyType];
};

type OmitIndexSignature<ObjectType> = {
  [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
    ? never
    : KeyType]: ObjectType[KeyType];
};

type Merge<Destination, Source> = Prettify<
  SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>> &
    SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>
>;

interface Node {
  [key: PropertyKey]:
    | Node
    | ((
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut);
}

type QBaseQueryOptions<T extends AnyUseQueryOptions> = OmitKeyof<
  T,
  "queryFn" | "queryKey"
>;

interface QueryKeyTag<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = DefaultError,
> {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>;
}

type QBaseQueryOptionsOut<
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

type QDefinedInitialDataOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

type QDefinedInitialDataOptionsOut<
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

type QUnusedSkipTokenOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

type QUnusedSkipTokenOptionsOut<
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

type QUndefinedInitialDataOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Prettify<
  QBaseQueryOptions<
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
  >
>;

type QUndefinedInitialDataOptionsOut<
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

type QQueryOptionsIn<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataOptionsIn<TQueryFnData, TError, TData, TQueryKey>
  | QUnusedSkipTokenOptionsIn<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsIn<TQueryFnData, TError, TData, TQueryKey>;

type QAnyQueryOptionsIn = QQueryOptionsIn<any, any, any, any>;

type QQueryOptionsOut<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | QDefinedInitialDataOptionsOut<TQueryFnData, TError, TData, TQueryKey>
  | QUnusedSkipTokenOptionsOut<TQueryFnData, TError, TData, TQueryKey>
  | QUndefinedInitialDataOptionsOut<TQueryFnData, TError, TData, TQueryKey>;

type QAnyQueryOptionsOut = QQueryOptionsOut<any, any, any, any>;

type QBaseMutationOptions<T extends AnyUseMutationOptions> = OmitKeyof<
  T,
  "mutationFn" | "mutationKey"
>;

interface MutationKeyTag<TMutationKey extends MutationKey = MutationKey> {
  mutationKey: TMutationKey;
}

type QBaseMutationOptionsOut<T extends AnyUseMutationOptions> = Merge<
  T,
  MutationKeyTag
> & { [mutationNode]: unknown };

type QMutationOptionsIn<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
> = Prettify<
  QBaseMutationOptions<UseMutationOptions<TData, TError, TVariables, TContext>>
>;

type QMutationOptionsOut<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
> = QBaseMutationOptionsOut<
  UseMutationOptions<TData, TError, TVariables, TContext>
>;

type QAnyMutationOptionsOut = QMutationOptionsOut<any, any, any, any>;

interface ProxyKeyTag<TKey extends QueryKey = []> {
  _key: TKey;
}

type ProxyNode<T extends Node, TQueryKey extends QueryKey = []> = {
  [key in keyof T]: T[key] extends (...input: infer R) => infer S
    ? S extends QQueryOptionsOut<infer TQueryFnData, infer TError>
      ? (
          ...input: R
        ) => Merge<
          S,
          QueryKeyTag<
            R[0] extends QAnyQueryOptionsIn | undefined
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

// USAGE:
// ------------------------------------------
// const q = new QueryStuff();

// const factory = q.factory((q) => ({
//   a: q.query(() => ({ aa: 1 }), { initialData: { aa: 2 } }),
//   b: q.mutation(async () => ({ bb: 1 })),
//   c: q.input<{ cc: number }>().query(({ cc }) => ({ cc })),
//   d: q.input<{ dd: number }>().mutation(async ({ dd }) => ({ dd })),
//   e: q.module((q) => ({
//     a: q.query(() => ({ aa: 1 })),
//     b: q.mutation(async () => ({ bb: 1 })),
//     c: q.input<{ cc: number }>().query(({ cc }) => ({ cc })),
//     d: q.input<{ dd: number }>().mutation(async ({ dd }) => ({ dd })),
//   })),
//   f: q.input<{ ff: number }>().module((q) => ({
//     a: q.query(({ ff }) => ({ aaa: 1, ff })),
//     b: q.mutation(async ({ ff }) => ({ bb: 1, ff })),
//     c: q.input<{ cc: number }>().query(({ cc, ff }) => ({ cc, ff })),
//     d: q.input<{ dd: number }>().mutation(async ({ dd, ff }) => ({ dd, ff })),
//   })),
// }));

// console.log(factory.a().queryKey);
// console.log(factory.b({ gcTime: 0 }).mutationKey);
// console.log(factory.c({ cc: 1 }).queryKey);
// console.log(factory.d().mutationKey);
// console.log(factory.e._key);
// console.log(factory.e.b().mutationKey);
// console.log(factory.e.c({ cc: 1 }).queryKey);
// console.log(factory.e.d().mutationKey);
// console.log(factory.f({ ff: 1 }).a().queryKey);
// console.log(factory.f({ ff: 1 }).b().mutationKey);
// console.log(factory.f({ ff: 1 }).c({ cc: 1 }).queryKey);
// console.log(factory.f({ ff: 1 }).d().mutationKey);
