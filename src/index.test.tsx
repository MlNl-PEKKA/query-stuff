// @vitest-environment jsdom
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { renderHook as rH, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { useExactMutationState } from "./index.js";
import { keys, mutations, queries } from "./fixtures.js";

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
  queries().forEach(([q, { name, response, queryKey }]) => {
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
  mutations().forEach(
    ([m, { name, input, response, mutationKey, ctx: innerCtx }]) => {
      describe(`${name}: mutation`, () => {
        it(`${name}: useMutation, useExactMutationState, onMutate, onSuccess, onSettled, onError`, async () => {
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
              ...(innerCtx as typeof ctx),
            };
          if (!input) delete variables.input;
          const { result: mutationState1, rerender } = renderHook(
            () =>
              useExactMutationState({
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
              useExactMutationState({
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
        it(`${name}: useMutation Error, useExactMutationState,  onMutate, onSuccess, onSettled, onError`, async () => {
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
            variables.ctx = { ...variables.ctx, ...(innerCtx as typeof ctx) };
          if (!input) delete variables.input;
          const { result: mutationState1, rerender } = renderHook(
            () =>
              useExactMutationState({
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
              useExactMutationState({
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
  keys().forEach(([k, { name, key }]) => {
    it(`${name}: key`, () => {
      expect(k["~key"]).toStrictEqual(key);
    });
  });
});
