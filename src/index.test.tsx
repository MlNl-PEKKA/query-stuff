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
import { describe, expect } from "vitest";
import { queryStuffTest } from "./fixtures.js";

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

describe("QueryStuff hooks", () => {
  describe("q.a: query", () => {
    describe("q.a: useQuery, getQueryData, getQueriesData", () => {
      const wrapper = createWrapper();
      queryStuffTest("q.a: useQuery", async ({ q }) => {
        const { result: query } = renderHook(() => useQuery(q.a()), wrapper);
        await waitFor(() => expect(query.current.isSuccess).toBe(true));
        expect(query.current.data).toStrictEqual({ a: 1 });
      });
      queryStuffTest("q.a: getQueryData", async ({ q }) => {
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual({ a: 1 });
      });
      queryStuffTest("q.a: getQueriesData", async ({ q }) => {
        const { result } = renderHook(
          () => useQueryClient().getQueriesData({ queryKey: q.a().queryKey }),
          wrapper,
        );
        expect(result.current).toStrictEqual([[["a"], { a: 1 }]]);
      });
    });
    describe("q.a: useQueries, getQueryData", () => {
      const wrapper = createWrapper();
      queryStuffTest("q.a: useQueries", async ({ q }) => {
        const { result: query } = renderHook(
          () =>
            useQueries({
              queries: [q.a()],
            }),
          wrapper,
        );
        await waitFor(() => expect(query.current[0].isSuccess).toBe(true));
        expect(query.current[0].data).toStrictEqual({ a: 1 });
      });
      queryStuffTest("q.a: getQueryData", async ({ q }) => {
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual({ a: 1 });
      });
    });
    describe("q.a: setQueryData, refetchQueries, removeQueries", () => {
      const wrapper = createWrapper();
      queryStuffTest("q.a: setQueryData", async ({ q }) => {
        renderHook(
          () =>
            useQueryClient().setQueryData(q.a().queryKey, (data) => {
              expect(data).toBe(undefined);
              return { a: 1 };
            }),
          wrapper,
        );
        const { result: getQueryData } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(getQueryData.current).toStrictEqual({ a: 1 });
      });
      queryStuffTest("q.a: refetchQueries", async ({ q }) => {
        const { result: refetchQueries } = renderHook(
          () => useQueryClient().refetchQueries({ queryKey: q.a().queryKey }),
          wrapper,
        );
        await waitFor(() => expect(refetchQueries.current).resolves);
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(result.current).toStrictEqual({ a: 1 });
      });
      queryStuffTest("q.a: removeQueries", async ({ q }) => {
        const { result: getQueryData } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(getQueryData.current).toStrictEqual({ a: 1 });
        renderHook(
          () => useQueryClient().removeQueries({ queryKey: q.a().queryKey }),
          wrapper,
        );
        const { result } = renderHook(
          () => useQueryClient().getQueryData(q.a().queryKey),
          wrapper,
        );
        expect(result.current).toBe(undefined);
      });
    });
    queryStuffTest("q.a: fetchQuery", async ({ q }) => {
      const wrapper = createWrapper();
      const { result: fetchQuery } = renderHook(
        () => useQueryClient().fetchQuery(q.a()),
        wrapper,
      );
      await waitFor(() => expect(fetchQuery.current).resolves);
      const { result } = renderHook(
        () => useQueryClient().getQueryData(q.a().queryKey),
        wrapper,
      );
      expect(result.current).toStrictEqual({ a: 1 });
    });
    queryStuffTest("q.a: ensureQueryData", async ({ q }) => {
      const wrapper = createWrapper();
      const { result: fetchQuery } = renderHook(
        () => useQueryClient().ensureQueryData(q.a()),
        wrapper,
      );
      await waitFor(() => expect(fetchQuery.current).resolves);
      const { result } = renderHook(
        () => useQueryClient().getQueryData(q.a().queryKey),
        wrapper,
      );
      expect(result.current).toStrictEqual({ a: 1 });
    });
  });
});
