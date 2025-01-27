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
      queryKey: ["e", { e: 5 }],
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
    queryFactory.h({ h: 7 }).a,
    {
      name: "q.h.a",
      response: { a: 1, h: 7 },
      queryKey: ["h", { h: 7 }, "a"],
    },
  ],
  [
    queryFactory.h({ h: 7 }).c,
    {
      name: "q.h.c",
      response: { c: 3, h: 7 },
      queryKey: ["h", { h: 7 }, "c"],
    },
  ],
  [
    () => queryFactory.h({ h: 7 }).e({ e: 5 }),
    {
      name: "q.h.e",
      response: { e: 5, h: 7 },
      queryKey: ["h", { h: 7 }, "e", { e: 5 }],
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
] satisfies Mutations as unknown as typeof baseMutation;

type Keys = [
  ProxyKeyNode | ((...input: any[]) => ProxyKeyNode),
  {
    name: string;
    input: undefined | UnknownRecord;
    key: unknown[];
  },
][];

export const keys = [
  [
    queryFactory.g,
    {
      name: "q.g",
      input: undefined,
      key: ["g"],
    },
  ],
  [
    queryFactory.h,
    {
      name: "q.h",
      input: { h: 8 },
      key: ["h", { h: 8 }],
    },
  ],
] satisfies Keys;
