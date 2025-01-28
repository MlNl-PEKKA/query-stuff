import { QueryKey } from "@tanstack/react-query";
import type { ProxyNode, Node, UnknownRecord } from "./types.ts";
import {
  isMutationNode,
  isNode,
  isNodeFunction,
  isQueryNode,
  isQueryNodeDefinedInput,
  isQueryNodeUndefinedInput,
  isString,
} from "./utils.js";
import { inputSymbol } from "./symbols.js";

export const createProxyNode = <T extends Node>(
  node: T,
  keys: QueryKey = [],
): ProxyNode<T> => {
  return new Proxy(node, {
    get: (target, p, receiver) => {
      if (!isNodeFunction(target) && isString(p)) {
        if (p === "_key") {
          return keys;
        }
        if (isQueryNode(target)) {
          return Reflect.get({ ...target, queryKey: keys }, p, receiver);
        }
        if (isMutationNode(target)) {
          return Reflect.get({ ...target, mutationKey: keys }, p, receiver);
        }
        const nextTarget = target[p];
        const nextKeys = [...keys, p];
        if (isNode(nextTarget)) {
          return createProxyNode(nextTarget, nextKeys);
        }
      }
    },
    apply: (target, _thisArg, argArray: UnknownRecord[]) => {
      if (isNodeFunction(target)) {
        const nextTarget = target(...argArray);
        const nextKeys = [...keys];
        if (
          argArray[0] &&
          !(isMutationNode(nextTarget) || isQueryNodeUndefinedInput(nextTarget))
        ) {
          if (isQueryNodeDefinedInput(nextTarget))
            nextKeys.push({ [inputSymbol]: argArray[0] });
          else nextKeys.push(argArray[0]);
        }
        if (isNode(nextTarget)) {
          return createProxyNode(nextTarget, nextKeys);
        }
      }
    },
  }) as unknown as ProxyNode<T>;
};
