import { describe, expect, expectTypeOf } from "vitest";
import { n, queryStuffTest } from "./fixtures.ts";
import {
  mutationNode,
  queryNodeDefinedInput,
  queryNodeUndefinedInput,
} from "./symbols.ts";
import {
  Node,
  QAnyMutationOptionsOut,
  QAnyQueryOptionsOut,
  QMutationOptionsOut,
  QQueryOptionsOut,
} from "./types.ts";
import {
  isMutationNode,
  isNode,
  isNodeFunction,
  isNodeObject,
  isQueryNode,
  isQueryNodeDefinedInput,
  isQueryNodeUndefinedInput,
  isString,
} from "./utils.ts";

describe("utils", () => {
  describe("isString", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isString()).toBe(false);
    });
    queryStuffTest("returns false for non-string or symbol inputs", () => {
      //@ts-expect-error
      expect(isString(1)).toBe(false);
      expect(isString(queryNodeUndefinedInput)).toBe(false);
    });
    queryStuffTest("returns true for any string", () => {
      expect(isString("")).toBe(true);
    });
  });

  describe("isNodeObject", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isNodeObject()).toBe(false);
    });
    queryStuffTest("returns false for non-object inputs", () => {
      expect(isNodeObject(1)).toBe(false);
    });
    queryStuffTest(
      "returns true and asserts target type as Node Object",
      () => {
        const target: unknown = {};
        const value = isNodeObject(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<Node>();
      },
    );
    queryStuffTest(
      "returns true for nodes and asserts target type as Node Object",
      () => {
        [
          n,
          n.a(),
          n.b(),
          n.c(),
          n.d(),
          n.e({ e: 5 }),
          n.f(),
          n.g.a(),
          n.g.b(),
          n.g.c(),
          n.g.d(),
          n.g.e({ e: 5 }),
          n.g.f(),
          n.h({ h: 8 }).a(),
          n.h({ h: 8 }).b(),
          n.h({ h: 8 }).c(),
          n.h({ h: 8 }).d(),
          n.h({ h: 8 }).e({ e: 5 }),
          n.h({ h: 8 }).f(),
        ].forEach((target: unknown) => {
          const value = isNodeObject(target);
          expect(value).toBe(true);
          if (value) expectTypeOf(target).toEqualTypeOf<Node>();
        });
      },
    );
  });

  describe("isQueryNodeUndefinedInput", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeUndefinedInput()).toBe(false);
    });
    queryStuffTest(
      "returns false for objects without the queryNodeWithoutInput symbol",
      () => {
        expect(isQueryNodeUndefinedInput({})).toBe(false);
      },
    );
    queryStuffTest(
      "returns true and asserts target type as QQueryOptionsOut",
      () => {
        const target: unknown = { [queryNodeUndefinedInput]: null };
        const value = isQueryNodeUndefinedInput(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
      },
    );
    queryStuffTest(
      "returns true for QueryNodeUndefinedInput and asserts target type as QQueryOptionsOut",
      () => {
        [n.a(), n.g.a(), n.h({ h: 8 }).a()].forEach((target: unknown) => {
          const value = isQueryNodeUndefinedInput(target);
          expect(value).toBe(true);
          if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
        });
      },
    );
  });

  describe("isQueryNodeDefinedInput", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNodeDefinedInput()).toBe(false);
    });
    queryStuffTest(
      "returns false for objects without the queryNodeWithInput symbol",
      () => {
        expect(isQueryNodeDefinedInput({})).toBe(false);
      },
    );
    queryStuffTest(
      "returns true and asserts target type as QQueryOptionsOut",
      () => {
        const target: unknown = { [queryNodeDefinedInput]: null };
        const value = isQueryNodeDefinedInput(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
      },
    );
    queryStuffTest(
      "returns true for QueryNodeDefinedInput and asserts target type as QQueryOptionsOut",
      () => {
        [
          n.c(),
          n.e({ e: 5 }),
          n.g.c(),
          n.g.e({ e: 5 }),
          n.h({ h: 8 }).c(),
          n.h({ h: 8 }).e({ e: 5 }),
        ].forEach((target: unknown) => {
          const value = isQueryNodeDefinedInput(target);
          expect(value).toBe(true);
          if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
        });
      },
    );
  });

  describe("isQueryNode", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isQueryNode()).toBe(false);
    });
    queryStuffTest(
      "returns false for objects without the queryNodeWithoutInput/queryNodeWithInput symbol",
      () => {
        expect(isQueryNode({})).toBe(false);
      },
    );
    queryStuffTest(
      "returns true and asserts target type as QQueryOptionsOut for queryNodeWithoutInput symbol",
      () => {
        const target: unknown = { [queryNodeUndefinedInput]: null };
        const value = isQueryNode(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
      },
    );
    queryStuffTest(
      "returns true and asserts target type as QQueryOptionsOut for queryNodeWithInput symbol",
      () => {
        const target: unknown = { [queryNodeDefinedInput]: null };
        const value = isQueryNode(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
      },
    );
    queryStuffTest(
      "returns true for QueryNode and asserts target type as QQueryOptionsOut",
      () => {
        [
          n.a(),
          n.g.a(),
          n.h({ h: 8 }).a(),
          n.c(),
          n.e({ e: 5 }),
          n.g.c(),
          n.g.e({ e: 5 }),
          n.h({ h: 8 }).c(),
          n.h({ h: 8 }).e({ e: 5 }),
        ].forEach((target: unknown) => {
          const value = isQueryNode(target);
          expect(value).toBe(true);
          if (value) expectTypeOf(target).toEqualTypeOf<QQueryOptionsOut>();
        });
      },
    );
  });

  describe("isMutationNode", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isMutationNode()).toBe(false);
    });
    queryStuffTest(
      "returns false for objects without the mutationNode symbol",
      () => {
        expect(isMutationNode({})).toBe(false);
      },
    );
    queryStuffTest(
      "returns true and asserts type QQueryOptionsOut, for objects with the mutationNode symbol",
      () => {
        const target: unknown = { [mutationNode]: null };
        const value = isMutationNode(target);
        expect(value).toBe(true);
        if (value) {
          expectTypeOf(target).toEqualTypeOf<QMutationOptionsOut>();
        }
      },
    );
    queryStuffTest(
      "returns true for mutationNode and asserts type QQueryOptionsOut, for objects with the mutationNode symbol",
      () => {
        [
          n.b(),
          n.d(),
          n.g.b(),
          n.g.d(),
          n.h({ h: 8 }).b(),
          n.h({ h: 8 }).d(),
        ].forEach((target: unknown) => {
          const value = isMutationNode(target);
          expect(value).toBe(true);
          if (value) {
            expectTypeOf(target).toEqualTypeOf<QMutationOptionsOut>();
          }
        });
      },
    );
  });

  describe("isNodeFunction", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isNodeFunction()).toBe(false);
    });
    queryStuffTest("returns false for non functions", () => {
      expect(isNodeFunction({})).toBe(false);
    });
    queryStuffTest(
      "returns true and asserts target type as node function i.e., (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut",
      () => {
        const target: unknown = () => {};
        const value = isNodeFunction(target);
        expect(value).toBe(true);
        if (value)
          expectTypeOf(target).toEqualTypeOf<
            (
              ...input: unknown[]
            ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut
          >();
      },
    );
    queryStuffTest(
      "returns true for NodeFunctions and asserts target type as node function i.e., (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut",
      () => {
        [
          n.a,
          n.b,
          n.c,
          n.d,
          n.e,
          n.f,
          n.g.a,
          n.g.b,
          n.g.c,
          n.g.d,
          n.g.e,
          n.g.f,
          n.h,
          n.h({ h: 8 }).a,
          n.h({ h: 8 }).b,
          n.h({ h: 8 }).c,
          n.h({ h: 8 }).d,
          n.h({ h: 8 }).e,
          n.h({ h: 8 }).f,
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
      },
    );
  });

  describe("isNode", () => {
    queryStuffTest("returns false for no input", () => {
      //@ts-expect-error
      expect(isNode()).toBe(false);
    });
    queryStuffTest("returns false for undefined", () => {
      expect(isNode(undefined)).toBe(false);
    });
    queryStuffTest(
      "returns true and asserts target type as Node for node object",
      () => {
        const target: Parameters<typeof isNode>[0] = {} satisfies Node;
        const value = isNode(target);
        expect(value).toBe(true);
        if (value) expectTypeOf(target).toEqualTypeOf<Node>();
      },
    );
    queryStuffTest(
      "returns true and asserts target type as Node for queryNodeWithoutInput symbol",
      () => {
        const target: Parameters<typeof isNode>[0] = {
          [queryNodeUndefinedInput]: null,
          queryKey: [],
        } satisfies QAnyQueryOptionsOut;
        const value = isNode(target);
        expect(value).toBe(true);
        if (value) target satisfies Node;
      },
    );
    queryStuffTest(
      "returns true and asserts target type as Node for queryNodeWithInput symbol",
      () => {
        const target: Parameters<typeof isNode>[0] = {
          [queryNodeDefinedInput]: null,
          queryKey: [],
        } satisfies QAnyQueryOptionsOut;
        const value = isNode(target);
        expect(value).toBe(true);
        if (value) target satisfies Node;
      },
    );
    queryStuffTest(
      "returns true and asserts target type as Node for mutationNode symbol",
      () => {
        const target: Parameters<typeof isNode>[0] = {
          [mutationNode]: null,
          mutationKey: [],
        } satisfies QAnyMutationOptionsOut;
        const value = isNode(target);
        expect(value).toBe(true);
        if (value) target satisfies Node;
      },
    );
    queryStuffTest(
      "returns true and asserts target type as Node for node function i.e (...input: unknown[]) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut",
      () => {
        const target: Parameters<typeof isNode>[0] = (() => ({})) satisfies (
          ...input: any[]
        ) => Node | QAnyQueryOptionsOut | QAnyMutationOptionsOut;
        const value = isNode(target);
        expect(value).toBe(true);
        if (value) target satisfies Node;
      },
    );
    queryStuffTest(
      "returns true for Nodes and NodeFunctions and asserts target type as Node",
      () => {
        [
          n,
          n.a(),
          n.b(),
          n.c(),
          n.d(),
          n.e({ e: 5 }),
          n.f(),
          n.g.a(),
          n.g.b(),
          n.g.c(),
          n.g.d(),
          n.g.e({ e: 5 }),
          n.g.f(),
          n.h({ h: 8 }).a(),
          n.h({ h: 8 }).b(),
          n.h({ h: 8 }).c(),
          n.h({ h: 8 }).d(),
          n.h({ h: 8 }).e({ e: 5 }),
          n.h({ h: 8 }).f(),
          n.a,
          n.b,
          n.c,
          n.d,
          n.e,
          n.f,
          n.g.a,
          n.g.b,
          n.g.c,
          n.g.d,
          n.g.e,
          n.g.f,
          n.h,
          n.h({ h: 8 }).a,
          n.h({ h: 8 }).b,
          n.h({ h: 8 }).c,
          n.h({ h: 8 }).d,
          n.h({ h: 8 }).e,
          n.h({ h: 8 }).f,
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
      },
    );
  });
});
