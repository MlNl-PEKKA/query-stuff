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
import { inputSymbol, useMutationState } from "./index.js";
import {
  ProxyKeyNode,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  UnknownRecord,
} from "./types.js";
import { QUERY_FACTORY } from "./fixtures.js";

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
  mutations.forEach(
    ([m, { name, input, response, mutationKey, ctx: innerCtx }]) => {
      describe(`${name}: mutation`, () => {
        it(`${name}: useMutation, useMutationState, onMutate, onSuccess, onSettled, onError`, async () => {
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
          const ctx: unknown[] = mutationKey.filter(
            (x) => typeof x === "object",
          );
          const variables = {
            ctx: Object.assign({}, ...ctx),
            input,
          };
          if (innerCtx)
            variables.ctx = {
              ...variables.ctx,
              ...(innerCtx as any),
            };
          if (!input) delete variables.input;
          const { result: mutationState1, rerender } = renderHook(
            () =>
              useMutationState({
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
              useMutationState({
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
          expect(onSuccess).toHaveBeenCalledWith(
            response,
            variables,
            undefined,
          );
          expect(onSettled).toHaveBeenCalledTimes(1);
          expect(onSettled).toHaveBeenCalledWith(
            response,
            null,
            variables,
            undefined,
          );
        });
        it(`${name}: useMutation Error, useMutationState,  onMutate, onSuccess, onSettled, onError`, async () => {
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
          const ctx: unknown[] = mutationKey.filter(
            (x) => typeof x === "object",
          );
          const variables = {
            ctx: Object.assign({}, ...ctx),
            input,
          };
          if (innerCtx)
            variables.ctx = { ...variables.ctx, ...(innerCtx as any) };
          if (!input) delete variables.input;
          const { result: mutationState1, rerender } = renderHook(
            () =>
              useMutationState({
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
              useMutationState({
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
    },
  );
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
    QUERY_FACTORY.query,
    {
      name: "query",
      response: { query: true },
      queryKey: ["query"],
    },
  ],
] as const satisfies Queries;

const queries = [
  ...baseQuery,
  [
    () => QUERY_FACTORY.inputQuery({ inputQuery: true }),
    {
      name: "inputQuery",
      response: { inputQuery: true, query: true },
      queryKey: ["inputQuery", { [inputSymbol]: { inputQuery: true } }],
    },
  ],
  [
    QUERY_FACTORY.contextQuery,
    {
      name: "contextQuery",
      response: { query: true, contextQuery: true },
      queryKey: ["contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.context().query,
    {
      name: "context.query",
      response: { context: true, query: true },
      queryKey: ["context", "query"],
    },
  ],
  [
    () => QUERY_FACTORY.context().inputQuery({ inputQuery: true }),
    {
      name: "context.inputQuery",
      response: { context: true, inputQuery: true, query: true },
      queryKey: [
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.context().contextQuery,
    {
      name: "context.contextQuery",
      response: { context: true, query: true, contextQuery: true },
      queryKey: ["context", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT().query,
    {
      name: "context.CONTEXT.query",
      response: { context: true, CONTEXT: true, query: true },
      queryKey: ["context", "CONTEXT", "query"],
    },
  ],
  [
    () => QUERY_FACTORY.context().CONTEXT().inputQuery({ inputQuery: true }),
    {
      name: "context.CONTEXT.inputQuery",
      response: { context: true, CONTEXT: true, inputQuery: true, query: true },
      queryKey: [
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT().contextQuery,
    {
      name: "context.CONTEXT.contextQuery",
      response: {
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: ["context", "CONTEXT", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).query,
    {
      name: "module.query",
      response: { module: true, query: true },
      queryKey: ["module", { module: true }, "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true }).inputQuery({ inputQuery: true }),
    {
      name: "module.inputQuery",
      response: { module: true, inputQuery: true, query: true },
      queryKey: [
        "module",
        { module: true },
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).contextQuery,
    {
      name: "module.contextQuery",
      response: { module: true, query: true, contextQuery: true },
      queryKey: ["module", { module: true }, "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().query,
    {
      name: "module.context.query",
      response: { module: true, context: true, query: true },
      queryKey: ["module", { module: true }, "context", "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .context()
        .inputQuery({ inputQuery: true }),
    {
      name: "module.context.inputQuery",
      response: { module: true, context: true, inputQuery: true, query: true },
      queryKey: [
        "module",
        { module: true },
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().contextQuery,
    {
      name: "module.context.contextQuery",
      response: {
        module: true,
        context: true,
        query: true,
        contextQuery: true,
      },
      queryKey: ["module", { module: true }, "context", "contextQuery"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT().query,
    {
      name: "module.context.CONTEXT.query",
      response: { module: true, context: true, CONTEXT: true, query: true },
      queryKey: ["module", { module: true }, "context", "CONTEXT", "query"],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .context()
        .CONTEXT()
        .inputQuery({ inputQuery: true }),
    {
      name: "module.context.CONTEXT.inputQuery",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT().contextQuery,
    {
      name: "module.context.CONTEXT.contextQuery",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).query,
    {
      name: "module.MODULE.query",
      response: {
        MODULE: true,
        module: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.inputQuery",
      response: {
        MODULE: true,
        module: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .contextQuery,
    {
      name: "module.MODULE.contextQuery",
      response: {
        MODULE: true,
        module: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context()
      .query,
    {
      name: "module.MODULE.context.query",
      response: {
        MODULE: true,
        module: true,
        context: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .context()
        .inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.context.inputQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context()
      .contextQuery,
    {
      name: "module.MODULE.context.contextQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "contextQuery",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT().query,
    {
      name: "module.MODULE.context.CONTEXT.query",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "query",
      ],
    },
  ],
  [
    () =>
      QUERY_FACTORY.module({ module: true })
        .MODULE({ MODULE: true })
        .context()
        .CONTEXT()
        .inputQuery({ inputQuery: true }),
    {
      name: "module.MODULE.context.CONTEXT.inputQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        inputQuery: true,
        query: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "inputQuery",
        { [inputSymbol]: { inputQuery: true } },
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT().contextQuery,
    {
      name: "module.MODULE.context.CONTEXT.contextQuery",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        query: true,
        contextQuery: true,
      },
      queryKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "contextQuery",
      ],
    },
  ],
] satisfies Queries as unknown as typeof baseQuery;

type Mutations = [
  (...input: any[]) => QAnyMutationOptionsOut,
  {
    name: string;
    input: undefined | UnknownRecord;
    ctx: undefined | UnknownRecord;
    response: UnknownRecord;
    mutationKey: MutationKey;
  },
][];

const baseMutation = [
  [
    QUERY_FACTORY.mutation,
    {
      name: "mutation",
      input: undefined,
      ctx: undefined,
      response: { mutation: true },
      mutationKey: ["mutation"],
    },
  ],
] as const satisfies Mutations;

const mutations = [
  ...baseMutation,
  [
    QUERY_FACTORY.inputMutation,
    {
      name: "inputMutation",
      input: { inputMutation: true },
      ctx: undefined,
      response: {
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.contextMutation,
    {
      name: "contextMutation",
      ctx: {
        contextMutation: true,
      },
      input: undefined,
      response: {
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.context().mutation,
    {
      name: "context.mutation",
      input: undefined,
      ctx: {
        context: true,
      },
      response: {
        context: true,
        mutation: true,
      },
      mutationKey: ["context", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.context().inputMutation,
    {
      name: "context.inputMutation",
      input: { inputMutation: true },
      ctx: {
        context: true,
      },
      response: {
        context: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["context", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.context().contextMutation,
    {
      name: "context.contextMutation",
      input: undefined,
      ctx: {
        context: true,
        contextMutation: true,
      },
      response: {
        context: true,
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["context", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT().mutation,
    {
      name: "context.CONTEXT.mutation",
      input: undefined,
      ctx: {
        context: true,
        CONTEXT: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      mutationKey: ["context", "CONTEXT", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT().inputMutation,
    {
      name: "context.CONTEXT.inputMutation",
      input: { inputMutation: true },
      ctx: {
        context: true,
        CONTEXT: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["context", "CONTEXT", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT().contextMutation,
    {
      name: "context.CONTEXT.contextMutation",
      ctx: {
        context: true,
        CONTEXT: true,
        contextMutation: true,
      },
      response: {
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      mutationKey: ["context", "CONTEXT", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).mutation,
    {
      name: "module.mutation",
      input: undefined,
      ctx: undefined,
      response: {
        module: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "mutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).inputMutation,
    {
      name: "module.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: undefined,
      response: {
        module: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).contextMutation,
    {
      name: "module.contextMutation",
      input: undefined,
      ctx: {
        contextMutation: true,
      },
      response: {
        module: true,
        mutation: true,
        contextMutation: true,
      },
      mutationKey: ["module", { module: true }, "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().mutation,
    {
      name: "module.context.mutation",
      input: undefined,
      ctx: { context: true },
      response: {
        module: true,
        context: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "mutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().inputMutation,
    {
      name: "module.context.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: { context: true },
      response: {
        module: true,
        context: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "inputMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().contextMutation,
    {
      name: "module.context.contextMutation",
      input: undefined,
      ctx: { context: true, contextMutation: true },
      response: {
        module: true,
        context: true,
        contextMutation: true,
        mutation: true,
      },
      mutationKey: ["module", { module: true }, "context", "contextMutation"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT().mutation,
    {
      name: "module.context.CONTEXT.mutation",
      input: undefined,
      ctx: { context: true, CONTEXT: true },
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT().inputMutation,
    {
      name: "module.context.CONTEXT.inputMutation",
      input: {
        inputMutation: true,
      },
      ctx: { context: true, CONTEXT: true },
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT().contextMutation,
    {
      name: "module.context.CONTEXT.contextMutation",
      response: {
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true, contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "context",
        "CONTEXT",
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).mutation,
    {
      name: "module.MODULE.mutation",
      response: {
        MODULE: true,
        module: true,
        mutation: true,
      },
      input: undefined,
      ctx: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .inputMutation,
    {
      name: "module.MODULE.inputMutation",
      response: {
        MODULE: true,
        module: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true })
      .contextMutation,
    {
      name: "module.MODULE.contextMutation",
      response: {
        MODULE: true,
        module: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context()
      .mutation,
    {
      name: "module.MODULE.context.mutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        mutation: true,
      },
      input: undefined,
      ctx: { context: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context()
      .inputMutation,
    {
      name: "module.MODULE.context.inputMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: { context: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context()
      .contextMutation,
    {
      name: "module.MODULE.context.contextMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        mutation: true,
        contextMutation: true,
      },
      ctx: { context: true, contextMutation: true },
      input: undefined,
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "contextMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT().mutation,
    {
      name: "module.MODULE.context.CONTEXT.mutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "mutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT().inputMutation,
    {
      name: "module.MODULE.context.CONTEXT.inputMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        inputMutation: true,
        mutation: true,
      },
      input: {
        inputMutation: true,
      },
      ctx: { context: true, CONTEXT: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "inputMutation",
      ],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT().contextMutation,
    {
      name: "module.MODULE.context.CONTEXT.contextMutation",
      response: {
        MODULE: true,
        module: true,
        context: true,
        CONTEXT: true,
        mutation: true,
        contextMutation: true,
      },
      input: undefined,
      ctx: { context: true, CONTEXT: true, contextMutation: true },
      mutationKey: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
        "contextMutation",
      ],
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
    QUERY_FACTORY.context(),
    {
      name: "context",
      key: ["context"],
    },
  ],
  [
    QUERY_FACTORY.context().CONTEXT(),
    {
      name: "context.CONTEXT",
      key: ["context", "CONTEXT"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }),
    {
      name: "module",
      key: ["module", { module: true }],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context(),
    {
      name: "module.context",
      key: ["module", { module: true }, "context"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).context().CONTEXT(),
    {
      name: "module.context.CONTEXT",
      key: ["module", { module: true }, "context", "CONTEXT"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }),
    {
      name: "module.MODULE",
      key: ["module", { module: true }, "MODULE", { MODULE: true }],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true }).MODULE({ MODULE: true }).context(),
    {
      name: "module.MODULE.context",
      key: ["module", { module: true }, "MODULE", { MODULE: true }, "context"],
    },
  ],
  [
    QUERY_FACTORY.module({ module: true })
      .MODULE({ MODULE: true })
      .context()
      .CONTEXT(),
    {
      name: "module.MODULE.context.CONTEXT",
      key: [
        "module",
        { module: true },
        "MODULE",
        { MODULE: true },
        "context",
        "CONTEXT",
      ],
    },
  ],
] satisfies Keys;
