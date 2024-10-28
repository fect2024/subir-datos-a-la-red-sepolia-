const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const UserRegistryModule = buildModule("UserRegistryModule", (m) => {
  const userRegistry = m.contract("UserRegistry");

  return { userRegistry };
});

module.exports = UserRegistryModule;
