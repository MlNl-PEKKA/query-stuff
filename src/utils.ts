import {
  mutationNode,
  queryNodeWithInput,
  queryNodeWithoutInput,
} from "./symbols.js";
import type {
  Node,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  QMutationOptionsOut,
  QQueryOptionsOut,
} from "./types.js";

export const isString = (p: string | symbol): p is string => {
  return typeof p === "string";
};

export const isNodeObject = (target: unknown): target is Node => {
  return target !== null && typeof target === "object";
};

export const isQueryNodeWithoutInput = (
  target: unknown,
): target is QQueryOptionsOut => {
  return isNodeObject(target) && queryNodeWithoutInput in target;
};

export const isQueryNodeWithInput = (
  target: unknown,
): target is QQueryOptionsOut => {
  return isNodeObject(target) && queryNodeWithInput in target;
};

export const isQueryNode = (target: unknown): target is QQueryOptionsOut => {
  return (
    isNodeObject(target) &&
    (isQueryNodeWithInput(target) || isQueryNodeWithoutInput(target))
  );
};

export const isMutationNode = (
  target: unknown,
): target is QMutationOptionsOut => {
  return isNodeObject(target) && mutationNode in target;
};

export const isNodeFunction = (
  target: unknown,
): target is (
  ...input: unknown[]
) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut => {
  return target !== null && typeof target === "function";
};

export const isNode = (
  target:
    | undefined
    | Node
    | QAnyQueryOptionsOut
    | QAnyMutationOptionsOut
    | ((
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut),
): target is Node => {
  return (
    isQueryNode(target) ||
    isMutationNode(target) ||
    isNodeFunction(target) ||
    isNodeObject(target)
  );
};
