// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBetHiLo {
    function mint(address to, uint256 amount) external;
}

contract BetHiLoMinter {
    IBetHiLo public betHiLoToken;

    constructor(address _betHiLoTokenAddress) {
        betHiLoToken = IBetHiLo(_betHiLoTokenAddress);
    }

    function mintTokens(address to, uint256 amount) external {
        betHiLoToken.mint(to, amount);
    }
}