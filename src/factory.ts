import type { StandardSchemaV1 } from "@standard-schema/spec";
import type {
  DefaultError,
  MutationFunction,
  SkipToken,
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
  AnyMiddlewares,
  CtxOpts,
  Merge,
  MiddlewareFn,
  Middlewares,
  Node,
  Opts,
  Overrides,
  Prettify,
  ProxyNode,
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
import { mutationOptions } from "./utils.js";

export const factory = <
  T extends Node,
  U extends string,
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TContext, TOverrides>,
>(
  name: U,
  fn: (q: QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>) => T,
): ProxyNode<T, [U]> => {
  return createProxyNode(
    fn(new QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>()),
    [name],
  );
};

export class QueryStuffRoot<
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TContext, TOverrides>,
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
  TMiddlewares extends AnyMiddlewares = Middlewares<TContext, TOverrides>,
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
  group<T extends Node>(
    fn: (q: QueryStuffUndefinedInput<TContext, TOverrides, TMiddlewares>) => T,
  ) {
    return fn(new QueryStuffUndefinedInput(this._ctx, this._middlewares));
  }
  unstable_use<TOverride extends UnknownRecord>(
    fn: MiddlewareFn<Prettify<CtxOpts<TContext, TOverrides>>["ctx"], TOverride>,
  ): QueryStuffUndefinedInput<
    TContext,
    [...TOverrides, TOverride],
    [...TMiddlewares, typeof fn]
  > {
    return new QueryStuffUndefinedInput<
      TContext,
      [...TOverrides, TOverride],
      [...TMiddlewares, typeof fn]
    >(this._ctx, [...this._middlewares, fn]);
  }
  query<TData = unknown, TError = DefaultError>(
    queryFn:
      | SkipToken
      | ((opts: Prettify<CtxOpts<TContext, TOverrides>>) => TData),
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Prettify<CtxOpts<TContext, TOverrides>>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Prettify<CtxOpts<TContext, TOverrides>>) => TData,
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
    mutationFn: MutationFunction<
      TData,
      Prettify<CtxOpts<TContext, TOverrides>>
    >,
    options: QMutationOptionsIn<
      TData,
      TError,
      Prettify<CtxOpts<TContext, TOverrides>>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      Prettify<CtxOpts<TContext, TOverrides>>,
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
          return await (overrideOptions.onMutate?.(result.opts) ??
            options.onMutate?.(result.opts));
        },
        onSuccess: async (data, _, context) => {
          result ??= await execute();
          return await (overrideOptions.onSuccess?.(
            data,
            result.opts,
            context,
          ) ?? options.onSuccess?.(data, result.opts, context));
        },
        onError: async (error, _, context) => {
          result ??= await execute();
          return await (overrideOptions.onError?.(
            error,
            result.opts,
            context,
          ) ?? options.onError?.(error, result.opts, context));
        },
        onSettled: async (data, error, _, context) => {
          result ??= await execute();
          return await (overrideOptions.onSettled?.(
            data,
            error,
            result.opts,
            context,
          ) ?? options.onSettled?.(data, error, result.opts, context));
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
  TMiddlewares extends AnyMiddlewares = Middlewares<TContext, TOverrides>,
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
    queryFn:
      | SkipToken
      | ((opts: Prettify<Opts<TContext, TOverrides, TInput>>) => TData),
    options?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUnusedSkipTokenOptionsIn<TData, TError>,
  ) => QUnusedSkipTokenOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Prettify<Opts<TContext, TOverrides, TInput>>) => TData,
    options?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ): (
    input: TInput,
    overrideOptions?: QUndefinedInitialDataOptionsIn<TData, TError>,
  ) => QUndefinedInitialDataOptionsOut<NoInfer<TData>, NoInfer<TError>>;
  query<TData = unknown, TError = DefaultError>(
    queryFn: (opts: Prettify<Opts<TContext, TOverrides, TInput>>) => TData,
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
    mutationFn: MutationFunction<
      TData,
      Prettify<Opts<TContext, TOverrides, TInput>>
    >,
    options: QMutationOptionsIn<
      TData,
      TError,
      Prettify<Opts<TContext, TOverrides, TInput>>,
      TMutationContext
    > = {},
  ): (
    overrideOptions?: QMutationOptionsIn<
      TData,
      TError,
      Prettify<Opts<TContext, TOverrides, TInput>>,
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
          return await (overrideOptions.onMutate?.(variables) ??
            options.onMutate?.(variables));
        },
        onSuccess: async (data, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return await (overrideOptions.onSuccess?.(data, variables, context) ??
            options.onSuccess?.(data, variables, context));
        },
        onError: async (error, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return await (overrideOptions.onError?.(error, variables, context) ??
            options.onError?.(error, variables, context));
        },
        onSettled: async (data, error, input, context) => {
          result ??= await execute(input);
          const variables = { ...result.opts, input };
          return await (overrideOptions.onSettled?.(
            data,
            error,
            variables,
            context,
          ) ?? options.onSettled?.(data, error, variables, context));
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
  TMiddlewares extends AnyMiddlewares = Middlewares<TContext, TOverrides>,
  TInput extends
    StandardSchemaV1.InferInput<TSchema> = StandardSchemaV1.InferInput<TSchema>,
> extends QueryStuffDefinedInput<
  TSchema,
  TContext,
  TOverrides,
  TMiddlewares,
  TInput
> {
  group<T extends Node>(
    fn: (
      q: QueryStuffUndefinedInput<
        Merge<TContext, TInput>,
        TOverrides,
        TMiddlewares
      >,
    ) => T,
  ) {
    return this.validate((input) =>
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
