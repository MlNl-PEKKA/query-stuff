import type {
  DefaultError,
  MutationFunction,
  OmitKeyof,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import {
  mutationNode,
  queryNodeWithInput,
  queryNodeWithoutInput,
} from "./symbols.js";
import type {
  Merge,
  Node,
  Prettify,
  ProxyNode,
  QDefinedInitialDataOptionsIn,
  QDefinedInitialDataOptionsOut,
  QMutationOptionsIn,
  QMutationOptionsOut,
  QQueryOptionsIn,
  QQueryOptionsOut,
  QUndefinedInitialDataOptionsIn,
  QUndefinedInitialDataOptionsOut,
  QUnusedSkipTokenOptionsIn,
  QUnusedSkipTokenOptionsOut,
  UnknownRecord,
} from "./types.js";
import { createProxyNode } from "./createProxyNode.js";

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
