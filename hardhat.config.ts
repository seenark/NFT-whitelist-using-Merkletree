import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "solidity-coverage";
import "dotenv/config";

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	networks: {
		hardhat: {
			accounts: {
				mnemonic: process.env.MNEMONIC,
				count: 20,
				accountsBalance: `${1_000_000_000}000000000000000000`,
			},
		},
	},
	typechain: {
		outDir: "build/typechain",
		target: "ethers-v5",
	},
};

export default config;
