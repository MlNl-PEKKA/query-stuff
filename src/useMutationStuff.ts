import type {
  DefaultError,
  Mutation,
  MutationFilters,
  MutationKey,
  MutationState,
  OmitKeyof,
  QueryClient,
} from "@tanstack/react-query";
import { useMutationState } from "@tanstack/react-query";
import { MutationKeyTag } from "./types.js";

type MutationStateOptions<TResult = MutationState> = {
  filters?: MutationFilters;
  select?: (mutation: Mutation) => TResult;
};

type MutationStuffOptions<
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

export const useMutationStuff = <
  TTMutationKey extends MutationKey = MutationKey,
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TContext = unknown,
  TResult = MutationState,
>(
  options: MutationStuffOptions<
    TTMutationKey,
    TData,
    TError,
    TVariables,
    TContext,
    TResult
  >,
  queryClient?: QueryClient,
) => {
  return useMutationState<TResult>(
    {
      ...options,
      filters: {
        ...options.filters,
        exact: true,
      },
    } as MutationStateOptions<TResult>,
    queryClient,
  );
};
