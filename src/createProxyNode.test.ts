import { queryOptions } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { nodes, queryFactories } from "./fixtures.js";

const getQueryKey = <T>() => {
  return <U extends readonly unknown[]>(key: U) =>
    queryOptions<T, Error, T, U>({
      queryKey: key,
    }).queryKey;
};

const getKey = <T extends readonly unknown[]>(key: T) => {
  return key;
};

describe("queryFactories", () => {
  queryFactories.forEach(([q, module]) => {
    it(`${module}: returns queryKey for nodes.a`, () => {
      const key = q.a().queryKey;
      const _key = nodes.a().queryKey;
      const value = getQueryKey<{ a: number }>()([
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.b`, () => {
      const key = q.b().mutationKey;
      const value = getKey(["b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.c`, () => {
      const key = q.c().queryKey;
      const _key = nodes.c().queryKey;
      const value = getQueryKey<{ c: number }>()([
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.d`, () => {
      const key = q.d().mutationKey;
      const value = getKey(["d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.e`, () => {
      const input = { e: 1 };
      const key = q.e(input).queryKey;
      const _key = nodes.e(input).queryKey;
      const value = getQueryKey<{ e: number }>()([
        "e",
        input,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.f`, () => {
      const key = q.f().mutationKey;
      const value = getKey(["f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.g`, () => {
      const key = q.g._key;
      const value = getKey(["g"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.g.a`, () => {
      const key = q.g.a().queryKey;
      const _key = nodes.g.a().queryKey;
      const value = getQueryKey<{ a: number }>()([
        "g",
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.g.b`, () => {
      const key = q.g.b().mutationKey;
      const value = getKey(["g", "b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.g.c`, () => {
      const key = q.g.c().queryKey;
      const _key = nodes.g.c().queryKey;
      const value = getQueryKey<{ c: number }>()([
        "g",
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.g.d`, () => {
      const key = q.g.d().mutationKey;
      const value = getKey(["g", "d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.g.e`, () => {
      const input = { e: 5 };
      const key = q.g.e(input).queryKey;
      const _key = nodes.g.e(input).queryKey;
      const value = getQueryKey<{ e: number }>()([
        "g",
        "e",
        input,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.g.f`, () => {
      const key = q.g.f().mutationKey;
      const value = getKey(["g", "f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.h`, () => {
      const input = { h: 8 };
      const key = q.h(input)._key;
      const value = getKey(["h", input] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.h.a`, () => {
      const input = { h: 8 };
      const key = q.h(input).a().queryKey;
      const _key = nodes.h(input).a().queryKey;
      const value = getQueryKey<{ a: number; h: number }>()([
        "h",
        input,
        "a",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.h.b`, () => {
      const input = { h: 8 };
      const key = q.h(input).b().mutationKey;
      const value = getKey(["h", input, "b"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.h.c`, () => {
      const input = { h: 8 };
      const key = q.h(input).c().queryKey;
      const _key = nodes.h(input).c().queryKey;
      const value = getQueryKey<{ c: number; h: number }>()([
        "h",
        input,
        "c",
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.h.d`, () => {
      const input = { h: 8 };
      const key = q.h(input).d().mutationKey;
      const value = getKey(["h", input, "d"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns queryKey for nodes.h.e`, () => {
      const input1 = { h: 8 };
      const input2 = { e: 5 };
      const key = q.h(input1).e(input2).queryKey;
      const _key = nodes.h(input1).e(input2).queryKey;
      const value = getQueryKey<{ e: number; h: number }>()([
        "h",
        input1,
        "e",
        input2,
      ] as const) satisfies typeof key satisfies typeof _key;
      expect(key).toStrictEqual(value);
    });
    it(`${module}: returns mutationKey for nodes.h.f`, () => {
      const input = { h: 8 };
      const key = q.h(input).f().mutationKey;
      const value = getKey(["h", input, "f"] as const) satisfies typeof key;
      expect(key).toStrictEqual(value);
    });
  });
});
