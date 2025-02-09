import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./factory.js";
import { inputSymbol } from "./symbols.js";
import {
  factory,
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
  middlewareBuilder,
} from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import { z } from "zod";
import { MutationKey, QueryKey } from "@tanstack/react-query";

const middlewareQuery = middlewareBuilder(
  async ({ next }) => await next({ ctx: { middlewareQuery: true } }),
);

const middlewareModule = middlewareBuilder(
  async ({ next }) => await next({ ctx: { middlewareModule: true } }),
);

const MIDDLEWARE_MODULE = middlewareBuilder(
  middlewareModule.middleware,
).descendant(
  async ({ next }) => await next({ ctx: { MIDDLEWARE_MODULE: true } }),
);

export const NODES = new QueryStuffUndefinedInput().module((q) => ({
  query: q.query(() => ({ query: true })),
  mutation: q.mutation(async () => ({ mutation: true })),
  inputQuery: q
    .input(z.object({ inputQuery: z.boolean() }))
    .query((opts) => ({ ...opts.input, query: true })),
  inputMutation: q
    .input(z.object({ inputMutation: z.boolean() }))
    .mutation(async (opts) => ({ ...opts.input, mutation: true })),
  middlewareQuery: q
    .use(middlewareQuery.middleware)
    .query((opts) => ({ ...opts.ctx, query: true })),
  middlewareMutation: q
    .use(async ({ next }) => await next({ ctx: { middlewareMutation: true } }))
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
    middlewareQuery: q
      .use(middlewareQuery.middleware)
      .query((opts) => ({ ...opts.ctx, query: true })),
    middlewareMutation: q
      .use(
        async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
      )
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
      middlewareQuery: q
        .use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      middlewareModule: q.use(middlewareModule.middleware).module((q) => ({
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
        middlewareQuery: q
          .use(middlewareQuery.middleware)
          .query((opts) => ({ ...opts.ctx, query: true })),
        middlewareMutation: q
          .use(
            async ({ next }) =>
              await next({ ctx: { middlewareMutation: true } }),
          )
          .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        MIDDLEWARE_MODULE: q
          .use(
            async ({ next }) =>
              await next({ ctx: { MIDDLEWARE_MODULE: true } }),
          )
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
            middlewareQuery: q
              .use(
                async ({ next }) =>
                  await next({ ctx: { middlewareQuery: true } }),
              )
              .query((opts) => ({ ...opts.ctx, query: true })),
            middlewareMutation: q
              .use(
                async ({ next }) =>
                  await next({ ctx: { middlewareMutation: true } }),
              )
              .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
          })),
      })),
    })),
    middlewareModule: q.use(middlewareModule.middleware).module((q) => ({
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
      middlewareQuery: q
        .use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      MIDDLEWARE_MODULE: q.use(MIDDLEWARE_MODULE.middleware).module((q) => ({
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
        middlewareQuery: q
          .use(
            async ({ next }) => await next({ ctx: { middlewareQuery: true } }),
          )
          .query((opts) => ({ ...opts.ctx, query: true })),
        middlewareMutation: q
          .use(
            async ({ next }) =>
              await next({ ctx: { middlewareMutation: true } }),
          )
          .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      })),
    })),
  })),
  middlewareModule: q.use(middlewareModule.middleware).module((q) => ({
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
    middlewareQuery: q
      .use(middlewareQuery.middleware)
      .query((opts) => ({ ...opts.ctx, query: true })),
    middlewareMutation: q
      .use(
        async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
      )
      .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    MIDDLEWARE_MODULE: q.use(MIDDLEWARE_MODULE.middleware).module((q) => ({
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
      middlewareQuery: q
        .use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    })),
  })),
}));

export const QUERY_FACTORY = factory(() => NODES);

export const queryFactories = [
  [createProxyNode(NODES), "createProxyNode"],
  [QUERY_FACTORY, "factory"],
] as const;

