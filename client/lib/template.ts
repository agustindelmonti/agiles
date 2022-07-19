import path from "path";

import { generateMessages } from "@cucumber/gherkin";

import { IdGenerator } from "@cucumber/messages";

import { ICypressConfiguration } from "@badeball/cypress-configuration";

import { assertAndReturn } from "./assertions";

import { resolve } from "./preprocessor-configuration";

import {
  getStepDefinitionPaths,
  getStepDefinitionPatterns,
} from "./step-definitions";

import { notNull } from "./type-guards";

import { ensureIsRelative } from "./helpers";

const { stringify } = JSON;

export async function compile(
  this: any,
  configuration: ICypressConfiguration,
  data: string,
  uri: string = this.resourcePath
) {
  const options = {
    includeSource: false,
    includeGherkinDocument: true,
    includePickles: true,
    newId: IdGenerator.uuid(),
  };

  const relativeUri = path.relative(configuration.projectRoot, uri);

  const envelopes = generateMessages(data, relativeUri, options);

  if (envelopes[0].parseError) {
    throw new Error(
      assertAndReturn(
        envelopes[0].parseError.message,
        "Expected parse error to have a description"
      )
    );
  }

  const gherkinDocument = assertAndReturn(
    envelopes.map((envelope) => envelope.gherkinDocument).find(notNull),
    "Expected to find a gherkin document amongst the envelopes."
  );

  const pickles = envelopes.map((envelope) => envelope.pickle).filter(notNull);

  const preprocessor = await resolve(configuration, configuration.env);

  const { stepDefinitions } = preprocessor;

  const stepDefinitionPatterns = getStepDefinitionPatterns(
    {
      cypress: configuration,
      preprocessor,
    },
    uri
  );

  const stepDefinitionPaths = await getStepDefinitionPaths(
    stepDefinitionPatterns
  );

  const prepareLibPath = (...parts: string[]) =>
    stringify(path.join(__dirname, ...parts));

  const createTestsPath = prepareLibPath("create-tests");

  const registryPath = prepareLibPath("registry");

  const ensureRelativeToProjectRoot = (path: string) =>
    ensureIsRelative(configuration.projectRoot, path);

  return `
    const { default: createTests } = require(${createTestsPath});
    const { withRegistry } = require(${registryPath});

    const registry = withRegistry(() => {
      ${stepDefinitionPaths
        .map(
          (stepDefinitionPath) => `require(${stringify(stepDefinitionPath)});`
        )
        .join("\n    ")}
    });

    registry.finalize();

    createTests(
      registry,
      ${stringify(data)},
      ${stringify(gherkinDocument)},
      ${stringify(pickles)},
      ${preprocessor.messages.enabled},
      ${preprocessor.omitFiltered},
      ${stringify({
        stepDefinitions,
        stepDefinitionPatterns: stepDefinitionPatterns.map(
          ensureRelativeToProjectRoot
        ),
        stepDefinitionPaths: stepDefinitionPaths.map(
          ensureRelativeToProjectRoot
        ),
      })}
    );
  `;
}
