import { describe, expect, test } from "vitest";

import { RawActionInput, parseActionInput } from "../../src/input";

const defaultRawInput: RawActionInput = {
  matrix: '["pkg-a","pkg-b","pkg-c"]',
  targetGroupSize: "10",
  resultFormat: "plain",
  resultFormatPlainSeparator: " ",
  resultItemPrefix: "",
};

function createRawInput(overrides: Partial<RawActionInput> = {}): RawActionInput {
  return {
    ...defaultRawInput,
    ...overrides,
  };
}

describe("Input tests", () => {
  test("parses raw input correctly", () => {
    expect(parseActionInput(createRawInput())).toEqual({
      matrix: ["pkg-a", "pkg-b", "pkg-c"],
      targetGroupSize: 10,
      resultFormat: "plain",
      resultFormatPlainSeparator: " ",
      resultItemPrefix: "",
    });
  });

  test("throws error when matrix is invalid JSON", () => {
    expect(() => parseActionInput(createRawInput({ matrix: "not json" }))).toThrowError();
  });

  test("throws error when targetGroupSize is invalid", () => {
    expect(() => parseActionInput(createRawInput({ targetGroupSize: "0" }))).toThrowError();
  });

  test("throws error when resultFormat is invalid", () => {
    expect(() => parseActionInput(createRawInput({ resultFormat: "xml" }))).toThrowError();
  });
});
