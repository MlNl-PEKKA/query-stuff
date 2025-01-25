// @vitest-environment jsdom
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { renderHook as rH, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { queries } from "./fixtures.ts";

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

const renderHook = <T,>(
  fn: () => T,
  wrapper: ReturnType<typeof createWrapper> = createWrapper(),
) => rH<T, unknown>(fn, { wrapper });

describe(`QueryStuff hooks`, () => {
  queries.forEach(([q, { name, response, queryKey }]) => {
    describe(`${name}: query`, () => {
      describe(`${name}: useQuery, getQueryData, getQueriesData`, () => {
        const wrapper = createWrapper();
        it(`${name}: useQuery`, async () => {
          const { result: query } = renderHook(() => useQuery(q), wrapper);
          await waitFor(() => expect(query.current.isSuccess).toBe(true));
          expect(query.current.data).toStrictEqual(response);
        });
        it(`${name}: getQueryData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
            wrapper,
          );
          expect(result.current).toStrictEqual(response);
        });
        it(`${name}: getQueriesData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueriesData({ queryKey: q.queryKey }),
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
                queries: [q],
              }),
            wrapper,
          );
          await waitFor(() => expect(query.current[0].isSuccess).toBe(true));
          expect(query.current[0].data).toStrictEqual(response);
        });
        it(`${name}: getQueryData`, async () => {
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
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
              useQueryClient().setQueryData(q.queryKey, (data) => {
                expect(data).toBe(undefined);
                return response;
              }),
            wrapper,
          );
          const { result: getQueryData } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
            wrapper,
          );
          expect(getQueryData.current).toStrictEqual(response);
        });
        it(`${name}: refetchQueries`, async () => {
          const { result: refetchQueries } = renderHook(
            () => useQueryClient().refetchQueries({ queryKey: q.queryKey }),
            wrapper,
          );
          await waitFor(() => expect(refetchQueries.current).resolves);
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
            wrapper,
          );
          expect(result.current).toStrictEqual(response);
        });
        it(`${name}: removeQueries`, async () => {
          const { result: getQueryData } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
            wrapper,
          );
          expect(getQueryData.current).toStrictEqual(response);
          renderHook(
            () => useQueryClient().removeQueries({ queryKey: q.queryKey }),
            wrapper,
          );
          const { result } = renderHook(
            () => useQueryClient().getQueryData(q.queryKey),
            wrapper,
          );
          expect(result.current).toBe(undefined);
        });
      });
      it(`${name}: fetchQuery`, async () => {
        const wrapper = createWrapper();
        const { result: fetchQuery } = renderHook(
          () => useQueryClient().fetchQuery(q),
          wrapper,
        );
        await waitFor(() => expect(fetchQuery.current).resolves);
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual(response);
      });
      it(`${name}: ensureQueryData`, async () => {
        const wrapper = createWrapper();
        const { result: fetchQuery } = renderHook(
          () => useQueryClient().ensureQueryData(q),
          wrapper,
        );
        await waitFor(() => expect(fetchQuery.current).resolves);
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual(response);
      });
    });
  });
});
