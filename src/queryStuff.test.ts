import { describe, expect, it } from "vitest";
import { QueryStuff } from "./index.js";

describe("queryStuff", () => {
  it("expects to be defined", () => {
    expect(new QueryStuff()).toBeDefined();
  });
});
