import type {
  DefaultError,
  MutationFunction,
  OmitKeyof,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { createProxyNode } from "./createProxyNode.js";
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
} from "./types.ts";
import {
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
} from "./symbols.js";
import { mutationOptions } from "./utils.js";

type CtxOpts<TContext = void> = {
  ctx: TContext;
};

type Opts<TContext = void, TInput = void> = CtxOpts<TContext> & {
  input: TInput;
};

abstract class QueryStuffRoot<TContext = void> {
  constructor(protected _ctx: TContext = {} as TContext) {}
}

export const factory = <T extends Node, TContext = void>(
  fn: (q: QueryStuffUndefinedInput<TContext>) => T,
): ProxyNode<T> => {
  return createProxyNode(fn(new QueryStuffUndefinedInput<TContext>()));
};

export class QueryStuffUndefinedInput<
  TContext = void,
> extends QueryStuffRoot<TContext> {
  module<
    TContextIn extends Prettify<
      UnknownRecord & { [K in keyof TContext]?: never }
    > | void = void,
  >() {
    return <T extends Node>(
        fn: (
          q: QueryStuffUndefinedInput<Merge<TContext, NoInfer<TContextIn>>>,
        ) => T,
      ) =>
      (ctx: NoInfer<TContextIn>) =>
        fn(
          new QueryStuffUndefinedInput<Merge<TContext, NoInfer<TContextIn>>>({
            ...this._ctx,
            ...ctx,
          }),
        );
  }
  input<TInput = void>() {
    return new QueryStuffDefinedInput<TContext, TInput>(this._ctx);
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext>) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext>) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext>) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    return (overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: () => queryFn({ ctx: this._ctx }),
      }),
      [queryNodeUndefinedInput]: {},
    });
  }
  mutation<TData = unknown, TError = DefaultError, TMutationContext = unknown>(
    mutationFn: MutationFunction<TData, CtxOpts<TContext>>,
    options: QMutationOptionsIn<
      TData,
      TError,
      CtxOpts<TContext>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      CtxOpts<TContext>,
      TMutationContext
    >,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    void,
    NoInfer<TMutationContext>
  > {
    return (overrideOptions = {}) => ({
      ...mutationOptions({
        ...options,
        ...overrideOptions,
        mutationKey: [],
        mutationFn: () => mutationFn({ ctx: this._ctx }),
        onMutate: () =>
          overrideOptions.onMutate?.({ ctx: this._ctx }) ??
          options.onMutate?.({ ctx: this._ctx }),
        onSuccess: (data, _, context) =>
          overrideOptions.onSuccess?.(data, { ctx: this._ctx }, context) ??
          options.onSuccess?.(data, { ctx: this._ctx }, context),
        onError: (error, _, context) =>
          overrideOptions.onError?.(error, { ctx: this._ctx }, context) ??
          options.onError?.(error, { ctx: this._ctx }, context),
        onSettled: (data, error, _, context) =>
          overrideOptions.onSettled?.(
            data,
            error,
            { ctx: this._ctx },
            context,
          ) ?? options.onSettled?.(data, error, { ctx: this._ctx }, context),
      }),
      [mutationNode]: {},
    });
  }
}

export class QueryStuffDefinedInput<
  TContext = void,
  TInput = unknown,
> extends QueryStuffRoot<TContext> {
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TInput>) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TInput>) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TInput>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TInput>) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    input: TInput,
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    return (input, overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: () => queryFn({ input, ctx: this._ctx }),
      }),
      [queryNodeDefinedInput]: {},
    });
  }
  mutation<TData = unknown, TError = DefaultError, TMutationContext = unknown>(
    mutationFn: MutationFunction<TData, Opts<TContext, TInput>>,
    options: QMutationOptionsIn<
      TData,
      TError,
      Opts<TContext, TInput>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      Opts<TContext, TInput>,
      TMutationContext
    >,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    NoInfer<TInput>,
    NoInfer<TMutationContext>
  > {
    return (overrideOptions = {}) => ({
      ...mutationOptions({
        ...options,
        ...overrideOptions,
        mutationKey: [],
        mutationFn: (input) => mutationFn({ ctx: this._ctx, input }),
        onMutate: (input) =>
          overrideOptions.onMutate?.({ ctx: this._ctx, input }) ??
          options.onMutate?.({ ctx: this._ctx, input }),
        onSuccess: (data, input, context) =>
          overrideOptions.onSuccess?.(
            data,
            { ctx: this._ctx, input },
            context,
          ) ?? options.onSuccess?.(data, { ctx: this._ctx, input }, context),
        onError: (error, input, context) =>
          overrideOptions.onError?.(
            error,
            { ctx: this._ctx, input },
            context,
          ) ?? options.onError?.(error, { ctx: this._ctx, input }, context),
        onSettled: (data, error, input, context) =>
          overrideOptions.onSettled?.(
            data,
            error,
            { ctx: this._ctx, input },
            context,
          ) ??
          options.onSettled?.(data, error, { ctx: this._ctx, input }, context),
      }),
      [mutationNode]: {},
    });
  }
}
