import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./queryStuff.js";
import { factory } from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import { z } from "zod";

export const nodes = new QueryStuffUndefinedInput().module()((q) => ({
  a: q.query(() => ({ a: 1 })),
  b: q.mutation(async () => ({ b: 2 })),
  e: q.input(z.object({ e: z.number() })).query(({ input: { e } }) => ({ e })),
  f: q
    .input(z.object({ f: z.number() }))
    .mutation(async ({ input: { f } }) => ({ f })),
  g: q.module()((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    e: q
      .input(z.object({ e: z.number() }))
      .query(({ input: { e } }) => ({ e })),
    f: q
      .input(z.object({ f: z.number() }))
      .mutation(async ({ input: { f } }) => ({ f })),
    gg: q.module()((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e } }) => ({ e })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f } }) => ({ f })),
    })),
    h: q.module<{ h: number }>()((q) => ({
      a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
      b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    })),
  })),
  h: q.module<{ h: number }>()((q) => ({
    a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
    b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
    e: q
      .input(z.object({ e: z.number() }))
      .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
    f: q
      .input(z.object({ f: z.number() }))
      .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    g: q.module()((q) => ({
      a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
      b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    })),
    hh: q.module<{ hh: number }>()((q) => ({
      a: q.query(({ ctx: { h, hh } }) => ({ a: 1, h, hh })),
      b: q.mutation(async ({ ctx: { h, hh } }) => ({ b: 2, h, hh })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e }, ctx: { h, hh } }) => ({ e, h, hh })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f }, ctx: { h, hh } }) => ({ f, h, hh })),
    })),
  })),
}));

