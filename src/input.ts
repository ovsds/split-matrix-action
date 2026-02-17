import { ResultFormat, parseJsonStringArray, parsePositiveInteger, parseResultFormat } from "./utils/parse";

export interface RawActionInput {
  matrix: string;
  targetGroupSize: string;
  resultFormat: string;
  resultFormatPlainSeparator: string;
  resultItemPrefix: string;
}

export interface ActionInput {
  matrix: string[];
  targetGroupSize: number;
  resultFormat: ResultFormat;
  resultFormatPlainSeparator: string;
  resultItemPrefix: string;
}

export function parseActionInput(raw: RawActionInput): ActionInput {
  return {
    matrix: parseJsonStringArray(raw.matrix),
    targetGroupSize: parsePositiveInteger(raw.targetGroupSize),
    resultFormat: parseResultFormat(raw.resultFormat),
    resultFormatPlainSeparator: raw.resultFormatPlainSeparator,
    resultItemPrefix: raw.resultItemPrefix,
  };
}
