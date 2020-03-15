const assert = require("assert");
const User = require("../src/models/user");

describe("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    // user.validate((validationResult) => {
    // })
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
  });

  it("requires a user is name longer than 2 caracteres", () => {
    const user = new User({ name: "Re" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters.");
  });
});
