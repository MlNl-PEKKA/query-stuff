import type {
  DefaultError,
  MutationFunction,
  OmitKeyof,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { createProxyNode } from "./createProxyNode.js";
import {
  middlewareCtx,
  middlewareData,
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
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
  CtxOpts,
  Overrides,
  Middlewares,
  AnyMiddlewares,
  Opts,
  MiddlewareFn,
} from "./types.js";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { mutationOptions } from "./utils.js";

export const factory = <
  T extends Node,
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
>(
  fn: (q: QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>) => T,
): ProxyNode<T> => {
  return createProxyNode(
    fn(new QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>()),
  );
};

export class QueryStuffRoot<
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
> {
  constructor(
    protected _ctx: TContext = {} as TContext,
    protected _middlewares: TMiddlewares = [] as unknown as TMiddlewares,
  ) {}
  protected async execute<TData>(
    fn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    input: void,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: () => TData;
  }>;
  protected async execute<TData>(
    fn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    input: void,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: () => TData;
  }>;
  protected async execute<TData, TSchema>(
    fn: (opts: Opts<TContext, TOverrides, TSchema>) => TData,
    input: TSchema,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TSchema) => TData;
  }>;
  protected async execute<TData, TSchema>(
    fn: (opts: Opts<TContext, TOverrides, TSchema>) => TData,
    input: void,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TSchema) => TData;
  }>;
  protected async execute<TData, TSchema>(
    fn: (opts: Opts<TContext, TOverrides, TSchema>) => TData,
    input: TSchema,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TSchema) => TData;
  }> {
    const run = async (
      index: number,
      opts: CtxOpts<TContext, TOverrides>,
    ): Promise<{
      opts: CtxOpts<TContext, TOverrides>;
      run: (input: TSchema) => TData;
    }> => {
      if (index >= this._middlewares.length)
        return {
          opts,
          run: (mutationInput) =>
            fn({ ...opts, input: mutationInput ?? input }),
        };
      else
        return (
          await this._middlewares[index]!({
            ctx: this._ctx,
            next: async ({ ctx: CTX }) => {
              const data = await run(index + 1, {
                ...opts,
                ctx: { ...opts.ctx, ...CTX },
              });
              return {
                [middlewareData]: data,
                [middlewareCtx]: CTX,
              };
            },
          })
        )[middlewareData];
    };
    return await run(0, { ctx: this._ctx } as CtxOpts<TContext, TOverrides>);
  }
}

export class QueryStuffUndefinedInput<
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
> extends QueryStuffRoot<TContext, TOverrides, TMiddlewares> {
  input<TSchema extends StandardSchemaV1<UnknownRecord>>(
    schema: TSchema,
  ): QueryStuffDefinedRecordInput<TSchema, TContext, TOverrides, TMiddlewares>;
  input<TSchema extends StandardSchemaV1>(
    schema: TSchema,
  ): QueryStuffDefinedInput<TSchema, TContext, TOverrides, TMiddlewares>;
  input<TSchema extends StandardSchemaV1<UnknownRecord>>(
    schema: TSchema,
  ): QueryStuffDefinedRecordInput<TSchema, TContext, TOverrides, TMiddlewares> {
    return new QueryStuffDefinedRecordInput<
      TSchema,
      TContext,
      TOverrides,
      TMiddlewares
    >(schema, this._ctx, this._middlewares);
  }
  module<T extends Node>(
    fn: (q: QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>) => T,
  ) {
    return fn(new QueryStuffUndefinedInput(this._ctx, this._middlewares));
  }
  use<TOverride extends UnknownRecord>(
    fn: MiddlewareFn<void, TOverride>,
  ): QueryStuffUndefinedInput<
    TContext,
    [...TOverrides, TOverride],
    [...TMiddlewares, MiddlewareFn<TContext, TOverride>]
  >;
  use<TOverride extends UnknownRecord>(
    fn: MiddlewareFn<CtxOpts<TContext, TOverrides>["ctx"], TOverride>,
  ): QueryStuffUndefinedInput<
    TContext,
    [...TOverrides, TOverride],
    [
      ...TMiddlewares,
      MiddlewareFn<CtxOpts<TContext, TOverrides>["ctx"], TOverride>,
    ]
  >;
  use<
    TOverride extends UnknownRecord,
    U extends void | CtxOpts<TContext, TOverrides>["ctx"],
  >(
    fn: MiddlewareFn<U, TOverride>,
  ): QueryStuffUndefinedInput<
    TContext,
    [...TOverrides, TOverride],
    [...TMiddlewares, MiddlewareFn<U extends void ? TContext : U, TOverride>]
  > {
    const middlewares = [...this._middlewares, fn] as [
      ...TMiddlewares,
      MiddlewareFn<U extends void ? TContext : U, TOverride>,
    ];
    return new QueryStuffUndefinedInput<
      TContext,
      [...TOverrides, TOverride],
      [...TMiddlewares, MiddlewareFn<U extends void ? TContext : U, TOverride>]
    >(this._ctx, middlewares);
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: CtxOpts<TContext, TOverrides>) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    const execute = async () => await this.execute(queryFn);
    let result: Awaited<ReturnType<typeof execute>>;
    return (overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: async () => {
          result ??= await execute();
          return await result.run();
        },
      }),
      [queryNodeUndefinedInput]: {},
    });
  }
  mutation<TData = unknown, TError = DefaultError, TMutationContext = unknown>(
    mutationFn: MutationFunction<TData, CtxOpts<TContext, TOverrides>>,
    options: QMutationOptionsIn<
      TData,
      TError,
      CtxOpts<TContext, TOverrides>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      CtxOpts<TContext, TOverrides>,
      TMutationContext
    >,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    void,
    NoInfer<TMutationContext>
  > {
    const execute = async () => await this.execute(mutationFn);
    let result: Awaited<ReturnType<typeof execute>>;
    return (overrideOptions = {}) => ({
      ...mutationOptions({
        ...options,
        ...overrideOptions,
        mutationKey: [],
        mutationFn: async () => {
          result ??= await execute();
          return await result.run();
        },
        onMutate: async () => {
          result ??= await execute();
          return (
            overrideOptions.onMutate?.(result.opts) ??
            options.onMutate?.(result.opts)
          );
        },
        onSuccess: async (data, _, context) => {
          result ??= await execute();
          return (
            overrideOptions.onSuccess?.(data, result.opts, context) ??
            options.onSuccess?.(data, result.opts, context)
          );
        },
        onError: async (error, _, context) => {
          result ??= await execute();
          return (
            overrideOptions.onError?.(error, result.opts, context) ??
            options.onError?.(error, result.opts, context)
          );
        },
        onSettled: async (data, error, _, context) => {
          result ??= await execute();
          return (
            overrideOptions.onSettled?.(data, error, result.opts, context) ??
            options.onSettled?.(data, error, result.opts, context)
          );
        },
      }),
      [mutationNode]: {},
    });
  }
}

