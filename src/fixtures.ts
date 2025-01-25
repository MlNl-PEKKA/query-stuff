import { createProxyNode } from "./createProxyNode.ts";
import { QueryStuff, QueryStuffUndefinedInput } from "./queryStuff.ts";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";

export const nodes = new QueryStuffUndefinedInput().module((q) => ({
  a: q.query(() => ({ a: 1 })),
  b: q.mutation(async () => ({ b: 2 })),
  c: q.input().query(() => ({ c: 3 })),
  d: q.input().mutation(async () => ({ d: 4 })),
  e: q.input<{ e: number }>().query(({ e }) => ({ e })),
  f: q.input<{ f: number }>().mutation(async ({ f }) => ({ f })),
  g: q.module((q) => ({
    a: q.query(() => ({ a: 1 })),
    b: q.mutation(async () => ({ b: 2 })),
    c: q.input().query(() => ({ c: 3 })),
    d: q.input().mutation(async () => ({ d: 4 })),
    e: q.input<{ e: number }>().query(({ e }) => ({ e })),
    f: q.input<{ f: number }>().mutation(async ({ f }) => ({ f })),
  })),
  h: q.input<{ h: number }>().module((q) => ({
    a: q.query(({ h }) => ({ a: 1, h })),
    b: q.mutation(async ({ h }) => ({ b: 2, h })),
    c: q.input().query(({ h }) => ({ c: 3, h })),
    d: q.input().mutation(async ({ h }) => ({ d: 4, h })),
    e: q.input<{ e: number }>().query(({ e, h }) => ({ e, h })),
    f: q.input<{ f: number }>().mutation(async ({ f, h }) => ({ f, h })),
  })),
}));

const queryFactory = QueryStuff.factory(() => nodes);

export const queryFactories = [
  [createProxyNode(nodes), "createProxyNode"],
  [queryFactory, "QueryStuff.factory"],
] as const;

const baseQuery = [
  [
    queryFactory.a(),
    {
      name: "q.a",
      response: { a: 1 },
      queryKey: ["a"],
    },
  ],
] as const;

export const queries = [
  ...baseQuery,
  [
    queryFactory.c(),
    {
      name: "q.c",
      response: { c: 3 },
      queryKey: ["c"],
    },
  ],
  [
    queryFactory.e({ e: 5 }),
    {
      name: "q.e",
      response: { e: 5 },
      queryKey: ["e", { e: 5 }],
    },
  ],
  [
    queryFactory.g.a(),
    {
      name: "q.g.a",
      response: { a: 1 },
      queryKey: ["g", "a"],
    },
  ],
  [
    queryFactory.g.c(),
    {
      name: "q.g.c",
      response: { c: 3 },
      queryKey: ["g", "c"],
    },
  ],
  [
    queryFactory.h({ h: 7 }).a(),
    {
      name: "q.h.a",
      response: { a: 1, h: 7 },
      queryKey: ["h", { h: 7 }, "a"],
    },
  ],
  [
    queryFactory.h({ h: 7 }).c(),
    {
      name: "q.h.c",
      response: { c: 3, h: 7 },
      queryKey: ["h", { h: 7 }, "c"],
    },
  ],
  [
    queryFactory.h({ h: 7 }).e({ e: 5 }),
    {
      name: "q.h.e",
      response: { e: 5, h: 7 },
      queryKey: ["h", { h: 7 }, "e", { e: 5 }],
    },
  ],
] as unknown as typeof baseQuery;
