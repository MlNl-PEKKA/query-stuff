import { queryOptions } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { createProxyNode } from "./createProxyNode.js";
import { QueryStuffUndefinedInput } from "./queryStuff.js";
import { QueryStuff } from "./index.js";

const getQueryKey = <T>() => {
  return <U extends readonly unknown[]>(key: U) =>
    queryOptions<T, Error, T, U>({
      queryKey: key,
    }).queryKey;
};

const getKey = <T extends readonly unknown[]>(key: T) => {
  return key;
};

describe("createProxyNode and QueryStuff.factory", () => {
  const _q = new QueryStuffUndefinedInput().module((q) => ({
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
  [createProxyNode(_q), QueryStuff.factory(() => _q)].forEach((q) => {
    it("returns queryKey for q.a", () => {
      const key = q.a().queryKey;
      const _key = _q.a().queryKey;
      const value = getQueryKey<{ a: number }>()([
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.b", () => {
      const key = q.b().mutationKey;
      const value = getKey(["b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.c", () => {
      const key = q.c().queryKey;
      const _key = _q.c().queryKey;
      const value = getQueryKey<{ c: number }>()([
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.d", () => {
      const key = q.d().mutationKey;
      const value = getKey(["d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.e", () => {
      const input = { e: 1 };
      const key = q.e(input).queryKey;
      const _key = _q.e(input).queryKey;
      const value = getQueryKey<{ e: number }>()([
        "e",
        input,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.f", () => {
      const key = q.f().mutationKey;
      const value = getKey(["f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.g", () => {
      const key = q.g._key;
      const value = getKey(["g"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.g.a", () => {
      const key = q.g.a().queryKey;
      const _key = _q.g.a().queryKey;
      const value = getQueryKey<{ a: number }>()([
        "g",
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.g.b", () => {
      const key = q.g.b().mutationKey;
      const value = getKey(["g", "b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.g.c", () => {
      const key = q.g.c().queryKey;
      const _key = _q.g.c().queryKey;
      const value = getQueryKey<{ c: number }>()([
        "g",
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.g.d", () => {
      const key = q.g.d().mutationKey;
      const value = getKey(["g", "d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.g.e", () => {
      const input = { e: 5 };
      const key = q.g.e(input).queryKey;
      const _key = _q.g.e(input).queryKey;
      const value = getQueryKey<{ e: number }>()([
        "g",
        "e",
        input,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.g.f", () => {
      const key = q.g.f().mutationKey;
      const value = getKey(["g", "f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.h", () => {
      const input = { h: 8 };
      const key = q.h(input)._key;
      const value = getKey(["h", input] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.h.a", () => {
      const input = { h: 8 };
      const key = q.h(input).a().queryKey;
      const _key = _q.h(input).a().queryKey;
      const value = getQueryKey<{ a: number; h: number }>()([
        "h",
        input,
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.h.b", () => {
      const input = { h: 8 };
      const key = q.h(input).b().mutationKey;
      const value = getKey(["h", input, "b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.h.c", () => {
      const input = { h: 8 };
      const key = q.h(input).c().queryKey;
      const _key = _q.h(input).c().queryKey;
      const value = getQueryKey<{ c: number; h: number }>()([
        "h",
        input,
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.h.d", () => {
      const input = { h: 8 };
      const key = q.h(input).d().mutationKey;
      const value = getKey(["h", input, "d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it("returns queryKey for q.h.e", () => {
      const input1 = { h: 8 };
      const input2 = { e: 5 };
      const key = q.h(input1).e(input2).queryKey;
      const _key = _q.h(input1).e(input2).queryKey;
      const value = getQueryKey<{ e: number; h: number }>()([
        "h",
        input1,
        "e",
        input2,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it("returns mutationKey for q.h.f", () => {
      const input = { h: 8 };
      const key = q.h(input).f().mutationKey;
      const value = getKey(["h", input, "f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
  });
});
