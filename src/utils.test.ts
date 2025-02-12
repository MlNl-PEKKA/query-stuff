import { describe, expect, it } from "vitest";
import {
  defined_queries,
  keys,
  mutations,
  objectKeys,
  queries,
  undefined_queries,
} from "./fixtures.js";
import {
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
} from "./symbols.js";
import { Node, QAnyMutationOptionsOut, QAnyQueryOptionsOut } from "./types.js";
import {
  isMutationNode,
  isNode,
  isNodeFunction,
  isNodeObject,
  isQueryNode,
  isQueryNodeDefinedInput,
  isQueryNodeUndefinedInput,
  isString,
  mutationOptions,
} from "./utils.js";

describe("utils", () => {
  describe("isString", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isString()).toBe(false);
    });
    it("returns false for non-string or symbol inputs", () => {
      //@ts-expect-error
      expect(isString(1)).toBe(false);
    });
    it("returns true for any string", () => {
      expect(isString("")).toBe(true);
    });
  });

  describe("isNodeObject", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isNodeObject()).toBe(false);
    });
    it("returns false for non-object inputs", () => {
      expect(isNodeObject(1)).toBe(false);
    });
    it("returns true and asserts target type as Node Object", () => {
      const target: unknown = {};
      const value = isNodeObject(target);
      expect(value).toBe(true);
    });
    it("returns true for nodes and asserts target type as Node Object", () => {
      objectKeys().forEach((target) => {
        const value = isNodeObject(target[0]);
        expect(value).toBe(true);
      });
    });
  });

  describe("isQueryNodeUndefinedInput", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeUndefinedInput()).toBe(false);
    });
    it("returns false for objects without the queryNodeWithoutInput symbol", () => {
      expect(isQueryNodeUndefinedInput({})).toBe(false);
    });
    it("returns true and asserts target type as QQueryOptionsOut", () => {
      const target: unknown = { [queryNodeUndefinedInput]: null };
      const value = isQueryNodeUndefinedInput(target);
      expect(value).toBe(true);
    });
    it("returns true for QueryNodeUndefinedInput and asserts target type as QQueryOptionsOut", () => {
      undefined_queries().forEach((target) => {
        const value = isQueryNodeUndefinedInput(target[0]());
        expect(value).toBe(true);
      });
    });
  });

  describe("isQueryNodeDefinedInput", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeDefinedInput()).toBe(false);
    });
    it("returns false for objects without the queryNodeWithInput symbol", () => {
      expect(isQueryNodeDefinedInput({})).toBe(false);
    });
    it("returns true and asserts target type as QQueryOptionsOut", () => {
      const target: unknown = { [queryNodeDefinedInput]: null };
      const value = isQueryNodeDefinedInput(target);
      expect(value).toBe(true);
    });
    it("returns true for QueryNodeDefinedInput and asserts target type as QQueryOptionsOut", () => {
      defined_queries().forEach((target) => {
        const value = isQueryNodeDefinedInput(target[0]());
        expect(value).toBe(true);
      });
    });
  });

  describe("isQueryNode", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNode()).toBe(false);
    });
    it("returns false for objects without the queryNodeWithoutInput/queryNodeWithInput symbol", () => {
      expect(isQueryNode({})).toBe(false);
    });
    it("returns true and asserts target type as QQueryOptionsOut for queryNodeWithoutInput symbol", () => {
      const target: unknown = { [queryNodeUndefinedInput]: null };
      const value = isQueryNode(target);
      expect(value).toBe(true);
    });
    it("returns true and asserts target type as QQueryOptionsOut for queryNodeWithInput symbol", () => {
      const target: unknown = { [queryNodeDefinedInput]: null };
      const value = isQueryNode(target);
      expect(value).toBe(true);
    });
    it("returns true for QueryNode and asserts target type as QQueryOptionsOut", () => {
      queries().forEach((target) => {
        const value = isQueryNode(target[0]());
        expect(value).toBe(true);
      });
    });
  });

  describe("isMutationNode", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isMutationNode()).toBe(false);
    });
    it("returns false for objects without the [mutationNode] symbol", () => {
      expect(isMutationNode({})).toBe(false);
    });
    it("returns true and asserts type QQueryOptionsOut, for objects with the [mutationNode] symbol", () => {
      const target: unknown = { [mutationNode]: null };
      const value = isMutationNode(target);
      expect(value).toBe(true);
    });
    it("returns true for [mutationNode] and asserts type QQueryOptionsOut, for objects with the [mutationNode] symbol", () => {
      mutations().forEach((target) => {
        const value = isMutationNode(target[0]());
        expect(value).toBe(true);
      });
    });
  });

  describe("isNodeFunction", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isNodeFunction()).toBe(false);
    });
    it("returns false for non functions", () => {
      expect(isNodeFunction({})).toBe(false);
    });
    it("returns true and asserts target type as node function i.e., (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut", () => {
      const target: unknown = () => {};
      const value = isNodeFunction(target);
      expect(value).toBe(true);
    });
    it("returns true for NodeFunctions and asserts target type as node function i.e., (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut", () => {
      [...queries(), ...mutations()].forEach((target) => {
        const value = isNodeFunction(target[0]);
        expect(value).toBe(true);
      });
    });
  });

  describe("isNode", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isNode()).toBe(false);
    });
    it("returns false for undefined", () => {
      expect(isNode(undefined)).toBe(false);
    });
    it("returns true and asserts target type as Node for node object", () => {
      const target: Parameters<typeof isNode>[0] = {} satisfies Node;
      const value = isNode(target);
      expect(value).toBe(true);
    });
    it("returns true and asserts target type as Node for queryNodeWithoutInput symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [queryNodeUndefinedInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
    });
    it("returns true and asserts target type as Node for queryNodeWithInput symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [queryNodeDefinedInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
    });
    it("returns true and asserts target type as Node for [mutationNode] symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        ...mutationOptions({
          mutationKey: [],
        }),
        [mutationNode]: null,
      } satisfies QAnyMutationOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
    });
    it("returns true and asserts target type as Node for node function i.e (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut", () => {
      const target: Parameters<typeof isNode>[0] = (() => ({})) satisfies (
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
    });
    it("returns true for Nodes and asserts target type as Node", () => {
      [...queries(), ...mutations(), ...keys()].forEach((target) => {
        expect(isNode(target[0] as unknown as Node)).toBe(true);
      });
      [...queries(), ...mutations()].forEach((target) => {
        expect(isNode(target[0]())).toBe(true);
      });
    });
  });
});
