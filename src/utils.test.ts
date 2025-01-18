import { describe } from "node:test";
import { expect, expectTypeOf, it } from "vitest";
import {
  mutationNode,
  queryNodeWithInput,
  queryNodeWithoutInput,
} from "./symbols.js";
import {
  Node,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  QMutationOptionsOut,
  QQueryOptionsOut,
} from "./types.js";
import {
  isMutationNode,
  isNode,
  isNodeFunction,
  isNodeObject,
  isQueryNode,
  isQueryNodeWithInput,
  isQueryNodeWithoutInput,
  isString,
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
      expect(isString(queryNodeWithoutInput)).toBe(false);
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
      if (value) expectTypeOf(target).toEqualTypeOf<Node>();
    });
  });
  describe("isQueryNodeWithoutInput", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeWithoutInput()).toBe(false);
    });
    it("returns false for objects without the queryNodeWithoutInput symbol", () => {
      expect(isQueryNodeWithoutInput({})).toBe(false);
    });
    it("returns true and asserts target type as QQueryOptionsOut", () => {
      const target: unknown = { [queryNodeWithoutInput]: null };
      const value = isQueryNodeWithoutInput(target);
      expect(value).toBe(true);
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
  });
  describe("isQueryNodeWithInput", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeWithInput()).toBe(false);
    });
    it("returns false for objects without the queryNodeWithInput symbol", () => {
      expect(isQueryNodeWithInput({})).toBe(false);
    });
    it("returns true and asserts target type as QQueryOptionsOut", () => {
      const target: unknown = { [queryNodeWithInput]: null };
      const value = isQueryNodeWithInput(target);
      expect(value).toBe(true);
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
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
      const target: unknown = { [queryNodeWithoutInput]: null };
      const value = isQueryNode(target);
      expect(value).toBe(true);
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
    it("returns true and asserts target type as QQueryOptionsOut for queryNodeWithInput symbol", () => {
      const target: unknown = { [queryNodeWithInput]: null };
      const value = isQueryNode(target);
      expect(value).toBe(true);
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
  });
  describe("isMutationNode", () => {
    it("returns false for no input", () => {
      //@ts-expect-error
      expect(isMutationNode()).toBe(false);
    });
    it("returns false for objects without the mutationNode symbol", () => {
      expect(isMutationNode({})).toBe(false);
    });
    it("returns true and asserts type QQueryOptionsOut, for objects with the mutationNode symbol", () => {
      const target: unknown = { [mutationNode]: null };
      const value = isMutationNode(target);
      expect(value).toBe(true);
      if (value) {
        expectTypeOf(target).toEqualTypeOf<QMutationOptionsOut>();
      }
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
      if (value)
        expectTypeOf(target).toEqualTypeOf<
          (
            ...input: unknown[]
          ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut
        >();
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
      if (value) expectTypeOf(target).toEqualTypeOf<Node>();
    });
    it("returns true and asserts target type as Node for queryNodeWithoutInput symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [queryNodeWithoutInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
    it("returns true and asserts target type as Node for queryNodeWithInput symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [queryNodeWithInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
    it("returns true and asserts target type as Node for mutationNode symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [mutationNode]: null,
        mutationKey: [],
      } satisfies QAnyMutationOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
    it("returns true and asserts target type as Node for node function i.e (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut", () => {
      const target: Parameters<typeof isNode>[0] = (() => ({})) satisfies (
        ...input: any[]
      ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
  });
});
