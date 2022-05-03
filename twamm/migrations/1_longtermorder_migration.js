// const UniswapV3Factory = artifacts.require("./contracts/UniswapV3Factory.sol");
const FirstCoin = artifacts.require("./contracts/FirstCoin.sol");
const SecondCoin = artifacts.require("./contracts/SecondCoin.sol");
const LongTermOrderFactory = artifacts.require("./contracts/LongTermOrderFactory.sol");

module.exports = function (deployer) {
//   deployer.deploy(UniswapV3Factory);
  deployer.deploy(FirstCoin, "18000000", "FIRST-COIN", "4", "F1CT", "18000000");
  deployer.deploy(SecondCoin, "18000000", "SECOND-COIN", "4", "S2CT", "18000000");
  deployer.deploy(LongTermOrderFactory);
};
