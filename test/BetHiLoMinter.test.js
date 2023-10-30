const BetHiLo = artifacts.require("BetHiLo");
const BetHiLoMinter = artifacts.require("BetHiLoMinter");

contract("BetHiLoMinter", (accounts) => {
    it("should be able to deploy BetHiLoMinter", async () => {
        const betHiLoMinter = await BetHiLoMinter.deployed();
        assert(betHiLoMinter.address !== "");
    });

    it("mint tokens through the minter contract", async () => {
        const betHiLoMinter = await BetHiLoMinter.deployed();
        const betHiLo = await BetHiLo.deployed();

        await betHiLo.grantRole(web3.utils.keccak256("MINTER_ROLE"), betHiLoMinter.address);

        await betHiLoMinter.mintTokens(accounts[2], 100);
        const balance = await betHiLo.balanceOf(accounts[2]);
        assert(balance.toNumber() === 100);
    });
});