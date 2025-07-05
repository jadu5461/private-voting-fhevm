// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/FHELib.sol";

contract PrivateVoting {
    mapping(address => ebool) private votes;
    mapping(address => bool) private hasVoted;

    euint public yesCount;
    euint public noCount;

    function vote(ebool encryptedVote) public {
        require(!hasVoted[msg.sender], "Already voted");
        votes[msg.sender] = encryptedVote;
        hasVoted[msg.sender] = true;
        if (FHE.decrypt(encryptedVote)) {
            yesCount = FHE.add(yesCount, 1);
        } else {
            noCount = FHE.add(noCount, 1);
        }
    }

    function getYesCount() public view returns (euint) {
        return yesCount;
    }

    function getNoCount() public view returns (euint) {
        return noCount;
    }
}
