const BetHiLo = artifacts.require("BetHiLo");
const BetHiLoMinter = artifacts.require("BetHiLoMinter");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(BetHiLo, accounts[0], accounts[0]);
    const deployedBetHiLo = await BetHiLo.deployed();

    await deployer.deploy(BetHiLoMinter, deployedBetHiLo.address);
};
