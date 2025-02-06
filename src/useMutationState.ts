import type {
  DefaultError,
  Mutation,
  MutationFilters,
  MutationKey,
  MutationState,
  OmitKeyof,
  QueryClient,
} from "@tanstack/react-query";
import { useMutationState as useDefaultMutationState } from "@tanstack/react-query";
import { MutationKeyTag } from "./types.js";

type DefaultMutationStateOptions<TResult = MutationState> = {
  filters?: MutationFilters;
  select?: (mutation: Mutation) => TResult;
};

type MutationStateOptions<
  TTMutationKey extends MutationKey = MutationKey,
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
  TResult = MutationState,
> = {
  filters: OmitKeyof<
    MutationFilters<TData, TError, TVariables, TContext>,
    "mutationKey" | "exact"
  > &
    MutationKeyTag<TTMutationKey, TData, TError, TVariables, TContext>;
  select?: (mutation: Mutation<TData, TError, TVariables, TContext>) => TResult;
};

export const useMutationState = <
  TTMutationKey extends MutationKey = MutationKey,
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
  TResult = MutationState,
>(
  options: MutationStateOptions<
    TTMutationKey,
    TData,
    TError,
    TVariables,
    TContext,
    TResult
  >,
  queryClient?: QueryClient,
) => {
  return useDefaultMutationState<TResult>(
    {
      ...options,
      filters: {
        ...options.filters,
        exact: true,
      },
    } as DefaultMutationStateOptions<TResult>,
    queryClient,
  );
};
