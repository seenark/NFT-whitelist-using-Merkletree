// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    bytes32 root;
    Counters.Counter private _tokenIdCounter;

    constructor(bytes32 _root) ERC721("MyToken", "MTK") {
        root = _root;
    }

    function safeMint(
        address to,
        bytes32[] calldata proof,
        bytes32 leaf
    ) public {
        require(
            keccak256(abi.encodePacked(msg.sender)) == leaf,
            "msg.sender should == leaf"
        );
        require(isValid(proof, leaf), "not pass verify proof and leaf");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function isValid(bytes32[] calldata proof, bytes32 leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }
}