export const NODES = new QueryStuffUndefinedInput().module()((q) => ({
  query: q.query(() => ({ query: true })),
  mutation: q.mutation(async () => ({ mutation: true })),
  inputQuery: q
    .input(z.object({ inputQuery: z.boolean() }))
    .query((opts) => ({ ...opts.input, query: true })),
  inputMutation: q
    .input(z.object({ inputMutation: z.boolean() }))
    .mutation(async (opts) => ({ ...opts.input, mutation: true })),
  contextQuery: q
    .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
    .query((opts) => ({ ...opts.ctx, query: true })),
  contextMutation: q
    .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
    .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
  module: q.module<{ module: boolean }>()((q) => ({
    query: q.query((opts) => ({ ...opts.ctx, query: true })),
    mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    inputQuery: q
      .input(z.object({ inputQuery: z.boolean() }))
      .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
    inputMutation: q
      .input(z.object({ inputMutation: z.boolean() }))
      .mutation(async (opts) => ({
        ...opts.ctx,
        ...opts.input,
        mutation: true,
      })),
    contextQuery: q
      .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
      .query((opts) => ({ ...opts.ctx, query: true })),
    contextMutation: q
      .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
      .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    MODULE: q.module<{ MODULE: boolean }>()((q) => ({
      query: q.query((opts) => ({ ...opts.ctx, query: true })),
      mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      inputQuery: q
        .input(z.object({ inputQuery: z.boolean() }))
        .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
      inputMutation: q
        .input(z.object({ inputMutation: z.boolean() }))
        .mutation(async (opts) => ({
          ...opts.ctx,
          ...opts.input,
          mutation: true,
        })),
      contextQuery: q
        .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
        .query((opts) => ({ ...opts.ctx, query: true })),
      contextMutation: q
        .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      context: q
        .use(async ({ next }) => await next({ ctx: { context: true } }))
        .module()((q) => ({
        query: q.query((opts) => ({ ...opts.ctx, query: true })),
        mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        inputQuery: q
          .input(z.object({ inputQuery: z.boolean() }))
          .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
        inputMutation: q
          .input(z.object({ inputMutation: z.boolean() }))
          .mutation(async (opts) => ({
            ...opts.ctx,
            ...opts.input,
            mutation: true,
          })),
        contextQuery: q
          .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
          .query((opts) => ({ ...opts.ctx, query: true })),
        contextMutation: q
          .use(
            async ({ next }) => await next({ ctx: { contextMutation: true } }),
          )
          .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        CONTEXT: q
          .use(async ({ next }) => await next({ ctx: { CONTEXT: true } }))
          .module()((q) => ({
          query: q.query((opts) => ({ ...opts.ctx, query: true })),
          mutation: q.mutation(async (opts) => ({
            ...opts.ctx,
            mutation: true,
          })),
          inputQuery: q
            .input(z.object({ inputQuery: z.boolean() }))
            .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
          inputMutation: q
            .input(z.object({ inputMutation: z.boolean() }))
            .mutation(async (opts) => ({
              ...opts.ctx,
              ...opts.input,
              mutation: true,
            })),
          contextQuery: q
            .use(
              async ({ next }) => await next({ ctx: { contextQuery: true } }),
            )
            .query((opts) => ({ ...opts.ctx, query: true })),
          contextMutation: q
            .use(
              async ({ next }) =>
                await next({ ctx: { contextMutation: true } }),
            )
            .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        })),
      })),
    })),
    context: q
      .use(async ({ next }) => await next({ ctx: { context: true } }))
      .module()((q) => ({
      query: q.query((opts) => ({ ...opts.ctx, query: true })),
      mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      inputQuery: q
        .input(z.object({ inputQuery: z.boolean() }))
        .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
      inputMutation: q
        .input(z.object({ inputMutation: z.boolean() }))
        .mutation(async (opts) => ({
          ...opts.ctx,
          ...opts.input,
          mutation: true,
        })),
      contextQuery: q
        .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
        .query((opts) => ({ ...opts.ctx, query: true })),
      contextMutation: q
        .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      CONTEXT: q
        .use(async ({ next }) => await next({ ctx: { CONTEXT: true } }))
        .module()((q) => ({
        query: q.query((opts) => ({ ...opts.ctx, query: true })),
        mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        inputQuery: q
          .input(z.object({ inputQuery: z.boolean() }))
          .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
        inputMutation: q
          .input(z.object({ inputMutation: z.boolean() }))
          .mutation(async (opts) => ({
            ...opts.ctx,
            ...opts.input,
            mutation: true,
          })),
        contextQuery: q
          .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
          .query((opts) => ({ ...opts.ctx, query: true })),
        contextMutation: q
          .use(
            async ({ next }) => await next({ ctx: { contextMutation: true } }),
          )
          .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      })),
    })),
  })),
  context: q
    .use(async ({ next }) => await next({ ctx: { context: true } }))
    .module()((q) => ({
    query: q.query((opts) => ({ ...opts.ctx, query: true })),
    mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    inputQuery: q
      .input(z.object({ inputQuery: z.boolean() }))
      .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
    inputMutation: q
      .input(z.object({ inputMutation: z.boolean() }))
      .mutation(async (opts) => ({
        ...opts.ctx,
        ...opts.input,
        mutation: true,
      })),
    contextQuery: q
      .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
      .query((opts) => ({ ...opts.ctx, query: true })),
    contextMutation: q
      .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
      .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    CONTEXT: q
      .use(async ({ next }) => await next({ ctx: { CONTEXT: true } }))
      .module()((q) => ({
      query: q.query((opts) => ({ ...opts.ctx, query: true })),
      mutation: q.mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      inputQuery: q
        .input(z.object({ inputQuery: z.boolean() }))
        .query((opts) => ({ ...opts.ctx, ...opts.input, query: true })),
      inputMutation: q
        .input(z.object({ inputMutation: z.boolean() }))
        .mutation(async (opts) => ({
          ...opts.ctx,
          ...opts.input,
          mutation: true,
        })),
      contextQuery: q
        .use(async ({ next }) => await next({ ctx: { contextQuery: true } }))
        .query((opts) => ({ ...opts.ctx, query: true })),
      contextMutation: q
        .use(async ({ next }) => await next({ ctx: { contextMutation: true } }))
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    })),
  })),
}));

export const queryFactory = factory(() => nodes());

export const QUERY_FACTORY = factory(() => NODES());

export const queryFactories = [
  [createProxyNode(nodes()), "createProxyNode"],
  [queryFactory, "factory"],
] as const;
