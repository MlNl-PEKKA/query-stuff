import { middlewareCtx, middlewareData } from "./symbols.js";
import type {
  Merge,
  MiddlewareFn,
  MiddlewareResponse,
  UnknownRecord,
} from "./types.js";

export const middlewareBuilder = <
  TOverride extends UnknownRecord,
  TContext = void,
>(
  fn: MiddlewareFn<TContext, TOverride>,
) => new QueryStuffMiddleware<TOverride, TContext>(fn);

class QueryStuffMiddleware<TOverride extends UnknownRecord, TContext = void> {
  constructor(public middleware: MiddlewareFn<TContext, TOverride>) {}
  descendant<TOverrideIn extends UnknownRecord>(
    fn: MiddlewareFn<Merge<TContext, TOverride>, TOverrideIn>,
  ): QueryStuffMiddleware<TOverrideIn, Merge<TContext, TOverride>> {
    return new QueryStuffMiddleware<TOverrideIn, Merge<TContext, TOverride>>(
      fn,
    );
  }
  extend<TOverrideIn extends UnknownRecord>(
    fn: MiddlewareFn<Merge<TContext, TOverride>, TOverrideIn>,
  ): QueryStuffMiddleware<TOverrideIn, Merge<TContext, TOverride>> {
    return new QueryStuffMiddleware<TOverrideIn, Merge<TContext, TOverride>>(
      async ({ ctx, next }) => {
        let response: MiddlewareResponse<TOverrideIn>;
        const data = await this.middleware({
          ctx: ctx as TContext,
          next: async ({ ctx: CTX }) => {
            const context = { ...ctx, ...CTX };
            response = await fn({
              ctx: context,
              next,
            });
            return {
              [middlewareData]: response[middlewareData],
              [middlewareCtx]: context,
            };
          },
        });
        return {
          [middlewareData]: data[middlewareData],
          [middlewareCtx]: response![middlewareCtx],
        };
      },
    );
  }
}
