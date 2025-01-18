import { describe, expect, it } from "vitest";
import { someStuff } from "./index.js";

describe("someStuff", () => {
  it("expects a result with an input", () => {
    expect(someStuff("thing")).toBe("Some thing");
  });
  it("expects a result without an input", () => {
    expect(someStuff()).toBe("Some stuff");
  });
});
