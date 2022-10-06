import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

const whitelist = [
	"0x95C9CE2CF8A726017Ba62A7785b5575DD06DD899",
	"0x9B9Ff2d45Be72d122E8CEabcBE086C7b187D593A",
	"0xfF2Ed6d6D92efD9E27dC00501b2dCf66CF7c32aD",
	"0x5bd116D34751B619Ee2C04D8bfFE9F1AA5ded87d",
	"0xafec57fd2aBC4Aa0C111B05d4A53C45A3f3969B8",
];
console.table(whitelist);

// function keccak256(address: string) {
//     return ethers.utils.solidityKeccak256(["string"], [address])
// }

const leaves = whitelist.map((w) => {
	return keccak256(w);
});
// console.log("leaves", leaves)

const tree = new MerkleTree(leaves, keccak256, { sort: true });
const root = MerkleTree.bufferToHex(tree.getRoot());
console.log("root", root);

// in case we want to verify address at index 2 0xfF2Ed6d6D92efD9E27dC00501b2dCf66CF7c32aD
const whitelist2InHash = keccak256(whitelist[2]);
const proofForLeaf2 = tree.getHexProof(whitelist2InHash);
console.log(proofForLeaf2);

export const merkletree = {
	tree,
	root,
	whitelist2InHash,
	proofForLeaf2,
};
