import { describe, expect, test } from "vitest";

import {
  parseNonEmptyString,
  parseJsonStringArray,
  parsePositiveInteger,
  parseResultFormat,
} from "../../../src/utils/parse";

describe("parseNonEmptyString", () => {
  test("parses non-empty string correctly", () => {
    expect(parseNonEmptyString("test")).toBe("test");
  });

  test("throws error when empty", () => {
    expect(() => parseNonEmptyString("")).toThrowError();
    expect(() => parseNonEmptyString(undefined)).toThrowError();
  });
});

describe("parseJsonStringArray", () => {
  test("parses valid JSON array of strings", () => {
    expect(parseJsonStringArray('["a","b","c"]')).toEqual(["a", "b", "c"]);
  });

  test("parses empty array", () => {
    expect(parseJsonStringArray("[]")).toEqual([]);
  });

  test("throws on invalid JSON", () => {
    expect(() => parseJsonStringArray("not json")).toThrowError("Invalid JSON");
  });

  test("throws on non-array JSON", () => {
    expect(() => parseJsonStringArray('{"a": 1}')).toThrowError("Expected a JSON array");
  });

  test("throws on array with non-string items", () => {
    expect(() => parseJsonStringArray("[1, 2]")).toThrowError("Expected all items to be strings");
  });
});

describe("parsePositiveInteger", () => {
  test("parses valid positive integer", () => {
    expect(parsePositiveInteger("10")).toBe(10);
    expect(parsePositiveInteger("1")).toBe(1);
  });

  test("throws on zero", () => {
    expect(() => parsePositiveInteger("0")).toThrowError("must be a positive integer");
  });

  test("throws on negative", () => {
    expect(() => parsePositiveInteger("-1")).toThrowError("must be a positive integer");
  });

  test("throws on non-integer", () => {
    expect(() => parsePositiveInteger("1.5")).toThrowError("must be a positive integer");
  });

  test("throws on non-numeric", () => {
    expect(() => parsePositiveInteger("abc")).toThrowError("must be a positive integer");
  });
});

describe("parseResultFormat", () => {
  test("parses 'plain'", () => {
    expect(parseResultFormat("plain")).toBe("plain");
  });

  test("throws on unsupported format", () => {
    expect(() => parseResultFormat("xml")).toThrowError("Invalid result-format");
  });
});
