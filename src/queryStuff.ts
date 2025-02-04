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
} from "./types.ts";
import { mutationOptions } from "./utils.js";

type MiddlewareResponse<TContext> = {
  [middlewareData]: {
    opts: any;
    run: (input: any) => any;
  };
  [middlewareCtx]: TContext;
};

type MiddlewareFn<TContext, TOverride> = (opts: {
  ctx: TContext;
  next: <TContextIn>(opts: {
    ctx: TContextIn;
  }) => Promise<MiddlewareResponse<TContextIn>>;
}) => Promise<MiddlewareResponse<TOverride>>;

type AnyMiddlewareFn = MiddlewareFn<any, any>;

type CtxOpts<TContext = void, TOverrides extends Overrides = []> = {
  ctx: Merge<TContext, OverridesRecord<TOverrides>>;
};

export type Overrides = readonly UnknownRecord[];

type OverridesRecord<TOverrides extends Overrides> = TOverrides extends [
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

export type AnyMiddlewares = AnyMiddlewareFn[];

type Opts<
  TContext = void,
  TOverrides extends Overrides = [],
  TInput = void,
> = CtxOpts<TContext, TOverrides> & {
  input: TInput;
};

class QueryStuffRoot<
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
  protected async execute<TData, TInput>(
    fn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    input: TInput,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TInput) => TData;
  }>;
  protected async execute<TData, TInput>(
    fn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    input: void,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TInput) => TData;
  }>;
  protected async execute<TData, TInput>(
    fn: (opts: Opts<TContext, TOverrides, TInput>) => TData,
    input: TInput,
  ): Promise<{
    opts: CtxOpts<TContext, TOverrides>;
    run: (input: TInput) => TData;
  }> {
    const run = async (
      index: number,
      opts: CtxOpts<TContext, TOverrides>,
    ): Promise<{
      opts: CtxOpts<TContext, TOverrides>;
      run: (input: TInput) => TData;
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

export class QueryStuffUndefinedInput<
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
> extends QueryStuffRoot<TContext, TOverrides, TMiddlewares> {
  module<
    TContextIn extends Prettify<
      UnknownRecord & {
        [K in keyof Merge<TContext, OverridesRecord<TOverrides>>]?: never;
      }
    > | void = void,
  >() {
    return <T extends Node>(
        fn: (
          q: QueryStuffUndefinedInput<
            Merge<TContext, NoInfer<TContextIn>>,
            TOverrides,
            TMiddlewares
          >,
        ) => T,
      ) =>
      (ctx: NoInfer<TContextIn>) =>
        fn(
          new QueryStuffUndefinedInput(
            {
              ...this._ctx,
              ...ctx,
            },
            this._middlewares,
          ),
        );
  }
  use<
    TOverride extends Prettify<
      UnknownRecord & {
        [K in keyof TContext]?: never;
      }
    >,
  >(fn: MiddlewareFn<TContext, TOverride>) {
    return new QueryStuffUndefinedInput<
      TContext,
      [...TOverrides, TOverride],
      [...TMiddlewares, MiddlewareFn<TContext, TOverride>]
    >(this._ctx, [...this._middlewares, fn]);
  }
  input<TInput = void>() {
    return new QueryStuffDefinedInput<
      TContext,
      TOverrides,
      TMiddlewares,
      TInput
    >(this._ctx, this._middlewares);
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
  TContext = void,
  TOverrides extends Overrides = [],
  TMiddlewares extends AnyMiddlewares = Middlewares<TOverrides>,
  TInput = unknown,
> extends QueryStuffRoot<TContext, TOverrides, TMiddlewares> {
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
    return (input, overrideOptions = {}) => ({
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
    });
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
        mutationFn: async (input) => {
          result ??= await execute(input);
          return await result.run(input);
        },
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