type Queries = [
  (...input: any[]) => QAnyQueryOptionsOut,
  { name: string; response: UnknownRecord; queryKey: QueryKey },
][];

const baseQuery = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    [
      q.query,
      {
        name: "query",
        response: { query: true },
        queryKey: ["query"],
      },
    ],
  ] as const satisfies Queries;

export const defined_queries = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    [
      () => q.inputQuery({ inputQuery: true }),
      {
        name: "inputQuery",
        response: { inputQuery: true, query: true },
        queryKey: ["inputQuery", { [inputSymbol]: { inputQuery: true } }],
      },
    ],
    [
      () => q.middlewareModule.inputQuery({ inputQuery: true }),
      {
        name: "middlewareModule.inputQuery",
        response: { middlewareModule: true, inputQuery: true, query: true },
        queryKey: [
          "middlewareModule",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q.middlewareModule.MIDDLEWARE_MODULE.inputQuery({
          inputQuery: true,
        }),
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.inputQuery",
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () => q.module({ module: true }).inputQuery({ inputQuery: true }),
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
      () =>
        q.module({ module: true }).middlewareModule.inputQuery({
          inputQuery: true,
        }),
      {
        name: "module.middlewareModule.inputQuery",
        response: {
          module: true,
          middlewareModule: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "middlewareModule",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .module({
            module: true,
          })
          .middlewareModule.MIDDLEWARE_MODULE.inputQuery({
            inputQuery: true,
          }),
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.inputQuery",
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .module({ module: true })
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
      () =>
        q
          .module({ module: true })
          .MODULE({ MODULE: true })
          .middlewareModule.inputQuery({ inputQuery: true }),
      {
        name: "module.MODULE.middlewareModule.inputQuery",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .module({ module: true })
          .MODULE({ MODULE: true })
          .middlewareModule.MIDDLEWARE_MODULE.inputQuery({ inputQuery: true }),
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.inputQuery",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
  ] satisfies Queries as unknown as ReturnType<typeof baseQuery>;

export const undefined_queries = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...baseQuery(q),
    [
      q.middlewareQuery,
      {
        name: "middlewareQuery",
        response: { query: true, middlewareQuery: true },
        queryKey: ["middlewareQuery"],
      },
    ],
    [
      q.middlewareModule.query,
      {
        name: "middlewareModule.query",
        response: { middlewareModule: true, query: true },
        queryKey: ["middlewareModule", "query"],
      },
    ],
    [
      q.middlewareModule.middlewareQuery,
      {
        name: "middlewareModule.middlewareQuery",
        response: {
          middlewareModule: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: ["middlewareModule", "middlewareQuery"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE.query,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.query",
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
        },
        queryKey: ["middlewareModule", "MIDDLEWARE_MODULE", "query"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE.middlewareQuery,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.middlewareQuery",
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: ["middlewareModule", "MIDDLEWARE_MODULE", "middlewareQuery"],
      },
    ],
    [
      q.module({ module: true }).query,
      {
        name: "module.query",
        response: { module: true, query: true },
        queryKey: ["module", { module: true }, "query"],
      },
    ],
    [
      q.module({ module: true }).middlewareQuery,
      {
        name: "module.middlewareQuery",
        response: { module: true, query: true, middlewareQuery: true },
        queryKey: ["module", { module: true }, "middlewareQuery"],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.query,
      {
        name: "module.middlewareModule.query",
        response: { module: true, middlewareModule: true, query: true },
        queryKey: ["module", { module: true }, "middlewareModule", "query"],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.middlewareQuery,
      {
        name: "module.middlewareModule.middlewareQuery",
        response: {
          module: true,
          middlewareModule: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "module",
          { module: true },
          "middlewareModule",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE.query,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.query",
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "query",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE
        .middlewareQuery,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.middlewareQuery",
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).query,
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
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareQuery,
      {
        name: "module.MODULE.middlewareQuery",
        response: {
          MODULE: true,
          module: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareQuery",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .query,
      {
        name: "module.MODULE.middlewareModule.query",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "query",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .middlewareQuery,
      {
        name: "module.MODULE.middlewareModule.middlewareQuery",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE.query,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.query",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "query",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE.middlewareQuery,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.middlewareQuery",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "middlewareQuery",
        ],
      },
    ],
  ] satisfies Queries as unknown as ReturnType<typeof baseQuery>;

export const queries = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...defined_queries(q),
    ...undefined_queries(q),
  ] satisfies Queries as unknown as ReturnType<typeof baseQuery>;

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

const baseMutation = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    [
      q.mutation,
      {
        name: "mutation",
        input: undefined,
        ctx: undefined,
        response: { mutation: true },
        mutationKey: ["mutation"],
      },
    ],
  ] as const satisfies Mutations;

export const mutations = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...baseMutation(q),
    [
      q.inputMutation,
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
      q.middlewareMutation,
      {
        name: "middlewareMutation",
        ctx: {
          middlewareMutation: true,
        },
        input: undefined,
        response: {
          mutation: true,
          middlewareMutation: true,
        },
        mutationKey: ["middlewareMutation"],
      },
    ],
    [
      q.middlewareModule.mutation,
      {
        name: "middlewareModule.mutation",
        input: undefined,
        ctx: {
          middlewareModule: true,
        },
        response: {
          middlewareModule: true,
          mutation: true,
        },
        mutationKey: ["middlewareModule", "mutation"],
      },
    ],
    [
      q.middlewareModule.inputMutation,
      {
        name: "middlewareModule.inputMutation",
        input: { inputMutation: true },
        ctx: {
          middlewareModule: true,
        },
        response: {
          middlewareModule: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: ["middlewareModule", "inputMutation"],
      },
    ],
    [
      q.middlewareModule.middlewareMutation,
      {
        name: "middlewareModule.middlewareMutation",
        input: undefined,
        ctx: {
          middlewareModule: true,
          middlewareMutation: true,
        },
        response: {
          middlewareModule: true,
          mutation: true,
          middlewareMutation: true,
        },
        mutationKey: ["middlewareModule", "middlewareMutation"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE.mutation,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.mutation",
        input: undefined,
        ctx: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
        },
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
        },
        mutationKey: ["middlewareModule", "MIDDLEWARE_MODULE", "mutation"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE.inputMutation,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.inputMutation",
        input: { inputMutation: true },
        ctx: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
        },
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: ["middlewareModule", "MIDDLEWARE_MODULE", "inputMutation"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE.middlewareMutation,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE.middlewareMutation",
        ctx: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          middlewareMutation: true,
        },
        response: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        mutationKey: [
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).mutation,
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
      q.module({ module: true }).inputMutation,
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
      q.module({ module: true }).middlewareMutation,
      {
        name: "module.middlewareMutation",
        input: undefined,
        ctx: {
          middlewareMutation: true,
        },
        response: {
          module: true,
          mutation: true,
          middlewareMutation: true,
        },
        mutationKey: ["module", { module: true }, "middlewareMutation"],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.mutation,
      {
        name: "module.middlewareModule.mutation",
        input: undefined,
        ctx: { middlewareModule: true },
        response: {
          module: true,
          middlewareModule: true,
          mutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "mutation",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.inputMutation,
      {
        name: "module.middlewareModule.inputMutation",
        input: {
          inputMutation: true,
        },
        ctx: { middlewareModule: true },
        response: {
          module: true,
          middlewareModule: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "inputMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.middlewareMutation,
      {
        name: "module.middlewareModule.middlewareMutation",
        input: undefined,
        ctx: { middlewareModule: true, middlewareMutation: true },
        response: {
          module: true,
          middlewareModule: true,
          middlewareMutation: true,
          mutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE.mutation,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.mutation",
        input: undefined,
        ctx: { middlewareModule: true, MIDDLEWARE_MODULE: true },
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "mutation",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE
        .inputMutation,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.inputMutation",
        input: {
          inputMutation: true,
        },
        ctx: { middlewareModule: true, MIDDLEWARE_MODULE: true },
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "inputMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE
        .middlewareMutation,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE.middlewareMutation",
        response: {
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          middlewareMutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).mutation,
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
      q.module({ module: true }).MODULE({ MODULE: true }).inputMutation,
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
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareMutation,
      {
        name: "module.MODULE.middlewareMutation",
        response: {
          MODULE: true,
          module: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: { middlewareMutation: true },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .mutation,
      {
        name: "module.MODULE.middlewareModule.mutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          mutation: true,
        },
        input: undefined,
        ctx: { middlewareModule: true },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "mutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .inputMutation,
      {
        name: "module.MODULE.middlewareModule.inputMutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          inputMutation: true,
          mutation: true,
        },
        input: {
          inputMutation: true,
        },
        ctx: { middlewareModule: true },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "inputMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .middlewareMutation,
      {
        name: "module.MODULE.middlewareModule.middlewareMutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          mutation: true,
          middlewareMutation: true,
        },
        ctx: { middlewareModule: true, middlewareMutation: true },
        input: undefined,
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE.mutation,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.mutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
        },
        input: undefined,
        ctx: { middlewareModule: true, MIDDLEWARE_MODULE: true },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "mutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE.inputMutation,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.inputMutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          inputMutation: true,
          mutation: true,
        },
        input: {
          inputMutation: true,
        },
        ctx: { middlewareModule: true, MIDDLEWARE_MODULE: true },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "inputMutation",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE.middlewareMutation,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE.middlewareMutation",
        response: {
          MODULE: true,
          module: true,
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: {
          middlewareModule: true,
          MIDDLEWARE_MODULE: true,
          middlewareMutation: true,
        },
        mutationKey: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
          "middlewareMutation",
        ],
      },
    ],
  ] satisfies Mutations as unknown as ReturnType<typeof baseMutation>;

type Keys = [
  ProxyKeyNode,
  {
    name: string;
    key: unknown[];
  },
][];

const baseKeys = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    [
      q.module({ module: true }),
      {
        name: "module",
        key: ["module", { module: true }],
      },
    ],
  ] as const satisfies Keys;

export const keys = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...baseKeys(q),
    [
      q.module({ module: true }).middlewareModule,
      {
        name: "module.middlewareModule",
        key: ["module", { module: true }, "middlewareModule"],
      },
    ],
    [
      q.module({ module: true }).middlewareModule.MIDDLEWARE_MODULE,
      {
        name: "module.middlewareModule.MIDDLEWARE_MODULE",
        key: [
          "module",
          { module: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }),
      {
        name: "module.MODULE",
        key: ["module", { module: true }, "MODULE", { MODULE: true }],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule,
      {
        name: "module.MODULE.middlewareModule",
        key: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
        ],
      },
    ],
    [
      q.module({ module: true }).MODULE({ MODULE: true }).middlewareModule
        .MIDDLEWARE_MODULE,
      {
        name: "module.MODULE.middlewareModule.MIDDLEWARE_MODULE",
        key: [
          "module",
          { module: true },
          "MODULE",
          { MODULE: true },
          "middlewareModule",
          "MIDDLEWARE_MODULE",
        ],
      },
    ],
    [
      q.middlewareModule,
      {
        name: "middlewareModule",
        key: ["middlewareModule"],
      },
    ],
    [
      q.middlewareModule.MIDDLEWARE_MODULE,
      {
        name: "middlewareModule.MIDDLEWARE_MODULE",
        key: ["middlewareModule", "MIDDLEWARE_MODULE"],
      },
    ],
  ] satisfies Keys as unknown as ReturnType<typeof baseKeys>;
