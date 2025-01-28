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

export const nodes = new QueryStuffUndefinedInput().module((q) => ({
  a: q.query(() => ({ a: 1 })),
  b: q.mutation(async () => ({ b: 2 })),
  c: q.input().query(() => ({ c: 3 })),
  d: q.input().mutation(async () => ({ d: 4 })),
  e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
  f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
  g: q.module((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    c: q.input().query(() => ({ c: 3 })),
    d: q.input().mutation(async () => ({ d: 4 })),
    e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
    f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    gg: q.module((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      c: q.input().query(() => ({ c: 3 })),
      d: q.input().mutation(async () => ({ d: 4 })),
      e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
      f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    })),
    h: q.pipe<{ h: number }>().module((q) => ({
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
    i: q.pipe().module((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      c: q.input().query(() => ({ c: 3 })),
      d: q.input().mutation(async () => ({ d: 4 })),
      e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
      f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    })),
  })),
  h: q.pipe<{ h: number }>().module((q) => ({
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
    g: q.module((q) => ({
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
    hh: q.pipe<{ hh: number }>().module((q) => ({
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
    i: q.pipe().module((q) => ({
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
  i: q.pipe().module((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    c: q.input().query(() => ({ c: 3 })),
    d: q.input().mutation(async () => ({ d: 4 })),
    e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
    f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    g: q.module((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      c: q.input().query(() => ({ c: 3 })),
      d: q.input().mutation(async () => ({ d: 4 })),
      e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
      f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    })),
    h: q.pipe<{ h: number }>().module((q) => ({
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
    ii: q.pipe().module((q) => ({
      a: q.query(() => ({ a: 1 })),
      b: q.mutation(async () => ({ b: 2 })),
      c: q.input().query(() => ({ c: 3 })),
      d: q.input().mutation(async () => ({ d: 4 })),
      e: q.input<{ e: number }>().query(({ input: { e } }) => ({ e })),
      f: q.input<{ f: number }>().mutation(async ({ input: { f } }) => ({ f })),
    })),
  })),
}));

const queryFactory = QueryStuff.factory(() => nodes);

export const queryFactories = [
  [createProxyNode(nodes), "createProxyNode"],
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
    queryFactory.g.a,
    {
      name: "q.g.a",
      response: { a: 1 },
      queryKey: ["g", "a"],
    },
  ],
  [
    queryFactory.g.c,
    {
      name: "q.g.c",
      response: { c: 3 },
      queryKey: ["g", "c"],
    },
  ],
  [
    () => queryFactory.g.e({ e: 5 }),
    {
      name: "q.g.e",
      response: { e: 5 },
      queryKey: ["g", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g.gg.a,
    {
      name: "q.g.gg.a",
      response: { a: 1 },
      queryKey: ["g", "gg", "a"],
    },
  ],
  [
    queryFactory.g.gg.c,
    {
      name: "q.g.gg.c",
      response: { c: 3 },
      queryKey: ["g", "gg", "c"],
    },
  ],
  [
    () => queryFactory.g.gg.e({ e: 5 }),
    {
      name: "q.g.gg.e",
      response: { e: 5 },
      queryKey: ["g", "gg", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g.i().a,
    {
      name: "q.g.i.a",
      response: { a: 1 },
      queryKey: ["g", "i", "a"],
    },
  ],
  [
    queryFactory.g.i().c,
    {
      name: "q.g.i.c",
      response: { c: 3 },
      queryKey: ["g", "i", "c"],
    },
  ],
  [
    () => queryFactory.g.i().e({ e: 5 }),
    {
      name: "q.g.i.e",
      response: { e: 5 },
      queryKey: ["g", "i", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }).a,
    {
      name: "q.g.h.a",
      response: { a: 1, h: 8 },
      queryKey: ["g", "h", { h: 8 }, "a"],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }).c,
    {
      name: "q.g.h.c",
      response: { c: 3, h: 8 },
      queryKey: ["g", "h", { h: 8 }, "c"],
    },
  ],
  [
    () => queryFactory.g.h({ h: 8 }).e({ e: 5 }),
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
    queryFactory.h({ h: 8 }).g.a,
    {
      name: "q.h.g.a",
      response: { a: 1, h: 8 },
      queryKey: ["h", { h: 8 }, "g", "a"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g.c,
    {
      name: "q.h.g.c",
      response: { c: 3, h: 8 },
      queryKey: ["h", { h: 8 }, "g", "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 8 }).g.e({ e: 5 }),
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
  [
    queryFactory.h({ h: 8 }).i().a,
    {
      name: "q.h.i.a",
      response: { a: 1, h: 8 },
      queryKey: ["h", { h: 8 }, "i", "a"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).i().c,
    {
      name: "q.h.i.c",
      response: { c: 3, h: 8 },
      queryKey: ["h", { h: 8 }, "i", "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 8 }).i().e({ e: 5 }),
    {
      name: "q.h.i.e",
      response: { e: 5, h: 8 },
      queryKey: ["h", { h: 8 }, "i", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.i().a,
    {
      name: "q.i.a",
      response: { a: 1 },
      queryKey: ["i", "a"],
    },
  ],
  [
    queryFactory.i().c,
    {
      name: "q.i.c",
      response: { c: 3 },
      queryKey: ["i", "c"],
    },
  ],
  [
    () => queryFactory.i().e({ e: 5 }),
    {
      name: "q.i.e",
      response: { e: 5 },
      queryKey: ["i", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.i().g.a,
    {
      name: "q.i.g.a",
      response: { a: 1 },
      queryKey: ["i", "g", "a"],
    },
  ],
  [
    queryFactory.i().g.c,
    {
      name: "q.i.g.c",
      response: { c: 3 },
      queryKey: ["i", "g", "c"],
    },
  ],
  [
    () => queryFactory.i().g.e({ e: 5 }),
    {
      name: "q.i.g.e",
      response: { e: 5 },
      queryKey: ["i", "g", "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }).a,
    {
      name: "q.i.h.a",
      response: { a: 1, h: 8 },
      queryKey: ["i", "h", { h: 8 }, "a"],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }).c,
    {
      name: "q.i.h.c",
      response: { c: 3, h: 8 },
      queryKey: ["i", "h", { h: 8 }, "c"],
    },
  ],
  [
    () => queryFactory.i().h({ h: 8 }).e({ e: 5 }),
    {
      name: "q.i.h.e",
      response: { e: 5, h: 8 },
      queryKey: ["i", "h", { h: 8 }, "e", { [inputSymbol]: { e: 5 } }],
    },
  ],
  [
    queryFactory.i().ii().a,
    {
      name: "q.i.a",
      response: { a: 1 },
      queryKey: ["i", "ii", "a"],
    },
  ],
  [
    queryFactory.i().ii().c,
    {
      name: "q.i.c",
      response: { c: 3 },
      queryKey: ["i", "ii", "c"],
    },
  ],
  [
    () => queryFactory.i().ii().e({ e: 5 }),
    {
      name: "q.i.e",
      response: { e: 5 },
      queryKey: ["i", "ii", "e", { [inputSymbol]: { e: 5 } }],
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
    queryFactory.g.b,
    {
      name: "q.g.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["g", "b"],
    },
  ],
  [
    queryFactory.g.d,
    {
      name: "q.g.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["g", "d"],
    },
  ],
  [
    queryFactory.g.f,
    {
      name: "q.g.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["g", "f"],
    },
  ],
  [
    queryFactory.g.gg.b,
    {
      name: "q.g.gg.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["g", "gg", "b"],
    },
  ],
  [
    queryFactory.g.gg.d,
    {
      name: "q.g.gg.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["g", "gg", "d"],
    },
  ],
  [
    queryFactory.g.gg.f,
    {
      name: "q.g.gg.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["g", "gg", "f"],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }).b,
    {
      name: "q.g.h.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "b"],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }).d,
    {
      name: "q.g.h.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "d"],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }).f,
    {
      name: "q.g.h.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["g", "h", { h: 8 }, "f"],
    },
  ],
  [
    queryFactory.g.i().b,
    {
      name: "q.g.i.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["g", "i", "b"],
    },
  ],
  [
    queryFactory.g.i().d,
    {
      name: "q.g.i.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["g", "i", "d"],
    },
  ],
  [
    queryFactory.g.i().f,
    {
      name: "q.g.i.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["g", "i", "f"],
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
    queryFactory.h({ h: 8 }).g.b,
    {
      name: "q.h.g.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["h", { h: 8 }, "g", "b"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g.d,
    {
      name: "q.h.g.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["h", { h: 8 }, "g", "d"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).g.f,
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
  [
    queryFactory.h({ h: 8 }).i().b,
    {
      name: "q.h.i.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["h", { h: 8 }, "i", "b"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).i().d,
    {
      name: "q.h.i.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["h", { h: 8 }, "i", "d"],
    },
  ],
  [
    queryFactory.h({ h: 8 }).i().f,
    {
      name: "q.h.i.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["h", { h: 8 }, "i", "f"],
    },
  ],
  [
    queryFactory.i().b,
    {
      name: "q.i.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["i", "b"],
    },
  ],
  [
    queryFactory.i().d,
    {
      name: "q.i.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["i", "d"],
    },
  ],
  [
    queryFactory.i().f,
    {
      name: "q.i.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["i", "f"],
    },
  ],
  [
    queryFactory.i().g.b,
    {
      name: "q.i.g.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["i", "g", "b"],
    },
  ],
  [
    queryFactory.i().g.d,
    {
      name: "q.i.g.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["i", "g", "d"],
    },
  ],
  [
    queryFactory.i().g.f,
    {
      name: "q.i.g.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["i", "g", "f"],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }).b,
    {
      name: "q.i.h.b",
      input: undefined,
      response: { b: 2, h: 8 },
      mutationKey: ["i", "h", { h: 8 }, "b"],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }).d,
    {
      name: "q.i.h.d",
      input: undefined,
      response: { d: 4, h: 8 },
      mutationKey: ["i", "h", { h: 8 }, "d"],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }).f,
    {
      name: "q.i.h.f",
      input: { f: 6 },
      response: { f: 6, h: 8 },
      mutationKey: ["i", "h", { h: 8 }, "f"],
    },
  ],
  [
    queryFactory.i().ii().b,
    {
      name: "q.i.ii.b",
      input: undefined,
      response: { b: 2 },
      mutationKey: ["i", "ii", "b"],
    },
  ],
  [
    queryFactory.i().ii().d,
    {
      name: "q.i.ii.d",
      input: undefined,
      response: { d: 4 },
      mutationKey: ["i", "ii", "d"],
    },
  ],
  [
    queryFactory.i().ii().f,
    {
      name: "q.i.ii.f",
      input: { f: 6 },
      response: { f: 6 },
      mutationKey: ["i", "ii", "f"],
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
    queryFactory.g,
    {
      name: "q.g",
      key: ["g"],
    },
  ],
  [
    queryFactory.g.gg,
    {
      name: "q.g.gg",
      key: ["g", "gg"],
    },
  ],
  [
    queryFactory.g.h({ h: 8 }),
    {
      name: "q.g.h",
      key: ["g", "h", { h: 8 }],
    },
  ],
  [
    queryFactory.g.i(),
    {
      name: "q.g.i",
      key: ["g", "i"],
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
    queryFactory.h({ h: 8 }).g,
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
  [
    queryFactory.h({ h: 8 }).i(),
    {
      name: "q.h.i",
      key: ["h", { h: 8 }, "i"],
    },
  ],
  [
    queryFactory.i(),
    {
      name: "q.i",
      key: ["i"],
    },
  ],
  [
    queryFactory.i().g,
    {
      name: "q.i.g",
      key: ["i", "g"],
    },
  ],
  [
    queryFactory.i().h({ h: 8 }),
    {
      name: "q.i.h",
      key: ["i", "h", { h: 8 }],
    },
  ],
  [
    queryFactory.i().ii(),
    {
      name: "q.i.i",
      key: ["i", "ii"],
    },
  ],
] satisfies Keys;
