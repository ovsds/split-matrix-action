import { ResultFormat } from "./utils/parse";

export interface ActionResult {
  matrix: string[];
}

interface ActionOptions {
  matrix: string[];
  targetGroupSize: number;
  resultFormat: ResultFormat;
  resultFormatPlainSeparator: string;
  resultItemPrefix: string;
  logger: (message: string) => void;
}

export function splitIntoGroups(list: string[], targetGroupSize: number): string[][] {
  if (list.length === 0) {
    return [];
  }

  const groupCount = Math.ceil(list.length / targetGroupSize);
  const baseSize = Math.floor(list.length / groupCount);
  const remainder = list.length % groupCount;

  const groups: string[][] = [];
  let offset = 0;

  for (let i = 0; i < groupCount; i++) {
    const size = baseSize + (i < remainder ? 1 : 0);
    groups.push(list.slice(offset, offset + size));
    offset += size;
  }

  return groups;
}

export class Action {
  static fromOptions(actionOptions: ActionOptions): Action {
    return new Action(actionOptions);
  }

  private readonly options: ActionOptions;

  constructor(actionOptions: ActionOptions) {
    this.options = actionOptions;
  }

  async run(): Promise<ActionResult> {
    const { matrix, targetGroupSize, resultFormat, resultFormatPlainSeparator, resultItemPrefix, logger } =
      this.options;

    logger(`Splitting ${matrix.length} items into groups of ${targetGroupSize}`);
    logger(`Result format: ${resultFormat}, separator: "${resultFormatPlainSeparator}", prefix: "${resultItemPrefix}"`);

    if (matrix.length === 0) {
      return { matrix: [] };
    }

    const groups = splitIntoGroups(matrix, targetGroupSize);
    const result = groups.map((group) =>
      group.map((item) => `${resultItemPrefix}${item}`).join(resultFormatPlainSeparator),
    );

    logger(`Created ${result.length} groups`);

    return { matrix: result };
  }
}