export class QueryStuffDefinedInput<
  TSchema extends StandardSchemaV1,
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
  TInput extends
    StandardSchemaV1.InferInput<TSchema> = StandardSchemaV1.InferInput<TSchema>,
> extends QueryStuffRoot<TContext, TOverrides, TMiddlewares> {
  constructor(
    protected _schema: TSchema,
    protected _ctx: TContext = {} as TContext,
    protected _middlewares: TMiddlewares = [] as unknown as TMiddlewares,
  ) {
    super(_ctx, _middlewares);
  }
  protected validate<T, U extends unknown[]>(
    fn: (...args: [TInput, ...U]) => T,
  ) {
    return (input: TInput, ...rest: U) => {
      const result = this._schema["~standard"].validate(input);
      if (result instanceof Promise) {
        throw new TypeError("Schema validation must be synchronous");
      }
      if (result.issues)
        throw new Error(JSON.stringify(result.issues, null, 2));
      return fn(input, ...rest);
    };
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    options?: QDefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: Prettify<
      OmitKeyof<QDefinedInitialDataOptionsIn<TData, TError>, "initialData">
    >,
  ) => QDefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    options: QQueryOptionsIn<TData, TError> = {},
  ): (
    input: TInput,
    overrideOptions?: QQueryOptionsIn<TData, TError>,
  ) => QQueryOptionsOut<NoInfer<TData>, NoInfer<TError>> {
    const execute = async (input: TInput) => await this.execute(queryFn, input);
    let result: Awaited<ReturnType<typeof execute>>;
    return this.validate((input, overrideOptions = {}) => ({
      ...queryOptions({
        ...options,
        ...overrideOptions,
        queryKey: [],
        queryFn: async () => {
          result ??= await execute(input);
          return await result.run(input);
        },
      }),
      [queryNodeDefinedInput]: {},
    }));
  }
  mutation<TData = unknown, TError = DefaultError, TMutationContext = unknown>(
    mutationFn: MutationFunction<TData, Opts<TContext, TOverrides, TInput>>,
    options: QMutationOptionsIn<
      TData,
      TError,
      Opts<TContext, TOverrides, TInput>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      Opts<TContext, TOverrides, TInput>,
      TMutationContext
    >,
  ) => QMutationOptionsOut<
    NoInfer<TData>,
    NoInfer<TError>,
    NoInfer<TInput>,
    NoInfer<TMutationContext>
  > {
    const execute = async (input: TInput) =>
      await this.execute(mutationFn, input);
    let result: Awaited<ReturnType<typeof execute>>;
    return (overrideOptions = {}) => ({
      ...mutationOptions({
        ...options,
        ...overrideOptions,
        mutationKey: [],
        mutationFn: this.validate(async (input) => {
          result ??= await execute(input);
          return await result.run(input);
        }),
        onMutate: async (input) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return (
            overrideOptions.onMutate?.(variables) ??
            options.onMutate?.(variables)
          );
        },
        onSuccess: async (data, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return (
            overrideOptions.onSuccess?.(data, variables, context) ??
            options.onSuccess?.(data, variables, context)
          );
        },
        onError: async (error, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return (
            overrideOptions.onError?.(error, variables, context) ??
            options.onError?.(error, variables, context)
          );
        },
        onSettled: async (data, error, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return (
            overrideOptions.onSettled?.(data, error, variables, context) ??
            options.onSettled?.(data, error, variables, context)
          );
        },
      }),
      [mutationNode]: {},
    });
  }
}

export class QueryStuffDefinedRecordInput<
  TSchema extends StandardSchemaV1<UnknownRecord>,
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
  TInput extends
    StandardSchemaV1.InferInput<TSchema> = StandardSchemaV1.InferInput<TSchema>,
> extends QueryStuffDefinedInput<
  TSchema,
  TContext,
  TOverrides,
  TMiddlewares,
  TInput
> {
  module<T extends Node>(
    fn: (
      q: QueryStuffUndefinedInput<
        Merge<TContext, TInput>,
        TOverrides,
        TMiddlewares
      >,
    ) => T,
  ) {
    return this.validate((input: TInput) =>
      fn(
        new QueryStuffUndefinedInput(
          {
            ...this._ctx,
            ...input,
          },
          this._middlewares,
        ),
      ),
    );
  }
}
