import { ICypressPost10Configuration } from "@badeball/cypress-configuration";

import assert from "assert";

import { resolve } from "./preprocessor-configuration";

const DUMMY_POST10_CONFIG: ICypressPost10Configuration = {
  projectRoot: "",
  specPattern: [],
  excludeSpecPattern: [],
  env: {},
};

describe("resolve()", () => {
  it("overriding stepDefinitions", async () => {
    const { stepDefinitions } = await resolve(
      DUMMY_POST10_CONFIG,
      { stepDefinitions: "foo/bar/**" },
      () => null
    );

    assert.strictEqual(stepDefinitions, "foo/bar/**");
  });

  it("overriding messages.enabled (1)", async () => {
    const {
      messages: { enabled },
    } = await resolve(DUMMY_POST10_CONFIG, { messagesEnabled: "" }, () => ({
      messages: { enabled: true },
    }));

    assert.strictEqual(enabled, true);
  });

  it("overriding messages.enabled (2)", async () => {
    const {
      messages: { enabled },
    } = await resolve(DUMMY_POST10_CONFIG, { messagesEnabled: "true" }, () => ({
      messages: { enabled: false },
    }));

    assert.strictEqual(enabled, true);
  });

  it("overriding messages.enabled (3)", async () => {
    const {
      messages: { enabled },
    } = await resolve(
      DUMMY_POST10_CONFIG,
      { messagesEnabled: "foobar" },
      () => ({
        messages: { enabled: false },
      })
    );

    assert.strictEqual(enabled, true);
  });

  it("overriding messages.enabled (4)", async () => {
    const {
      messages: { enabled },
    } = await resolve(DUMMY_POST10_CONFIG, { messagesEnabled: true }, () => ({
      messages: { enabled: false },
    }));

    assert.strictEqual(enabled, true);
  });

  it("overriding messages.enabled (5)", async () => {
    const {
      messages: { enabled },
    } = await resolve(
      DUMMY_POST10_CONFIG,
      { messagesEnabled: "false" },
      () => ({
        messages: { enabled: true },
      })
    );

    assert.strictEqual(enabled, false);
  });

  it("overriding messages.enabled (6)", async () => {
    const {
      messages: { enabled },
    } = await resolve(
      DUMMY_POST10_CONFIG,
      { messagesEnabled: "false" },
      () => ({
        messages: { enabled: true },
      })
    );

    assert.strictEqual(enabled, false);
  });

  it("overriding messages.enabled (7)", async () => {
    const {
      messages: { enabled },
    } = await resolve(DUMMY_POST10_CONFIG, { messagesEnabled: false }, () => ({
      messages: { enabled: true },
    }));

    assert.strictEqual(enabled, false);
  });
});
