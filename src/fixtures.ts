import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./factory.js";
import { inputSymbol } from "./symbols.js";
import {
  factory,
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
} from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import { z } from "zod";
import { MutationKey, QueryKey } from "@tanstack/react-query";

export const nodes = new QueryStuffUndefinedInput().module((q) => ({
  a: q.query(() => ({ a: 1 })),
  b: q.mutation(async () => ({ b: 2 })),
  e: q.input(z.object({ e: z.number() })).query(({ input: { e } }) => ({ e })),
  f: q
    .input(z.object({ f: z.number() }))
    .mutation(async ({ input: { f } }) => ({ f })),
  g: q.module((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    e: q
      .input(z.object({ e: z.number() }))
      .query(({ input: { e } }) => ({ e })),
    f: q
      .input(z.object({ f: z.number() }))
      .mutation(async ({ input: { f } }) => ({ f })),
    gg: q.module((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e } }) => ({ e })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f } }) => ({ f })),
    })),
    h: q.input(z.object({ h: z.number() })).module((q) => ({
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
  h: q.input(z.object({ h: z.number() })).module((q) => ({
    a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
    b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
    e: q
      .input(z.object({ e: z.number() }))
      .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
    f: q
      .input(z.object({ f: z.number() }))
      .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    g: q.module((q) => ({
      a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
      b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
      e: q
        .input(z.object({ e: z.number() }))
        .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
      f: q
        .input(z.object({ f: z.number() }))
        .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    })),
    hh: q.input(z.object({ hh: z.number() })).module((q) => ({
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

export const NODES = new QueryStuffUndefinedInput().module((q) => ({
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
  module: q.input(z.object({ module: z.boolean() })).module((q) => ({
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
    MODULE: q.input(z.object({ MODULE: z.boolean() })).module((q) => ({
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
        .module((q) => ({
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
          CONTEXT: q
            .use(async ({ next }) => await next({ ctx: { CONTEXT: true } }))
            .module((q) => ({
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
                  async ({ next }) =>
                    await next({ ctx: { contextQuery: true } }),
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
      .module((q) => ({
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
          .module((q) => ({
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
    .module((q) => ({
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
        .module((q) => ({
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
}));

export const queryFactory = factory(() => nodes);

export const QUERY_FACTORY = factory(() => NODES);

export const queryFactories = [
  [createProxyNode(nodes), "createProxyNode"],
  [queryFactory, "factory"],
] as const;

type Queries = [
  (...input: any[]) => QAnyQueryOptionsOut,
  { name: string; response: UnknownRecord; queryKey: QueryKey },
][];

const baseQuery = [
  [
    QUERY_FACTORY.query,
    {
      name: "query",
      response: { query: true },
      queryKey: ["query"],
    },
  ],
] as const satisfies Queries;

export const queries = [
  ...baseQuery,
  [
    () => QUERY_FACTORY.inputQuery({ inputQuery: true }),
    {
      name: "inputQuery",
      response: { inputQuery: true, query: true },
      queryKey: ["inputQuery", { [inputSymbol]: { inputQuery: true } }],
    },
  ],
  [
    QUERY_FACTORY.contextQuery,
    {
      name: "contextQuery",
      response: { query: true, contextQuery: true },
      queryKey: ["contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.context.query,
    {
      name: "context.query",
      response: { context: true, query: true },
      queryKey: ["context", "query"],
    },
  ],
  [
    () => QUERY_FACTORY.context.inputQuery({ inputQuery: true }),
    {
      name: "context.inputQuery",
      response: { context: true, inputQuery: true, query: true },
      queryKey: [
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.context.contextQuery,
    {
      name: "context.contextQuery",
      response: { context: true, query: true, contextQuery: true },
      queryKey: ["context", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.context.CONTEXT.query,
    {
      name: "context.CONTEXT.query",
      response: { context: true, CONTEXT: true, query: true },
      queryKey: ["context", "CONTEXT", "query"],
    },
  ],
  [
    () => QUERY_FACTORY.context.CONTEXT.inputQuery({ inputQuery: true }),
    {
      name: "context.CONTEXT.inputQuery",
      response: { context: true, CONTEXT: true, inputQuery: true, query: true },
      queryKey: [
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.context.CONTEXT.contextQuery,
    {
      name: "context.CONTEXT.contextQuery",
      response: {
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: ["context", "CONTEXT", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).query,
    {
      name: "module.query",
      response: { module: true, query: true },
      queryKey: ["module", { module: true }, "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true }).inputQuery({ inputQuery: true }),
    {
      name: "module.inputQuery",
      response: { module: true, inputQuery: true, query: true },
      queryKey: [
        "module",
        { module: true },
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).contextQuery,
    {
      name: "module.contextQuery",
      response: { module: true, query: true, contextQuery: true },
      queryKey: ["module", { module: true }, "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.query,
    {
      name: "module.context.query",
      response: { module: true, context: true, query: true },
      queryKey: ["module", { module: true }, "context", "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true }).context.inputQuery({
        inputQuery: true,
      }),
    {
      name: "module.context.inputQuery",
      response: { module: true, context: true, inputQuery: true, query: true },
      queryKey: [
        "module",
        { module: true },
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.contextQuery,
    {
      name: "module.context.contextQuery",
      response: {
        module: true,
        context: true,
        query: true,
        contextQuery: true,
      },
      queryKey: ["module", { module: true }, "context", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT.query,
    {
      name: "module.context.CONTEXT.query",
      response: { module: true, context: true, CONTEXT: true, query: true },
      queryKey: ["module", { module: true }, "context", "CONTEXT", "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true }).context.CONTEXT.inputQuery({
        inputQuery: true,
      }),
    {
      name: "module.context.CONTEXT.inputQuery",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT.contextQuery,
    {
      name: "module.context.CONTEXT.contextQuery",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).query,
    {
      name: "module.MODULE.query",
      response: {
        MODULE: true,
        module: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.inputQuery",
      response: {
        MODULE: true,
        module: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .contextQuery,
    {
      name: "module.MODULE.contextQuery",
      response: {
        MODULE: true,
        module: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .query,
    {
      name: "module.MODULE.context.query",
      response: {
        MODULE: true,
        module: true,
        context: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .context.inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.context.inputQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .contextQuery,
    {
      name: "module.MODULE.context.contextQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT.query,
    {
      name: "module.MODULE.context.CONTEXT.query",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .context.CONTEXT.inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.context.CONTEXT.inputQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT.contextQuery,
    {
      name: "module.MODULE.context.CONTEXT.contextQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "contextQuery",
      ],
    },
  ],
] satisfies Queries as unknown as typeof baseQuery;

type Mutations = [
  (...input: any[]) => QAnyMutationOptionsOut,
  {
    name: string;
    input: undefined | UnknownRecord;
    ctx: undefined | UnknownRecord;
    response: UnknownRecord;
    mutationKey: MutationKey;
  },
][];

const baseMutation = [
  [
    QUERY_FACTORY.mutation,
    {
      name: "mutation",
      input: undefined,
      ctx: undefined,
      response: { mutation: true },
      mutationKey: ["mutation"],
    },
  ],
] as const satisfies Mutations;

export const mutations = [
  ...baseMutation,
  [
    QUERY_FACTORY.inputMutation,
    {
      name: "inputMutation",
      input: { inputMutation: true },
      ctx: undefined,
      response: {
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.contextMutation,
    {
      name: "contextMutation",
      ctx: {
        contextMutation: true,
      },
      input: undefined,
      response: {
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.context.mutation,
    {
      name: "context.mutation",
      input: undefined,
      ctx: {
        context: true,
      },
      response: {
        context: true,
        mutation: true,
      },
      mutationKey: ["context", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.context.inputMutation,
    {
      name: "context.inputMutation",
      input: { inputMutation: true },
      ctx: {
        context: true,
      },
      response: {
        context: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["context", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.context.contextMutation,
    {
      name: "context.contextMutation",
      input: undefined,
      ctx: {
        context: true,
        contextMutation: true,
      },
      response: {
        context: true,
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["context", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.context.CONTEXT.mutation,
    {
      name: "context.CONTEXT.mutation",
      input: undefined,
      ctx: {
        context: true,
        CONTEXT: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      mutationKey: ["context", "CONTEXT", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.context.CONTEXT.inputMutation,
    {
      name: "context.CONTEXT.inputMutation",
      input: { inputMutation: true },
      ctx: {
        context: true,
        CONTEXT: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["context", "CONTEXT", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.context.CONTEXT.contextMutation,
    {
      name: "context.CONTEXT.contextMutation",
      ctx: {
        context: true,
        CONTEXT: true,
        contextMutation: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      mutationKey: ["context", "CONTEXT", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).mutation,
    {
      name: "module.mutation",
      input: undefined,
      ctx: undefined,
      response: {
        module: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "mutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).inputMutation,
    {
      name: "module.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: undefined,
      response: {
        module: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).contextMutation,
    {
      name: "module.contextMutation",
      input: undefined,
      ctx: {
        contextMutation: true,
      },
      response: {
        module: true,
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["module", { module: true }, "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.mutation,
    {
      name: "module.context.mutation",
      input: undefined,
      ctx: { context: true },
      response: {
        module: true,
        context: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.inputMutation,
    {
      name: "module.context.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: { context: true },
      response: {
        module: true,
        context: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.contextMutation,
    {
      name: "module.context.contextMutation",
      input: undefined,
      ctx: { context: true, contextMutation: true },
      response: {
        module: true,
        context: true,
        contextMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT.mutation,
    {
      name: "module.context.CONTEXT.mutation",
      input: undefined,
      ctx: { context: true, CONTEXT: true },
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT.inputMutation,
    {
      name: "module.context.CONTEXT.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: { context: true, CONTEXT: true },
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT.contextMutation,
    {
      name: "module.context.CONTEXT.contextMutation",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true, contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).mutation,
    {
      name: "module.MODULE.mutation",
      response: {
        MODULE: true,
        module: true,
        mutation: true,
      },
      input: undefined,
      ctx: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .inputMutation,
    {
      name: "module.MODULE.inputMutation",
      response: {
        MODULE: true,
        module: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .contextMutation,
    {
      name: "module.MODULE.contextMutation",
      response: {
        MODULE: true,
        module: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .mutation,
    {
      name: "module.MODULE.context.mutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        mutation: true,
      },
      input: undefined,
      ctx: { context: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .inputMutation,
    {
      name: "module.MODULE.context.inputMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: { context: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .contextMutation,
    {
      name: "module.MODULE.context.contextMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        mutation: true,
        contextMutation: true,
      },
      ctx: { context: true, contextMutation: true },
      input: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT.mutation,
    {
      name: "module.MODULE.context.CONTEXT.mutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT.inputMutation,
    {
      name: "module.MODULE.context.CONTEXT.inputMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: { context: true, CONTEXT: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT.contextMutation,
    {
      name: "module.MODULE.context.CONTEXT.contextMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true, contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "contextMutation",
      ],
    },
  ],
] satisfies Mutations as unknown as typeof baseMutation;

type Keys = [
  ProxyKeyNode,
  {
    name: string;
    key: unknown[];
  },
][];

export const keys = [
  [
    QUERY_FACTORY.module({ module: true }),
    {
      name: "module",
      key: ["module", { module: true }],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context,
    {
      name: "module.context",
      key: ["module", { module: true }, "context"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context.CONTEXT,
    {
      name: "module.context.CONTEXT",
      key: ["module", { module: true }, "context", "CONTEXT"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }),
    {
      name: "module.MODULE",
      key: ["module", { module: true }, "MODULE", { MODULE: true }],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context,
    {
      name: "module.MODULE.context",
      key: ["module", { module: true }, "MODULE", { MODULE: true }, "context"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context
      .CONTEXT,
    {
      name: "module.MODULE.context.CONTEXT",
      key: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
      ],
    },
  ],
] satisfies Keys;
