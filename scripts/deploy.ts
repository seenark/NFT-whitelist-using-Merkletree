import { ethers } from "hardhat";
import keccak256 from "keccak256";
import { MyNFT__factory } from "../build/typechain";
import { merkletree } from "./merkle";

async function main() {
	// const currentTimestampInSeconds = Math.round(Date.now() / 1000);
	// const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
	// const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

	// const lockedAmount = ethers.utils.parseEther("1");

	// const Lock = await ethers.getContractFactory("Lock");
	// const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

	// await lock.deployed();

	// console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);

	const signers = await ethers.getSigners();
	const signer1 = signers[0];
	const signer3 = signers[2];
	const signer3Address = await signer3.getAddress();
	const factory = new MyNFT__factory(signer1);
	const mynft = await factory.deploy(merkletree.root);
	await mynft.deployed();
	console.log("contract address", mynft.address);

	// test to verify for leaf 2
	console.log("test to verify");
	const isLeaf2Valid = await mynft.isValid(merkletree.proofForLeaf2, merkletree.whitelist2InHash);
	console.log("is valid", isLeaf2Valid);

	// test mint
	const tx = await mynft.connect(signer3).safeMint(signer3Address, merkletree.proofForLeaf2, keccak256(signer3Address));
	await tx.wait();
	console.log("mint successfully", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
