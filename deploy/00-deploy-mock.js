const { getNamedAccounts, deployments, network, ethers } = require("hardhat");
const { ERROR_RANGES } = require("hardhat/internal/core/errors-list.js");
const { developmentChains } = require("../helper-hardhat-config.js");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const args = [BASE_FEE, GAS_PRICE_LINK];

  if (developmentChains.includes(network.name)) {
    log("Local Network detected , Deploying mocks . . .");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: args,
    });
    log("Mocks deployed ! 🎉");
    log("------------------------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
