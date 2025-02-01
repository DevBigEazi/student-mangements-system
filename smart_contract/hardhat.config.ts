import { HardhatUserConfig, vars } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: vars.has("PRIVATE_KEY") ? [vars.get("PRIVATE_KEY")] : [],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: "123",
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;

