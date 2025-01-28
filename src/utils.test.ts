import { describe, expect, expectTypeOf, it } from "vitest";
import { nodes } from "./fixtures.js";
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
  isQueryNodeDefinedInput,
  isQueryNodeUndefinedInput,
  isString,
} from "./utils.js";
import {
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
} from "./symbols.js";

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
      if (value) expectTypeOf(target).toEqualTypeOf<Node>();
    });
    it("returns true for nodes and asserts target type as Node Object", () => {
      [
        nodes,
        nodes.a(),
        nodes.b(),
        nodes.c(),
        nodes.d(),
        nodes.e({ e: 5 }),
        nodes.f(),
        nodes.g.a(),
        nodes.g.b(),
        nodes.g.c(),
        nodes.g.d(),
        nodes.g.e({ e: 5 }),
        nodes.g.f(),
        nodes.h({ h: 8 }).a(),
        nodes.h({ h: 8 }).b(),
        nodes.h({ h: 8 }).c(),
        nodes.h({ h: 8 }).d(),
        nodes.h({ h: 8 }).e({ e: 5 }),
        nodes.h({ h: 8 }).f(),
      ].forEach((target: unknown) => {
        const value = isNodeObject(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<Node>();
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
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
    it("returns true for QueryNodeUndefinedInput and asserts target type as QQueryOptionsOut", () => {
      [nodes.a(), nodes.g.a(), nodes.h({ h: 8 }).a()].forEach(
        (target: unknown) => {
          const value = isQueryNodeUndefinedInput(target);
          expect(value).toBe(true);
          if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
        },
      );
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
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
    it("returns true for QueryNodeDefinedInput and asserts target type as QQueryOptionsOut", () => {
      [
        nodes.c(),
        nodes.e({ e: 5 }),
        nodes.g.c(),
        nodes.g.e({ e: 5 }),
        nodes.h({ h: 8 }).c(),
        nodes.h({ h: 8 }).e({ e: 5 }),
      ].forEach((target: unknown) => {
        const value = isQueryNodeDefinedInput(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
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
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
    it("returns true and asserts target type as QQueryOptionsOut for queryNodeWithInput symbol", () => {
      const target: unknown = { [queryNodeDefinedInput]: null };
      const value = isQueryNode(target);
      expect(value).toBe(true);
      if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
    });
    it("returns true for QueryNode and asserts target type as QQueryOptionsOut", () => {
      [
        nodes.a(),
        nodes.g.a(),
        nodes.h({ h: 8 }).a(),
        nodes.c(),
        nodes.e({ e: 5 }),
        nodes.g.c(),
        nodes.g.e({ e: 5 }),
        nodes.h({ h: 8 }).c(),
        nodes.h({ h: 8 }).e({ e: 5 }),
      ].forEach((target: unknown) => {
        const value = isQueryNode(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
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
      if (value) {
        expectTypeOf(target).toEqualTypeOf<QMutationOptionsOut>();
      }
    });
    it("returns true for [mutationNode] and asserts type QQueryOptionsOut, for objects with the [mutationNode] symbol", () => {
      [
        nodes.b(),
        nodes.d(),
        nodes.g.b(),
        nodes.g.d(),
        nodes.h({ h: 8 }).b(),
        nodes.h({ h: 8 }).d(),
      ].forEach((target: unknown) => {
        const value = isMutationNode(target);
        expect(value).toBe(true);
        if (value) {
          expectTypeOf(target).toEqualTypeOf<QMutationOptionsOut>();
        }
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
      if (value)
        expectTypeOf(target).toEqualTypeOf<
          (
            ...input: unknown[]
          ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut
        >();
    });
    it("returns true for NodeFunctions and asserts target type as node function i.e., (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut", () => {
      [
        nodes.a,
        nodes.b,
        nodes.c,
        nodes.d,
        nodes.e,
        nodes.f,
        nodes.g.a,
        nodes.g.b,
        nodes.g.c,
        nodes.g.d,
        nodes.g.e,
        nodes.g.f,
        nodes.h,
        nodes.h({ h: 8 }).a,
        nodes.h({ h: 8 }).b,
        nodes.h({ h: 8 }).c,
        nodes.h({ h: 8 }).d,
        nodes.h({ h: 8 }).e,
        nodes.h({ h: 8 }).f,
      ].forEach((target: unknown) => {
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
        [queryNodeUndefinedInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
    it("returns true and asserts target type as Node for queryNodeWithInput symbol", () => {
      const target: Parameters<typeof isNode>[0] = {
        [queryNodeDefinedInput]: null,
        queryKey: [],
      } satisfies QAnyQueryOptionsOut;
      const value = isNode(target);
      expect(value).toBe(true);
      if (value) target satisfies Node;
    });
    it("returns true and asserts target type as Node for [mutationNode] symbol", () => {
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
    it("returns true for Nodes and NodeFunctions and asserts target type as Node", () => {
      [
        nodes,
        nodes.a(),
        nodes.b(),
        nodes.c(),
        nodes.d(),
        nodes.e({ e: 5 }),
        nodes.f(),
        nodes.g.a(),
        nodes.g.b(),
        nodes.g.c(),
        nodes.g.d(),
        nodes.g.e({ e: 5 }),
        nodes.g.f(),
        nodes.h({ h: 8 }).a(),
        nodes.h({ h: 8 }).b(),
        nodes.h({ h: 8 }).c(),
        nodes.h({ h: 8 }).d(),
        nodes.h({ h: 8 }).e({ e: 5 }),
        nodes.h({ h: 8 }).f(),
        nodes.a,
        nodes.b,
        nodes.c,
        nodes.d,
        nodes.e,
        nodes.f,
        nodes.g.a,
        nodes.g.b,
        nodes.g.c,
        nodes.g.d,
        nodes.g.e,
        nodes.g.f,
        nodes.h,
        nodes.h({ h: 8 }).a,
        nodes.h({ h: 8 }).b,
        nodes.h({ h: 8 }).c,
        nodes.h({ h: 8 }).d,
        nodes.h({ h: 8 }).e,
        nodes.h({ h: 8 }).f,
      ].forEach(
        (
          target:
            | Node
            | QAnyQueryOptionsOut
            | QAnyMutationOptionsOut
            | ((
                ...input: any[]
              ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut),
        ) => {
          const value = isNode(target);
          expect(value).toBe(true);
          if (value) target satisfies Node;
        },
      );
    });
  });
});
