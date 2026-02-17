export const parseNonEmptyString = (value: string | undefined): string => {
  if (!value) {
    throw new Error(`Invalid ${value}, must be a non-empty string`);
  }
  if (value.trim() === "") {
    throw new Error(`Invalid ${value}, must be a non-empty string`);
  }
  return value;
};

export const parseJsonStringArray = (value: string): string[] => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error(`Invalid JSON: ${value}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`Expected a JSON array, got: ${typeof parsed}`);
  }

  for (const item of parsed) {
    if (typeof item !== "string") {
      throw new Error(`Expected all items to be strings, got: ${typeof item}`);
    }
  }

  return parsed as string[];
};

export const parsePositiveInteger = (value: string): number => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${value}, must be a positive integer`);
  }

  return parsed;
};

const VALID_RESULT_FORMATS = ["plain"] as const;
export type ResultFormat = (typeof VALID_RESULT_FORMATS)[number];

export const parseResultFormat = (value: string): ResultFormat => {
  if (!VALID_RESULT_FORMATS.includes(value as ResultFormat)) {
    throw new Error(`Invalid result-format "${value}", must be one of: ${VALID_RESULT_FORMATS.join(", ")}`);
  }

  return value as ResultFormat;
};
