import { getInput, info, setFailed, setOutput } from "@actions/core";

import { Action, ActionResult } from "./action";
import { ActionInput, parseActionInput } from "./input";

function getActionInput(): ActionInput {
  return parseActionInput({
    matrix: getInput("matrix"),
    targetGroupSize: getInput("target-group-size"),
    resultFormat: getInput("result-format"),
    resultFormatPlainSeparator: getInput("result-format-plain-separator", { trimWhitespace: false }),
    resultItemPrefix: getInput("result-item-prefix", { trimWhitespace: false }),
  });
}

function setActionOutput(actionResult: ActionResult): void {
  info(`Action result: ${JSON.stringify(actionResult)}`);
  setOutput("matrix", JSON.stringify(actionResult.matrix));
}

async function _main(): Promise<void> {
  const actionInput = getActionInput();
  const actionInstance = Action.fromOptions({
    ...actionInput,
    logger: info,
  });
  const actionResult = await actionInstance.run();
  setActionOutput(actionResult);
}

async function main(): Promise<void> {
  try {
    await _main();
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    } else {
      setFailed("An unexpected error occurred");
    }
  }
}

main();
