// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

    mapping(address => bool) public whitelistVoters;

    function registerVoter(address _voterAddress) public onlyOwner {
      whitelistVoters[_voterAddress] = true;
    }

    function isVoter(address _voterAddress) public view onlyOwner returns(bool) {
      return whitelistVoters[_voterAddress];
    }
}
