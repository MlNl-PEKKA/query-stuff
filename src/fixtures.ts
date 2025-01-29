import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./queryStuff.js";
import { QueryStuff } from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import {
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
} from "./types.js";
import { MutationKey, QueryKey } from "@tanstack/react-query";
import { inputSymbol } from "./symbols.js";

export const nodes = new QueryStuffUndefinedInput().module()((q) => ({
  a: q.query(() => ({ a: 1 })),
  b: q.mutation(async () => ({ b: 2 })),
  c: q.input().query(() => ({ c: 3 })),
  d: q.input().mutation(async () => ({ d: 4 })),
  e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
  f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
  g: q.module()((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    c: q.input().query(() => ({ c: 3 })),
    d: q.input().mutation(async () => ({ d: 4 })),
    e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
    f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    gg: q.module()((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      c: q.input().query(() => ({ c: 3 })),
      d: q.input().mutation(async () => ({ d: 4 })),
      e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
      f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    })),
    h: q.module<{ h: number }>()((q) => ({
      a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
      b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
      c: q.input().query(({ ctx: { h } }) => ({ c: 3, h })),
      d: q.input().mutation(async ({ ctx: { h } }) => ({ d: 4, h })),
      e: q
        .input<{ e: number }>()
        .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
      f: q
        .input<{ f: number }>()
        .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    })),
  })),
  h: q.module<{ h: number }>()((q) => ({
    a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
    b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
    c: q.input().query(({ ctx: { h } }) => ({ c: 3, h })),
    d: q.input().mutation(async ({ ctx: { h } }) => ({ d: 4, h })),
    e: q
      .input<{ e: number }>()
      .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
    f: q
      .input<{ f: number }>()
      .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    g: q.module()((q) => ({
      a: q.query(({ ctx: { h } }) => ({ a: 1, h })),
      b: q.mutation(async ({ ctx: { h } }) => ({ b: 2, h })),
      c: q.input().query(({ ctx: { h } }) => ({ c: 3, h })),
      d: q.input().mutation(async ({ ctx: { h } }) => ({ d: 4, h })),
      e: q
        .input<{ e: number }>()
        .query(({ input: { e }, ctx: { h } }) => ({ e, h })),
      f: q
        .input<{ f: number }>()
        .mutation(async ({ input: { f }, ctx: { h } }) => ({ f, h })),
    })),
    hh: q.module<{ hh: number }>()((q) => ({
      a: q.query(({ ctx: { h, hh } }) => ({ a: 1, h, hh })),
      b: q.mutation(async ({ ctx: { h, hh } }) => ({ b: 2, h, hh })),
      c: q.input().query(({ ctx: { h, hh } }) => ({ c: 3, h, hh })),
      d: q.input().mutation(async ({ ctx: { h, hh } }) => ({ d: 4, h, hh })),
      e: q
        .input<{ e: number }>()
        .query(({ input: { e }, ctx: { h, hh } }) => ({ e, h, hh })),
      f: q
        .input<{ f: number }>()
        .mutation(async ({ input: { f }, ctx: { h, hh } }) => ({ f, h, hh })),
    })),
  })),
}));

const queryFactory = QueryStuff.factory(() => nodes());

export const queryFactories = [
  [createProxyNode(nodes()), "createProxyNode"],
  [queryFactory, "QueryStuff.factory"],
] as const;

type Queries = [
  (...input: any[]) => QAnyQueryOptionsOut,
  { name: string; response: UnknownRecord; queryKey: QueryKey },
][];

const baseQuery = [
  [
    queryFactory.a,
    {
      name: "q.a",
      response: { a: 1 },
      queryKey: ["a"],
    },
  ],
] as const satisfies Queries;

