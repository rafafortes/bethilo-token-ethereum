# Bet Hi Lo + Token + Minter

This project is a Bet Hi Lo game with the addition of a custom token (BHL - BetHiLo) and also a smart contract that's responsible for Minting BHL Tokens. That allows the players to claim BHL tokens if they are eligible.

## Screenshots

![Screenshot from 2023-10-30 08-37-27](https://github.com/rafafortes/bethilo-token-ethereum/assets/20464782/ab3a6e79-057c-4851-8287-72b41e576bfe)

![Screenshot from 2023-10-30 08-38-06](https://github.com/rafafortes/bethilo-token-ethereum/assets/20464782/b2f87548-8305-49f2-b69e-9f8cce3a971d)

![Screenshot from 2023-10-30 08-38-17](https://github.com/rafafortes/bethilo-token-ethereum/assets/20464782/46dc274c-1927-449a-bd72-657c35c826ec)

## Prerequisites

Node.js v18.17.0 or greater

## API Key and Passphrase

Make sure to create the following files in the root folder:
- .secret (this contains your seed phrase)
- .infura (this container your Infura API Key)
- .etherscan (optional, in case you want to verify the contract, add your etherscan API Key)

## Installation

npm install

## Compilation

./node_modules/.bin/truffle compile && npm run copy-contracts

## Tests

./node_modules/.bin/truffle test

## Deploy

- ./node_modules/.bin/truffle migrate --network ganache (if you want to deploy to ganache)
- ./node_modules/.bin/truffle migrate --network sepolia (if you want to deploy to sepolia)
- ./node_modules/.bin/truffle migrate --network networkName (if you want to deploy to another network, replace networkName by your desired network and make sure the truffle-config.js is updated with the network settings)

## Server start up

npm start
