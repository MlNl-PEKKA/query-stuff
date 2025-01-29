import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./queryStuff.js";
import { QueryStuff } from "./index.js";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";

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

export const queryFactory = QueryStuff.factory(() => nodes());

export const queryFactories = [
  [createProxyNode(nodes()), "createProxyNode"],
  [queryFactory, "QueryStuff.factory"],
] as const;
