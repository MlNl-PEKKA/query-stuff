// @vitest-environment jsdom
import {
  MutationKey,
  QueryClient,
  QueryClientProvider,
  QueryKey,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { renderHook as rH, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { useMutationStuff } from "./index.js";
import {
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
} from "./types.js";
import { queryFactory } from "./fixtures.js";
import { inputSymbol } from "./symbols.js";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

function renderHook<U = unknown, T = unknown>(
  fn: (x: U) => T,
  wrapper: ReturnType<typeof createWrapper> = createWrapper(),
) {
  return rH<T, U>(fn, { wrapper });
}

describe(`QueryStuff`, () => {
  queries.forEach(([q, { name, response, queryKey }]) => {
    describe(`${name}: query`, () => {
      it(`${name}: useQuery Error`, async () => {
        const { result: query } = renderHook(() =>
          useQuery({
            ...q(),
            queryFn: () => {
              throw new Error("error");
            },
          }),
        );
        await waitFor(() => expect(query.current.isError).toBe(true));
      });
      describe(`${name}: useQuery, getQueryData, getQueriesData`, () => {
        const wrapper = createWrapper();
        it(`${name}: useQuery`, async () => {
          const { result: query } = renderHook(() => useQuery(q()), wrapper);
          await waitFor(() => expect(query.current.isSuccess).toBe(true));
          expect(query.current.data).toStrictEqual(response);
        });
        it(`${name}: getQueryData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(result.current).toStrictEqual(response);
        });
        it(`${name}: getQueriesData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueriesData({ queryKey: q().queryKey }),
            wrapper,
          );
          expect(result.current).toStrictEqual([[queryKey, response]]);
        });
      });
      describe(`${name}: useQueries, getQueryData`, () => {
        const wrapper = createWrapper();
        it(`${name}: useQueries`, async () => {
          const { result: query } = renderHook(
            () =>
              useQueries({
                queries: [q()],
              }),
            wrapper,
          );
          await waitFor(() => expect(query.current[0].isSuccess).toBe(true));
          expect(query.current[0].data).toStrictEqual(response);
        });
        it(`${name}: getQueryData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(result.current).toStrictEqual(response);
        });
      });
      describe(`${name}: setQueryData, refetchQueries, removeQueries`, () => {
        const wrapper = createWrapper();
        it(`${name}: setQueryData`, async () => {
          renderHook(
            () =>
              useQueryClient().setQueryData(q().queryKey, (data) => {
                expect(data).toBe(undefined);
                return response;
              }),
            wrapper,
          );
          const { result: getQueryData } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(getQueryData.current).toStrictEqual(response);
        });
        it(`${name}: refetchQueries`, async () => {
          const { result: refetchQueries } = renderHook(
            () => useQueryClient().refetchQueries({ queryKey: q().queryKey }),
            wrapper,
          );
          await waitFor(() => refetchQueries.current);
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(result.current).toStrictEqual(response);
        });
        it(`${name}: removeQueries`, async () => {
          const { result: getQueryData } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(getQueryData.current).toStrictEqual(response);
          renderHook(
            () => useQueryClient().removeQueries({ queryKey: q().queryKey }),
            wrapper,
          );
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q().queryKey),
            wrapper,
          );
          expect(result.current).toBe(undefined);
        });
      });
      it(`${name}: fetchQuery`, async () => {
        const wrapper = createWrapper();
        const { result: fetchQuery } = renderHook(
          () => useQueryClient().fetchQuery(q()),
          wrapper,
        );
        await waitFor(() => fetchQuery.current);
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q().queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual(response);
      });
      it(`${name}: ensureQueryData`, async () => {
        const wrapper = createWrapper();
        const { result: fetchQuery } = renderHook(
          () => useQueryClient().ensureQueryData(q()),
          wrapper,
        );
        await waitFor(() => fetchQuery.current);
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q().queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual(response);
      });
    });
  });
  mutations.forEach(([m, { name, input, response, mutationKey }]) => {
    describe(`${name}: mutation`, () => {
      it(`${name}: useMutation, useMutationStuff, onMutate, onSuccess, onSettled, onError`, async () => {
        const onMutate = vi.fn(() => void 0);
        const onError = vi.fn(() => void 0);
        const onSuccess = vi.fn(() => void 0);
        const onSettled = vi.fn(() => void 0);
        const wrapper = createWrapper();
        const { result: mutation } = renderHook(
          () => useMutation(m({ onMutate, onSuccess, onError, onSettled })),
          wrapper,
        );
        mutation.current.mutate(input);
        const ctx: unknown[] = mutationKey.filter((x) => typeof x === "object");
        const variables = {
          ctx: Object.assign({}, ...ctx),
          input,
        };
        if (!input) delete variables.input;
        const { result: mutationState1, rerender } = renderHook(
          () =>
            useMutationStuff({
              filters: {
                mutationKey: m().mutationKey satisfies typeof mutationKey,
                status: "pending",
              },
              select: (mutation) => [
                mutation.state.variables,
                mutation.state.data,
              ],
            }),
          wrapper,
        );
        expect(mutationState1.current).toStrictEqual([[input, undefined]]);
        await waitFor(() => expect(mutation.current.isSuccess).toBe(true));
        expect(mutation.current.data).toStrictEqual(response);
        rerender();
        expect(mutationState1.current).toStrictEqual([]);
        const { result: mutationState2 } = renderHook(
          () =>
            useMutationStuff({
              filters: {
                mutationKey: m().mutationKey satisfies typeof mutationKey,
                status: "success",
              },
              select: (mutation) => [
                mutation.state.variables,
                mutation.state.data,
              ],
            }),
          wrapper,
        );
        expect(mutationState2.current).toStrictEqual([[input, response]]);
        expect(onMutate).toHaveBeenCalledTimes(1);
        expect(onMutate).toHaveBeenCalledWith(variables);
        expect(onError).toHaveBeenCalledTimes(0);
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledWith(response, variables, undefined);
        expect(onSettled).toHaveBeenCalledTimes(1);
        expect(onSettled).toHaveBeenCalledWith(
          response,
          null,
          variables,
          undefined,
        );
      });
      it(`${name}: useMutation Error, useMutationStuff,  onMutate, onSuccess, onSettled, onError`, async () => {
        const onMutate = vi.fn(() => void 0);
        const onError = vi.fn(() => void 0);
        const onSuccess = vi.fn(() => void 0);
        const onSettled = vi.fn(() => void 0);
        const wrapper = createWrapper();
        const { result: mutation } = renderHook(
          () =>
            useMutation({
              ...m({ onMutate, onSuccess, onError, onSettled }),
              mutationFn: () => {
                throw new Error("error");
              },
            }),
          wrapper,
        );
        mutation.current.mutate(input);
        const ctx: unknown[] = mutationKey.filter((x) => typeof x === "object");
        const variables = {
          ctx: Object.assign({}, ...ctx),
          input,
        };
        if (!input) delete variables.input;
        const { result: mutationState1, rerender } = renderHook(
          () =>
            useMutationStuff({
              filters: {
                mutationKey: m().mutationKey satisfies typeof mutationKey,
                status: "pending",
              },
              select: (mutation) => [
                mutation.state.variables,
                mutation.state.data,
              ],
            }),
          wrapper,
        );
        expect(mutationState1.current).toStrictEqual([[input, undefined]]);
        await waitFor(() => expect(mutation.current.isError).toBe(true));
        expect(mutation.current.data).toStrictEqual(undefined);
        rerender();
        expect(mutationState1.current).toStrictEqual([]);
        const { result: mutationState2 } = renderHook(
          () =>
            useMutationStuff({
              filters: {
                mutationKey: m().mutationKey satisfies typeof mutationKey,
                status: "error",
              },
              select: (mutation) => [
                mutation.state.variables,
                mutation.state.data,
              ],
            }),
          wrapper,
        );
        expect(mutationState2.current).toStrictEqual([[input, undefined]]);
        expect(onMutate).toHaveBeenCalledTimes(1);
        expect(onMutate).toHaveBeenCalledWith(variables);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(
          Error("error"),
          variables,
          undefined,
        );
        expect(onSuccess).toHaveBeenCalledTimes(0);
        expect(onSettled).toHaveBeenCalledTimes(1);
        expect(onSettled).toHaveBeenCalledWith(
          undefined,
          Error("error"),
          variables,
          undefined,
        );
      });
    });
  });
  keys.forEach(([k, { name, key }]) => {
    it(`${name}: key`, () => {
      expect(k._key).toStrictEqual(key);
    });
  });
});

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

const queries = [
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

const mutations = [
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

const keys = [
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
