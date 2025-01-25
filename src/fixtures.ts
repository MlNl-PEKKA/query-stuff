import { QueryStuff, QueryStuffUndefinedInput } from "./queryStuff.ts";
import type * as _ from "../node_modules/.pnpm/@tanstack+query-core@5.64.1/node_modules/@tanstack/query-core/build/modern/hydration-DpBMnFDT.js";
import { test } from "vitest";
import { createProxyNode } from "./createProxyNode.ts";
import type { ProxyNode } from "./types.ts";

export const n = new QueryStuffUndefinedInput().module((q) => ({
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

export const queryStuffTest = test.extend<{
  q: ProxyNode<typeof n>;
  queryFactories: [ProxyNode<typeof n>, ProxyNode<typeof n>];
}>({
  q: QueryStuff.factory(() => n),
  queryFactories: [createProxyNode(n), QueryStuff.factory(() => n)],
});
