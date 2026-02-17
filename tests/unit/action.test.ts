import { describe, expect, test, vi } from "vitest";

import { Action, splitIntoGroups } from "../../src/action";

const noopLogger = vi.fn();

describe("splitIntoGroups", () => {
  test("splits evenly", () => {
    expect(splitIntoGroups(["a", "b", "c", "d"], 2)).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  test("distributes remainder evenly", () => {
    // 5 items, target 2 → 3 groups: [2, 2, 1]
    expect(splitIntoGroups(["a", "b", "c", "d", "e"], 2)).toEqual([["a", "b"], ["c", "d"], ["e"]]);
  });

  test("distributes approximately evenly instead of one small tail", () => {
    // 12 items, target 10 → 2 groups of 6 (not [10, 2])
    expect(splitIntoGroups(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"], 10)).toEqual([
      ["a", "b", "c", "d", "e", "f"],
      ["g", "h", "i", "j", "k", "l"],
    ]);
  });

  test("handles empty array", () => {
    expect(splitIntoGroups([], 2)).toEqual([]);
  });

  test("handles group size larger than array", () => {
    expect(splitIntoGroups(["a", "b"], 10)).toEqual([["a", "b"]]);
  });

  test("handles group size of 1", () => {
    expect(splitIntoGroups(["a", "b", "c"], 1)).toEqual([["a"], ["b"], ["c"]]);
  });

  test("handles exact multiple", () => {
    expect(splitIntoGroups(["a", "b", "c", "d", "e", "f"], 3)).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
    ]);
  });

  test("sizes differ by at most 1", () => {
    // 7 items, target 3 → 3 groups: [3, 2, 2]
    const result = splitIntoGroups(["a", "b", "c", "d", "e", "f", "g"], 3);
    expect(result).toEqual([
      ["a", "b", "c"],
      ["d", "e"],
      ["f", "g"],
    ]);
    const sizes = result.map((g) => g.length);
    expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
  });
});

describe("Action", () => {
  test("splits items and joins with separator", async () => {
    const action = Action.fromOptions({
      matrix: ["a", "b", "c", "d", "e"],
      targetGroupSize: 2,
      resultFormat: "plain",
      resultFormatPlainSeparator: " ",
      resultItemPrefix: "",
      logger: noopLogger,
    });

    const result = await action.run();
    expect(result.matrix).toEqual(["a b", "c d", "e"]);
  });

  test("applies prefix to each item", async () => {
    const action = Action.fromOptions({
      matrix: ["pkg-a", "pkg-b", "pkg-c"],
      targetGroupSize: 2,
      resultFormat: "plain",
      resultFormatPlainSeparator: " ",
      resultItemPrefix: "/data/",
      logger: noopLogger,
    });

    const result = await action.run();
    expect(result.matrix).toEqual(["/data/pkg-a /data/pkg-b", "/data/pkg-c"]);
  });

  test("uses custom separator", async () => {
    const action = Action.fromOptions({
      matrix: ["a", "b", "c"],
      targetGroupSize: 2,
      resultFormat: "plain",
      resultFormatPlainSeparator: ",",
      resultItemPrefix: "",
      logger: noopLogger,
    });

    const result = await action.run();
    expect(result.matrix).toEqual(["a,b", "c"]);
  });

  test("returns empty array for empty input", async () => {
    const action = Action.fromOptions({
      matrix: [],
      targetGroupSize: 10,
      resultFormat: "plain",
      resultFormatPlainSeparator: " ",
      resultItemPrefix: "",
      logger: noopLogger,
    });

    const result = await action.run();
    expect(result.matrix).toEqual([]);
  });

  test("distributes evenly with prefix", async () => {
    const packages = [
      "pkg-1",
      "pkg-2",
      "pkg-3",
      "pkg-4",
      "pkg-5",
      "pkg-6",
      "pkg-7",
      "pkg-8",
      "pkg-9",
      "pkg-10",
      "pkg-11",
      "pkg-12",
    ];
    const action = Action.fromOptions({
      matrix: packages,
      targetGroupSize: 10,
      resultFormat: "plain",
      resultFormatPlainSeparator: " ",
      resultItemPrefix: "/data/",
      logger: noopLogger,
    });

    const result = await action.run();
    expect(result.matrix).toEqual([
      "/data/pkg-1 /data/pkg-2 /data/pkg-3 /data/pkg-4 /data/pkg-5 /data/pkg-6",
      "/data/pkg-7 /data/pkg-8 /data/pkg-9 /data/pkg-10 /data/pkg-11 /data/pkg-12",
    ]);
  });
});
