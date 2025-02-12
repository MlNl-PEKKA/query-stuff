import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./factory.js";
import { inputSymbol } from "./symbols.js";
import {
  factory,
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
  unstable_middlewareBuilder,
} from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import { z } from "zod";
import { MutationKey, QueryKey } from "@tanstack/react-query";

const middlewareQuery = unstable_middlewareBuilder(
  async ({ next }) => await next({ ctx: { middlewareQuery: true } }),
);

const middlewareGroup = unstable_middlewareBuilder(
  async ({ next }) => await next({ ctx: { middlewareGroup: true } }),
);

const MIDDLEWARE_GROUP = unstable_middlewareBuilder(
  middlewareGroup.middleware,
).inherit(
  async ({ next, ctx }) =>
    await next({ ctx: { ...ctx, MIDDLEWARE_GROUP: true } }),
);

const EXTENDED_MIDDLEWARE_GROUP = unstable_middlewareBuilder(
  middlewareGroup.middleware,
).extend(
  async ({ next, ctx }) =>
    await next({ ctx: { ...ctx, EXTENDED_MIDDLEWARE_GROUP: true } }),
);

const EXTENDED_DESCENDANT_MIDDLEWARE_GROUP = unstable_middlewareBuilder(
  EXTENDED_MIDDLEWARE_GROUP.middleware,
).inherit(
  async ({ next, ctx }) =>
    await next({
      ctx: { ...ctx, EXTENDED_DESCENDANT_MIDDLEWARE_GROUP: true },
    }),
);

export const NODES = new QueryStuffUndefinedInput().group((q) => ({
  query: q.query(() => ({ query: true })),
  mutation: q.mutation(async () => ({ mutation: true })),
  inputQuery: q
    .input(z.object({ inputQuery: z.boolean() }))
    .query((opts) => ({ ...opts.input, query: true })),
  inputMutation: q
    .input(z.object({ inputMutation: z.boolean() }))
    .mutation(async (opts) => ({ ...opts.input, mutation: true })),
  middlewareQuery: q
    .unstable_use(middlewareQuery.middleware)
    .query((opts) => ({ ...opts.ctx, query: true })),
  middlewareMutation: q
    .unstable_use(
      async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
    )
    .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
  group: q.input(z.object({ group: z.boolean() })).group((q) => ({
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
      .unstable_use(middlewareQuery.middleware)
      .query((opts) => ({ ...opts.ctx, query: true })),
    middlewareMutation: q
      .unstable_use(
        async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
      )
      .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    GROUP: q.input(z.object({ GROUP: z.boolean() })).group((q) => ({
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
        .unstable_use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .unstable_use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      middlewareGroup: q
        .unstable_use(middlewareGroup.middleware)
        .group((q) => ({
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
            .unstable_use(middlewareQuery.middleware)
            .query((opts) => ({ ...opts.ctx, query: true })),
          middlewareMutation: q
            .unstable_use(
              async ({ next }) =>
                await next({ ctx: { middlewareMutation: true } }),
            )
            .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
          MIDDLEWARE_GROUP: q
            .unstable_use(
              async ({ next }) =>
                await next({ ctx: { MIDDLEWARE_GROUP: true } }),
            )
            .group((q) => ({
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
                .unstable_use(
                  async ({ next }) =>
                    await next({ ctx: { middlewareQuery: true } }),
                )
                .query((opts) => ({ ...opts.ctx, query: true })),
              middlewareMutation: q
                .unstable_use(
                  async ({ next }) =>
                    await next({ ctx: { middlewareMutation: true } }),
                )
                .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
            })),
        })),
    })),
    middlewareGroup: q.unstable_use(middlewareGroup.middleware).group((q) => ({
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
        .unstable_use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .unstable_use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      MIDDLEWARE_GROUP: q
        .unstable_use(MIDDLEWARE_GROUP.middleware)
        .group((q) => ({
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
            .unstable_use(
              async ({ next }) =>
                await next({ ctx: { middlewareQuery: true } }),
            )
            .query((opts) => ({ ...opts.ctx, query: true })),
          middlewareMutation: q
            .unstable_use(
              async ({ next }) =>
                await next({ ctx: { middlewareMutation: true } }),
            )
            .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
        })),
    })),
  })),
  middlewareGroup: q.unstable_use(middlewareGroup.middleware).group((q) => ({
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
      .unstable_use(middlewareQuery.middleware)
      .query((opts) => ({ ...opts.ctx, query: true })),
    middlewareMutation: q
      .unstable_use(
        async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
      )
      .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    MIDDLEWARE_GROUP: q
      .unstable_use(MIDDLEWARE_GROUP.middleware)
      .group((q) => ({
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
          .unstable_use(middlewareQuery.middleware)
          .query((opts) => ({ ...opts.ctx, query: true })),
        middlewareMutation: q
          .unstable_use(
            async ({ next }) =>
              await next({ ctx: { middlewareMutation: true } }),
          )
          .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
      })),
  })),
  EXTENDED_MIDDLEWARE_GROUP: q
    .unstable_use(EXTENDED_MIDDLEWARE_GROUP.middleware)
    .group((q) => ({
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
        .unstable_use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .unstable_use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    })),
  EXTENDED_DESCENDANT_MIDDLEWARE_GROUP: q
    .unstable_use(EXTENDED_DESCENDANT_MIDDLEWARE_GROUP.middleware)
    .group((q) => ({
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
        .unstable_use(middlewareQuery.middleware)
        .query((opts) => ({ ...opts.ctx, query: true })),
      middlewareMutation: q
        .unstable_use(
          async ({ next }) => await next({ ctx: { middlewareMutation: true } }),
        )
        .mutation(async (opts) => ({ ...opts.ctx, mutation: true })),
    })),
}));

