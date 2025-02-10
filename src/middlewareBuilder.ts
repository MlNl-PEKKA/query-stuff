import { middlewareCtx, middlewareData } from "./symbols.js";
import type {
  Merge,
  MiddlewareFn,
  MiddlewareResponse,
  UnknownRecord,
} from "./types.js";

export const unstable_middlewareBuilder = <
  TOverride extends UnknownRecord,
  TContext = void,
>(
  fn: MiddlewareFn<TContext, TOverride>,
) => new QueryStuffMiddleware<TOverride, TContext>(fn);

class QueryStuffMiddleware<
  TOverride extends UnknownRecord,
  TContext = void,
  TContextValue = Merge<TContext extends any ? void : TContext, TOverride>,
> {
  constructor(public middleware: MiddlewareFn<any, TOverride>) {}
  descendant<TOverrideIn extends UnknownRecord>(
    fn: MiddlewareFn<TContextValue, TOverrideIn>,
  ): QueryStuffMiddleware<TOverrideIn, TContextValue> {
    return new QueryStuffMiddleware<TOverrideIn, TContextValue>(fn);
  }
  extend<TOverrideIn extends UnknownRecord>(
    fn: MiddlewareFn<TContextValue, TOverrideIn>,
  ): QueryStuffMiddleware<Merge<TContextValue, TOverrideIn>, TContextValue> {
    return new QueryStuffMiddleware<
      Merge<TContextValue, TOverrideIn>,
      TContextValue
    >(async ({ ctx, next }) => {
      let innerCtx: MiddlewareResponse<
        Merge<TContextValue, TOverrideIn>
      >[typeof middlewareCtx];
      const data = await this.middleware({
        ctx: ctx as unknown as TContext,
        next: async ({ ctx: CTX }) => {
          const context = { ...ctx, ...CTX };
          const result = await fn({
            ctx: context,
            next: async ({ ctx: INNER_CTX }) =>
              await next({ ctx: { ...context, ...INNER_CTX } }),
          });
          innerCtx = { ...context, ...result[middlewareCtx] };
          return {
            [middlewareData]: result[middlewareData],
            [middlewareCtx]: context,
          };
        },
      });
      return {
        [middlewareData]: data[middlewareData],
        [middlewareCtx]: { ...innerCtx!, ...data[middlewareCtx] },
      };
    });
  }
}
