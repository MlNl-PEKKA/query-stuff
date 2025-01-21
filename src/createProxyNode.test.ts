import { queryOptions } from "@tanstack/react-query";
import { describe, expect } from "vitest";
import { queryStuffTest } from "./fixtures.js";

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
      `${module}: returns queryKey for q.a`,
      ({ queryFactories, q }) => {
        const key = queryFactories[i].a().queryKey;
        const _key = q.a().queryKey;
        const value = getQueryKey<{ a: number }>()([
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.b`,
      ({ queryFactories }) => {
        const key = queryFactories[i].b().mutationKey;
        const value = getKey(["b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.c`,
      ({ queryFactories, q }) => {
        const key = queryFactories[i].c().queryKey;
        const _key = q.c().queryKey;
        const value = getQueryKey<{ c: number }>()([
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.d`,
      ({ queryFactories }) => {
        const key = queryFactories[i].d().mutationKey;
        const value = getKey(["d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.e`,
      ({ queryFactories, q }) => {
        const input = { e: 1 };
        const key = queryFactories[i].e(input).queryKey;
        const _key = q.e(input).queryKey;
        const value = getQueryKey<{ e: number }>()([
          "e",
          input,
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.f`,
      ({ queryFactories }) => {
        const key = queryFactories[i].f().mutationKey;
        const value = getKey(["f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.g`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g._key;
        const value = getKey(["g"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.g.a`,
      ({ queryFactories, q }) => {
        const key = queryFactories[i].g.a().queryKey;
        const _key = q.g.a().queryKey;
        const value = getQueryKey<{ a: number }>()([
          "g",
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.g.b`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.b().mutationKey;
        const value = getKey(["g", "b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.g.c`,
      ({ queryFactories, q }) => {
        const key = queryFactories[i].g.c().queryKey;
        const _key = q.g.c().queryKey;
        const value = getQueryKey<{ c: number }>()([
          "g",
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.g.d`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.d().mutationKey;
        const value = getKey(["g", "d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.g.e`,
      ({ queryFactories, q }) => {
        const input = { e: 5 };
        const key = queryFactories[i].g.e(input).queryKey;
        const _key = q.g.e(input).queryKey;
        const value = getQueryKey<{ e: number }>()([
          "g",
          "e",
          input,
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.g.f`,
      ({ queryFactories }) => {
        const key = queryFactories[i].g.f().mutationKey;
        const value = getKey(["g", "f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.h`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input)._key;
        const value = getKey(["h", input] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.h.a`,
      ({ queryFactories, q }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).a().queryKey;
        const _key = q.h(input).a().queryKey;
        const value = getQueryKey<{ a: number; h: number }>()([
          "h",
          input,
          "a",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.h.b`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).b().mutationKey;
        const value = getKey(["h", input, "b"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.h.c`,
      ({ queryFactories, q }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).c().queryKey;
        const _key = q.h(input).c().queryKey;
        const value = getQueryKey<{ c: number; h: number }>()([
          "h",
          input,
          "c",
        ] as const) satisfies typeof key satisfies typeof _key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns mutationKey for q.h.d`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).d().mutationKey;
        const value = getKey(["h", input, "d"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
    queryStuffTest(
      `${module}: returns queryKey for q.h.e`,
      ({ queryFactories, q }) => {
        const input1 = { h: 8 };
        const input2 = { e: 5 };
        const key = queryFactories[i].h(input1).e(input2).queryKey;
        const _key = q.h(input1).e(input2).queryKey;
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
      `${module}: returns mutationKey for q.h.f`,
      ({ queryFactories }) => {
        const input = { h: 8 };
        const key = queryFactories[i].h(input).f().mutationKey;
        const value = getKey(["h", input, "f"] as const) satisfies typeof key;
        expect(key).toStrictEqual(value);
      },
    );
  });
});