export const QUERY_FACTORY = factory("app", () => NODES);

export const queryFactories = [
  [createProxyNode(NODES, ["app"]), "createProxyNode"],
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
        queryKey: ["app", "query"],
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
        queryKey: [
          "app",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () => q.middlewareGroup.inputQuery({ inputQuery: true }),
      {
        name: "middlewareGroup.inputQuery",
        response: { middlewareGroup: true, inputQuery: true, query: true },
        queryKey: [
          "app",
          "middlewareGroup",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q.middlewareGroup.MIDDLEWARE_GROUP.inputQuery({
          inputQuery: true,
        }),
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.inputQuery",
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () => q.group({ group: true }).inputQuery({ inputQuery: true }),
      {
        name: "group.inputQuery",
        response: { group: true, inputQuery: true, query: true },
        queryKey: [
          "app",
          "group",
          { group: true },
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q.group({ group: true }).middlewareGroup.inputQuery({
          inputQuery: true,
        }),
      {
        name: "group.middlewareGroup.inputQuery",
        response: {
          group: true,
          middlewareGroup: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .group({
            group: true,
          })
          .middlewareGroup.MIDDLEWARE_GROUP.inputQuery({
            inputQuery: true,
          }),
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.inputQuery",
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .group({ group: true })
          .GROUP({ GROUP: true })
          .inputQuery({ inputQuery: true }),
      {
        name: "group.GROUP.inputQuery",
        response: {
          GROUP: true,
          group: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .group({ group: true })
          .GROUP({ GROUP: true })
          .middlewareGroup.inputQuery({ inputQuery: true }),
      {
        name: "group.GROUP.middlewareGroup.inputQuery",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q
          .group({ group: true })
          .GROUP({ GROUP: true })
          .middlewareGroup.MIDDLEWARE_GROUP.inputQuery({ inputQuery: true }),
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.inputQuery",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputQuery",
          { [inputSymbol]: { inputQuery: true } },
        ],
      },
    ],
    [
      () =>
        q.EXTENDED_MIDDLEWARE_GROUP.inputQuery({
          inputQuery: true,
        }),
      {
        name: "EXTENDED_MIDDLEWARE_GROUP.inputQuery",
        response: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
          inputQuery: true,
          query: true,
        },
        queryKey: [
          "app",
          "EXTENDED_MIDDLEWARE_GROUP",
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
        queryKey: ["app", "middlewareQuery"],
      },
    ],
    [
      q.middlewareGroup.query,
      {
        name: "middlewareGroup.query",
        response: { middlewareGroup: true, query: true },
        queryKey: ["app", "middlewareGroup", "query"],
      },
    ],
    [
      q.middlewareGroup.middlewareQuery,
      {
        name: "middlewareGroup.middlewareQuery",
        response: {
          middlewareGroup: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: ["app", "middlewareGroup", "middlewareQuery"],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP.query,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.query",
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
        },
        queryKey: ["app", "middlewareGroup", "MIDDLEWARE_GROUP", "query"],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP.middlewareQuery,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.middlewareQuery",
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.group({ group: true }).query,
      {
        name: "group.query",
        response: { group: true, query: true },
        queryKey: ["app", "group", { group: true }, "query"],
      },
    ],
    [
      q.group({ group: true }).middlewareQuery,
      {
        name: "group.middlewareQuery",
        response: { group: true, query: true, middlewareQuery: true },
        queryKey: ["app", "group", { group: true }, "middlewareQuery"],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.query,
      {
        name: "group.middlewareGroup.query",
        response: { group: true, middlewareGroup: true, query: true },
        queryKey: ["app", "group", { group: true }, "middlewareGroup", "query"],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.middlewareQuery,
      {
        name: "group.middlewareGroup.middlewareQuery",
        response: {
          group: true,
          middlewareGroup: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP.query,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.query",
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "query",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP.middlewareQuery,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.middlewareQuery",
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).query,
      {
        name: "group.GROUP.query",
        response: {
          GROUP: true,
          group: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "query",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareQuery,
      {
        name: "group.GROUP.middlewareQuery",
        response: {
          GROUP: true,
          group: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareQuery",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup.query,
      {
        name: "group.GROUP.middlewareGroup.query",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "query",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .middlewareQuery,
      {
        name: "group.GROUP.middlewareGroup.middlewareQuery",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP.query,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.query",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "query",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP.middlewareQuery,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.middlewareQuery",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareQuery",
        ],
      },
    ],
    [
      q.EXTENDED_MIDDLEWARE_GROUP.query,
      {
        name: "EXTENDED_MIDDLEWARE_GROUP.query",
        response: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
          query: true,
        },
        queryKey: ["app", "EXTENDED_MIDDLEWARE_GROUP", "query"],
      },
    ],
    [
      q.EXTENDED_MIDDLEWARE_GROUP.middlewareQuery,
      {
        name: "EXTENDED_MIDDLEWARE_GROUP.middlewareQuery",
        response: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
          query: true,
          middlewareQuery: true,
        },
        queryKey: ["app", "EXTENDED_MIDDLEWARE_GROUP", "middlewareQuery"],
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
        mutationKey: ["app", "mutation"],
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
        mutationKey: ["app", "inputMutation"],
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
        mutationKey: ["app", "middlewareMutation"],
      },
    ],
    [
      q.middlewareGroup.mutation,
      {
        name: "middlewareGroup.mutation",
        input: undefined,
        ctx: {
          middlewareGroup: true,
        },
        response: {
          middlewareGroup: true,
          mutation: true,
        },
        mutationKey: ["app", "middlewareGroup", "mutation"],
      },
    ],
    [
      q.middlewareGroup.inputMutation,
      {
        name: "middlewareGroup.inputMutation",
        input: { inputMutation: true },
        ctx: {
          middlewareGroup: true,
        },
        response: {
          middlewareGroup: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: ["app", "middlewareGroup", "inputMutation"],
      },
    ],
    [
      q.middlewareGroup.middlewareMutation,
      {
        name: "middlewareGroup.middlewareMutation",
        input: undefined,
        ctx: {
          middlewareGroup: true,
          middlewareMutation: true,
        },
        response: {
          middlewareGroup: true,
          mutation: true,
          middlewareMutation: true,
        },
        mutationKey: ["app", "middlewareGroup", "middlewareMutation"],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP.mutation,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.mutation",
        input: undefined,
        ctx: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
        },
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
        },
        mutationKey: ["app", "middlewareGroup", "MIDDLEWARE_GROUP", "mutation"],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP.inputMutation,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.inputMutation",
        input: { inputMutation: true },
        ctx: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
        },
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputMutation",
        ],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP.middlewareMutation,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP.middlewareMutation",
        ctx: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          middlewareMutation: true,
        },
        response: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        mutationKey: [
          "app",
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).mutation,
      {
        name: "group.mutation",
        input: undefined,
        ctx: undefined,
        response: {
          group: true,
          mutation: true,
        },
        mutationKey: ["app", "group", { group: true }, "mutation"],
      },
    ],
    [
      q.group({ group: true }).inputMutation,
      {
        name: "group.inputMutation",
        input: {
          inputMutation: true,
        },
        ctx: undefined,
        response: {
          group: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: ["app", "group", { group: true }, "inputMutation"],
      },
    ],
    [
      q.group({ group: true }).middlewareMutation,
      {
        name: "group.middlewareMutation",
        input: undefined,
        ctx: {
          middlewareMutation: true,
        },
        response: {
          group: true,
          mutation: true,
          middlewareMutation: true,
        },
        mutationKey: ["app", "group", { group: true }, "middlewareMutation"],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.mutation,
      {
        name: "group.middlewareGroup.mutation",
        input: undefined,
        ctx: { middlewareGroup: true },
        response: {
          group: true,
          middlewareGroup: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "mutation",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.inputMutation,
      {
        name: "group.middlewareGroup.inputMutation",
        input: {
          inputMutation: true,
        },
        ctx: { middlewareGroup: true },
        response: {
          group: true,
          middlewareGroup: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "inputMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.middlewareMutation,
      {
        name: "group.middlewareGroup.middlewareMutation",
        input: undefined,
        ctx: { middlewareGroup: true, middlewareMutation: true },
        response: {
          group: true,
          middlewareGroup: true,
          middlewareMutation: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP.mutation,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.mutation",
        input: undefined,
        ctx: { middlewareGroup: true, MIDDLEWARE_GROUP: true },
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "mutation",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP.inputMutation,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.inputMutation",
        input: {
          inputMutation: true,
        },
        ctx: { middlewareGroup: true, MIDDLEWARE_GROUP: true },
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP
        .middlewareMutation,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP.middlewareMutation",
        response: {
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          middlewareMutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).mutation,
      {
        name: "group.GROUP.mutation",
        response: {
          GROUP: true,
          group: true,
          mutation: true,
        },
        input: undefined,
        ctx: undefined,
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "mutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).inputMutation,
      {
        name: "group.GROUP.inputMutation",
        response: {
          GROUP: true,
          group: true,
          inputMutation: true,
          mutation: true,
        },
        input: {
          inputMutation: true,
        },
        ctx: undefined,
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "inputMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareMutation,
      {
        name: "group.GROUP.middlewareMutation",
        response: {
          GROUP: true,
          group: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: { middlewareMutation: true },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup.mutation,
      {
        name: "group.GROUP.middlewareGroup.mutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          mutation: true,
        },
        input: undefined,
        ctx: { middlewareGroup: true },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "mutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .inputMutation,
      {
        name: "group.GROUP.middlewareGroup.inputMutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          inputMutation: true,
          mutation: true,
        },
        input: {
          inputMutation: true,
        },
        ctx: { middlewareGroup: true },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "inputMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .middlewareMutation,
      {
        name: "group.GROUP.middlewareGroup.middlewareMutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          mutation: true,
          middlewareMutation: true,
        },
        ctx: { middlewareGroup: true, middlewareMutation: true },
        input: undefined,
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP.mutation,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.mutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
        },
        input: undefined,
        ctx: { middlewareGroup: true, MIDDLEWARE_GROUP: true },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "mutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP.inputMutation,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.inputMutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          inputMutation: true,
          mutation: true,
        },
        input: {
          inputMutation: true,
        },
        ctx: { middlewareGroup: true, MIDDLEWARE_GROUP: true },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "inputMutation",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP.middlewareMutation,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP.middlewareMutation",
        response: {
          GROUP: true,
          group: true,
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          mutation: true,
          middlewareMutation: true,
        },
        input: undefined,
        ctx: {
          middlewareGroup: true,
          MIDDLEWARE_GROUP: true,
          middlewareMutation: true,
        },
        mutationKey: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
          "middlewareMutation",
        ],
      },
    ],
    [
      q.EXTENDED_MIDDLEWARE_GROUP.mutation,
      {
        name: "EXTENDED_MIDDLEWARE_GROUP.mutation",
        input: undefined,
        ctx: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
        },
        response: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
          mutation: true,
        },
        mutationKey: ["app", "EXTENDED_MIDDLEWARE_GROUP", "mutation"],
      },
    ],
    [
      q.EXTENDED_MIDDLEWARE_GROUP.inputMutation,
      {
        name: "EXTENDED_MIDDLEWARE_GROUP.inputMutation",
        input: { inputMutation: true },
        ctx: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
        },
        response: {
          middlewareGroup: true,
          EXTENDED_MIDDLEWARE_GROUP: true,
          inputMutation: true,
          mutation: true,
        },
        mutationKey: ["app", "EXTENDED_MIDDLEWARE_GROUP", "inputMutation"],
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
      q,
      {
        name: "app",
        key: ["app"],
      },
    ],
  ] as const satisfies Keys;

export const objectKeys = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...baseKeys(q),
    [
      q.group({ group: true }),
      {
        name: "group",
        key: ["app", "group", { group: true }],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup,
      {
        name: "group.middlewareGroup",
        key: ["app", "group", { group: true }, "middlewareGroup"],
      },
    ],
    [
      q.group({ group: true }).middlewareGroup.MIDDLEWARE_GROUP,
      {
        name: "group.middlewareGroup.MIDDLEWARE_GROUP",
        key: [
          "app",
          "group",
          { group: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }),
      {
        name: "group.GROUP",
        key: ["app", "group", { group: true }, "GROUP", { GROUP: true }],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup,
      {
        name: "group.GROUP.middlewareGroup",
        key: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
        ],
      },
    ],
    [
      q.group({ group: true }).GROUP({ GROUP: true }).middlewareGroup
        .MIDDLEWARE_GROUP,
      {
        name: "group.GROUP.middlewareGroup.MIDDLEWARE_GROUP",
        key: [
          "app",
          "group",
          { group: true },
          "GROUP",
          { GROUP: true },
          "middlewareGroup",
          "MIDDLEWARE_GROUP",
        ],
      },
    ],
    [
      q.middlewareGroup,
      {
        name: "middlewareGroup",
        key: ["app", "middlewareGroup"],
      },
    ],
    [
      q.middlewareGroup.MIDDLEWARE_GROUP,
      {
        name: "middlewareGroup.MIDDLEWARE_GROUP",
        key: ["app", "middlewareGroup", "MIDDLEWARE_GROUP"],
      },
    ],
    [
      q.EXTENDED_MIDDLEWARE_GROUP,
      {
        name: "EXTENDED_MIDDLEWARE_GROUP",
        key: ["app", "EXTENDED_MIDDLEWARE_GROUP"],
      },
    ],
  ] satisfies Keys as unknown as ReturnType<typeof baseKeys>;

export const functionKeys = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    [
      q.group,
      {
        name: "group",
        key: ["app", "group"],
      },
    ],
    [
      q.group({ group: true }).GROUP,
      {
        name: "group.GROUP",
        key: ["app", "group", { group: true }, "GROUP"],
      },
    ],
  ] satisfies Keys as unknown as ReturnType<typeof baseKeys>;
export const keys = (q: typeof QUERY_FACTORY = QUERY_FACTORY) =>
  [
    ...objectKeys(q),
    ...functionKeys(q),
  ] satisfies Keys as unknown as ReturnType<typeof baseKeys>;
