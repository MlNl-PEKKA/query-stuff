import {
  DefaultError,
  Mutation,
  MutationFilters,
  MutationKey,
  MutationState,
  OmitKeyof,
  QueryClient,
  useMutationState,
} from "@tanstack/react-query";
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
    options as MutationStateOptions<TResult>,
    queryClient,
  );
};
