import { queryOptions } from "@tanstack/react-query";
import { describe, expect } from "vitest";
import { n, queryStuffTest } from "./fixtures.ts";

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
  ([0, 1] as const).forEach((i) => {
    const module = i === 0 ? "createProxyNode" : "QueryStuff.factory";
    queryStuffTest(
      `${module}: returns queryKey for n.a`,
      ({ queryFactories }) => {
        const key = queryFactories[i].a().queryKey;
        const _key = n.a().queryKey;
        const value = getQueryKey<{ a: number }>()([
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.b`,
      ({ queryFactories }) => {
        const key = queryFactories[i].b().mutationKey;
        const value = getKey(["b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.c`,
      ({ queryFactories }) => {
        const key = queryFactories[i].c().queryKey;
        const _key = n.c().queryKey;
        const value = getQueryKey<{ c: number }>()([
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.d`,
      ({ queryFactories }) => {
        const key = queryFactories[i].d().mutationKey;
        const value = getKey(["d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.e`,
      ({ queryFactories }) => {
        const input = { e: 1 };
        const key = queryFactories[i].e(input).queryKey;
        const _key = n.e(input).queryKey;
        const value = getQueryKey<{ e: number }>()([
          "e",
          input,
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.f`,
      ({ queryFactories }) => {
        const key = queryFactories[i].f().mutationKey;
        const value = getKey(["f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.g`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g._key;
        const value = getKey(["g"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.g.a`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.a().queryKey;
        const _key = n.g.a().queryKey;
        const value = getQueryKey<{ a: number }>()([
          "g",
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.g.b`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.b().mutationKey;
        const value = getKey(["g", "b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.g.c`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.c().queryKey;
        const _key = n.g.c().queryKey;
        const value = getQueryKey<{ c: number }>()([
          "g",
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.g.d`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.d().mutationKey;
        const value = getKey(["g", "d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.g.e`,
      ({ queryFactories }) => {
        const input = { e: 5 };
        const key = queryFactories[i].g.e(input).queryKey;
        const _key = n.g.e(input).queryKey;
        const value = getQueryKey<{ e: number }>()([
          "g",
          "e",
          input,
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.g.f`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.f().mutationKey;
        const value = getKey(["g", "f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.h`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input)._key;
        const value = getKey(["h", input] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.h.a`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).a().queryKey;
        const _key = n.h(input).a().queryKey;
        const value = getQueryKey<{ a: number; h: number }>()([
          "h",
          input,
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.h.b`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).b().mutationKey;
        const value = getKey(["h", input, "b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.h.c`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).c().queryKey;
        const _key = n.h(input).c().queryKey;
        const value = getQueryKey<{ c: number; h: number }>()([
          "h",
          input,
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.h.d`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).d().mutationKey;
        const value = getKey(["h", input, "d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for n.h.e`,
      ({ queryFactories }) => {
        const input1 = { h: 8 };
        const input2 = { e: 5 };
        const key = queryFactories[i].h(input1).e(input2).queryKey;
        const _key = n.h(input1).e(input2).queryKey;
        const value = getQueryKey<{ e: number; h: number }>()([
          "h",
          input1,
          "e",
          input2,
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for n.h.f`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).f().mutationKey;
        const value = getKey(["h", input, "f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
  });
});
