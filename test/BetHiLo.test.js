const BetHiLo = artifacts.require("BetHiLo");

contract("BetHiLo", (accounts) => {
    it("should be able to deploy BetHiLo", async () => {
        const betHiLo = await BetHiLo.deployed();
        assert(betHiLo.address !== "");
    });
});