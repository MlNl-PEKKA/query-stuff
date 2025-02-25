import { describe, expect, it } from "vitest";
import { keys, mutations, queries, queryFactories } from "./fixtures.js";
import { key } from "./symbols.js";

describe("queryFactories", () => {
  queryFactories.forEach((target) => {
    describe(`${target[1]}`, () => {
      describe("queries", () => {
        queries().forEach((q) =>
          it(`${q[1].name}: queryKey`, () =>
            expect(q[0]().queryKey).toStrictEqual(q[1].queryKey)),
        );
      });
      describe("mutations", () => {
        mutations().forEach((q) =>
          it(`${q[1].name}: mutationKey`, () =>
            expect(q[0]().mutationKey).toStrictEqual(q[1].mutationKey)),
        );
      });
      describe("keys", () => {
        keys().forEach((q) =>
          it(`${q[1].name}: key`, () =>
            expect(q[0][key]).toStrictEqual(q[1].key)),
        );
      });
    });
  });
});