export const queries = [
  ...baseQuery,
  [
    queryFactory.c,
    {
      name: "q.c",
      response: { c: 3 },
      queryKey: ["c"],
    },
  ],
  [
    () => queryFactory.e({ e: 5 }),
    {
      name: "q.e",
      response: { e: 5 },
      queryKey: ["e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g().a,
    {
      name: "q.g.a",
      response: { a: 1 },
      queryKey: ["g", "a"],
    },
  ],
  [
    queryFactory.g().c,
    {
      name: "q.g.c",
      response: { c: 3 },
      queryKey: ["g", "c"],
    },
  ],
  [
    () => queryFactory.g().e({ e: 5 }),
    {
      name: "q.g.e",
      response: { e: 5 },
      queryKey: ["g", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g().gg().a,
    {
      name: "q.g.gg.a",
      response: { a: 1 },
      queryKey: ["g", "gg", "a"],
    },
  ],
  [
    queryFactory.g().gg().c,
    {
      name: "q.g.gg.c",
      response: { c: 3 },
      queryKey: ["g", "gg", "c"],
    },
  ],
  [
    () => queryFactory.g().gg().e({ e: 5 }),
    {
      name: "q.g.gg.e",
      response: { e: 5 },
      queryKey: ["g", "gg", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }).a,
    {
      name: "q.g.h.a",
      response: { a: 1, h: 8 },
      queryKey: ["g", "h", { h: 8 }, "a"],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }).c,
    {
      name: "q.g.h.c",
      response: { c: 3, h: 8 },
      queryKey: ["g", "h", { h: 8 }, "c"],
    },
  ],
  [
    () => queryFactory.g().h({ h: 8 }).e({ e: 5 }),
    {
      name: "q.g.h.e",
      response: { e: 5, h: 8 },
      queryKey: ["g", "h", { h: 8 }, "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.h({ h: 8 }).a,
    {
      name: "q.h.a",
      response: { a: 1, h: 8 },
      queryKey: ["h", { h: 8 }, "a"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).c,
    {
      name: "q.h.c",
      response: { c: 3, h: 8 },
      queryKey: ["h", { h: 8 }, "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 8 }).e({ e: 5 }),
    {
      name: "q.h.e",
      response: { e: 5, h: 8 },
      queryKey: ["h", { h: 8 }, "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g().a,
    {
      name: "q.h.g.a",
      response: { a: 1, h: 8 },
      queryKey: ["h", { h: 8 }, "g", "a"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g().c,
    {
      name: "q.h.g.c",
      response: { c: 3, h: 8 },
      queryKey: ["h", { h: 8 }, "g", "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 8 }).g().e({ e: 5 }),
    {
      name: "q.h.g.e",
      response: { e: 5, h: 8 },
      queryKey: ["h", { h: 8 }, "g", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }).a,
    {
      name: "q.h.hh.a",
      response: { a: 1, h: 8, hh: 88 },
      queryKey: ["h", { h: 8 }, "hh", { hh: 88 }, "a"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }).c,
    {
      name: "q.h.hh.c",
      response: { c: 3, h: 8, hh: 88 },
      queryKey: ["h", { h: 8 }, "hh", { hh: 88 }, "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 8 }).hh({ hh: 88 }).e({ e: 5 }),
    {
      name: "q.h.hh.e",
      response: { e: 5, h: 8, hh: 88 },
      queryKey: [
        "h",
        { h: 8 },
        "hh",
        { hh: 88 },
        "e",
        { [inputSymbol]: { e: 5 } },
      ],
    },
  ],
] satisfies Queries as unknown as typeof baseQuery;

type Mutations = [
  (...input: any[]) => QAnyMutationOptionsOut,
  {
    name: string;
    input: undefined | UnknownRecord;
    response: UnknownRecord;
    mutationKey: MutationKey;
  },
][];

const baseMutation = [
  [
    queryFactory.b,
    {
      name: "q.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["b"],
    },
  ],
] as const satisfies Mutations;

export const mutations = [
  ...baseMutation,
  [
    queryFactory.d,
    {
      name: "q.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["d"],
    },
  ],
  [
    queryFactory.f,
    {
      name: "q.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["f"],
    },
  ],
  [
    queryFactory.g().b,
    {
      name: "q.g.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["g", "b"],
    },
  ],
  [
    queryFactory.g().d,
    {
      name: "q.g.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["g", "d"],
    },
  ],
  [
    queryFactory.g().f,
    {
      name: "q.g.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["g", "f"],
    },
  ],
  [
    queryFactory.g().gg().b,
    {
      name: "q.g.gg.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["g", "gg", "b"],
    },
  ],
  [
    queryFactory.g().gg().d,
    {
      name: "q.g.gg.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["g", "gg", "d"],
    },
  ],
  [
    queryFactory.g().gg().f,
    {
      name: "q.g.gg.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["g", "gg", "f"],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }).b,
    {
      name: "q.g.h.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "b"],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }).d,
    {
      name: "q.g.h.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "d"],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }).f,
    {
      name: "q.g.h.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "f"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).b,
    {
      name: "q.h.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["h", { h: 8 }, "b"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).d,
    {
      name: "q.h.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["h", { h: 8 }, "d"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).f,
    {
      name: "q.h.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["h", { h: 8 }, "f"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g().b,
    {
      name: "q.h.g.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["h", { h: 8 }, "g", "b"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g().d,
    {
      name: "q.h.g.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["h", { h: 8 }, "g", "d"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g().f,
    {
      name: "q.h.g.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["h", { h: 8 }, "g", "f"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }).b,
    {
      name: "q.h.hh.b",
      input: undefined,
      response: { b: 2, h: 8, hh: 88 },
      mutationKey: ["h", { h: 8 }, "hh", { hh: 88 }, "b"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }).d,
    {
      name: "q.h.hh.d",
      input: undefined,
      response: { d: 4, h: 8, hh: 88 },
      mutationKey: ["h", { h: 8 }, "hh", { hh: 88 }, "d"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }).f,
    {
      name: "q.h.hh.f",
      input: { f: 6 },
      response: { f: 6, h: 8, hh: 88 },
      mutationKey: ["h", { h: 8 }, "hh", { hh: 88 }, "f"],
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
    queryFactory.g(),
    {
      name: "q.g",
      key: ["g"],
    },
  ],
  [
    queryFactory.g().gg(),
    {
      name: "q.g.gg",
      key: ["g", "gg"],
    },
  ],
  [
    queryFactory.g().h({ h: 8 }),
    {
      name: "q.g.h",
      key: ["g", "h", { h: 8 }],
    },
  ],
  [
    queryFactory.h({ h: 8 }),
    {
      name: "q.h",
      key: ["h", { h: 8 }],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g(),
    {
      name: "q.h.gg",
      key: ["h", { h: 8 }, "g"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).hh({ hh: 88 }),
    {
      name: "q.h.h",
      key: ["h", { h: 8 }, "hh", { hh: 88 }],
    },
  ],
] satisfies Keys;
